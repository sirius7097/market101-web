import { NextRequest } from "next/server"

export const runtime = "edge"
export const dynamic = "force-dynamic"

interface CryptoPrice {
  symbol: string
  price: number
  change24h: number
  high24h: number
  low24h: number
  volume: number
  timestamp: number
}

// 缓存数据
let cachedPrices: CryptoPrice[] = []
let lastFetchTime = 0
const CACHE_DURATION = 5000 // 5 秒缓存

async function fetchFromCoinbase(): Promise<CryptoPrice[]> {
  try {
    // 使用 Coinbase API 获取实时价格
    const [btcResponse, ethResponse] = await Promise.all([
      fetch("https://api.coinbase.com/v2/prices/BTC-USD/spot", {
        headers: { Accept: "application/json" },
      }),
      fetch("https://api.coinbase.com/v2/prices/ETH-USD/spot", {
        headers: { Accept: "application/json" },
      }),
    ])

    if (!btcResponse.ok || !ethResponse.ok) {
      throw new Error("Coinbase API error")
    }

    const btcData = await btcResponse.json()
    const ethData = await ethResponse.json()

    const prices: CryptoPrice[] = []

    if (btcData.data && btcData.data.amount) {
      const btcPrice = parseFloat(btcData.data.amount)
      prices.push({
        symbol: "BTC",
        price: btcPrice,
        change24h: 0, // Coinbase spot API 不提供 24h 变化
        high24h: btcPrice * 1.01,
        low24h: btcPrice * 0.99,
        volume: 0,
        timestamp: Date.now(),
      })
    }

    if (ethData.data && ethData.data.amount) {
      const ethPrice = parseFloat(ethData.data.amount)
      prices.push({
        symbol: "ETH",
        price: ethPrice,
        change24h: 0,
        high24h: ethPrice * 1.01,
        low24h: ethPrice * 0.99,
        volume: 0,
        timestamp: Date.now(),
      })
    }

    return prices
  } catch (error) {
    console.error("[Crypto API] Coinbase fetch error:", error)
    throw error
  }
}

export async function GET(request: NextRequest) {
  const now = Date.now()

  // 如果缓存有效，直接返回
  if (cachedPrices.length > 0 && now - lastFetchTime < CACHE_DURATION) {
    return new Response(JSON.stringify(cachedPrices), {
      headers: {
        "Content-Type": "application/json",
        "Cache-Control": "public, s-maxage=5, stale-while-revalidate=10",
        "Access-Control-Allow-Origin": "*",
      },
    })
  }

  try {
    // 获取新数据
    const prices = await fetchFromCoinbase()

    if (prices.length > 0) {
      cachedPrices = prices
      lastFetchTime = now
    }

    return new Response(JSON.stringify(prices), {
      headers: {
        "Content-Type": "application/json",
        "Cache-Control": "public, s-maxage=5, stale-while-revalidate=10",
        "Access-Control-Allow-Origin": "*",
      },
    })
  } catch (error) {
    // 如果有缓存，返回旧数据
    if (cachedPrices.length > 0) {
      return new Response(JSON.stringify(cachedPrices), {
        headers: {
          "Content-Type": "application/json",
          "Cache-Control": "public, s-maxage=5, stale-while-revalidate=10",
          "Access-Control-Allow-Origin": "*",
          "X-Cache": "STALE",
        },
      })
    }

    // 返回占位数据
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
        "Cache-Control": "public, s-maxage=5, stale-while-revalidate=10",
        "Access-Control-Allow-Origin": "*",
        "X-Cache": "FALLBACK",
      },
    })
  }
}
