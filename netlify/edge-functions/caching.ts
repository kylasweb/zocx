import { Context } from '@netlify/edge-functions';

export default async (request: Request, context: Context) => {
  const response = await context.next();
  const url = new URL(request.url);

  // Cache static assets
  if (url.pathname.startsWith('/assets/')) {
    const newResponse = new Response(response.body, response);
    newResponse.headers.set('Cache-Control', 'public, max-age=31536000, immutable');
    return newResponse;
  }

  // Cache API responses
  if (url.pathname.startsWith('/api/')) {
    const newResponse = new Response(response.body, response);
    newResponse.headers.set('Cache-Control', 'public, max-age=60');
    return newResponse;
  }

  return response;
};