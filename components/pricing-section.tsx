"use client"

import { useLanguageContext } from "./language-provider"
import { translations } from "@/lib/translations"

const exchanges = [
  {
    name: "BINANCE",
    rebate: "20%",
    link: "https://accounts.bmwweb.academy/register?ref=MARKET101",
    status: "ONLINE",
  },
  {
    name: "BYBIT",
    rebate: "20%",
    link: "https://partner.bybit.com/b/101MARKET",
    status: "ONLINE",
  },
  {
    name: "BITGET",
    rebate: "20%",
    link: "https://partner.hdmune.cn/bg/MARKET101",
    status: "ONLINE",
  },
]

export function PricingSection() {
  const { language } = useLanguageContext()
  const t = translations.pricing

  return (
    <section id="pricing" className="py-24 relative bg-card/30">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-block border border-border px-4 py-2 mb-4">
            <span className="text-muted-foreground text-sm">{"// "}</span>
            <span className="text-primary text-sm">{t.sectionFile[language]}</span>
          </div>
          <h2 className="text-2xl md:text-3xl font-bold text-foreground">{">"} {t.sectionTitle[language]}_</h2>
        </div>

        <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {/* Subscription Option */}
          <div className="terminal-window rounded overflow-hidden flex flex-col">
            <div className="terminal-header px-4 py-2 flex items-center justify-between">
              <span className="text-xs text-muted-foreground">independent.node</span>
              <span className="text-xs text-muted-foreground px-2 py-0.5 border border-muted-foreground">{t.subscription[language]}</span>
            </div>
            <div className="p-6 flex-1 flex flex-col">
              <div className="mb-6">
                <span className="text-3xl font-bold text-foreground">500</span>
                <span className="text-muted-foreground"> USDT</span>
                <span className="text-muted-foreground text-sm"> {t.perMonth[language]}</span>
              </div>

              <div className="space-y-4 text-sm mb-6 flex-1">
                <div className="flex items-center gap-2">
                  <span className="text-primary">[✓]</span>
                  <span className="text-muted-foreground">{t.features.terminal[language]}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-primary">[✓]</span>
                  <span className="text-muted-foreground">{t.features.kaiyang[language]}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-primary">[✓]</span>
                  <span className="text-muted-foreground">{t.features.alphaDojo[language]}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-primary">[✓]</span>
                  <span className="text-muted-foreground">{t.features.telegramSupport[language]}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-primary">[✓]</span>
                  <span className="text-muted-foreground">{t.features.botPush[language]}</span>
                </div>
              </div>

              <a
                href="https://t.me/MARKET101_VIVIAN"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-2 border border-border text-muted-foreground hover:border-primary hover:text-primary transition-colors text-sm mt-auto text-center block"
              >
                {">"} {t.orderNow[language]}_
              </a>
            </div>
          </div>

          {/* Free via Exchange */}
          <div className="terminal-window rounded overflow-hidden border-primary/50 flex flex-col">
            <div className="terminal-header px-4 py-2 flex items-center justify-between">
              <span className="text-xs text-muted-foreground">partner.integration</span>
              <span className="text-xs text-primary px-2 py-0.5 border border-primary animate-pulse">{t.recommended[language]}</span>
            </div>
            <div className="p-6 flex-1 flex flex-col">
              <div className="mb-6 flex items-center gap-3 flex-wrap">
                <span className="text-lg text-muted-foreground/50 line-through">500 USDT</span>
                <span className="text-4xl font-bold text-foreground">0.00 USDT</span>
                <span className="text-xs px-2 py-1 bg-green-500/20 text-green-400 border border-green-500/50 font-semibold">
                  FEE REBATE
                </span>
              </div>

              <div className="space-y-3 mb-6 flex-1">
                {exchanges.map((exchange) => (
                  <a
                    key={exchange.name}
                    href={exchange.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between p-3 border border-border hover:border-primary transition-colors group"
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-foreground font-bold">{exchange.name}</span>
                      <span className="text-xs px-2 py-0.5 bg-primary/20 text-primary">
                        {exchange.rebate} Fee Rebate
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="relative flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                      </span>
                      <span className="text-xs text-muted-foreground group-hover:text-primary transition-colors">
                        {exchange.status}
                      </span>
                    </div>
                  </a>
                ))}
              </div>

              <p className="text-xs text-muted-foreground text-center mt-auto">{"// "} {t.freeAccess.note[language]}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
