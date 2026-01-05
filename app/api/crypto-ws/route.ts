import { NextRequest } from "next/server"

export const runtime = "edge"
export const dynamic = "force-dynamic"

const BINANCE_WS = "wss://fstream.binance.com/stream?streams=btcusdt@ticker/ethusdt@ticker"

interface BinanceTickerData {
  s: string // Symbol
  c: string // Current price
  P: string // Price change percent
  h: string // High price
  l: string // Low price
  q: string // Quote volume
}

interface CryptoPrice {
  symbol: string
  price: number
  change24h: number
  high24h: number
  low24h: number
  volume: number
  timestamp: number
}

// 缓存最新价格数据
let cachedPrices: Map<string, CryptoPrice> = new Map()
let lastUpdate = 0

// 初始化 WebSocket 连接（仅在第一次请求时）
let ws: WebSocket | null = null
let isConnecting = false

function connectWebSocket() {
  if (ws || isConnecting) return

  isConnecting = true

  try {
    ws = new WebSocket(BINANCE_WS)

    ws.onopen = () => {
      console.log("[Crypto WS] Connected to Binance")
      isConnecting = false
    }

    ws.onmessage = (event) => {
      try {
        const message = JSON.parse(event.data)
        const data: BinanceTickerData = message.data

        if (data && data.s) {
          const symbol = data.s.replace("USDT", "")
          cachedPrices.set(symbol, {
            symbol,
            price: parseFloat(data.c),
            change24h: parseFloat(data.P),
            high24h: parseFloat(data.h),
            low24h: parseFloat(data.l),
            volume: parseFloat(data.q),
            timestamp: Date.now(),
          })
          lastUpdate = Date.now()
        }
      } catch (error) {
        console.error("[Crypto WS] Parse error:", error)
      }
    }

    ws.onerror = (error) => {
      console.error("[Crypto WS] Error:", error)
      isConnecting = false
    }

    ws.onclose = () => {
      console.log("[Crypto WS] Disconnected, reconnecting in 3s...")
      ws = null
      isConnecting = false
      setTimeout(connectWebSocket, 3000)
    }
  } catch (error) {
    console.error("[Crypto WS] Connection error:", error)
    isConnecting = false
  }
}

export async function GET(request: NextRequest) {
  // 启动 WebSocket 连接（如果还没有）
  if (!ws && !isConnecting) {
    connectWebSocket()
  }

  // 如果有缓存数据且不超过 5 秒，直接返回
  if (cachedPrices.size > 0 && Date.now() - lastUpdate < 5000) {
    const prices = Array.from(cachedPrices.values())
    return new Response(JSON.stringify(prices), {
      headers: {
        "Content-Type": "application/json",
        "Cache-Control": "no-cache, no-store, must-revalidate",
        "Access-Control-Allow-Origin": "*",
      },
    })
  }

  // 如果没有缓存或缓存过期，等待最多 3 秒获取新数据
  const startTime = Date.now()
  while (cachedPrices.size === 0 && Date.now() - startTime < 3000) {
    await new Promise((resolve) => setTimeout(resolve, 100))
  }

  if (cachedPrices.size > 0) {
    const prices = Array.from(cachedPrices.values())
    return new Response(JSON.stringify(prices), {
      headers: {
        "Content-Type": "application/json",
        "Cache-Control": "no-cache, no-store, must-revalidate",
        "Access-Control-Allow-Origin": "*",
      },
    })
  }

  // 如果仍然没有数据，返回初始占位数据
  const fallbackPrices: CryptoPrice[] = [
    {
      symbol: "BTC",
      price: 94000,
      change24h: 0,
      high24h: 94500,
      low24h: 93500,
      volume: 0,
      timestamp: Date.now(),
    },
    {
      symbol: "ETH",
      price: 3200,
      change24h: 0,
      high24h: 3250,
      low24h: 3150,
      volume: 0,
      timestamp: Date.now(),
    },
  ]

  return new Response(JSON.stringify(fallbackPrices), {
    headers: {
      "Content-Type": "application/json",
      "Cache-Control": "no-cache, no-store, must-revalidate",
      "Access-Control-Allow-Origin": "*",
    },
  })
}
