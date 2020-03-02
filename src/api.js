import {EventEmitter} from 'events'
import axios from 'axios'

const port = process.env.API_PORT || 3000

export const api = axios.create({
  baseURL: `http://localhost:${port}/api`
})

const socketEndpoints = {
  devices: `ws://localhost:${port}/api/devices`,
  api: `ws://localhost:${port}/api`
}

export const events = new EventEmitter()

Object.keys(socketEndpoints).forEach(name => {
  const endpoint = socketEndpoints[name]
  const ws = new WebSocket(endpoint)
  ws.onerror = err => console.error(name, err)
  ws.onopen = () => console.info(name, 'socket opened')
  ws.onclose = () => console.info(name, 'socket closed')
  ws.onmessage = event => {
    const payload = JSON.parse(event.data)
    events.emit(payload.type, payload)
  }
})