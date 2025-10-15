interface GazeData {
  timestamp: number
  gazeX: number
  gazeY: number
}

type GazeCallback = (data: GazeData) => void

export class EyeTracker {
  private webgazer: any = null
  private isInitialized = false
  private callback: GazeCallback | null = null

  async initialize(): Promise<void> {
    if (typeof window === 'undefined') return

    try {
      // Dynamically import webgazer
      const webgazerModule = await import('webgazer')
      this.webgazer = webgazerModule.default

      // Initialize webgazer
      await this.webgazer
        .setGazeListener((data: any, timestamp: number) => {
          if (data && this.callback) {
            this.callback({
              timestamp,
              gazeX: data.x,
              gazeY: data.y
            })
          }
        })
        .begin()

      // Show calibration points
      this.webgazer.showPredictionPoints(true)

      // Wait for calibration
      await new Promise(resolve => setTimeout(resolve, 3000))

      this.isInitialized = true
    } catch (error) {
      console.error('Failed to initialize eye tracker:', error)
      throw error
    }
  }

  startTracking(callback: GazeCallback) {
    this.callback = callback
    if (this.webgazer) {
      this.webgazer.resume()
      // Hide prediction points during actual game
      this.webgazer.showPredictionPoints(false)
    }
  }

  stop() {
    if (this.webgazer) {
      this.webgazer.pause()
      this.callback = null
    }
  }

  async cleanup() {
    if (this.webgazer) {
      await this.webgazer.end()
      this.isInitialized = false
    }
  }
}
