'use client'

import Link from 'next/link'
import styles from './dashboard.module.css'

export default function Dashboard() {
  return (
    <main className={styles.main}>
      <div className={styles.container}>
        <h1 className={styles.title}>Progress Dashboard</h1>
        <p className={styles.subtitle}>Coming soon: AI-powered insights and reports</p>
        
        <div className={styles.placeholder}>
          <p>This dashboard will display:</p>
          <ul>
            <li>Session history</li>
            <li>Performance metrics</li>
            <li>AI-generated progress reports</li>
            <li>Tracking accuracy scores</li>
          </ul>
        </div>

        <Link href="/" className={styles.backButton}>
          Back to Home
        </Link>
      </div>
    </main>
  )
}
