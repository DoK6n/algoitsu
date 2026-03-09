import { tv } from "tailwind-variants";

const sectionTitle = tv({
  slots: {
    root: "mb-6",
    title: "m-0 text-[22px] font-extrabold font-mono",
    sub: "text-[#5a6e50] mt-1.5 mb-0 text-sm",
  },
});

interface SectionTitleProps {
  children: React.ReactNode;
  sub?: string;
  color?: string;
}

export function SectionTitle({
  children,
  sub,
  color = "#7eff6a",
}: SectionTitleProps) {
  const { root, title, sub: subSlot } = sectionTitle();
  return (
    <div className={root()}>
      <h2 className={title()} style={{ color }}>
        {children}
      </h2>
      {sub && <p className={subSlot()}>{sub}</p>}
    </div>
  );
}
