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
const CACHE_DURATION = 2000 // 2 秒缓存，更快响应

// Bitget API - 中国可访问，速度快
async function fetchFromBitget(): Promise<CryptoPrice[]> {
  const [btcRes, ethRes] = await Promise.all([
    fetch("https://api.bitget.com/api/v2/spot/market/tickers?symbol=BTCUSDT", {
      signal: AbortSignal.timeout(3000), // 3秒超时
    }),
    fetch("https://api.bitget.com/api/v2/spot/market/tickers?symbol=ETHUSDT", {
      signal: AbortSignal.timeout(3000),
    }),
  ])

  if (!btcRes.ok || !ethRes.ok) {
    throw new Error("Bitget API error")
  }

  const [btcData, ethData] = await Promise.all([btcRes.json(), ethRes.json()])

  const prices: CryptoPrice[] = []

  if (btcData.code === "00000" && btcData.data?.[0]) {
    const btc = btcData.data[0]
    prices.push({
      symbol: "BTC",
      price: parseFloat(btc.lastPr) || 0,
      change24h: parseFloat(btc.change24h) * 100 || 0, // 转换为百分比
      high24h: parseFloat(btc.high24h) || 0,
      low24h: parseFloat(btc.low24h) || 0,
      volume: parseFloat(btc.usdtVolume) || 0,
      timestamp: parseInt(btc.ts) || Date.now(),
    })
  }

  if (ethData.code === "00000" && ethData.data?.[0]) {
    const eth = ethData.data[0]
    prices.push({
      symbol: "ETH",
      price: parseFloat(eth.lastPr) || 0,
      change24h: parseFloat(eth.change24h) * 100 || 0,
      high24h: parseFloat(eth.high24h) || 0,
      low24h: parseFloat(eth.low24h) || 0,
      volume: parseFloat(eth.usdtVolume) || 0,
      timestamp: parseInt(eth.ts) || Date.now(),
    })
  }

  if (prices.length < 2) {
    throw new Error("Bitget: Incomplete data")
  }

  return prices
}

// OKX API - 中国可访问，速度快
async function fetchFromOKX(): Promise<CryptoPrice[]> {
  const [btcRes, ethRes] = await Promise.all([
    fetch("https://www.okx.com/api/v5/market/ticker?instId=BTC-USDT", {
      signal: AbortSignal.timeout(3000),
    }),
    fetch("https://www.okx.com/api/v5/market/ticker?instId=ETH-USDT", {
      signal: AbortSignal.timeout(3000),
    }),
  ])

  if (!btcRes.ok || !ethRes.ok) {
    throw new Error("OKX API error")
  }

  const [btcData, ethData] = await Promise.all([btcRes.json(), ethRes.json()])

  const prices: CryptoPrice[] = []

  if (btcData.code === "0" && btcData.data?.[0]) {
    const btc = btcData.data[0]
    const open24h = parseFloat(btc.open24h) || 1
    const last = parseFloat(btc.last) || 0
    prices.push({
      symbol: "BTC",
      price: last,
      change24h: ((last - open24h) / open24h) * 100,
      high24h: parseFloat(btc.high24h) || 0,
      low24h: parseFloat(btc.low24h) || 0,
      volume: parseFloat(btc.volCcy24h) || 0,
      timestamp: parseInt(btc.ts) || Date.now(),
    })
  }

  if (ethData.code === "0" && ethData.data?.[0]) {
    const eth = ethData.data[0]
    const open24h = parseFloat(eth.open24h) || 1
    const last = parseFloat(eth.last) || 0
    prices.push({
      symbol: "ETH",
      price: last,
      change24h: ((last - open24h) / open24h) * 100,
      high24h: parseFloat(eth.high24h) || 0,
      low24h: parseFloat(eth.low24h) || 0,
      volume: parseFloat(eth.volCcy24h) || 0,
      timestamp: parseInt(eth.ts) || Date.now(),
    })
  }

  if (prices.length < 2) {
    throw new Error("OKX: Incomplete data")
  }

  return prices
}

// CryptoCompare API - 备用，全球可访问
async function fetchFromCryptoCompare(): Promise<CryptoPrice[]> {
  const response = await fetch(
    "https://min-api.cryptocompare.com/data/pricemultifull?fsyms=BTC,ETH&tsyms=USD",
    {
      signal: AbortSignal.timeout(5000),
      headers: { Accept: "application/json" },
    }
  )

  if (!response.ok) {
    throw new Error(`CryptoCompare API error: ${response.status}`)
  }

  const data = await response.json()
  const prices: CryptoPrice[] = []

  if (data.RAW?.BTC?.USD) {
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

  if (data.RAW?.ETH?.USD) {
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
}

// 竞速获取数据 - 使用最快返回的结果
async function fetchPricesWithRace(): Promise<CryptoPrice[]> {
  // 并行请求 Bitget 和 OKX，取最快的结果
  const result = await Promise.any([
    fetchFromBitget().then(prices => ({ source: "Bitget", prices })),
    fetchFromOKX().then(prices => ({ source: "OKX", prices })),
  ]).catch(async () => {
    // 如果都失败了，使用 CryptoCompare 作为备用
    console.log("[Crypto API] Primary sources failed, using CryptoCompare")
    const prices = await fetchFromCryptoCompare()
    return { source: "CryptoCompare", prices }
  })

  console.log(`[Crypto API] Data from: ${result.source}`)
  return result.prices
}

export async function GET(request: NextRequest) {
  const now = Date.now()

  // 如果缓存有效，直接返回
  if (cachedPrices.length > 0 && now - lastFetchTime < CACHE_DURATION) {
    return new Response(JSON.stringify(cachedPrices), {
      headers: {
        "Content-Type": "application/json",
        "Cache-Control": "public, s-maxage=2, stale-while-revalidate=5",
        "Access-Control-Allow-Origin": "*",
        "X-Cache": "HIT",
      },
    })
  }

  try {
    // 竞速获取新数据
    const prices = await fetchPricesWithRace()

    if (prices.length > 0) {
      cachedPrices = prices
      lastFetchTime = now
    }

    return new Response(JSON.stringify(prices), {
      headers: {
        "Content-Type": "application/json",
        "Cache-Control": "public, s-maxage=2, stale-while-revalidate=5",
        "Access-Control-Allow-Origin": "*",
        "X-Cache": "MISS",
      },
    })
  } catch (error) {
    console.error("[Crypto API] All sources failed:", error)
    
    // 如果有缓存，返回旧数据
    if (cachedPrices.length > 0) {
      return new Response(JSON.stringify(cachedPrices), {
        headers: {
          "Content-Type": "application/json",
          "Cache-Control": "public, s-maxage=2, stale-while-revalidate=5",
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
        "Cache-Control": "public, s-maxage=2, stale-while-revalidate=5",
        "Access-Control-Allow-Origin": "*",
        "X-Cache": "FALLBACK",
      },
    })
  }
}
