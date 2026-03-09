export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[];

export type Database = {
  public: {
    Tables: {
      newsletter_subscribers: {
        Row: {
          confirmed: boolean;
          created_at: string;
          email: string;
          id: string;
          source: string | null;
        };
        Insert: {
          confirmed?: boolean;
          created_at?: string;
          email: string;
          id?: string;
          source?: string | null;
        };
        Update: {
          confirmed?: boolean;
          created_at?: string;
          email?: string;
          id?: string;
          source?: string | null;
        };
        Relationships: [];
      };
      contact_messages: {
        Row: {
          created_at: string;
          email: string;
          id: string;
          message: string;
          name: string;
          read: boolean;
          subject: string | null;
        };
        Insert: {
          created_at?: string;
          email: string;
          id?: string;
          message: string;
          name: string;
          read?: boolean;
          subject?: string | null;
        };
        Update: {
          created_at?: string;
          email?: string;
          id?: string;
          message?: string;
          name?: string;
          read?: boolean;
          subject?: string | null;
        };
        Relationships: [];
      };
      blog_views: {
        Row: {
          id: string;
          slug: string;
          updated_at: string;
          views: number;
        };
        Insert: {
          id?: string;
          slug: string;
          updated_at?: string;
          views?: number;
        };
        Update: {
          id?: string;
          slug?: string;
          updated_at?: string;
          views?: number;
        };
        Relationships: [];
      };
      blog_reactions: {
        Row: {
          count: number;
          emoji: string;
          id: string;
          slug: string;
          updated_at: string;
        };
        Insert: {
          count?: number;
          emoji: string;
          id?: string;
          slug: string;
          updated_at?: string;
        };
        Update: {
          count?: number;
          emoji?: string;
          id?: string;
          slug?: string;
          updated_at?: string;
        };
        Relationships: [];
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      increment_reaction: {
        Args: {
          post_slug: string;
          reaction_emoji: string;
        };
        Returns: number;
      };
      increment_view: {
        Args: {
          post_slug: string;
        };
        Returns: number;
      };
    };
    Enums: {
      [_ in never]: never;
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
};
