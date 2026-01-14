"use client"

import Image from "next/image"
import { useLanguageContext } from "./language-provider"
import { translations } from "@/lib/translations"

export function Footer() {
  const { language } = useLanguageContext()

  return (
    <footer className="py-8 border-t border-border bg-card/30">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-sm">
          <div className="flex items-center gap-2">
            <Image
              src="/images/market101-logo.png"
              alt="MARKET101 Logo"
              width={28}
              height={28}
              className="object-contain"
            />
            <span className="text-primary font-bold">MARKET101</span>
            <span className="text-muted-foreground">|</span>
            <span className="text-foreground font-mono">Prop Trading</span>
          </div>
          <div className="flex items-center gap-4 text-xs text-muted-foreground">
            <a href="#strategies" className="hover:text-primary transition-colors">
              [{translations.nav.strategies[language]}]
            </a>
            <a href="#pricing" className="hover:text-primary transition-colors">
              [{translations.nav.subscribe[language]}]
            </a>
            <a href="#telegram" className="hover:text-primary transition-colors">
              [{translations.nav.telegram[language]}]
            </a>
          </div>
          <p className="text-xs text-muted-foreground">© 2025 MARKET101 // All rights reserved</p>
        </div>
      </div>
    </footer>
  )
}
