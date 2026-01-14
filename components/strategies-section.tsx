"use client"

import { useLanguageContext } from "./language-provider"
import { translations } from "@/lib/translations"

export function StrategiesSection() {
  const { language } = useLanguageContext()
  const t = translations.strategies

  return (
    <section id="strategies" className="py-24 relative">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-block border border-border px-4 py-2 mb-4">
            <span className="text-muted-foreground text-sm">{"// "}</span>
            <span className="text-primary text-sm">{t.sectionFile[language]}</span>
          </div>
          <h2 className="text-2xl md:text-3xl font-bold text-foreground">{">"} {t.sectionTitle[language]}_</h2>
        </div>

        <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
          {/* KAIYANG Strategy */}
          <div className="terminal-window rounded overflow-hidden">
            <div className="terminal-header px-4 py-2 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-primary" />
                <span className="text-xs text-muted-foreground">kaiyang.strategy</span>
              </div>
              <span className="text-xs text-primary">ACTIVE</span>
            </div>
            <div className="p-6">
              <pre className="text-primary text-xs mb-4 hidden sm:block">
                {`╔═══════════════════════════════╗
║        ${t.kaiyang.name[language]}              ║
║      ${t.kaiyang.subtitle[language]}            ║
╚═══════════════════════════════╝`}
              </pre>
              <div className="sm:hidden mb-4">
                <h3 className="text-xl text-primary font-bold">{t.kaiyang.name[language]}</h3>
                <p className="text-sm text-muted-foreground">{t.kaiyang.subtitle[language]}</p>
              </div>

              <div className="space-y-2 text-sm">
                <div className="flex">
                  <span className="text-muted-foreground w-24">target:</span>
                  <span className="text-foreground">BTC, ETH, SOL...</span>
                </div>
                <div className="flex">
                  <span className="text-muted-foreground w-24">type:</span>
                  <span className="code-string">'swing_trading'</span>
                </div>
                <div className="flex">
                  <span className="text-muted-foreground w-24">timeframe:</span>
                  <span className="code-string">'medium_term'</span>
                </div>
                <div className="flex">
                  <span className="text-muted-foreground w-24">risk:</span>
                  <span className="code-string">'controlled'</span>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-border">
                <p className="text-xs text-muted-foreground leading-relaxed">
                  <span className="text-primary">{"// "}</span>
                  {t.kaiyang.description[language]}
                </p>
              </div>

              <div className="mt-4 grid grid-cols-2 gap-2 text-xs">
                <div className="border border-border px-2 py-1">
                  <span className="text-muted-foreground">[</span>
                  <span className="text-primary">{t.kaiyang.tags.swingTrading[language]}</span>
                  <span className="text-muted-foreground">]</span>
                </div>
                <div className="border border-border px-2 py-1">
                  <span className="text-muted-foreground">[</span>
                  <span className="text-primary">{t.kaiyang.tags.riskControl[language]}</span>
                  <span className="text-muted-foreground">]</span>
                </div>
                <div className="border border-border px-2 py-1">
                  <span className="text-muted-foreground">[</span>
                  <span className="text-primary">{t.kaiyang.tags.technicalAnalysis[language]}</span>
                  <span className="text-muted-foreground">]</span>
                </div>
                <div className="border border-border px-2 py-1">
                  <span className="text-muted-foreground">[</span>
                  <span className="text-primary">{t.kaiyang.tags.stableGrowth[language]}</span>
                  <span className="text-muted-foreground">]</span>
                </div>
              </div>
            </div>
          </div>

          {/* Alpha Dojo Strategy */}
          <div className="terminal-window rounded overflow-hidden">
            <div className="terminal-header px-4 py-2 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-accent" />
                <span className="text-xs text-muted-foreground">alpha-dojo.strategy</span>
              </div>
              <span className="text-xs text-accent">ACTIVE</span>
            </div>
            <div className="p-6">
              <pre className="text-accent text-xs mb-4 hidden sm:block">
                {`╔═══════════════════════════════╗
║       ${t.alphaDojo.name[language]}           ║
║      ${t.alphaDojo.subtitle[language]}        ║
╚═══════════════════════════════╝`}
              </pre>
              <div className="sm:hidden mb-4">
                <h3 className="text-xl text-accent font-bold">{t.alphaDojo.name[language]}</h3>
                <p className="text-sm text-muted-foreground">{t.alphaDojo.subtitle[language]}</p>
              </div>

              <div className="space-y-2 text-sm">
                <div className="flex">
                  <span className="text-muted-foreground w-24">target:</span>
                  <span className="text-foreground">Altcoins, Memes</span>
                </div>
                <div className="flex">
                  <span className="text-muted-foreground w-24">type:</span>
                  <span className="code-string">'surge_capture'</span>
                </div>
                <div className="flex">
                  <span className="text-muted-foreground w-24">timeframe:</span>
                  <span className="code-string">'short_term'</span>
                </div>
                <div className="flex">
                  <span className="text-muted-foreground w-24">potential:</span>
                  <span className="code-string">'high_roi'</span>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-border">
                <p className="text-xs text-muted-foreground leading-relaxed">
                  <span className="text-accent">{"// "}</span>
                  {t.alphaDojo.description[language]}
                </p>
              </div>

              <div className="mt-4 grid grid-cols-2 gap-2 text-xs">
                <div className="border border-border px-2 py-1">
                  <span className="text-muted-foreground">[</span>
                  <span className="text-accent">{t.alphaDojo.tags.fastResponse[language]}</span>
                  <span className="text-muted-foreground">]</span>
                </div>
                <div className="border border-border px-2 py-1">
                  <span className="text-muted-foreground">[</span>
                  <span className="text-accent">{t.alphaDojo.tags.highGains[language]}</span>
                  <span className="text-muted-foreground">]</span>
                </div>
                <div className="border border-border px-2 py-1">
                  <span className="text-muted-foreground">[</span>
                  <span className="text-accent">{t.alphaDojo.tags.onChainAnalysis[language]}</span>
                  <span className="text-muted-foreground">]</span>
                </div>
                <div className="border border-border px-2 py-1">
                  <span className="text-muted-foreground">[</span>
                  <span className="text-accent">{t.alphaDojo.tags.surgeCapture[language]}</span>
                  <span className="text-muted-foreground">]</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
