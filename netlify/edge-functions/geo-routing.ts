import { Context } from '@netlify/edge-functions';

export default async (request: Request, context: Context) => {
  const country = context.geo?.country?.code || 'US';
  const language = request.headers.get('Accept-Language')?.split(',')[0] || 'en';

  // Add country and language info to request
  const url = new URL(request.url);
  url.searchParams.set('country', country);
  url.searchParams.set('language', language);

  // Forward the modified request
  return fetch(url.toString(), {
    headers: request.headers,
    method: request.method,
    body: request.body,
  });
};