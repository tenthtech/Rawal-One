export type CmsSeedRecordType =
  | "notice"
  | "document"
  | "city-update"
  | "community-event";

const seedNamespaces: Record<CmsSeedRecordType, string> = {
  notice: "10000000",
  document: "20000000",
  "city-update": "30000000",
  "community-event": "40000000",
};

export function getCmsSeedId(type: CmsSeedRecordType, index: number) {
  const sequence = String(index + 1).padStart(12, "0");
  return `${seedNamespaces[type]}-0000-4000-8000-${sequence}`;
}
