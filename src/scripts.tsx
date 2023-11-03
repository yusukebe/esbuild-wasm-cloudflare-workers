/// <reference lib="DOM" />

import { renderToString } from 'https://esm.sh/react-dom@18.2.0/server'
import React from 'https://esm.sh/react@18.2.0'

const add = (num1: number, num2: number): number => {
  return num1 + num2
}

const Component = () => (
  <div>
    <h1>
      Hello from <code>/static/hello.tsx</code>
    </h1>
    <p>{add(1, 2).toString()}</p>
  </div>
)

addEventListener('DOMContentLoaded', () => {
  const root = document.getElementById('root')
  if (root) {
    root.innerHTML = renderToString(<Component />)
  }
})
