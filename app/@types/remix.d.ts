declare module "@remix-run/server-runtime" {
  interface AppLoadContext {
    env: EventContext["env"] & {
      NODE_ENV: string;
      SUPABASE_URL: string;
      SUPABASE_ANON_KEY: string;
    };
  }
}
