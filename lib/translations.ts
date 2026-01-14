export type Language = 'zh' | 'en'

export const translations = {
  nav: {
    strategies: { zh: '策略', en: 'Strategies' },
    subscribe: { zh: '订阅', en: 'Subscribe' },
    telegram: { zh: 'TELEGRAM频道', en: 'TELEGRAM' },
  },
  hero: {
    tagline: { zh: 'Discipline. Precision. Alpha.', en: 'Discipline. Precision. Alpha.' },
    stats: {
      strategies: { zh: 'STRATEGIES', en: 'STRATEGIES' },
      pairs: { zh: 'PAIRS_MONITORED', en: 'PAIRS_MONITORED' },
      uptime: { zh: 'UPTIME', en: 'UPTIME' },
      stableDays: { zh: 'STABLE_DAYS', en: 'STABLE_DAYS' },
    },
  },
  crypto: {
    perpFutures: { zh: 'PERP_FUTURES', en: 'PERP_FUTURES' },
    live: { zh: 'LIVE', en: 'LIVE' },
    offline: { zh: 'OFFLINE', en: 'OFFLINE' },
    connecting: { zh: '连接中...', en: 'Connecting...' },
    reconnecting: { zh: '重连中...', en: 'Reconnecting...' },
    recentRecords: { zh: 'RECENT_RECORDS', en: 'RECENT_RECORDS' },
  },
  strategies: {
    title: { zh: '// STRATEGIES.md', en: '// STRATEGIES.md' },
    subtitle: { zh: '> 双引擎策略系统_', en: '> Dual-Engine Strategy System_' },
    kaiyang: {
      name: { zh: 'KAIYANG\n主流波段策略', en: 'KAIYANG\nMainstream Swing Strategy' },
      target: { zh: 'BTC, ETH, SOL...', en: 'BTC, ETH, SOL...' },
      type: { zh: "'swing_trading'", en: "'swing_trading'" },
      timeframe: { zh: "'medium_term'", en: "'medium_term'" },
      risk: { zh: "'controlled'", en: "'controlled'" },
      description: {
        zh: '专注于主流资产的中长线波段交易，运用多维度技术指标与市场情绪分析，精准捕捉趋势反转点位，实现稳健权益增长。',
        en: 'Focused on medium to long-term swing trading of mainstream assets, using multi-dimensional technical indicators and market sentiment analysis to precisely capture trend reversals for stable equity growth.',
      },
      tags: {
        zh: ['波段交易', '风控严格', '技术分析', '稳定增长'],
        en: ['Swing Trading', 'Strict Risk Control', 'Technical Analysis', 'Stable Growth'],
      },
    },
    alphaDojo: {
      name: { zh: 'ALPHA DOJO\n山寨暴涨捕捉策略', en: 'ALPHA DOJO\nAltcoin Surge Capture Strategy' },
      target: { zh: 'Altcoins, Memes', en: 'Altcoins, Memes' },
      type: { zh: "'surge_capture'", en: "'surge_capture'" },
      timeframe: { zh: "'short_term'", en: "'short_term'" },
      potential: { zh: "'high_roi'", en: "'high_roi'" },
      description: {
        zh: '实时监控山寨币市场异动，结合链上数据与资金流向分析，快速识别潜力标的，捕捉短期爆发性机会。',
        en: 'Real-time monitoring of altcoin market movements, combining on-chain data and fund flow analysis to quickly identify potential targets and capture short-term explosive opportunities.',
      },
      tags: {
        zh: ['快速响应', '高额涨幅', '全链分析', '异动捕捉'],
        en: ['Fast Response', 'High Gains', 'On-Chain Analysis', 'Surge Capture'],
      },
    },
  },
  pricing: {
    title: { zh: '> 接入方案_', en: '> Access Plans_' },
    subscribe: { zh: '订阅', en: 'Subscribe' },
    recommended: { zh: '推荐', en: 'Recommended' },
    orderNow: { zh: '> 即刻订购_', en: '> Order Now_' },
    feeRebate: { zh: '手续费返佣', en: 'Fee Rebate' },
    features: {
      terminal: { zh: 'MARKET101 TERMINAL v2.0', en: 'MARKET101 TERMINAL v2.0' },
      kaiyang: { zh: "KAIYANG '开阳'交易引擎", en: "KAIYANG 'Kaiyang' Trading Engine" },
      alphaDojo: { zh: 'ALPHA DOJO 交易引擎', en: 'ALPHA DOJO Trading Engine' },
      telegram: { zh: 'Telegram 社群支持', en: 'Telegram Community Support' },
      tgBot: { zh: 'TG_Bot 零延迟推送', en: 'TG_Bot Zero-Latency Push' },
    },
    partnerNote: { zh: '// 点击链接注册后联系我们激活', en: '// Click to register, then contact us to activate' },
  },
  telegram: {
    title: { zh: '> 加入 MARKET101 官方频道_', en: '> Join MARKET101 Official Channel_' },
    joinButton: { zh: '> ./join_telegram.sh', en: '> ./join_telegram.sh' },
    features: {
      community: { zh: '活跃社群', en: 'Active Community' },
      signals: { zh: '实时信号', en: 'Live Signals' },
      analysis: { zh: '专业分析', en: 'Pro Analysis' },
    },
  },
  tradeRecords: {
    title: { zh: '引擎表现', en: 'Engine Performance' },
    subtitle: { 
      zh: 'KAIYANG //ALPHA DOJO 交易引擎已成功的交易计划真实记录', 
      en: 'Real records of successful trading plans from KAIYANG //ALPHA DOJO trading engines' 
    },
    stats: {
      maxGain: { zh: '最高捕获涨幅', en: 'Max Captured Gain' },
      monitoring: { zh: '监控中的标的', en: 'Assets Monitored' },
      successful: { zh: '已成功的计划', en: 'Successful Plans' },
    },
    editButton: { zh: '[ 编辑背景数据 ]', en: '[ Edit Background Data ]' },
    doneButton: { zh: '[ 完成编辑 ]', en: '[ Done Editing ]' },
    addRecord: { zh: '+ 添加记录', en: '+ Add Record' },
  },
  riskDisclaimer: {
    warning: { zh: '风险提示', en: 'Risk Disclaimer' },
    content: {
      zh: '加密货币交易具有高风险性，价格波动剧烈，可能导致本金全部损失。 MARKET101 提供的交易策略仅供参考，不构成任何投资建议。 在进行任何投资决策前，请充分了解相关风险，并根据自身风险承受能力谨慎决策。 过往业绩不代表未来表现。请勿使用您无法承受损失的资金进行交易。',
      en: 'Cryptocurrency trading involves high risk. Prices are highly volatile and may result in total loss of principal. Trading strategies provided by MARKET101 are for reference only and do not constitute investment advice. Before making any investment decisions, please fully understand the risks involved and make prudent decisions based on your risk tolerance. Past performance does not guarantee future results. Do not trade with funds you cannot afford to lose.',
    },
  },
}
