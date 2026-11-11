import { createClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.PUBLIC_SUPABASE_URL;
const supabaseKey = import.meta.env.PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  throw new Error(
    "Supabase configuration is missing. Check your .env file.",
  );
}

export const supabase = createClient(supabaseUrl, supabaseKey);

export async function getAuthenticatedUser() {
  let timeoutId: ReturnType<typeof setTimeout> | undefined;

  try {
    const { data, error } = await Promise.race([
      supabase.auth.getSession(),
      new Promise<never>((_, reject) => {
        timeoutId = setTimeout(
          () => reject(new Error("Session check timed out.")),
          15_000,
        );
      }),
    ]);

    return { data: { user: data.session?.user ?? null }, error };
  } finally {
    if (timeoutId !== undefined) clearTimeout(timeoutId);
  }
}