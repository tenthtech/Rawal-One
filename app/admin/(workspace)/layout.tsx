import type { ReactNode } from "react";

import { AdminShell } from "@/components/admin-shell";
import { requireAdminSession } from "@/lib/supabase/auth";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export default async function AdminWorkspaceLayout({
  children,
}: Readonly<{ children: ReactNode }>) {
  await requireAdminSession();

  return <AdminShell>{children}</AdminShell>;
}
