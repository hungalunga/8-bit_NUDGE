import { useState, useEffect } from "react";
import { createClient } from "@supabase/supabase-js";
import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import App from "../App";

const supabase = createClient(
  "https://suqficsxrflfgpebathx.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InN1cWZpY3N4cmZsZmdwZWJhdGh4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODcxNjk3ODQsImV4cCI6MjAwMjc0NTc4NH0.8HlWTJSEkeuM7lHOo8j572i3k_9eEF5855-th3yP3Hw"
);

export default function Login() {
  const [session, setSession] = useState(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);

  if (!session) {
    return <Auth supabaseClient={supabase} appearance={{ theme: ThemeSupa }} />;
  } else {
      return <App supabase={supabase} />;
  }
}
