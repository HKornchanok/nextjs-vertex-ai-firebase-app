'use client'

import { useTheme } from 'next-themes'
import { SunIcon, MoonIcon } from '@heroicons/react/24/outline'

export default function Header() {
  const { theme, setTheme } = useTheme();
  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  return (
    <header className="header">
      <div className="header-container">
        <div className="header-content">
          <div>
            <h1 className="header-title">Harn Gun App</h1>
          </div>
          <button
            onClick={toggleTheme}
            className="theme-toggle"
            aria-label="Toggle theme"
          >
            {theme === 'dark' ? (
              <SunIcon className="h-5 w-5" />
            ) : (
              <MoonIcon className="h-5 w-5" />
            )}
          </button>
        </div>
      </div>
    </header>
  )
} 