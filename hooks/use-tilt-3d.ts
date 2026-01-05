"use client"

import type React from "react"

import { useRef, useState, useEffect, useCallback } from "react"
import { useIsMobile } from "./use-mobile"

interface Tilt3DOptions {
  maxRotation?: number
  perspective?: number
  hoverScale?: number
  lerpFactor?: number
  disabled?: boolean
}

interface Tilt3DReturn {
  ref: React.RefObject<HTMLDivElement>
  style: React.CSSProperties
  handlers: {
    onMouseMove: (e: React.MouseEvent<HTMLDivElement>) => void
    onMouseEnter: () => void
    onMouseLeave: () => void
  }
}

export function useTilt3D(options: Tilt3DOptions = {}): Tilt3DReturn {
  const { maxRotation = 6, perspective = 1000, hoverScale = 1.01, lerpFactor = 0.08, disabled = false } = options

  const cardRef = useRef<HTMLDivElement>(null)
  const [tilt, setTilt] = useState({ x: 0, y: 0 })
  const [isHovering, setIsHovering] = useState(false)
  const animationRef = useRef<number | null>(null)
  const targetTilt = useRef({ x: 0, y: 0 })
  const isMobile = useIsMobile()

  // Disable 3D effects on mobile for performance
  const isDisabled = disabled || isMobile

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (isDisabled || !cardRef.current) return
      const rect = cardRef.current.getBoundingClientRect()
      const centerX = rect.left + rect.width / 2
      const centerY = rect.top + rect.height / 2

      const rotateX = ((e.clientY - centerY) / (rect.height / 2)) * -maxRotation
      const rotateY = ((e.clientX - centerX) / (rect.width / 2)) * maxRotation

      targetTilt.current = { x: rotateX, y: rotateY }
    },
    [isDisabled, maxRotation],
  )

  const handleMouseEnter = useCallback(() => {
    if (!isDisabled) setIsHovering(true)
  }, [isDisabled])

  const handleMouseLeave = useCallback(() => {
    setIsHovering(false)
    targetTilt.current = { x: 0, y: 0 }
  }, [])

  useEffect(() => {
    if (isDisabled) {
      setTilt({ x: 0, y: 0 })
      return
    }

    const animate = () => {
      setTilt((prev) => {
        const factor = isHovering ? lerpFactor : lerpFactor * 0.6
        const newX = prev.x + (targetTilt.current.x - prev.x) * factor
        const newY = prev.y + (targetTilt.current.y - prev.y) * factor
        // Stop animating if values are very small
        if (Math.abs(newX) < 0.01 && Math.abs(newY) < 0.01 && !isHovering) {
          return { x: 0, y: 0 }
        }
        return { x: newX, y: newY }
      })
      animationRef.current = requestAnimationFrame(animate)
    }
    animationRef.current = requestAnimationFrame(animate)
    return () => {
      if (animationRef.current) cancelAnimationFrame(animationRef.current)
    }
  }, [isHovering, isDisabled, lerpFactor])

  const style: React.CSSProperties = isDisabled
    ? {}
    : {
        transform: `perspective(${perspective}px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg) scale(${isHovering ? hoverScale : 1})`,
        transformStyle: "preserve-3d",
        transition: "box-shadow 0.3s ease",
        boxShadow: isHovering
          ? `${-tilt.y * 2}px ${tilt.x * 2}px 30px rgba(0,0,0,0.35), 0 0 50px rgba(255,255,255,0.02)`
          : `0 6px 20px rgba(0,0,0,0.2), 0 0 25px rgba(255,255,255,0.01)`,
      }

  return {
    ref: cardRef,
    style,
    handlers: {
      onMouseMove: handleMouseMove,
      onMouseEnter: handleMouseEnter,
      onMouseLeave: handleMouseLeave,
    },
  }
}
