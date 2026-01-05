"use client"

import type React from "react"
import { useTilt3D } from "@/hooks/use-tilt-3d"

interface Tilt3DCardProps {
  children: React.ReactNode
  className?: string
  maxRotation?: number
  perspective?: number
  hoverScale?: number
  disabled?: boolean
}

export function Tilt3DCard({
  children,
  className = "",
  maxRotation = 6,
  perspective = 1000,
  hoverScale = 1.01,
  disabled = false,
}: Tilt3DCardProps) {
  const { ref, style, handlers } = useTilt3D({
    maxRotation,
    perspective,
    hoverScale,
    disabled,
  })

  return (
    <div ref={ref} className={className} style={style} {...handlers}>
      {children}
    </div>
  )
}
