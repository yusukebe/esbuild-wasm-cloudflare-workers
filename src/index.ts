import { Hono } from 'hono'
import { html } from 'hono/html'
import * as esbuild from 'esbuild-wasm'
import wasm from '../node_modules/esbuild-wasm/esbuild.wasm'
// @ts-ignore
import script from './script.tsx'

let init = false

const app = new Hono()

app.get('/script.js', async (c) => {
  if (!init) {
    await esbuild.initialize({
      wasmModule: wasm,
      worker: false
    })
    init = true
  }
  const { code } = await esbuild.transform(script, {
    loader: 'tsx'
  })
  return c.body(code, {
    headers: {
      'content-type': 'text/javascript'
    }
  })
})

app.get('/', (c) => {
  return c.html(html`
    <html>
      <head>
        <script type="module" src="/script.js"></script>
      </head>
      <body>
        <div id="root"></div>
      </body>
    </html>
  `)
})

export default app
