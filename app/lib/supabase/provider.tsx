import { Session, SupabaseClient } from "@supabase/supabase-js";
import { createContext, ProviderProps, useContext } from "react";

type SupabaseContext = {
  client: SupabaseClient | null;
  session: Session | null;
};

const SupabaseContext = createContext<SupabaseContext>({
  client: null,
  session: null,
});

export function SupabaseProvider({ value, children }: ProviderProps<SupabaseContext>) {
  return <SupabaseContext.Provider value={value}>{children}</SupabaseContext.Provider>;
}

export function useSupabase() {
  return useContext(SupabaseContext);
}
