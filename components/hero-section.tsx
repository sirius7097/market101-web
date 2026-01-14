"use client"

import { useEffect, useState, useRef, useCallback } from "react"
import { CryptoPricePanel } from "./crypto-price-panel"
import { Tilt3DCard } from "./tilt-3d-card"
import { useTypingSound } from "@/hooks/use-typing-sound"
import type { JSX } from "react"

const codeContent = `// MARKET101 Trading Engine v2.0
// MARKET101 TERMINAL v2.0

import { KAIYANG, ALPHA DOJO } from '@market101/strategies'

const engine = new TradingEngine({
  mode: 'autonomous',
  strategies: [KAIYANG, ALPHA DOJO],
  riskLevel: 'calculated',
  status: 'ACTIVE'
})

await engine.initialize()
// >> Engine initialized successfully
// >> Monitoring 500+ trading pairs...
// >> Ready for trading signals
// >> System online`

function highlightCode(text: string): JSX.Element[] {
  const lines = text.split("\n")

  return lines.map((line, lineIndex) => {
    if (line.includes("System online")) {
      return (
        <span key={lineIndex} className="text-green-400">
          {line}
        </span>
      )
    }

    // 保持绿色，内容白色
    if (line.startsWith("// >>")) {
      const slashPart = "// >>"
      const contentPart = line.slice(slashPart.length)
      return (
        <span key={lineIndex}>
          <span className="text-green-400/70">{slashPart}</span>
          <span className="text-white">{contentPart}</span>
        </span>
      )
    }

    // 普通注释 - 灰色
    if (line.startsWith("//")) {
      return (
        <span key={lineIndex} className="text-muted-foreground/50">
          {line}
        </span>
      )
    }

    const tokens: JSX.Element[] = []
    let remaining = line
    let keyIndex = 0

    while (remaining.length > 0) {
      if (remaining.startsWith("KAIYANG")) {
        tokens.push(
          <span key={`${lineIndex}-${keyIndex++}`} className="text-yellow-500 font-bold">
            KAIYANG
          </span>,
        )
        remaining = remaining.slice("KAIYANG".length)
        continue
      }

      if (remaining.startsWith("ALPHA DOJO")) {
        tokens.push(
          <span key={`${lineIndex}-${keyIndex++}`} className="text-cyan-400 font-bold">
            ALPHA DOJO
          </span>,
        )
        remaining = remaining.slice("ALPHA DOJO".length)
        continue
      }

      const stringMatch = remaining.match(/^('[^']*'|"[^"]*")/)
      if (stringMatch) {
        tokens.push(
          <span key={`${lineIndex}-${keyIndex++}`} className="text-white">
            {stringMatch[0]}
          </span>,
        )
        remaining = remaining.slice(stringMatch[0].length)
        continue
      }

      // 只高亮 import/from/const/await - 粉色
      const keywordMatch = remaining.match(/^(import|from|const|await)\b/)
      if (keywordMatch) {
        tokens.push(
          <span key={`${lineIndex}-${keyIndex++}`} className="text-pink-400">
            {keywordMatch[0]}
          </span>,
        )
        remaining = remaining.slice(keywordMatch[0].length)
        continue
      }

      if (remaining.startsWith("TradingEngine")) {
        tokens.push(
          <span key={`${lineIndex}-${keyIndex++}`} className="text-white">
            TradingEngine
          </span>,
        )
        remaining = remaining.slice("TradingEngine".length)
        continue
      }

      // 其他所有字符 - 普通白色
      tokens.push(
        <span key={`${lineIndex}-${keyIndex++}`} className="text-foreground/90">
          {remaining[0]}
        </span>,
      )
      remaining = remaining.slice(1)
    }

    return <span key={lineIndex}>{tokens}</span>
  })
}

export function HeroSection() {
  const [displayedText, setDisplayedText] = useState("")
  const [cursorVisible, setCursorVisible] = useState(true)
  const [isTypingComplete, setIsTypingComplete] = useState(false)
  const { playTypeSound, playEnterSound } = useTypingSound()
  const hasStartedRef = useRef(false)

  const triggerVibration = useCallback((duration = 10) => {
    // 检查是否为手机端且支持震动 API
    if (typeof navigator !== "undefined" && navigator.vibrate) {
      try {
        navigator.vibrate(duration)
      } catch (e) {
        // 静默处理不支持震动的情况
      }
    }
  }, [])

  useEffect(() => {
    if (displayedText.length < codeContent.length) {
      const char = codeContent[displayedText.length]
      const delay = char === "\n" ? 300 : 30 + Math.random() * 50
      const timer = setTimeout(() => {
        setDisplayedText(codeContent.slice(0, displayedText.length + 1))
        if (char === "\n") {
          playEnterSound()
          triggerVibration(15)
        } else if (char !== " ") {
          playTypeSound()
          triggerVibration(5)
        }
      }, delay)
      return () => clearTimeout(timer)
    } else {
      setIsTypingComplete(true)
    }
  }, [displayedText, playTypeSound, playEnterSound, triggerVibration])

  useEffect(() => {
    const interval = setInterval(() => {
      setCursorVisible((v) => !v)
    }, 530)
    return () => clearInterval(interval)
  }, [])

  const lines = displayedText.split("\n")
  const highlightedLines = highlightCode(displayedText)

  return (
    <section className="relative min-h-screen flex items-center justify-center pt-14 overflow-hidden scanline-overlay">
      <div className="container mx-auto px-4 py-12 md:py-20">
        <div className="text-center mb-8 md:mb-12">
          <h1
            className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-bold tracking-tight text-foreground mb-4"
            style={{
              textShadow: "0 0 40px rgba(255,255,255,0.15), 0 0 80px rgba(255,255,255,0.05)",
            }}
          >
            MARKET101
          </h1>
          <p className="text-muted-foreground text-base sm:text-lg md:text-xl tracking-widest">
            MARKET101 TERMINAL // Trading Engine v2.0
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-4 md:gap-6 max-w-6xl mx-auto items-start">
          <Tilt3DCard
            className="terminal-window rounded flex-1 min-w-0"
            maxRotation={6}
            perspective={1000}
            hoverScale={1.01}
          >
            <div className="terminal-header px-3 md:px-4 py-2 flex items-center gap-2">
              <div className="flex gap-1.5">
                <span className="w-2.5 h-2.5 md:w-3 md:h-3 rounded-full bg-muted-foreground/40" />
                <span className="w-2.5 h-2.5 md:w-3 md:h-3 rounded-full bg-muted-foreground/60" />
                <span className="w-2.5 h-2.5 md:w-3 md:h-3 rounded-full bg-foreground/80" />
              </div>
              <span className="text-[10px] md:text-xs text-muted-foreground ml-2 truncate">
                Discipline. Precision. Alpha.
              </span>
            </div>

            <div className="p-3 md:p-6 text-xs md:text-sm lg:text-base overflow-x-auto font-mono">
              {lines.map((line, i) => (
                <div key={i} className="flex">
                  <span className="text-muted-foreground/50 w-5 md:w-6 text-right mr-2 md:mr-4 select-none text-[10px] md:text-xs flex-shrink-0">
                    {i + 1}
                  </span>
                  <code className="flex-1 whitespace-pre overflow-hidden text-ellipsis">
                    {highlightedLines[i]}
                    {i === lines.length - 1 && !isTypingComplete && (
                      <span
                        className={`inline-block w-1.5 md:w-2 h-3 md:h-4 bg-foreground ml-0.5 align-middle ${cursorVisible ? "opacity-100" : "opacity-0"}`}
                      />
                    )}
                  </code>
                </div>
              ))}
              {isTypingComplete && (
                <div className="flex mt-2">
                  <span className="text-muted-foreground/50 w-5 md:w-6 text-right mr-2 md:mr-4 select-none text-[10px] md:text-xs flex-shrink-0">
                    {lines.length + 1}
                  </span>
                  <code className="flex items-center">
                    <span className="text-foreground">{">"}</span>
                    <span
                      className={`w-1.5 md:w-2 h-3 md:h-4 bg-foreground ml-1 ${cursorVisible ? "opacity-100" : "opacity-0"}`}
                    />
                  </code>
                </div>
              )}
            </div>
          </Tilt3DCard>

          <div className="w-full lg:w-64 flex-shrink-0">
            <CryptoPricePanel />
          </div>
        </div>

        {/* Stats - improved mobile grid */}
        <div className="mt-8 md:mt-12 grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-4 max-w-3xl mx-auto">
          {[
            { label: "STRATEGIES", value: "02" },
            { label: "PAIRS_MONITORED", value: "500+" },
            { label: "UPTIME", value: "99.5%" },
            { label: "STABLE_DAYS", value: "270+" },
          ].map((stat) => (
            <div key={stat.label} className="border border-border p-2 md:p-3 text-center bg-card/50">
              <div className="text-[10px] md:text-xs text-muted-foreground mb-1 truncate">{stat.label}</div>
              <div className="text-lg md:text-xl text-foreground font-bold">{stat.value}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
