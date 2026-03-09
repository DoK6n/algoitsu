import { useState } from 'react'
import { tv } from 'tailwind-variants'
import { PageLayout } from '../../components/PageLayout'
import { W1112_T } from './theme'
import { W1112_chapters, W1112_sections } from './sections'

const theme = {
  bg: W1112_T.bg,
  surface: W1112_T.surface,
  border: W1112_T.border,
  accent: W1112_T.w11,
  text: W1112_T.text,
  muted: W1112_T.muted,
}

const header = tv({
  slots: {
    iconWrap: 'rounded-lg w-[34px] h-[34px] flex items-center justify-center text-lg shrink-0',
    title: 'font-extrabold text-[15px]',
    subtitle: 'text-[11px] font-mono',
    badge: 'ml-auto px-3.5 py-1 rounded-full text-xs font-bold',
  },
})

export function W1112Page() {
  const [active, setActive] = useState('intro')
  const Content = W1112_sections[active] || W1112_sections.intro
  const { iconWrap, title, subtitle, badge } = header()

  return (
    <PageLayout
      theme={theme}
      chapters={W1112_chapters}
      activeId={active}
      onSelect={setActive}
      header={
        <>
          <div
            className={iconWrap()}
            style={{ background: `linear-gradient(135deg, ${W1112_T.w11}, ${W1112_T.w12})` }}
          >
            🏁
          </div>
          <div>
            <div className={title()}>코테 커리큘럼 — 최종편</div>
            <div className={subtitle()} style={{ color: W1112_T.muted }}>
              Week 11 유니온파인드·위상정렬·세그먼트트리 &nbsp;|&nbsp; Week 12 실전대비 완주
            </div>
          </div>
          <div
            className={badge()}
            style={{
              background: `linear-gradient(90deg, ${W1112_T.w11}33, ${W1112_T.w12}33)`,
              border: `1px solid ${W1112_T.w12}55`,
              color: W1112_T.w12,
            }}
          >
            🏆 FINAL
          </div>
        </>
      }
    >
      <Content />
    </PageLayout>
  )
}
