// src/components/Navbar.tsx
'use client'

import { Moon, Sun, Library, Globe } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useState, useEffect } from "react"
import Link from 'next/link'
import { useTranslation } from 'react-i18next'

export default function Navbar() {
  const { i18n } = useTranslation()
  const [darkMode, setDarkMode] = useState(true)
  const [currentLang, setCurrentLang] = useState('BN')

  useEffect(() => {
    const savedMode = localStorage.getItem('darkMode')
    if (savedMode) {
      const isDark = savedMode === 'dark'
      setDarkMode(isDark)
      document.documentElement.classList.toggle('dark', isDark)
    } else {
      document.documentElement.classList.add('dark')
      localStorage.setItem('darkMode', 'dark')
    }
  }, [])

  useEffect(() => {
    if (i18n?.language) {
      setCurrentLang(i18n.language.toUpperCase())
    }
  }, [i18n?.language])

  const toggleDarkMode = () => {
    const newMode = !darkMode
    setDarkMode(newMode)
    document.documentElement.classList.toggle('dark', newMode)
    localStorage.setItem('darkMode', newMode ? 'dark' : 'light')
  }

  const toggleLanguage = () => {
    if (!i18n || !i18n.language || !i18n.isInitialized) {
      console.warn("i18next not ready yet - waiting for initialization")
      return
    }

    const newLang = i18n.language === 'bn' ? 'en' : 'bn'
    i18n.changeLanguage(newLang)
    localStorage.setItem('i18nextLng', newLang)
    setCurrentLang(newLang.toUpperCase())
  }

  return (
    <header className="bg-gray-900/90 dark:bg-gray-900/90 backdrop-blur-md border-b border-gray-800/50 px-4 sm:px-6 py-4 flex items-center justify-between">
      <Link href="/" className="flex items-center gap-2 sm:gap-3">
        <Library className="h-7 w-7 sm:h-8 sm:w-8 text-blue-400" />
        <h1 className="text-xl sm:text-2xl font-bold text-white dark:text-white">
          Library Pro
        </h1>
      </Link>

      <div className="flex items-center gap-2 sm:gap-4">
        <Button 
          variant="ghost" 
          size="icon" 
          onClick={toggleLanguage}
          className="text-white dark:text-white hover:bg-gray-800 dark:hover:bg-gray-800"
        >
          <Globe className="h-5 w-5" />
          <span className="ml-1 text-sm font-medium">{currentLang}</span>
        </Button>

        <Button 
          variant="ghost" 
          size="icon" 
          onClick={toggleDarkMode}
          className="text-white dark:text-white hover:bg-gray-800 dark:hover:bg-gray-800"
        >
          {darkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
        </Button>
      </div>
    </header>
  )
}