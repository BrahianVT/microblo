export async function onRequest(context, next) {
  context.locals.SITE_URL = `${import.meta.env.SITE ?? ''}${import.meta.env.BASE_URL}`
  context.locals.RSS_URL = `${context.locals.SITE_URL}rss.xml`
  context.locals.RSS_PREFIX = ''

  if (context.url.pathname.startsWith('/search') && context.params.q?.startsWith('#')) {
    const tag = context.params.q.replace('#', '')
    context.locals.RSS_URL = `${context.locals.SITE_URL}rss.xml?tag=${tag}`
    context.locals.RSS_PREFIX = `${tag} | `
  }

  const response = await next()

  if (!response.bodyUsed) {
    if (response.headers.get('Content-type') === 'text/html') {
      response.headers.set('Speculation-Rules', '"/rules/prefetch.json"')
    }

    // Override any existing cache headers for dynamic content
    if (context.url.pathname === '/'
      || context.url.pathname.startsWith('/posts')
      || context.url.pathname.startsWith('/search')
      || context.url.pathname.startsWith('/tags')) {
      // Cloudflare-specific cache control headers
      response.headers.set('Cache-Control', 'no-cache, no-store, must-revalidate')
      response.headers.set('Pragma', 'no-cache')
      response.headers.set('Expires', '0')

      // Additional Cloudflare headers
      response.headers.set('X-Cloudflare-CDN-Cache-Control', 'no-cache')
      response.headers.set('X-Cloudflare-Edge-Cache-Control', 'no-cache')
    }
    else {
      // Allow caching for static assets and RSS
      response.headers.set('Cache-Control', 'public, max-age=300, s-maxage=300')
    }
  }
  return response
};
