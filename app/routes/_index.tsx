import type { MetaFunction } from "@remix-run/cloudflare";
import { SupabaseAuth, useSupabase } from "~/lib/supabase";

export const meta: MetaFunction = () => {
  return [{ title: "GWD" }, { name: "description", content: "Welcome to GWD community page!" }];
};

export default function Index() {
  const ctx = useSupabase();

  if (!ctx) return null;

  if (!ctx.session) {
    return <SupabaseAuth client={ctx.client} />;
  }
  return (
    <>
      <div>
        Hello {ctx.session.user.user_metadata.custom_claims.global_name || ctx.session.user.user_metadata.full_name}!!
      </div>
      <button onClick={() => ctx.client.auth.signOut()}>sing out</button>
    </>
  );
}
