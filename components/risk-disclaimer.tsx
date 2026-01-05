export function RiskDisclaimer() {
  return (
    <section className="py-8 border-y border-destructive/30 bg-destructive/5">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-start gap-4">
            <div className="text-destructive text-xl shrink-0">⚠</div>
            <div className="font-mono">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-destructive font-bold">WARNING:</span>
                <span className="text-foreground">风险提示</span>
              </div>
              <p className="text-xs text-muted-foreground leading-relaxed">
                <span className="text-destructive">{"// "}</span>
                加密货币交易具有高风险性，价格波动剧烈，可能导致本金全部损失。 MARKET101
                提供的交易策略仅供参考，不构成任何投资建议。
                     在进行任何投资决策前，请充分了解相关风险，并根据自身风险承受能力谨慎决策。
                过往业绩不代表未来表现。请勿使用您无法承受损失的资金进行交易。
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
