import { Header } from "@/components/header"
import { HeroSection } from "@/components/hero-section"
import { TradeRecordsMarquee } from "@/components/trade-records-marquee"
import { StrategiesSection } from "@/components/strategies-section"
import { PricingSection } from "@/components/pricing-section"
import { TelegramSection } from "@/components/telegram-section"
import { RiskDisclaimer } from "@/components/risk-disclaimer"
import { Footer } from "@/components/footer"
import { MatrixBackground } from "@/components/matrix-background"

export default function Home() {
  return (
    <main className="min-h-screen bg-background relative">
      <MatrixBackground />
      <div className="relative z-10">
        <Header />
        <HeroSection />
        <TradeRecordsMarquee />
        <StrategiesSection />
        <PricingSection />
        <TelegramSection />
        <RiskDisclaimer />
        <Footer />
      </div>
    </main>
  )
}
