export function TelegramSection() {
  return (
    <section id="telegram" className="py-24 relative">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto">
          <div className="terminal-window rounded overflow-hidden">
            <div className="terminal-header px-4 py-2 flex items-center gap-2">
              <span className="text-xs text-muted-foreground">telegram.connect</span>
            </div>
            <div className="p-6 md:p-8">
              <div className="relative p-8 mb-8 rounded-lg overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-[#0088cc]/20 via-[#0088cc]/40 to-[#0088cc]/20 rounded-lg" />
                <div className="absolute inset-[1px] bg-background rounded-lg" />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-[#0088cc]/10 blur-3xl rounded-full" />

                <div className="relative flex items-center gap-8 py-6">
                  {/* Telegram icon on left */}
                  <div className="flex-shrink-0">
                    <div className="w-20 h-20 rounded-full bg-gradient-to-br from-[#0088cc] to-[#0066aa] flex items-center justify-center shadow-lg shadow-[#0088cc]/30">
                      <svg viewBox="0 0 24 24" className="w-10 h-10 text-white" fill="currentColor">
                        <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z" />
                      </svg>
                    </div>
                  </div>

                  {/* Text content on right */}
                  <div className="text-left">
                    <h3 className="text-4xl md:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white via-[#0088cc] to-white tracking-widest mb-3">
                      TELEGRAM
                    </h3>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground font-mono">
                      <span>JOIN MARKET101 COMMUNITY</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="text-center mb-8">
                <h2 className="text-xl md:text-2xl font-bold text-foreground mb-4">{">"} 加入 MARKET101 官方频道_</h2>
                <p className="text-sm text-muted-foreground leading-relaxed max-w-md mx-auto">
                  获取实时交易信号、市场分析与策略更新。
                </p>
              </div>

              <div className="flex flex-wrap justify-center gap-4 mb-8 text-xs">
                <span className="border border-muted-foreground/30 px-4 py-2 rounded">
                  <span className="text-muted-foreground">[</span>
                  <span className="text-foreground">活跃社群</span>
                  <span className="text-muted-foreground">]</span>
                </span>
                <span className="border border-muted-foreground/30 px-4 py-2 rounded">
                  <span className="text-muted-foreground">[</span>
                  <span className="text-foreground">实时信号</span>
                  <span className="text-muted-foreground">]</span>
                </span>
                <span className="border border-muted-foreground/30 px-4 py-2 rounded">
                  <span className="text-muted-foreground">[</span>
                  <span className="text-foreground">专业分析</span>
                  <span className="text-muted-foreground">]</span>
                </span>
              </div>

              <div className="flex justify-center">
                <a
                  href="https://t.me/MARKET101_OFFICIAL"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-8 py-4 bg-[#0088cc] text-white font-bold hover:bg-[#0099dd] transition-colors duration-300"
                >
                  <span>{">"}</span>
                  <span>./join_telegram.sh</span>
                  <span className="w-2 h-5 bg-white animate-blink" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
