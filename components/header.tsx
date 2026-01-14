"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { Monitor, Globe } from "lucide-react"
import { useLanguageContext } from "./language-provider"
import { translations } from "@/lib/translations"

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [time, setTime] = useState("")
  const { language, toggleLanguage, mounted } = useLanguageContext()

  const navItems = [
    { name: translations.nav.strategies[language], href: "#strategies" },
    { name: translations.nav.subscribe[language], href: "#pricing" },
    { name: translations.nav.telegram[language], href: "#telegram" },
  ]

  useEffect(() => {
    const updateTime = () => {
      const now = new Date()
      setTime(now.toLocaleTimeString("en-US", { hour12: false }))
    }
    updateTime()
    const interval = setInterval(updateTime, 1000)
    return () => clearInterval(interval)
  }, [])

  const toggleButtonLabel = language === 'zh' 
    ? translations.langToggle.en[language]
    : translations.langToggle.zh[language]
  
  const toggleButtonHint = language === 'zh'
    ? translations.langToggle.switchToEnglish[language]
    : translations.langToggle.switchToChinese[language]

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/95 border-b border-border backdrop-blur-sm">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-14">
          <a href="#" className="flex items-center gap-2">
            <Image
              src="/images/market101-logo.png"
              alt="MARKET101 Logo"
              width={28}
              height={28}
              className="object-contain"
            />
            <span className="text-primary font-bold text-lg">MARKET101</span>
            <span className="w-2 h-4 bg-primary animate-blink" />
          </a>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-1">
            {/* TERMINAL Link - Always visible */}
            <a
              href="https://www.market101.xyz/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 px-3 py-1 text-sm text-primary hover:bg-primary/10 transition-colors border border-primary/30"
            >
              <Monitor className="w-4 h-4" />
              <span>TERMINAL</span>
            </a>
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="px-3 py-1 text-sm text-muted-foreground hover:text-primary hover:bg-primary/10 transition-colors"
              >
                [{item.name}]
              </a>
            ))}
            
            {/* Language Toggle Button */}
            {mounted && (
              <button
                onClick={toggleLanguage}
                className="ml-2 flex items-center gap-1 px-2 py-1 text-sm text-muted-foreground hover:text-primary hover:bg-primary/10 transition-colors border border-border"
                title={toggleButtonHint}
              >
                <Globe className="w-3.5 h-3.5" />
                <span>{toggleButtonLabel}</span>
              </button>
            )}
            
            <span className="ml-4 text-xs text-muted-foreground border border-border px-2 py-1">
              Time: {time} UTC+8
            </span>
          </nav>

          {/* Mobile Nav - TERMINAL always visible */}
          <div className="md:hidden flex items-center gap-2">
            {/* Mobile Language Toggle */}
            {mounted && (
              <button
                onClick={toggleLanguage}
                className="flex items-center gap-1 px-2 py-1 text-xs text-muted-foreground border border-border"
                title={toggleButtonHint}
              >
                <Globe className="w-3 h-3" />
                <span>{toggleButtonLabel}</span>
              </button>
            )}
            <a
              href="https://www.market101.xyz/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 px-2 py-1 text-xs text-primary border border-primary/30"
            >
              <Monitor className="w-3.5 h-3.5" />
              <span>TERMINAL</span>
            </a>
            <button
              className="px-2 py-1 text-sm border border-border hover:border-primary transition-colors"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              [{isMenuOpen ? "×" : "≡"}]
            </button>
          </div>
        </div>

        {/* Mobile Nav Menu */}
        {isMenuOpen && (
          <nav className="md:hidden py-4 border-t border-border">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="block py-2 text-sm text-muted-foreground hover:text-primary transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                {">"} {item.name}
              </a>
            ))}
          </nav>
        )}
      </div>
    </header>
  )
}
