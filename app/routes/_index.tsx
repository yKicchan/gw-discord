import type { MetaFunction } from "@remix-run/cloudflare";
import { SupabaseAuth } from "~/lib/supabase/supabase-auth";
import { useSupabase } from "~/lib/supabase/provider";

export const meta: MetaFunction = () => {
  return [{ title: "GWD" }, { name: "description", content: "Welcome to GWD community page!" }];
};

export default function Index() {
  const { client, session } = useSupabase();

  if (!client) return null;

  if (!session) {
    return <SupabaseAuth client={client} />;
  }

  return (
    <>
      <div>Hello {session.user.user_metadata.custom_claims.global_name || session.user.user_metadata.full_name}!!</div>
      <button onClick={() => client.auth.signOut()}>sing out</button>
    </>
  );
}
