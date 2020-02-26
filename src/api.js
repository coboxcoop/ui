import axios from 'axios'

const port = 3000

export const api = axios.create({
  baseURL: `http://localhost:${port}/api`
})

const ws = new WebSocket(`ws://localhost:${port}/api`)

ws.onmessage = event => {
  const data = JSON.parse(event.data)
  console.warn(data)
}
ws.onopen = () => console.warn('ws opened')
ws.onerror = err => console.warn('ws error', err)