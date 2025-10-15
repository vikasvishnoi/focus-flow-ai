'use client'

import { useParams } from 'next/navigation'
import GameCanvas from '@/components/GameCanvas'

export default function GamePage() {
  const params = useParams()
  const level = params.level as string

  return <GameCanvas level={level} />
}
