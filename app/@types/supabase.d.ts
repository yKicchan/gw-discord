import "@supabase";

declare module "@supabase/gotrue-js" {
  interface UserMetadata extends DiscordUserMetaData {}
}

interface DiscordUserMetaData {
  avatar_url: string;
  custom_claims: {
    global_name: string;
  };
  email: string;
  email_verified: boolean;
  full_name: string;
  iss: string;
  name: string;
  phone_verified: boolean;
  picture: string;
  provider_id: string;
  sub: string;
}
