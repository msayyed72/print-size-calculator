type AdSlotProps = {
  placement: "after-calculator" | "before-guide";
};

export default function AdSlot({ placement }: AdSlotProps) {
  return (
    <aside
      className={`adSlot adSlot-${placement}`}
      aria-label="Advertisement"
      data-ad-placement={placement}
    >
      <span>Advertisement</span>
    </aside>
  );
}
