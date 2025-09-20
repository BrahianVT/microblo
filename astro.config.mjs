import process from 'node:process'
import cloudflare from '@astrojs/cloudflare'
import netlify from '@astrojs/netlify'
import node from '@astrojs/node'
import vercel from '@astrojs/vercel/serverless'
import { defineConfig } from 'astro/config'
import { provider } from 'std-env'

const providers = {
  vercel: vercel({
    isr: false,
    edgeMiddleware: false,
  }),
  cloudflare_pages: cloudflare(),
  netlify: netlify({
    cacheOnDemandPages: false,
    edgeMiddleware: false,
  }),
  node: node({
    mode: 'standalone',
  }),
}

const adapterProvider = process.env.SERVER_ADAPTER || provider

// https://astro.build/config
export default defineConfig({
  output: 'server',
  adapter: providers[adapterProvider] || providers.node,

  vite: {
    ssr: {
      noExternal: process.env.DOCKER ? !!process.env.DOCKER : undefined,
      external: [
        ...adapterProvider === 'cloudflare_pages'
          ? [
              'module',
              'url',
              'events',
              'worker_threads',
              'async_hooks',
              'util',
              'node:diagnostics_channel',
              'node:net',
              'node:tls',
              'node:worker_threads',
              'node:util',
              'node:fs',
              'node:path',
              'node:process',
              'node:buffer',
              'node:string_decoder',
              'node:readline',
              'node:events',
              'node:stream',
              'node:assert',
              'node:os',
              'node:crypto',
              'node:zlib',
              'node:http',
              'node:https',
              'node:url',
              'node:querystring',
              'node:child_process',
              'node:inspector',
            ]
          : [],
      ],
    },

  },
  // Add this for server-rendered pages
  server: {
    headers: {
      'Cache-Control': 'no-cache, no-store, must-revalidate',
      'Pragma': 'no-cache',
      'Expires': '0',
    },
  },
})
