"use client"

import { useState, useEffect } from "react"
import Image from "next/image"

const navItems = [
  { name: "策略", href: "#strategies" },
  { name: "订阅", href: "#pricing" },
  { name: "TELEGRAM频道", href: "#telegram" },
]

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [time, setTime] = useState("")

  useEffect(() => {
    const updateTime = () => {
      const now = new Date()
      setTime(now.toLocaleTimeString("en-US", { hour12: false }))
    }
    updateTime()
    const interval = setInterval(updateTime, 1000)
    return () => clearInterval(interval)
  }, [])

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
            {navItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="px-3 py-1 text-sm text-muted-foreground hover:text-primary hover:bg-primary/10 transition-colors"
              >
                [{item.name}]
              </a>
            ))}
            <span className="ml-4 text-xs text-muted-foreground border border-border px-2 py-1">
              Time: {time} UTC+8
            </span>
          </nav>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden px-2 py-1 text-sm border border-border hover:border-primary transition-colors"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            [{isMenuOpen ? "×" : "≡"}]
          </button>
        </div>

        {/* Mobile Nav */}
        {isMenuOpen && (
          <nav className="md:hidden py-4 border-t border-border">
            {navItems.map((item) => (
              <a
                key={item.name}
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
