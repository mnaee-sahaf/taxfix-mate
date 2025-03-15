
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
  },
  plugins: [
    react(),
    mode === 'development' &&
    componentTagger(),
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  define: {
    'process.env.SUPABASE_URL': JSON.stringify(process.env.SUPABASE_URL || 'https://riwyowmbpwkqgjkbdxkr.supabase.co'),
    'process.env.SUPABASE_ANON_KEY': JSON.stringify(process.env.SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJpd3lvd21icHdrcWdqa2JkeGtyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDE5OTc5MTYsImV4cCI6MjA1NzU3MzkxNn0.sNZ2exqRF4_XR8rOUZTEBhTqcjOVxCeYe8Yno361o6c'),
    'process.env.SITE_URL': JSON.stringify(process.env.SITE_URL || 'http://localhost:8080'),
  },
}));
