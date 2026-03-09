import { useState } from 'react'
import { tv } from 'tailwind-variants'
import { PageLayout } from '../../components/PageLayout'
import { W2_COLORS } from './theme'
import { W2_chapters, W2_sectionData } from './sections'

const theme = {
  bg: W2_COLORS.bg,
  border: W2_COLORS.border,
  accent: W2_COLORS.accent,
  text: W2_COLORS.text,
  muted: W2_COLORS.muted,
}

const header = tv({
  slots: {
    iconWrap: 'rounded-lg w-9 h-9 flex items-center justify-center text-lg shrink-0',
    title: 'font-bold text-[15px]',
    subtitle: 'text-[11px] font-mono',
  },
})

export function W2Page() {
  const [active, setActive] = useState('intro')
  const Content = W2_sectionData[active] || W2_sectionData.intro
  const { iconWrap, title, subtitle } = header()

  return (
    <PageLayout
      theme={theme}
      chapters={W2_chapters}
      activeId={active}
      onSelect={setActive}
      header={
        <>
          <div
            className={iconWrap()}
            style={{ background: `linear-gradient(135deg, ${W2_COLORS.accent}, ${W2_COLORS.accent2})` }}
          >
            📚
          </div>
          <div>
            <div className={title()}>코테 커리큘럼</div>
            <div className={subtitle()} style={{ color: W2_COLORS.muted }}>
              Week 2: 정렬 &amp; 탐색 알고리즘 — Python3
            </div>
          </div>
        </>
      }
    >
      <Content />
    </PageLayout>
  )
}
