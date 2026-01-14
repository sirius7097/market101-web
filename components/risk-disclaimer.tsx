"use client"

import { useLanguageContext } from "./language-provider"
import { translations } from "@/lib/translations"

export function RiskDisclaimer() {
  const { language } = useLanguageContext()

  return (
    <section className="py-8 border-y border-destructive/30 bg-destructive/5">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-start gap-4">
            <div className="text-destructive text-xl shrink-0">⚠</div>
            <div className="font-mono">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-destructive font-bold">WARNING:</span>
                <span className="text-foreground">{translations.riskDisclaimer.warning[language]}</span>
              </div>
              <p className="text-xs text-muted-foreground leading-relaxed">
                <span className="text-destructive">{"// "}</span>
                {translations.riskDisclaimer.content[language]}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
