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
const CACHE_DURATION = 10000 // 10 秒缓存

async function fetchFromCoinGecko(): Promise<CryptoPrice[]> {
  try {
    // 使用 CoinGecko 的免费 API
    const response = await fetch(
      "https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ethereum&vs_currencies=usd&include_24hr_vol=true&include_24hr_change=true&include_last_updated_at=true",
      {
        headers: {
          Accept: "application/json",
        },
      }
    )

    if (!response.ok) {
      throw new Error(`CoinGecko API error: ${response.status}`)
    }

    const data = await response.json()

    const prices: CryptoPrice[] = []

    if (data.bitcoin) {
      prices.push({
        symbol: "BTC",
        price: data.bitcoin.usd || 0,
        change24h: data.bitcoin.usd_24h_change || 0,
        high24h: data.bitcoin.usd * 1.01, // 估算高点
        low24h: data.bitcoin.usd * 0.99, // 估算低点
        volume: data.bitcoin.usd_24h_vol || 0,
        timestamp: (data.bitcoin.last_updated_at || Date.now() / 1000) * 1000,
      })
    }

    if (data.ethereum) {
      prices.push({
        symbol: "ETH",
        price: data.ethereum.usd || 0,
        change24h: data.ethereum.usd_24h_change || 0,
        high24h: data.ethereum.usd * 1.01,
        low24h: data.ethereum.usd * 0.99,
        volume: data.ethereum.usd_24h_vol || 0,
        timestamp: (data.ethereum.last_updated_at || Date.now() / 1000) * 1000,
      })
    }

    return prices
  } catch (error) {
    console.error("[Crypto API] CoinGecko fetch error:", error)
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
        "Cache-Control": "public, s-maxage=10, stale-while-revalidate=30",
        "Access-Control-Allow-Origin": "*",
      },
    })
  }

  try {
    // 获取新数据
    const prices = await fetchFromCoinGecko()

    if (prices.length > 0) {
      cachedPrices = prices
      lastFetchTime = now
    }

    return new Response(JSON.stringify(prices), {
      headers: {
        "Content-Type": "application/json",
        "Cache-Control": "public, s-maxage=10, stale-while-revalidate=30",
        "Access-Control-Allow-Origin": "*",
      },
    })
  } catch (error) {
    // 如果有缓存，返回旧数据
    if (cachedPrices.length > 0) {
      return new Response(JSON.stringify(cachedPrices), {
        headers: {
          "Content-Type": "application/json",
          "Cache-Control": "public, s-maxage=10, stale-while-revalidate=30",
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
        "Cache-Control": "public, s-maxage=10, stale-while-revalidate=30",
        "Access-Control-Allow-Origin": "*",
        "X-Cache": "FALLBACK",
      },
    })
  }
}
