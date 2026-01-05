"use client"

import { useRef, useCallback } from "react"

export function useTypingSound() {
  const audioContextRef = useRef<AudioContext | null>(null)

  const getContext = useCallback(() => {
    if (!audioContextRef.current) {
      audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)()
    }
    return audioContextRef.current
  }, [])

  const playTypeSound = useCallback(() => {
    try {
      const ctx = getContext()
      const now = ctx.currentTime

      // 深沉的低频 - 超低音
      const bassOsc = ctx.createOscillator()
      const bassGain = ctx.createGain()
      bassOsc.type = "sine"
      bassOsc.frequency.setValueAtTime(45, now)
      bassOsc.frequency.exponentialRampToValueAtTime(20, now + 0.12)
      bassGain.gain.setValueAtTime(0.8, now)
      bassGain.gain.exponentialRampToValueAtTime(0.001, now + 0.15)

      // 次低频层 - 增加温暖厚度
      const subOsc = ctx.createOscillator()
      const subGain = ctx.createGain()
      subOsc.type = "sine"
      subOsc.frequency.value = 80
      subGain.gain.setValueAtTime(0.2, now)
      subGain.gain.exponentialRampToValueAtTime(0.001, now + 0.08)

      // 低通滤波 - 完全去除高频
      const lowpass = ctx.createBiquadFilter()
      lowpass.type = "lowpass"
      lowpass.frequency.value = 200

      const masterGain = ctx.createGain()
      masterGain.gain.value = 2.0

      bassOsc.connect(bassGain)
      subOsc.connect(subGain)
      bassGain.connect(lowpass)
      subGain.connect(lowpass)
      lowpass.connect(masterGain)
      masterGain.connect(ctx.destination)

      bassOsc.start(now)
      subOsc.start(now)
      bassOsc.stop(now + 0.18)
      subOsc.stop(now + 0.1)
    } catch {
      // Silently fail
    }
  }, [getContext])

  const playEnterSound = useCallback(() => {
    playTypeSound()
  }, [playTypeSound])

  return { playTypeSound, playEnterSound }
}
