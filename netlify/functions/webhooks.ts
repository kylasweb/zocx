import { Handler } from '@netlify/functions';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.VITE_SUPABASE_URL!,
  process.env.VITE_SUPABASE_ANON_KEY!
);

export const handler: Handler = async (event) => {
  try {
    const { type, data } = JSON.parse(event.body || '{}');

    // Log webhook event
    await supabase
      .from('webhook_logs')
      .insert([
        {
          type,
          payload: data,
          headers: event.headers,
        },
      ]);

    // Process webhook based on type
    switch (type) {
      case 'commission_paid':
        // Handle commission payment webhook
        break;

      case 'rank_advanced':
        // Handle rank advancement webhook
        break;

      default:
        return {
          statusCode: 400,
          body: JSON.stringify({ error: 'Unsupported webhook type' }),
        };
    }

    return {
      statusCode: 200,
      body: JSON.stringify({ message: 'Webhook processed successfully' }),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: (error as Error).message }),
    };
  }
};