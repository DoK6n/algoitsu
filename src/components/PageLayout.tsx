import { useState, useEffect } from 'react'
import { tv } from 'tailwind-variants'

export interface Chapter {
  id: string
  label: string
  icon: string
  week?: string
  color?: string
}

export interface PageTheme {
  bg: string
  surface?: string
  border: string
  accent: string
  text: string
  muted: string
}

interface PageLayoutProps {
  theme: PageTheme
  chapters: Chapter[]
  activeId: string
  onSelect: (id: string) => void
  header: React.ReactNode
  children: React.ReactNode
}

const sidebar = tv({
  base: 'shrink-0 overflow-y-auto overflow-x-hidden sticky top-[96px] h-[calc(100vh-96px)] border-r transition-all duration-[250ms] ease-in-out py-3',
  variants: {
    open: {
      true: 'w-[200px] min-w-[200px]',
      false: 'w-0 min-w-0 py-0 border-r-0',
    },
  },
})

const navBtn = tv({
  base: 'block w-full text-left px-5 py-2.5 bg-transparent cursor-pointer text-[13px] transition-all duration-200 border-0 border-l-[3px] border-solid',
  variants: {
    active: {
      true: '',
      false: 'border-l-transparent text-[#64748b]',
    },
  },
})

const weekLabel = tv({
  base: 'px-5 pt-2.5 pb-0.5 text-[10px] font-bold font-mono tracking-widest',
})

const toggleBtn = tv({
  base: 'ml-auto p-1.5 bg-transparent border border-[#1e2d45] rounded-lg cursor-pointer text-[#64748b] hover:text-white transition-colors',
})

const pageHeader = tv({
  base: 'sticky top-12 z-[99] px-6 py-3 backdrop-blur-sm',
})

export function PageLayout({ theme, chapters, activeId, onSelect, header, children }: PageLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(
    typeof window !== 'undefined' ? window.innerWidth > 768 : true
  )

  useEffect(() => {
    const onResize = () => setSidebarOpen(window.innerWidth > 768)
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [])

  return (
    <div className="min-h-screen font-sans" style={{ background: theme.bg, color: theme.text }}>
      <div
        className={pageHeader()}
        style={{ background: theme.surface || theme.bg, borderBottom: `1px solid ${theme.border}` }}
      >
        <div className="flex items-center gap-3">
          {header}
          <button
            type="button"
            onClick={() => setSidebarOpen(o => !o)}
            className={toggleBtn()}
            title={sidebarOpen ? '사이드바 접기' : '사이드바 펼치기'}
          >
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
              <rect x="1" y="1" width="16" height="16" rx="2" stroke="currentColor" strokeWidth="1.5"/>
              <rect x="1" y="1" width="5" height="16" rx="2"
                fill={sidebarOpen ? 'currentColor' : 'none'}
                stroke="currentColor" strokeWidth="1.5"/>
            </svg>
          </button>
        </div>
      </div>

      <div className="flex">
        <nav
          className={sidebar({ open: sidebarOpen })}
          style={{ borderColor: theme.border }}
        >
          {(() => {
            let prevWeek: string | undefined
            return chapters.map(ch => {
              const color = ch.color || theme.accent
              const isActive = activeId === ch.id
              const showWeek = ch.week && ch.week !== prevWeek
              prevWeek = ch.week
              return (
                <div key={ch.id}>
                  {showWeek && (
                    <div className={weekLabel()} style={{ color }}>
                      {ch.week}
                    </div>
                  )}
                  <button
                    type="button"
                    onClick={() => onSelect(ch.id)}
                    className={navBtn({ active: isActive })}
                    style={isActive
                      ? { background: `${color}18`, borderLeftColor: color, color }
                      : { borderLeftColor: 'transparent', color: '#64748b' }
                    }
                  >
                    <span className="mr-2">{ch.icon}</span>
                    {ch.label}
                  </button>
                </div>
              )
            })
          })()}
        </nav>

        <main className="flex-1 p-6 min-w-0">
          {children}
        </main>
      </div>
    </div>
  )
}
