import { NextResponse } from "next/server"

export const dynamic = "force-dynamic"
export const revalidate = 0

interface CryptoPrice {
  symbol: string
  price: number
  change24h: number
  high24h: number
  low24h: number
  volume: number
}

let cachedPrices: CryptoPrice[] | null = null
let lastFetchTime = 0
const CACHE_DURATION = 60000 // 60 seconds cache

async function fetchFromCryptoCompare(): Promise<CryptoPrice[]> {
  const symbols = ["BTC", "ETH"]
  const prices: CryptoPrice[] = []

  for (const symbol of symbols) {
    const response = await fetch(`https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${symbol}&tsyms=USD`, {
      headers: {
        Accept: "application/json",
      },
      next: { revalidate: 60 },
    })

    if (!response.ok) {
      const text = await response.text()
      console.error(`CryptoCompare API error for ${symbol}:`, response.status, text)
      throw new Error(`CryptoCompare API error: ${response.status}`)
    }

    const data = await response.json()

    if (data.RAW && data.RAW[symbol] && data.RAW[symbol].USD) {
      const coinData = data.RAW[symbol].USD
      prices.push({
        symbol,
        price: coinData.PRICE || 0,
        change24h: coinData.CHANGEPCT24HOUR || 0,
        high24h: coinData.HIGH24HOUR || 0,
        low24h: coinData.LOW24HOUR || 0,
        volume: coinData.VOLUME24HOUR || 0,
      })
    }
  }

  if (prices.length === 0) {
    throw new Error("No price data received")
  }

  return prices
}

export async function GET() {
  try {
    const now = Date.now()

    // Return cached data if still valid
    if (cachedPrices && now - lastFetchTime < CACHE_DURATION) {
      return NextResponse.json(cachedPrices, {
        headers: {
          "Cache-Control": "public, max-age=60",
          "X-Cache": "HIT",
        },
      })
    }

    // Fetch fresh data from CryptoCompare
    const prices = await fetchFromCryptoCompare()

    // Update cache
    cachedPrices = prices
    lastFetchTime = now

    return NextResponse.json(prices, {
      headers: {
        "Cache-Control": "public, max-age=60",
        "X-Cache": "MISS",
      },
    })
  } catch (error) {
    console.error("Failed to fetch crypto prices:", error)

    // Return cached data if available
    if (cachedPrices) {
      return NextResponse.json(cachedPrices, {
        headers: {
          "Cache-Control": "public, max-age=60",
          "X-Cache": "STALE",
        },
      })
    }

    return NextResponse.json({ error: "Failed to fetch prices" }, { status: 500 })
  }
}
