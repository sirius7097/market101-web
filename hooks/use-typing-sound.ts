"use client"

import { useRef, useCallback, useEffect } from "react"

export function useTypingSound() {
  const audioContextRef = useRef<AudioContext | null>(null)
  const masterGainRef = useRef<GainNode | null>(null)

  // 初始化 AudioContext
  const initContext = useCallback(() => {
    if (typeof window === "undefined") return null
    
    if (!audioContextRef.current) {
      const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext
      if (!AudioContextClass) return null
      
      const ctx = new AudioContextClass()
      audioContextRef.current = ctx
      
      // 创建一个持久的 Master Gain 节点
      const masterGain = ctx.createGain()
      masterGain.gain.value = 2.0
      masterGain.connect(ctx.destination)
      masterGainRef.current = masterGain
    }
    
    // 如果处于挂起状态，尝试恢复
    if (audioContextRef.current.state === "suspended") {
      audioContextRef.current.resume()
    }
    
    return audioContextRef.current
  }, [])

  // 页面加载时尝试初始化（虽然可能被浏览器拦截，但能减少后续延迟）
  useEffect(() => {
    const handleInteraction = () => {
      initContext()
      // 移除监听器，只需一次交互即可激活
      window.removeEventListener("mousedown", handleInteraction)
      window.removeEventListener("keydown", handleInteraction)
      window.removeEventListener("touchstart", handleInteraction)
    }

    window.addEventListener("mousedown", handleInteraction)
    window.addEventListener("keydown", handleInteraction)
    window.addEventListener("touchstart", handleInteraction)

    return () => {
      window.removeEventListener("mousedown", handleInteraction)
      window.removeEventListener("keydown", handleInteraction)
      window.removeEventListener("touchstart", handleInteraction)
    }
  }, [initContext])

  const playTypeSound = useCallback(() => {
    try {
      const ctx = initContext()
      if (!ctx || !masterGainRef.current) return
      
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

      bassOsc.connect(bassGain)
      subOsc.connect(subGain)
      bassGain.connect(lowpass)
      subGain.connect(lowpass)
      lowpass.connect(masterGainRef.current)

      bassOsc.start(now)
      subOsc.start(now)
      bassOsc.stop(now + 0.18)
      subOsc.stop(now + 0.1)
    } catch (e) {
      // Silently fail
    }
  }, [initContext])

  const playEnterSound = useCallback(() => {
    playTypeSound()
  }, [playTypeSound])

  return { playTypeSound, playEnterSound }
}
