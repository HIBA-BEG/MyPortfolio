import { defineConfig, loadEnv, type Plugin } from 'vite'
import react from '@vitejs/plugin-react'
import { fetchOwnedRepoCount } from './api/repos'

function reposApi(token: string | undefined): Plugin {
  const attach = (middlewares: { use: (fn: (req: unknown, res: NodeResponse, next: () => void) => void) => void }) => {
    middlewares.use((req, res, next) => {
      const request = req as { url?: string; method?: string }
      const path = request.url?.split('?')[0]
      if (path !== '/api/repos') {
        next()
        return
      }
      if (request.method !== 'GET') {
        res.statusCode = 405
        res.end()
        return
      }
      void fetchOwnedRepoCount(token)
        .then((total) => {
          res.setHeader('Content-Type', 'application/json')
          res.setHeader('Cache-Control', 'no-store')
          res.end(JSON.stringify({ total }))
        })
        .catch(() => {
          res.statusCode = 503
          res.setHeader('Content-Type', 'application/json')
          res.end(JSON.stringify({ error: 'unavailable' }))
        })
    })
  }

  return {
    name: 'repos-api',
    configureServer(server) {
      attach(server.middlewares)
    },
    configurePreviewServer(server) {
      attach(server.middlewares)
    },
  }
}

type NodeResponse = {
  statusCode: number
  setHeader: (name: string, value: string) => void
  end: (body?: string) => void
}

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, '.', '')
  return {
    plugins: [react(), reposApi(env.GITHUB_TOKEN)],
  }
})
