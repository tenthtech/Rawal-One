import { BRAND_MARK } from "@/lib/brand-identity";

export function BrandMark({ className = "" }: { className?: string }) {
  return (
    <svg
      aria-hidden="true"
      focusable="false"
      viewBox={BRAND_MARK.viewBox}
      fill="none"
      className={className}
    >
      <path
        d={BRAND_MARK.blocks}
        fill="currentColor"
      />
      <path
        d={BRAND_MARK.connections}
        stroke="currentColor"
        strokeWidth={BRAND_MARK.connectionWidth}
      />
      <path d={BRAND_MARK.centre} fill={BRAND_MARK.centreColour} />
    </svg>
  );
}
