export type Language = 'zh' | 'en'

export const translations = {
  // Header Navigation
  nav: {
    strategies: { zh: '策略', en: 'Strategies' },
    subscribe: { zh: '订阅', en: 'Subscribe' },
    telegram: { zh: 'TELEGRAM频道', en: 'TELEGRAM' },
  },

  // Hero Section
  hero: {
    subtitle: {
      zh: 'MARKET101 TERMINAL // Trading Engine v2.0',
      en: 'MARKET101 TERMINAL // Trading Engine v2.0',
    },
    tagline: {
      zh: 'Discipline. Precision. Alpha.',
      en: 'Discipline. Precision. Alpha.',
    },
    stats: {
      strategies: { zh: 'STRATEGIES', en: 'STRATEGIES' },
      pairs: { zh: 'PAIRS_MONITORED', en: 'PAIRS_MONITORED' },
      uptime: { zh: 'UPTIME', en: 'UPTIME' },
      stableDays: { zh: 'STABLE_DAYS', en: 'STABLE_DAYS' },
    },
  },

  // Crypto Price Panel
  crypto: {
    perpFutures: { zh: 'PERP_FUTURES', en: 'PERP_FUTURES' },
    recentRecords: { zh: 'RECENT_RECORDS', en: 'RECENT_RECORDS' },
    live: { zh: 'LIVE', en: 'LIVE' },
    connecting: { zh: 'CONNECTING...', en: 'CONNECTING...' },
    reconnecting: { zh: 'RECONNECTING...', en: 'RECONNECTING...' },
    offline: { zh: 'OFFLINE', en: 'OFFLINE' },
  },

  // Strategies Section
  strategies: {
    sectionTitle: { zh: '双引擎策略系统', en: 'Dual-Engine Strategy System' },
    sectionFile: { zh: 'STRATEGIES.md', en: 'STRATEGIES.md' },
    kaiyang: {
      name: { zh: 'KAIYANG', en: 'KAIYANG' },
      subtitle: { zh: '主流波段策略', en: 'Mainstream Swing Strategy' },
      description: {
        zh: '专注于主流资产的中长期波段交易，通过多维度技术指标与市场情绪分析，精准捕捉趋势拐点，实现权益的稳定增长。',
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
        zh: '实时监控山寨币市场异动，结合全链路数据与资金流向分析，快速识别潜力标的，捕捉短期爆发行情。',
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

  // Pricing Section
  pricing: {
    sectionTitle: { zh: '接入方案', en: 'Access Plans' },
    sectionFile: { zh: 'ACCESS.config', en: 'ACCESS.config' },
    subscription: { zh: '订阅', en: 'Subscribe' },
    recommended: { zh: '推荐', en: 'Recommended' },
    orderNow: { zh: '即刻订购', en: 'Order Now' },
    perMonth: { zh: '/month', en: '/month' },
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

  // Telegram Section
  telegram: {
    joinCommunity: { zh: 'JOIN MARKET101 COMMUNITY', en: 'JOIN MARKET101 COMMUNITY' },
    joinChannel: { zh: '加入 MARKET101 官方频道', en: 'Join MARKET101 Official Channel' },
    description: {
      zh: '获取实时交易信号、市场分析与策略更新。',
      en: 'Get real-time trading signals, market analysis, and strategy updates.',
    },
    tags: {
      activeCommunity: { zh: '活跃社群', en: 'Active Community' },
      liveSignals: { zh: '实时信号', en: 'Live Signals' },
      proAnalysis: { zh: '专业分析', en: 'Pro Analysis' },
    },
  },

  // Language Toggle
  langToggle: {
    switchToChinese: { zh: '切换到中文', en: 'Switch to Chinese' },
    switchToEnglish: { zh: 'Switch to English', en: 'Switch to English' },
    zh: { zh: '中', en: '中' },
    en: { zh: 'EN', en: 'EN' },
  },
}

export function t(key: string, lang: Language): string {
  const keys = key.split('.')
  let value: any = translations
  for (const k of keys) {
    value = value?.[k]
  }
  return value?.[lang] || key
}
