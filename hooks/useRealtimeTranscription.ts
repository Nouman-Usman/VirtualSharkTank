import { useState, useRef, useCallback, useEffect } from 'react'

interface UseRealtimeTranscriptionProps {
  onTranscript?: (text: string) => void
  chunkDuration?: number // Duration in milliseconds for each audio chunk
  silenceThreshold?: number // Minimum audio level to consider as speech
  silenceDuration?: number // Duration of silence before stopping transcription
}

interface TranscriptionResponse {
  text: string
  language: string
  confidence: number
  timestamp: number
  segments?: any[]
}

export function useRealtimeTranscription({
  onTranscript,
  chunkDuration = 4000, // 4 seconds for better accuracy
  silenceThreshold = -50, // dB threshold for silence detection
  silenceDuration = 2000, // 2 seconds of silence before stopping
}: UseRealtimeTranscriptionProps = {}) {
  const [isRecording, setIsRecording] = useState(false)
  const [transcript, setTranscript] = useState('')
  const [isTranscribing, setIsTranscribing] = useState(false)
  const [detectedLanguage, setDetectedLanguage] = useState<string>('auto')
  
  const mediaRecorderRef = useRef<MediaRecorder | null>(null)
  const streamRef = useRef<MediaStream | null>(null)
  const chunksRef = useRef<Blob[]>([])
  const intervalRef = useRef<NodeJS.Timeout | null>(null)
  const audioContextRef = useRef<AudioContext | null>(null)
  const analyzerRef = useRef<AnalyserNode | null>(null)
  const lastSpeechTimeRef = useRef<number>(Date.now())
  const isProcessingRef = useRef<boolean>(false)

  // Audio level monitoring for silence detection
  const monitorAudioLevel = useCallback(() => {
    if (!analyzerRef.current) return

    const dataArray = new Uint8Array(analyzerRef.current.frequencyBinCount)
    analyzerRef.current.getByteFrequencyData(dataArray)
    
    // Calculate average volume
    const average = dataArray.reduce((sum, value) => sum + value, 0) / dataArray.length
    const decibels = 20 * Math.log10(average / 255)
    
    // Update last speech time if volume is above threshold
    if (decibels > silenceThreshold) {
      lastSpeechTimeRef.current = Date.now()
    }
  }, [silenceThreshold])

  const sendAudioForTranscription = useCallback(async (audioBlob: Blob) => {
    // Prevent multiple simultaneous transcriptions
    if (isProcessingRef.current) return
    
    try {
      isProcessingRef.current = true
      setIsTranscribing(true)
      
      const formData = new FormData()
      formData.append('audio', audioBlob, 'audio.webm')
      
      const response = await fetch('/api/transcribe', {
        method: 'POST',
        body: formData,
      })
      
      if (!response.ok) {
        throw new Error('Transcription failed')
      }
      
      const result: TranscriptionResponse = await response.json()
      
      // Only add non-empty transcriptions and avoid repetitive phrases
      if (result.text && result.text.trim()) {
        const newText = result.text.trim()
        
        // Simple deduplication - avoid adding if very similar to recent text
        setTranscript(prev => {
          const words = prev.toLowerCase().split(' ')
          const newWords = newText.toLowerCase().split(' ')
          const lastWords = words.slice(-newWords.length).join(' ')
          
          // Skip if the new text is very similar to what we just added
          if (lastWords === newWords.join(' ')) {
            return prev
          }
          
          const updatedTranscript = prev ? `${prev} ${newText}` : newText
          onTranscript?.(updatedTranscript)
          return updatedTranscript
        })
        
        // Update detected language
        if (result.language && result.language !== 'auto') {
          setDetectedLanguage(result.language)
        }
      }
    } catch (error) {
      console.error('Transcription error:', error)
    } finally {
      setIsTranscribing(false)
      isProcessingRef.current = false
    }
  }, [onTranscript])

  const processAudioChunk = useCallback(() => {
    if (!mediaRecorderRef.current || mediaRecorderRef.current.state !== 'recording') return
    
    // Check for silence
    const timeSinceLastSpeech = Date.now() - lastSpeechTimeRef.current
    if (timeSinceLastSpeech > silenceDuration) {
      // Don't process if we've been silent for too long
      return
    }
    
    // Stop and restart to get a chunk
    mediaRecorderRef.current.stop()
    
    // Wait a bit for the dataavailable event to fire, then restart
    setTimeout(() => {
      if (mediaRecorderRef.current && streamRef.current && isRecording) {
        try {
          mediaRecorderRef.current.start()
        } catch (error) {
          console.error('Error restarting MediaRecorder:', error)
        }
      }
    }, 200)
  }, [silenceDuration, isRecording])

  const startRecording = useCallback(async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ 
        audio: {
          echoCancellation: true,
          noiseSuppression: true,
          sampleRate: 16000,
        } 
      })
      
      streamRef.current = stream
      chunksRef.current = []
      lastSpeechTimeRef.current = Date.now()
      isProcessingRef.current = false
      
      // Set up audio context for silence detection
      audioContextRef.current = new AudioContext()
      const source = audioContextRef.current.createMediaStreamSource(stream)
      analyzerRef.current = audioContextRef.current.createAnalyser()
      analyzerRef.current.fftSize = 256
      source.connect(analyzerRef.current)
      
      const mediaRecorder = new MediaRecorder(stream, {
        mimeType: 'audio/webm;codecs=opus'
      })
      
      mediaRecorderRef.current = mediaRecorder
      
      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          chunksRef.current.push(event.data)
          
          // Create blob from all chunks and send for transcription
          const audioBlob = new Blob(chunksRef.current, { type: 'audio/webm' })
          if (audioBlob.size > 5000) { // Only send if we have substantial audio data
            sendAudioForTranscription(audioBlob)
            chunksRef.current = [] // Clear chunks after sending
          }
        }
      }
      
      mediaRecorder.onerror = (event) => {
        console.error('MediaRecorder error:', event)
      }
      
      mediaRecorder.start()
      setIsRecording(true)
      
      // Set up interval to process chunks and monitor audio level
      intervalRef.current = setInterval(() => {
        monitorAudioLevel()
        processAudioChunk()
      }, chunkDuration)
      
    } catch (error) {
      console.error('Error starting recording:', error)
    }
  }, [chunkDuration, processAudioChunk, sendAudioForTranscription, monitorAudioLevel])

  const stopRecording = useCallback(() => {
    if (mediaRecorderRef.current && mediaRecorderRef.current.state !== 'inactive') {
      mediaRecorderRef.current.stop()
    }
    
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop())
      streamRef.current = null
    }
    
    if (intervalRef.current) {
      clearInterval(intervalRef.current)
      intervalRef.current = null
    }
    
    if (audioContextRef.current) {
      audioContextRef.current.close()
      audioContextRef.current = null
    }
    
    analyzerRef.current = null
    isProcessingRef.current = false
    setIsRecording(false)
  }, [])

  const clearTranscript = useCallback(() => {
    setTranscript('')
    setDetectedLanguage('auto')
  }, [])

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      stopRecording()
    }
  }, [stopRecording])

  return {
    isRecording,
    transcript,
    isTranscribing,
    detectedLanguage,
    startRecording,
    stopRecording,
    clearTranscript,
  }
}
