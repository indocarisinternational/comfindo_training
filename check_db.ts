import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://zzzhcaolumbumjtzcvkp.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inp6emhjYW9sdW1idW1qdHpjdmtwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njg0NjIxMTcsImV4cCI6MjA4NDAzODExN30.dN7-R0dqJ4RTM0VFcH7JUVfZYk3TZqCUometdRAi4lw'
const supabase = createClient(supabaseUrl, supabaseKey)

async function check() {
  const { data, error } = await supabase.from('training_programs').select('*').limit(1)
  if (error) {
    console.error("Error fetching:", error)
  } else {
    console.log("Data keys:", data.length > 0 ? Object.keys(data[0]) : "No data")
    console.log("Data:", data)
  }
}

check()
