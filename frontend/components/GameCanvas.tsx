'use client'

import { useEffect, useRef, useState } from 'react'
import { useRouter } from 'next/navigation'
import styles from './GameCanvas.module.css'
import { GameEngine } from '@/lib/gameEngine'
import { EyeTracker } from '@/lib/eyeTracker'

interface GameCanvasProps {
  level: string
}

export default function GameCanvas({ level }: GameCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const gameEngineRef = useRef<GameEngine | null>(null)
  const eyeTrackerRef = useRef<EyeTracker | null>(null)
  const [isCalibrating, setIsCalibrating] = useState(true)
  const [sessionStarted, setSessionStarted] = useState(false)
  const [countdown, setCountdown] = useState<number | null>(null)
  const router = useRouter()

  useEffect(() => {
    if (!canvasRef.current) return

    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    // Set canvas size
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight

    // Initialize game engine
    gameEngineRef.current = new GameEngine(canvas, ctx, level)

    // Initialize eye tracker
    eyeTrackerRef.current = new EyeTracker()

    return () => {
      gameEngineRef.current?.stop()
      eyeTrackerRef.current?.stop()
    }
  }, [level])

  const startCalibration = async () => {
    if (!eyeTrackerRef.current) return
    
    try {
      await eyeTrackerRef.current.initialize()
      setIsCalibrating(false)
    } catch (error) {
      console.error('Calibration failed:', error)
      alert('Camera access is required for eye tracking. Please allow camera access and try again.')
    }
  }

  const startSession = () => {
    setCountdown(3)
    const countdownInterval = setInterval(() => {
      setCountdown(prev => {
        if (prev === 1) {
          clearInterval(countdownInterval)
          beginGame()
          return null
        }
        return prev! - 1
      })
    }, 1000)
  }

  const beginGame = () => {
    setSessionStarted(true)
    gameEngineRef.current?.start()
    eyeTrackerRef.current?.startTracking((gazeData) => {
      gameEngineRef.current?.recordGazeData(gazeData)
    })

    // Auto-end session after 5 minutes
    setTimeout(() => {
      endSession()
    }, 5 * 60 * 1000)
  }

  const endSession = async () => {
    gameEngineRef.current?.stop()
    eyeTrackerRef.current?.stop()

    const sessionData = gameEngineRef.current?.getSessionData()
    
    // TODO: Send to AWS backend
    console.log('Session data:', sessionData)

    router.push('/dashboard')
  }

  return (
    <div className={styles.container}>
      <canvas ref={canvasRef} className={styles.canvas} />

      {isCalibrating && (
        <div className={styles.overlay}>
          <div className={styles.calibrationBox}>
            <h2>Eye Tracking Calibration</h2>
            <p>We need to calibrate the eye tracker before starting.</p>
            <p>Please look at the points that appear on screen and click on them.</p>
            <button onClick={startCalibration} className={styles.button}>
              Start Calibration
            </button>
          </div>
        </div>
      )}

      {!isCalibrating && !sessionStarted && countdown === null && (
        <div className={styles.overlay}>
          <div className={styles.calibrationBox}>
            <h2>Ready to Play!</h2>
            <p>Calibration complete. Click below to start the game.</p>
            <button onClick={startSession} className={styles.button}>
              Start Game
            </button>
          </div>
        </div>
      )}

      {countdown !== null && (
        <div className={styles.overlay}>
          <div className={styles.countdown}>{countdown}</div>
        </div>
      )}

      {sessionStarted && (
        <button onClick={endSession} className={styles.endButton}>
          End Session
        </button>
      )}
    </div>
  )
}
