import { createClient, Session, SupabaseClient } from "@supabase/supabase-js";
import { useEffect, useState } from "react";

let _client: SupabaseClient | null = null;

export function useSupabaseInit(url: string, key: string) {
  const [client, setClient] = useState<SupabaseClient | null>(_client);
  const [session, setSession] = useState<Session | null>(null);

  useEffect(() => {
    if (!_client) {
      _client = createClient(url, key);
      setClient(_client);
    }

    if (!client) return;

    client.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    const {
      data: { subscription },
    } = client.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, [client, session]);

  return { client, session };
}
