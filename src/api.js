import axios from 'axios'

const port = process.env.API_PORT || 3000

export const api = axios.create({
  baseURL: `http://localhost:${port}/api`
})

const ws = new WebSocket(`ws://localhost:${port}/api`)
const wsDev = new WebSocket(`ws://localhost:${port}/api/devices`)

ws.onmessage = event => {
  const data = JSON.parse(event.data)
  console.warn(data)
}
ws.onopen = () => console.warn('ws opened')
ws.onerror = err => console.warn('ws error', err)

wsDev.onmessage = event => {
  const data = JSON.parse(event.data)
  console.warn(data)
}
wsDev.onopen = () => console.warn('ws opened')
wsDev.onerror = err => console.warn('ws error', err)
