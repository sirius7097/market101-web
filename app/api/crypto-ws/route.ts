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
const CACHE_DURATION = 3000 // 3 秒缓存

async function fetchFromCryptoCompare(): Promise<CryptoPrice[]> {
  try {
    // 使用 CryptoCompare API - 全球 CDN，国内可访问
    const response = await fetch(
      "https://min-api.cryptocompare.com/data/pricemultifull?fsyms=BTC,ETH&tsyms=USD",
      {
        headers: {
          Accept: "application/json",
        },
      }
    )

    if (!response.ok) {
      throw new Error(`CryptoCompare API error: ${response.status}`)
    }

    const data = await response.json()

    const prices: CryptoPrice[] = []

    // 解析 BTC 数据
    if (data.RAW && data.RAW.BTC && data.RAW.BTC.USD) {
      const btc = data.RAW.BTC.USD
      prices.push({
        symbol: "BTC",
        price: btc.PRICE || 0,
        change24h: btc.CHANGEPCT24HOUR || 0,
        high24h: btc.HIGH24HOUR || btc.PRICE,
        low24h: btc.LOW24HOUR || btc.PRICE,
        volume: btc.VOLUME24HOURTO || 0,
        timestamp: (btc.LASTUPDATE || Date.now() / 1000) * 1000,
      })
    }

    // 解析 ETH 数据
    if (data.RAW && data.RAW.ETH && data.RAW.ETH.USD) {
      const eth = data.RAW.ETH.USD
      prices.push({
        symbol: "ETH",
        price: eth.PRICE || 0,
        change24h: eth.CHANGEPCT24HOUR || 0,
        high24h: eth.HIGH24HOUR || eth.PRICE,
        low24h: eth.LOW24HOUR || eth.PRICE,
        volume: eth.VOLUME24HOURTO || 0,
        timestamp: (eth.LASTUPDATE || Date.now() / 1000) * 1000,
      })
    }

    return prices
  } catch (error) {
    console.error("[Crypto API] CryptoCompare fetch error:", error)
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
        "Cache-Control": "public, s-maxage=3, stale-while-revalidate=10",
        "Access-Control-Allow-Origin": "*",
      },
    })
  }

  try {
    // 获取新数据
    const prices = await fetchFromCryptoCompare()

    if (prices.length > 0) {
      cachedPrices = prices
      lastFetchTime = now
    }

    return new Response(JSON.stringify(prices), {
      headers: {
        "Content-Type": "application/json",
        "Cache-Control": "public, s-maxage=3, stale-while-revalidate=10",
        "Access-Control-Allow-Origin": "*",
      },
    })
  } catch (error) {
    // 如果有缓存，返回旧数据
    if (cachedPrices.length > 0) {
      return new Response(JSON.stringify(cachedPrices), {
        headers: {
          "Content-Type": "application/json",
          "Cache-Control": "public, s-maxage=3, stale-while-revalidate=10",
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
        "Cache-Control": "public, s-maxage=3, stale-while-revalidate=10",
        "Access-Control-Allow-Origin": "*",
        "X-Cache": "FALLBACK",
      },
    })
  }
}
