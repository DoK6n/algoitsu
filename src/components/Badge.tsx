import { tv } from 'tailwind-variants'

const complexityBadge = tv({
  slots: {
    wrap: 'inline-flex gap-2 text-xs',
    time: 'bg-[#1a2744] border border-[#00d4ff] text-[#00d4ff] px-2 py-0.5 rounded-full',
    space: 'bg-[#1a1744] border border-[#7c3aed] text-[#7c3aed] px-2 py-0.5 rounded-full',
  },
})

const badge = tv({
  base: 'px-2.5 py-0.5 rounded-full text-xs font-semibold border',
})

interface ComplexityBadgeProps {
  time: string
  space: string
}

export function ComplexityBadge({ time, space }: ComplexityBadgeProps) {
  const { wrap, time: timeSlot, space: spaceSlot } = complexityBadge()
  return (
    <span className={wrap()}>
      <span className={timeSlot()}>시간 {time}</span>
      <span className={spaceSlot()}>공간 {space}</span>
    </span>
  )
}

interface BadgeProps {
  children: React.ReactNode
  color?: string
  className?: string
}

export function Badge({ children, color = '#7eff6a', className }: BadgeProps) {
  return (
    <span
      className={badge({ className })}
      style={{ background: `${color}22`, borderColor: `${color}55`, color }}
    >
      {children}
    </span>
  )
}
