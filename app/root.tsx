import type { LinksFunction, LoaderFunctionArgs } from "@remix-run/cloudflare";
import { Links, LiveReload, Meta, Outlet, Scripts, ScrollRestoration, useLoaderData } from "@remix-run/react";
import styles from "./tailwind.css";
import { createClient, Session } from "@supabase/supabase-js";
import { SupabaseProvider } from "~/lib/supabase";
import { useEffect, useMemo, useState } from "react";

export const links: LinksFunction = () => [{ rel: "stylesheet", href: styles }];

export async function loader({ context }: LoaderFunctionArgs) {
  return {
    ENV: {
      SUPABASE_URL: context.env.SUPABASE_URL as string,
      SUPABASE_ANON_KEY: context.env.SUPABASE_ANON_KEY as string,
    },
  };
}

export default function App() {
  const { ENV } = useLoaderData<ReturnType<typeof loader>>();
  const client = useMemo(() => createClient(ENV.SUPABASE_URL, ENV.SUPABASE_ANON_KEY), [ENV]);
  const [session, setSession] = useState<Session | null>(null);
  useEffect(() => {
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

  return (
    <html lang="en" className="dark:bg-neutral-900 dark:text-white">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
        <title>GWD</title>
      </head>
      <body>
        <SupabaseProvider value={{ client, session }}>
          <Outlet />
        </SupabaseProvider>
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}
