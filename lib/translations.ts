export type Language = 'zh' | 'en'

export const translations = {
  langToggle: {
    en: { zh: 'EN', en: 'EN' },
    zh: { zh: '中', en: '中' },
    switchToEnglish: { zh: 'Switch to English', en: 'Switch to English' },
    switchToChinese: { zh: 'Switch to Chinese', en: 'Switch to Chinese' },
  },
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
    sectionFile: { zh: 'STRATEGIES.md', en: 'STRATEGIES.md' },
    sectionTitle: { zh: '双引擎策略系统', en: 'Dual-Engine Strategy System' },
    kaiyang: {
      name: { zh: 'KAIYANG', en: 'KAIYANG' },
      subtitle: { zh: '主流波段策略', en: 'Mainstream Swing Strategy' },
      description: {
        zh: '专注于主流资产的中长线波段交易，运用多维度技术指标与市场情绪分析，精准捕捉趋势反转点位，实现稳健权益增长。',
        en: 'Focused on medium to long-term swing trading of mainstream assets, using multi-dimensional technical indicators and market sentiment analysis to precisely capture trend reversals for stable equity growth.',
      },
      tags: {
        swingTrading: { zh: '波段交易', en: 'Swing Trading' },
        riskControl: { zh: '风控严格', en: 'Strict Risk Control' },
        technicalAnalysis: { zh: '技术分析', en: 'Technical Analysis' },
        stableGrowth: { zh: '稳定增长', en: 'Stable Growth' },
      },
    },
    alphaDojo: {
      name: { zh: 'ALPHA DOJO', en: 'ALPHA DOJO' },
      subtitle: { zh: '山寨暴涨捕捉策略', en: 'Altcoin Surge Capture Strategy' },
      description: {
        zh: '实时监控山寨币市场异动，结合链上数据与资金流向分析，快速识别潜力标的，捕捉短期爆发性机会。',
        en: 'Real-time monitoring of altcoin market movements, combining on-chain data and fund flow analysis to quickly identify potential targets and capture short-term explosive opportunities.',
      },
      tags: {
        fastResponse: { zh: '快速响应', en: 'Fast Response' },
        highGains: { zh: '高额涨幅', en: 'High Gains' },
        onChainAnalysis: { zh: '全链分析', en: 'On-Chain Analysis' },
        surgeCapture: { zh: '异动捕捉', en: 'Surge Capture' },
      },
    },
  },
  pricing: {
    sectionFile: { zh: 'PRICING.md', en: 'PRICING.md' },
    sectionTitle: { zh: '接入方案', en: 'Access Plans' },
    subscription: { zh: '订阅', en: 'Subscribe' },
    perMonth: { zh: '/月', en: '/month' },
    recommended: { zh: '推荐', en: 'Recommended' },
    orderNow: { zh: '即刻订购', en: 'Order Now' },
    feeRebate: { zh: '手续费返佣', en: 'Fee Rebate' },
    features: {
      terminal: { zh: 'MARKET101 TERMINAL v2.0', en: 'MARKET101 TERMINAL v2.0' },
      kaiyang: { zh: "KAIYANG '开阳'交易引擎", en: "KAIYANG 'Kaiyang' Trading Engine" },
      alphaDojo: { zh: 'ALPHA DOJO 交易引擎', en: 'ALPHA DOJO Trading Engine' },
      telegramSupport: { zh: 'Telegram 社群支持', en: 'Telegram Community Support' },
      botPush: { zh: 'TG_Bot 零延迟推送', en: 'TG_Bot Zero-Latency Push' },
    },
    freeAccess: {
      note: { zh: '点击链接注册后联系我们激活', en: 'Click to register, then contact us to activate' },
    },
  },
  telegram: {
    joinCommunity: { zh: '加入社群', en: 'Join Community' },
    joinChannel: { zh: '加入 MARKET101 官方频道', en: 'Join MARKET101 Official Channel' },
    description: { 
      zh: '获取实时交易信号、市场分析和专业策略支持。与志同道合的交易者一起成长。', 
      en: 'Get real-time trading signals, market analysis and professional strategy support. Grow together with like-minded traders.' 
    },
    tags: {
      activeCommunity: { zh: '活跃社群', en: 'Active Community' },
      liveSignals: { zh: '实时信号', en: 'Live Signals' },
      proAnalysis: { zh: '专业分析', en: 'Pro Analysis' },
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
