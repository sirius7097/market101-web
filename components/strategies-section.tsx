export function StrategiesSection() {
  return (
    <section id="strategies" className="py-24 relative">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-block border border-border px-4 py-2 mb-4">
            <span className="text-muted-foreground text-sm">{"// "}</span>
            <span className="text-primary text-sm">STRATEGIES.md</span>
          </div>
          <h2 className="text-2xl md:text-3xl font-bold text-foreground">{">"} 双引擎策略系统_</h2>
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
║        KAIYANG              ║
║      主流波段策略            ║
╚═══════════════════════════════╝`}
              </pre>
              <div className="sm:hidden mb-4">
                <h3 className="text-xl text-primary font-bold">KAIYANG</h3>
                <p className="text-sm text-muted-foreground">主流波段策略</p>
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
                  专注于主流资产的中长期波段交易，通过多维度技术指标与市场情绪分析，精准捕捉趋势拐点，实现权益的稳定增长。
                </p>
              </div>

              <div className="mt-4 grid grid-cols-2 gap-2 text-xs">
                <div className="border border-border px-2 py-1">
                  <span className="text-muted-foreground">[</span>
                  <span className="text-primary">波段交易</span>
                  <span className="text-muted-foreground">]</span>
                </div>
                <div className="border border-border px-2 py-1">
                  <span className="text-muted-foreground">[</span>
                  <span className="text-primary">风控严格</span>
                  <span className="text-muted-foreground">]</span>
                </div>
                <div className="border border-border px-2 py-1">
                  <span className="text-muted-foreground">[</span>
                  <span className="text-primary">技术分析</span>
                  <span className="text-muted-foreground">]</span>
                </div>
                <div className="border border-border px-2 py-1">
                  <span className="text-muted-foreground">[</span>
                  <span className="text-primary">稳定增长</span>
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
║       ALPHA DOJO           ║
║      山寨暴涨捕捉策略        ║
╚═══════════════════════════════╝`}
              </pre>
              <div className="sm:hidden mb-4">
                <h3 className="text-xl text-accent font-bold">ALPHA DOJO</h3>
                <p className="text-sm text-muted-foreground">山寨暴涨捕捉策略</p>
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
                  实时监控山寨币市场异动，结合全链路数据与资金流向分析，快速识别潜力标的，捕捉短期爆发行情。
                </p>
              </div>

              <div className="mt-4 grid grid-cols-2 gap-2 text-xs">
                <div className="border border-border px-2 py-1">
                  <span className="text-muted-foreground">[</span>
                  <span className="text-accent">快速响应</span>
                  <span className="text-muted-foreground">]</span>
                </div>
                <div className="border border-border px-2 py-1">
                  <span className="text-muted-foreground">[</span>
                  <span className="text-accent">高额涨幅</span>
                  <span className="text-muted-foreground">]</span>
                </div>
                <div className="border border-border px-2 py-1">
                  <span className="text-muted-foreground">[</span>
                  <span className="text-accent">全链分析</span>
                  <span className="text-muted-foreground">]</span>
                </div>
                <div className="border border-border px-2 py-1">
                  <span className="text-muted-foreground">[</span>
                  <span className="text-accent">异动捕捉</span>
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
