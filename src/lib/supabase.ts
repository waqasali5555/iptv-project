import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.PUBLIC_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error(
    'Missing PUBLIC_SUPABASE_URL or PUBLIC_SUPABASE_ANON_KEY environment variables.',
  );
}

const getChatOperation = (input: RequestInfo | URL, init?: RequestInit) => {
  const rawUrl = input instanceof Request ? input.url : String(input);
  const method = (init?.method ?? (input instanceof Request ? input.method : 'GET')).toUpperCase();
  const pathname = new URL(rawUrl).pathname;

  if (pathname.endsWith('/auth/v1/signup') && method === 'POST') return 'anonymous_sign_in';
  if (pathname.endsWith('/rest/v1/conversations')) {
    if (method === 'GET') return 'conversation_select';
    if (method === 'POST') return 'conversation_insert';
  }
  if (pathname.endsWith('/rest/v1/messages')) {
    if (method === 'GET') return 'messages_select';
    if (method === 'POST') return 'message_insert';
  }

  return null;
};

const diagnosticFetch: typeof fetch = async (input, init) => {
  const response = await fetch(input, init);
  const operation = getChatOperation(input, init);

  if (operation && !response.ok) {
    let code = 'unknown';
    let message = 'Request failed';

    try {
      const body: unknown = await response.clone().json();
      if (body && typeof body === 'object') {
        const error = body as { code?: unknown; message?: unknown };
        if (typeof error.code === 'string') code = error.code;
        if (typeof error.message === 'string') message = error.message;
      }
    } catch {
      // Keep diagnostics limited to the HTTP status if the response is not JSON.
    }

    console.error('[Live chat]', { operation, status: response.status, code, message });
  }

  return response;
};

/** Browser-safe Supabase client. RLS protects all data accessed with this key. */
export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  global: { fetch: diagnosticFetch },
});
