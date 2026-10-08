import type { AlertSeverity, AlertStatus } from "@/lib/alert-model";

export type AlertRow = {
  id: string;
  severity: AlertSeverity;
  title: string;
  message: string;
  affected_area: string;
  status: AlertStatus;
  more_info_url: string | null;
  published_at: string | null;
  expires_at: string | null;
  created_at: string;
  updated_at: string;
};

export type AlertInsert = {
  id?: string;
  severity: AlertSeverity;
  title: string;
  message: string;
  affected_area: string;
  status?: AlertStatus;
  more_info_url?: string | null;
  published_at?: string | null;
  expires_at?: string | null;
  created_at?: string;
  updated_at?: string;
};

export type AlertUpdate = Partial<AlertInsert>;

export type Database = {
  public: {
    Tables: {
      alerts: {
        Row: AlertRow;
        Insert: AlertInsert;
        Update: AlertUpdate;
        Relationships: [];
      };
    };
    Views: Record<string, never>;
    Functions: Record<string, never>;
  };
};
