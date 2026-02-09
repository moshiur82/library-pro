import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://siktvqczmcfiysglerka.supabase.co'
const supabaseAnonKey = 'sb_publishable_SpS6uRfZBylHMsUOsIq5QQ_UtnfjwZb'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)