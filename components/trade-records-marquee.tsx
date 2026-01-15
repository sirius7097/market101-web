"use client"
import { useState } from "react"
import { useSearchParams } from "next/navigation"
import { useLanguageContext } from "./language-provider"
import { translations } from "@/lib/translations"

interface TradeRecord {
  id: number
  coin: string
  strategy: "KAIYANG" | "ALPHA"
  entryPrice: number
  exitPrice: number
  pointsGained?: number
  gain?: number
}
const defaultRecords: TradeRecord[] = [
  { id: 1, coin: "BTC", strategy: "KAIYANG", entryPrice: 92403, exitPrice: 104391, pointsGained: 11988 },
  { id: 2, coin: "BTC", strategy: "KAIYANG", entryPrice: 101408, exitPrice: 109705, pointsGained: 8297 },
  { id: 3, coin: "BTC", strategy: "KAIYANG", entryPrice: 83773, exitPrice: 90381, pointsGained: 6608 },
  { id: 4, coin: "BTC", strategy: "KAIYANG", entryPrice: 89490, exitPrice: 94500, pointsGained: 5010 },
  { id: 5, coin: "BTC", strategy: "KAIYANG", entryPrice: 86580, exitPrice: 91263, pointsGained: 4683 },
  { id: 6, coin: "ETH", strategy: "KAIYANG", entryPrice: 3333, exitPrice: 3838, pointsGained: 505 },
  { id: 7, coin: "ETH", strategy: "KAIYANG", entryPrice: 3400, exitPrice: 3530, pointsGained: 130 },
  { id: 8, coin: "ETH", strategy: "KAIYANG", entryPrice: 3185, exitPrice: 3360, pointsGained: 175 },
  { id: 9, coin: "ETH", strategy: "KAIYANG", entryPrice: 2939, exitPrice: 3015, pointsGained: 76 },
  { id: 10, coin: "ETH", strategy: "KAIYANG", entryPrice: 2811, exitPrice: 2944, pointsGained: 133 },
  { id: 11, coin: "ETH", strategy: "KAIYANG", entryPrice: 2971, exitPrice: 3250, pointsGained: 279 },
  { id: 12, coin: "ETH", strategy: "KAIYANG", entryPrice: 2850, exitPrice: 3271, pointsGained: 421 },
  { id: 13, coin: "PIPPIN", strategy: "ALPHA", entryPrice: 0.483, exitPrice: 0.695, gain: 44 },
  { id: 14, coin: "FIL", strategy: "ALPHA", entryPrice: 1.75, exitPrice: 3.64, gain: 108 },
  { id: 15, coin: "XRP", strategy: "ALPHA", entryPrice: 0.887, exitPrice: 1.055, gain: 19 },
  { id: 16, coin: "SQD", strategy: "ALPHA", entryPrice: 0.058, exitPrice: 0.09, gain: 54 },
  { id: 17, coin: "MYX", strategy: "ALPHA", entryPrice: 2.72, exitPrice: 5.75, gain: 112 },
  { id: 18, coin: "BLESS", strategy: "ALPHA", entryPrice: 0.044, exitPrice: 0.169, gain: 285 },
  { id: 19, coin: "BNB", strategy: "ALPHA", entryPrice: 863, exitPrice: 1050, gain: 22 },
  { id: 20, coin: "XMR", strategy: "ALPHA", entryPrice: 310, exitPrice: 393, gain: 27 },
]
function formatPrice(price: number): string {
  if (price >= 1000) return price.toLocaleString()
  if (price >= 1) return price.toFixed(2)
  if (price >= 0.01) return price.toFixed(3)
  return price.toFixed(3)
}
function TradeCard({ record }: { record: TradeRecord }) {
  return (
    <div className="px-6 py-5 border border-border/50 bg-card/30 font-mono rounded min-w-[200px] text-center">
      <div className="text-xs text-muted-foreground mb-2">[{record.strategy}]</div>
      <div className="text-xl font-bold text-foreground mb-2">{record.coin}</div>
      <div className="text-sm text-muted-foreground mb-1">
        {formatPrice(record.entryPrice)} → {formatPrice(record.exitPrice)}
      </div>
      <div className="text-lg text-primary font-bold">
        {record.strategy === "KAIYANG" ? `+${record.pointsGained?.toLocaleString()} pts` : `+${record.gain}%`}
      </div>
    </div>
  )
}
export function TradeRecordsMarquee() {
  const searchParams = useSearchParams()
  const [records, setRecords] = useState<TradeRecord[]>(defaultRecords)
  const [isEditing, setIsEditing] = useState(false)
  const isAdmin = searchParams.get("admin") === "market101"
  const { language } = useLanguageContext()
  const t = translations.tradeRecords

  const updateRecord = (id: number, field: keyof TradeRecord, value: string) => {
    setRecords((prev) =>
      prev.map((r) => {
        if (r.id !== id) return r
        if (field === "gain" || field === "pointsGained" || field === "entryPrice" || field === "exitPrice") {
          return { ...r, [field]: Number(value) || 0 }
        }
        if (field === "strategy") return { ...r, [field]: value as "KAIYANG" | "ALPHA" }
        return { ...r, [field]: value }
      }),
    )
  }
  const addRecord = () => {
    const newId = Math.max(...records.map((r) => r.id)) + 1
    setRecords([...records, { id: newId, coin: "NEW", strategy: "ALPHA", entryPrice: 0, exitPrice: 0, gain: 0 }])
  }
  const removeRecord = (id: number) => {
    if (records.length > 1) {
      setRecords(records.filter((r) => r.id !== id))
    }
  }
  return (
    <section className="relative w-full min-h-[120vh] flex items-center justify-center overflow-hidden bg-background py-20">
      <div className="absolute inset-0 overflow-hidden opacity-50 pointer-events-none">
        <div className="absolute left-[2%] top-0 flex flex-col gap-6 animate-scroll-up">
          {[...records, ...records, ...records, ...records].map((record, index) => (
            <TradeCard key={`far-left-${record.id}-${index}`} record={record} />
          ))}
        </div>
        <div className="absolute left-[20%] top-0 flex flex-col gap-6 animate-scroll-down">
          {[...records, ...records, ...records, ...records].reverse().map((record, index) => (
            <TradeCard key={`left-${record.id}-${index}`} record={record} />
          ))}
        </div>
        <div className="absolute left-1/2 -translate-x-1/2 top-0 flex flex-col gap-6 animate-scroll-up-slow">
          {[...records, ...records, ...records, ...records].map((record, index) => (
            <TradeCard key={`center-${record.id}-${index}`} record={record} />
          ))}
        </div>
        <div className="absolute right-[20%] top-0 flex flex-col gap-6 animate-scroll-up">
          {[...records, ...records, ...records, ...records].map((record, index) => (
            <TradeCard key={`right-${record.id}-${index}`} record={record} />
          ))}
        </div>
        <div className="absolute right-[2%] top-0 flex flex-col gap-6 animate-scroll-down">
          {[...records, ...records, ...records, ...records].reverse().map((record, index) => (
            <TradeCard key={`far-right-${record.id}-${index}`} record={record} />
          ))}
        </div>
      </div>
      <div className="absolute inset-x-0 top-0 h-60 bg-gradient-to-b from-background to-transparent z-10" />
      <div className="absolute inset-x-0 bottom-0 h-60 bg-gradient-to-t from-background to-transparent z-10" />
      <div className="relative z-20 text-center px-4">
        <div className="inline-flex items-center gap-3 mb-6">
          <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
          <span className="text-sm text-muted-foreground font-mono tracking-wider">ENGINE LIVE PnL</span>
          <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
        </div>
        <h2 className="text-4xl md:text-6xl lg:text-7xl font-bold text-foreground mb-6 tracking-tight">{t.title[language]}</h2>
        <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
          {t.subtitle[language]}
        </p>
        {isAdmin && (
          <button
            onClick={() => setIsEditing(!isEditing)}
            className="mb-6 px-4 py-2 text-xs font-mono text-muted-foreground border border-border/50 hover:border-primary hover:text-primary transition-colors"
          >
            {isEditing ? t.doneButton[language] : t.editButton[language]}
          </button>
        )}
        {isAdmin && isEditing && (
          <div className="mb-8 p-4 border border-border/50 bg-card/50 backdrop-blur-sm max-w-2xl mx-auto max-h-80 overflow-y-auto">
            <div className="space-y-3">
              {records.map((record) => (
                <div key={record.id} className="flex items-center gap-3 font-mono text-sm flex-wrap">
                  <select value={record.strategy} onChange={(e) => updateRecord(record.id, "strategy", e.target.value)} className="w-28 px-2 py-1 bg-background border border-border text-foreground outline-none focus:border-primary text-xs"><option value="KAIYANG">KAIYANG</option><option value="ALPHA">ALPHA</option></select>
                  <input type="text" value={record.coin} onChange={(e) => updateRecord(record.id, "coin", e.target.value)} className="w-20 px-2 py-1 bg-background border border-border text-foreground outline-none focus:border-primary" />
                  <input type="number" value={record.entryPrice} onChange={(e) => updateRecord(record.id, "entryPrice", e.target.value)} className="w-20 px-2 py-1 bg-background border border-border text-muted-foreground outline-none focus:border-primary" />
                  <span className="text-muted-foreground">→</span>
                  <input type="number" value={record.exitPrice} onChange={(e) => updateRecord(record.id, "exitPrice", e.target.value)} className="w-20 px-2 py-1 bg-background border border-border text-primary outline-none focus:border-primary" />
                  {record.strategy === "KAIYANG" ? (<div className="flex items-center gap-2"><input type="number" value={record.pointsGained || 0} onChange={(e) => updateRecord(record.id, "pointsGained", e.target.value)} className="w-20 px-2 py-1 bg-background border border-border text-primary outline-none focus:border-primary" /><span className="text-muted-foreground text-xs">pts</span></div>) : (<div className="flex items-center gap-2"><input type="number" value={record.gain || 0} onChange={(e) => updateRecord(record.id, "gain", e.target.value)} className="w-16 px-2 py-1 bg-background border border-border text-primary outline-none focus:border-primary" /><span className="text-muted-foreground text-xs">%</span></div>)}
                  <button onClick={() => removeRecord(record.id)} className="px-2 py-1 text-muted-foreground hover:text-red-500 transition-colors">×</button>
                </div>
              ))}
            </div>
            <button onClick={addRecord} className="mt-3 px-3 py-1 text-xs font-mono text-muted-foreground border border-border/50 hover:border-primary hover:text-primary transition-colors">{t.addRecord[language]}</button>
          </div>
        )}
        <div className="flex flex-wrap justify-center gap-8 md:gap-16">
          <div className="text-center"><div className="text-3xl md:text-5xl font-bold text-primary mb-2">+285%</div><div className="text-sm text-muted-foreground font-mono">{t.stats.maxGain[language]}</div></div>
          <div className="text-center"><div className="text-3xl md:text-5xl font-bold text-foreground mb-2">538+</div><div className="text-sm text-muted-foreground font-mono">{t.stats.monitoring[language]}</div></div>
          <div className="text-center"><div className="text-3xl md:text-5xl font-bold text-primary mb-2">100+</div><div className="text-sm text-muted-foreground font-mono">{t.stats.successful[language]}</div></div>
        </div>
      </div>
    </section>
  )
}
