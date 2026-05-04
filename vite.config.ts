import { defineConfig, loadEnv, type Plugin } from 'vite'

const contactApiPlugin = (): Plugin => ({
  name: 'contact-api-dev',
  configureServer(server) {
    server.middlewares.use('/api/contact', async (req, res) => {
      if (req.method === 'POST') {
        try {
          const chunks: Uint8Array[] = []
          for await (const chunk of req) {
            chunks.push(typeof chunk === 'string' ? Buffer.from(chunk) : chunk)
          }
          const rawBody = Buffer.concat(chunks).toString('utf8')
          ;(req as typeof req & { body?: unknown }).body = rawBody ? JSON.parse(rawBody) : {}
        } catch {
          res.statusCode = 400
          res.setHeader('Content-Type', 'application/json')
          res.end(JSON.stringify({ ok: false, error: 'Invalid JSON body' }))
          return
        }
      }

      try {
        const mod = await import('./api/contact.js')
        await mod.default(req, res)
      } catch {
        res.statusCode = 500
        res.setHeader('Content-Type', 'application/json')
        res.end(JSON.stringify({ ok: false, error: 'Internal server error' }))
      }
    })
  },
})

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  if (!process.env.RESEND_API_KEY && env.RESEND_API_KEY) {
    process.env.RESEND_API_KEY = env.RESEND_API_KEY
  }

  return {
    plugins: [contactApiPlugin()],
  }
})
