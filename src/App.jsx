import { useState, useEffect } from 'react'
import { createClient } from '@supabase/supabase-js'
import { Auth } from '@supabase/auth-ui-react'
import { ThemeSupa } from '@supabase/auth-ui-shared'

const supabase = createClient('https://hwvuhynhrisqnmqtqtpu.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imh3dnVoeW5ocmlzcW5tcXRxdHB1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDQwNjg3OTgsImV4cCI6MjAxOTY0NDc5OH0.gp7uWrzqBFJB09bYsxjygAiFPqws7W-US9-yi3j7loU')

export default function App() {
  const [session, setSession] = useState(null)

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session)
    })

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
    })

    return () => subscription.unsubscribe()
  }, [])

  const handleSignOut = async () => {
    await supabase.auth.signOut()
    setSession(null)
  }

  if (!session) {
    return (<Auth supabaseClient={supabase} appearance={{ theme: ThemeSupa }} />)
  } else {
    return (
      <div>
        <div>Logged in!</div>
        <button className='bg-blue-300 rounded-lg p-1' onClick={handleSignOut}>Sign Out</button>
      </div>
    )
  }
}