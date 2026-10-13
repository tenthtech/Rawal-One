export function ExternalArrow({ className = "h-4 w-4 shrink-0" }: { className?: string }) {
  return (
    <svg aria-hidden="true" focusable="false" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M6 18 18 6M6 6h12v12" />
    </svg>
  );
}
