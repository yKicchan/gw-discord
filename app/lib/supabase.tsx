import { Session, SupabaseClient } from "@supabase/supabase-js";
import { createContext, ProviderProps, useContext, useEffect, useState } from "react";
import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";

type SupabaseContext = {
  client: SupabaseClient;
  session: Session | null;
};

const SupabaseContext = createContext<SupabaseContext | null>(null);

export function SupabaseProvider({ value, children }: ProviderProps<SupabaseContext>) {
  return <SupabaseContext.Provider value={value}>{children}</SupabaseContext.Provider>;
}

export function useSupabase() {
  return useContext(SupabaseContext);
}

type Props = {
  client: SupabaseClient;
};

export function SupabaseAuth({ client }: Props) {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    setIsDark(mediaQuery.matches);

    const mediaQueryListener = (e: MediaQueryListEvent) => {
      setIsDark(e.matches);
    };
    mediaQuery.addEventListener("change", mediaQueryListener);

    return () => {
      mediaQuery.removeEventListener("change", mediaQueryListener);
    };
  }, []);

  return (
    <Auth
      supabaseClient={client}
      appearance={{
        theme: ThemeSupa,
      }}
      theme={isDark ? "dark" : "light"}
      providers={["discord"]}
      onlyThirdPartyProviders
    />
  );
}
