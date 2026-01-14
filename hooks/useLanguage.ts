"use client"

import { useState, useEffect, useCallback } from 'react'
import type { Language } from '@/lib/translations'

const STORAGE_KEY = 'market101-language'

export function useLanguage() {
  const [language, setLanguageState] = useState<Language>('zh')
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    // 从 localStorage 读取语言设置
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem(STORAGE_KEY) as Language | null
      if (stored === 'zh' || stored === 'en') {
        setLanguageState(stored)
      }
    }
  }, [])

  const setLanguage = useCallback((lang: Language) => {
    setLanguageState(lang)
    if (typeof window !== 'undefined') {
      localStorage.setItem(STORAGE_KEY, lang)
    }
  }, [])

  const toggleLanguage = useCallback(() => {
    const newLang = language === 'zh' ? 'en' : 'zh'
    setLanguage(newLang)
  }, [language, setLanguage])

  return {
    language,
    setLanguage,
    toggleLanguage,
    mounted,
  }
}
