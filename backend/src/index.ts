import { serve } from '@hono/node-server'
import { Hono } from 'hono'
import process from 'node:process'

process.loadEnvFile(".env")

const app = new Hono()

app.get('/', (c) => {
  return c.text('Hello Hono!')
})



serve({
  fetch: app.fetch,
  port: Number(process.env.PORT)
}, (info) => {
  console.log(`Server is running on http://localhost:${info.port}`)
})
