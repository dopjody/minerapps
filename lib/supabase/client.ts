import { createBrowserClient } from '@supabase/ssr'

const SUPABASE_URL = "https://ltpndziqodmxmpjkwbnc.supabase.co";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imx0cG5kemlxb2RteG1wamt3Ym5jIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzAwMzg2NDQsImV4cCI6MjA4NTYxNDY0NH0.7T__VTb-UorjNt6BrxIPkMjYdgL97zRp_JXzcxn23Xk";

export function createClient() {
    return createBrowserClient(
        SUPABASE_URL,
        SUPABASE_ANON_KEY
    )
}
