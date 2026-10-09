type IconName =
  | "search"
  | "arrow"
  | "waste"
  | "water"
  | "document"
  | "road"
  | "park"
  | "licence"
  | "light"
  | "clock";

const paths: Record<IconName, string> = {
  search: "M21 21l-5.2-5.2M18 10.5a7.5 7.5 0 1 1-15 0 7.5 7.5 0 0 1 15 0Z",
  arrow: "M4 12h16m-6-6 6 6-6 6",
  waste: "M5 7h14M9 7V4h6v3M7 7l1 13h8l1-13M10 11v6m4-6v6",
  water:
    "M12 3c3.5 4.5 6 7.8 6 11a6 6 0 0 1-12 0c0-3.2 2.5-6.5 6-11ZM9 14a3 3 0 0 0 3 3",
  document: "M6 3h8l4 4v14H6zM14 3v5h4M9 12h6m-6 4h6",
  road: "M8 3 4 21M16 3l4 18M12 4v4m0 4v3m0 4v2",
  park: "M12 3 5 14h14L12 3ZM12 14v7M6 21h12",
  licence: "M4 6h16v12H4zM8 10h3m-3 4h8",
  light: "M8 21h8M12 21V9M6 9h12l-2-6H8l-2 6ZM8 13l-2 2m10-2 2 2",
  clock: "M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0ZM12 7v5l3 2",
};

export function CivicIcon({
  name,
  className = "",
}: {
  name: IconName;
  className?: string;
}) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d={paths[name]} />
    </svg>
  );
}
