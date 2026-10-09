export function BrandMark({ className = "" }: { className?: string }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 44 44"
      fill="none"
      className={className}
    >
      <path
        d="M2 2h16v16H2zM26 2h16v16H26zM2 26h16v16H2zM26 26h16v16H26z"
        fill="currentColor"
      />
      <path
        d="m16 16 6 6m6-6-6 6m-6 6 6-6m6 6-6-6"
        stroke="currentColor"
        strokeWidth="4"
      />
      <path d="M18 18h8v8h-8z" fill="#c39448" />
    </svg>
  );
}
