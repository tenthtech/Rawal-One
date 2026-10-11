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

export type CmsStatus = "draft" | "published" | "inactive";

export type NoticeRow = {
  id: string;
  title: string;
  category: string;
  summary: string;
  body: string;
  status: CmsStatus;
  published_at: string | null;
  closing_at: string | null;
  keywords: string[];
  created_at: string;
  updated_at: string;
};

export type NoticeInsert = {
  id?: string;
  title: string;
  category: string;
  summary: string;
  body: string;
  status?: CmsStatus;
  published_at?: string | null;
  closing_at?: string | null;
  keywords?: string[];
  created_at?: string;
  updated_at?: string;
};

export type DocumentRow = {
  id: string;
  title: string;
  description: string;
  category: string;
  document_type: string;
  file_name: string;
  file_url: string;
  storage_path: string | null;
  file_size_bytes: number | null;
  status: CmsStatus;
  published_at: string | null;
  keywords: string[];
  created_at: string;
  updated_at: string;
};

export type DocumentInsert = {
  id?: string;
  title: string;
  description: string;
  category: string;
  document_type?: string;
  file_name: string;
  file_url: string;
  storage_path?: string | null;
  file_size_bytes?: number | null;
  status?: CmsStatus;
  published_at?: string | null;
  keywords?: string[];
  created_at?: string;
  updated_at?: string;
};

export type CityUpdateRow = {
  id: string;
  title: string;
  category: string;
  summary: string;
  status: CmsStatus;
  published_at: string | null;
  keywords: string[];
  created_at: string;
  updated_at: string;
};

export type CityUpdateInsert = {
  id?: string;
  title: string;
  category: string;
  summary: string;
  status?: CmsStatus;
  published_at?: string | null;
  keywords?: string[];
  created_at?: string;
  updated_at?: string;
};

export type CommunityEventRow = {
  id: string;
  title: string;
  summary: string;
  location: string | null;
  starts_at: string;
  ends_at: string | null;
  status: CmsStatus;
  published_at: string | null;
  keywords: string[];
  created_at: string;
  updated_at: string;
};

export type CommunityEventInsert = {
  id?: string;
  title: string;
  summary: string;
  location?: string | null;
  starts_at: string;
  ends_at?: string | null;
  status?: CmsStatus;
  published_at?: string | null;
  keywords?: string[];
  created_at?: string;
  updated_at?: string;
};

export type Database = {
  public: {
    Tables: {
      alerts: {
        Row: AlertRow;
        Insert: AlertInsert;
        Update: AlertUpdate;
        Relationships: [];
      };
      notices: {
        Row: NoticeRow;
        Insert: NoticeInsert;
        Update: Partial<NoticeInsert>;
        Relationships: [];
      };
      documents: {
        Row: DocumentRow;
        Insert: DocumentInsert;
        Update: Partial<DocumentInsert>;
        Relationships: [];
      };
      city_updates: {
        Row: CityUpdateRow;
        Insert: CityUpdateInsert;
        Update: Partial<CityUpdateInsert>;
        Relationships: [];
      };
      community_events: {
        Row: CommunityEventRow;
        Insert: CommunityEventInsert;
        Update: Partial<CommunityEventInsert>;
        Relationships: [];
      };
    };
    Views: Record<string, never>;
    Functions: Record<string, never>;
  };
};
