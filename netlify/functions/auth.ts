import { Handler } from '@netlify/functions';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.VITE_SUPABASE_URL!,
  process.env.VITE_SUPABASE_ANON_KEY!
);

export const handler: Handler = async (event) => {
  try {
    const { type, email, password } = JSON.parse(event.body || '{}');

    switch (type) {
      case 'signup': {
        const { data, error } = await supabase.auth.signUp({
          email,
          password,
        });
        if (error) throw error;
        return {
          statusCode: 200,
          body: JSON.stringify(data),
        };
      }

      case 'login': {
        const { data, error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });
        if (error) throw error;
        return {
          statusCode: 200,
          body: JSON.stringify(data),
        };
      }

      default:
        return {
          statusCode: 400,
          body: JSON.stringify({ error: 'Invalid type' }),
        };
    }
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: (error as Error).message }),
    };
  }
};