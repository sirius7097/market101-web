"use client"

import { useEffect, useState, useRef, useCallback } from "react"
import { TrendingUp, TrendingDown, RefreshCw, Wifi, WifiOff } from "lucide-react"
import { Tilt3DCard } from "./tilt-3d-card"

interface CryptoPrice {
  symbol: string
  price: number
  change24h: number
  high24h: number
  low24h: number
  volume: number
}

interface StrategyRecord {
  id: number
  analyst: string
  analystColor: string // 添加颜色字段
  symbol: string
  direction: "LONG" | "SHORT"
  entry: number
  target: number
  profit: number
  profitUsd?: number
}

const STRATEGY_RECORDS: StrategyRecord[] = [
  {
    id: 1,
    analyst: "KAIYANG",
    analystColor: "text-yellow-500",
    symbol: "ETH",
    direction: "LONG",
    entry: 2971,
    target: 3200,
    profit: 7.71,
    profitUsd: 229,
  },
  {
    id: 2,
    analyst: "KAIYANG",
    analystColor: "text-yellow-500",
    symbol: "BTC",
    direction: "LONG",
    entry: 89490,
    target: 93000,
    profit: 3.92,
    profitUsd: 3510,
  },
  {
    id: 3,
    analyst: "ALPHA DOJO",
    analystColor: "text-cyan-400",
    symbol: "SQD",
    direction: "LONG",
    entry: 0.0583,
    target: 0.09,
    profit: 54.37,
  },
]

const BINANCE_FUTURES_WS = "wss://fstream.binance.com/stream?streams=btcusdt@ticker/ethusdt@ticker"

export function CryptoPricePanel() {
  const [prices, setPrices] = useState<Map<string, CryptoPrice>>(() => {
    // 初始占位数据，避免长时间空白
    const initial = new Map<string, CryptoPrice>()
    initial.set('BTC', { symbol: 'BTC', price: 94000, change24h: 0, high24h: 94500, low24h: 93500, volume: 0 })
    initial.set('ETH', { symbol: 'ETH', price: 3200, change24h: 0, high24h: 3250, low24h: 3150, volume: 0 })
    return initial
  })
  const [connected, setConnected] = useState(false)
  const [connecting, setConnecting] = useState(true)
  const wsRef = useRef<WebSocket | null>(null)
  const reconnectTimeoutRef = useRef<NodeJS.Timeout | null>(null)

  const connectWebSocket = useCallback(() => {
    if (wsRef.current) {
      wsRef.current.close()
    }

    setConnecting(true)

    const ws = new WebSocket(BINANCE_FUTURES_WS)

    ws.onopen = () => {
      setConnected(true)
      setConnecting(false)
    }

    ws.onmessage = (event) => {
      try {
        const message = JSON.parse(event.data)
        const data = message.data

        if (data && data.s) {
          const symbol = data.s.replace("USDT", "")

          setPrices((prev) => {
            const newPrices = new Map(prev)
            newPrices.set(symbol, {
              symbol,
              price: Number.parseFloat(data.c),
              change24h: Number.parseFloat(data.P),
              high24h: Number.parseFloat(data.h),
              low24h: Number.parseFloat(data.l),
              volume: Number.parseFloat(data.q),
            })
            return newPrices
          })
        }
      } catch (error) {
        console.error("Parse error:", error)
      }
    }

    ws.onerror = () => {
      setConnected(false)
      setConnecting(false)
    }

    ws.onclose = () => {
      setConnected(false)
      setConnecting(false)

      reconnectTimeoutRef.current = setTimeout(() => {
        connectWebSocket()
      }, 2000)
    }

    wsRef.current = ws
  }, [])

  useEffect(() => {
    connectWebSocket()

    return () => {
      if (wsRef.current) {
        wsRef.current.close()
      }
      if (reconnectTimeoutRef.current) {
        clearTimeout(reconnectTimeoutRef.current)
      }
    }
  }, [connectWebSocket])

  const priceList = Array.from(prices.values()).sort((a, b) => {
    const order = ["BTC", "ETH"]
    return order.indexOf(a.symbol) - order.indexOf(b.symbol)
  })

  const getStatusDisplay = () => {
    if (connected && priceList.length > 0) return { text: "LIVE", color: "text-green-400", icon: Wifi }
    if (connecting) return { text: "...", color: "text-yellow-400", icon: RefreshCw }
    return { text: "OFFLINE", color: "text-red-400", icon: WifiOff }
  }

  const status = getStatusDisplay()
  const StatusIcon = status.icon

  return (
    <div className="flex flex-row lg:flex-col gap-2 md:gap-3 h-full">
      <Tilt3DCard
        className="terminal-window rounded flex-1 lg:flex-none w-full"
        maxRotation={8}
        perspective={800}
        hoverScale={1.02}
      >
        <div className="terminal-header px-2 md:px-3 py-1 md:py-1.5 flex items-center justify-between">
          <div className="flex items-center gap-1 md:gap-2">
            <div className="flex gap-0.5 md:gap-1">
              <span className="w-1 h-1 md:w-1.5 md:h-1.5 rounded-full bg-muted-foreground/40" />
              <span className="w-1 h-1 md:w-1.5 md:h-1.5 rounded-full bg-muted-foreground/60" />
            </div>
            <span className="text-[8px] md:text-[10px] text-muted-foreground">PERP_FUTURES</span>
          </div>
          <div className="flex items-center gap-0.5 md:gap-1">
            <StatusIcon className={`w-2 h-2 md:w-2.5 md:h-2.5 ${status.color} ${connecting ? "animate-spin" : ""}`} />
            <span className={`text-[8px] md:text-[9px] ${status.color}`}>{status.text}</span>
          </div>
        </div>

        <div className="p-2 md:p-2.5 space-y-1.5 md:space-y-2">
          {priceList.length === 0 ? (
            <div className="text-center text-muted-foreground py-3 md:py-4">
              <RefreshCw className="w-3 h-3 md:w-4 md:h-4 animate-spin mx-auto mb-1" />
              <span className="text-[9px] md:text-[10px]">{connecting ? "CONNECTING..." : "RECONNECTING..."}</span>
            </div>
          ) : (
            priceList.map((crypto) => (
              <div key={crypto.symbol} className="border border-border p-1.5 md:p-2 bg-card/30">
                <div className="flex items-center justify-between mb-0.5 md:mb-1">
                  <div className="flex items-center gap-1 md:gap-1.5">
                    <span className="text-xs md:text-sm font-bold text-foreground">{crypto.symbol}</span>
                    <span className="text-[7px] md:text-[8px] text-muted-foreground/60">PERP</span>
                  </div>
                  <div
                    className={`flex items-center gap-0.5 text-[9px] md:text-[10px] font-mono ${
                      crypto.change24h >= 0 ? "text-green-400" : "text-red-400"
                    }`}
                  >
                    {crypto.change24h >= 0 ? (
                      <TrendingUp className="w-2 h-2 md:w-2.5 md:h-2.5" />
                    ) : (
                      <TrendingDown className="w-2 h-2 md:w-2.5 md:h-2.5" />
                    )}
                    <span>
                      {crypto.change24h >= 0 ? "+" : ""}
                      {crypto.change24h.toFixed(2)}%
                    </span>
                  </div>
                </div>

                <div className="text-base md:text-lg font-bold text-foreground mb-1 md:mb-1.5 font-mono">
                  ${crypto.price.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </div>

                <div className="grid grid-cols-3 gap-0.5 md:gap-1 text-[7px] md:text-[8px]">
                  <div>
                    <span className="text-muted-foreground/60">H</span>
                    <div className="text-green-400/80 font-mono">
                      {crypto.high24h.toLocaleString("en-US", { maximumFractionDigits: 0 })}
                    </div>
                  </div>
                  <div>
                    <span className="text-muted-foreground/60">L</span>
                    <div className="text-red-400/80 font-mono">
                      {crypto.low24h.toLocaleString("en-US", { maximumFractionDigits: 0 })}
                    </div>
                  </div>
                  <div>
                    <span className="text-muted-foreground/60">V</span>
                    <div className="text-foreground/80 font-mono">
                      {crypto.volume >= 1e9
                        ? `${(crypto.volume / 1e9).toFixed(1)}B`
                        : `${(crypto.volume / 1e6).toFixed(0)}M`}
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </Tilt3DCard>

      <Tilt3DCard
        className="terminal-window rounded flex-1 flex flex-col w-full"
        maxRotation={8}
        perspective={800}
        hoverScale={1.02}
      >
        <div className="terminal-header px-2 md:px-3 py-1 md:py-1.5 flex items-center justify-between">
          <div className="flex items-center gap-1 md:gap-2">
            <div className="flex gap-0.5 md:gap-1">
              <span className="w-1 h-1 md:w-1.5 md:h-1.5 rounded-full bg-muted-foreground/40" />
              <span className="w-1 h-1 md:w-1.5 md:h-1.5 rounded-full bg-muted-foreground/60" />
            </div>
            <span className="text-[8px] md:text-[10px] text-muted-foreground">RECENT_RECORDS</span>
          </div>
          <div className="flex items-center gap-0.5 md:gap-1">
            <Wifi className="w-2 h-2 md:w-2.5 md:h-2.5 text-green-400" />
            <span className="text-[8px] md:text-[9px] text-green-400">LIVE</span>
          </div>
        </div>

        <div className="p-2 md:p-2.5 space-y-1.5 md:space-y-2 flex-1">
          {STRATEGY_RECORDS.map((record) => (
            <div key={record.id} className="border border-border p-1.5 md:p-2 bg-card/30">
              <div className="flex items-center justify-between mb-0.5 md:mb-1">
                <div className="flex items-center gap-1 md:gap-1.5">
                  <span className={`text-[9px] md:text-[10px] font-bold ${record.analystColor}`}>{record.analyst}</span>
                  <span className="text-[10px] md:text-xs font-bold text-foreground">{record.symbol}</span>
                  <span
                    className={`text-[7px] md:text-[8px] px-0.5 md:px-1 py-0.5 rounded ${
                      record.direction === "LONG" ? "bg-green-500/20 text-green-400" : "bg-red-500/20 text-red-400"
                    }`}
                  >
                    {record.direction}
                  </span>
                </div>
                <div className="text-green-400 font-mono text-[9px] md:text-[10px] font-bold">
                  +{record.profit.toFixed(2)}%
                </div>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1 md:gap-1.5 text-[9px] md:text-[10px] font-mono text-white">
                  <span>{record.entry < 1 ? record.entry.toFixed(4) : record.entry.toLocaleString()}</span>
                  <span className="text-foreground/40">→</span>
                  <span>{record.target < 1 ? record.target.toFixed(4) : record.target.toLocaleString()}</span>
                </div>
                {record.profitUsd && (
                  <div className="text-white font-mono text-[10px] md:text-xs font-medium">
                    +${record.profitUsd.toLocaleString()}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </Tilt3DCard>
    </div>
  )
}
