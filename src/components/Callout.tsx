import { tv } from "tailwind-variants";

const callout = tv({
  slots: {
    root: "rounded-[10px] p-4 my-3.5 border-l-4",
    title: "font-bold mb-2",
    body: "text-[#dde8d6] leading-[1.9] text-[13.5px]",
  },
});

interface CalloutProps {
  color?: string;
  icon?: string;
  title?: string;
  children: React.ReactNode;
  className?: string;
}

export function Callout({
  color = "#7eff6a",
  icon,
  title,
  children,
  className,
}: CalloutProps) {
  const { root, title: titleSlot, body } = callout();
  return (
    <div
      className={root({ className })}
      style={{
        background: `${color}12`,
        border: `1px solid ${color}44`,
        borderLeftColor: color,
      }}
    >
      {title && (
        <div className={titleSlot()} style={{ color }}>
          {icon} {title}
        </div>
      )}
      <div className={body()}>{children}</div>
    </div>
  );
}
