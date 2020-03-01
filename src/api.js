import {EventEmitter} from 'events'
import axios from 'axios'

const port = process.env.API_PORT || 3000

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

const wsDev = new WebSocket(`ws://localhost:${port}/api/devices`)

wsDev.onmessage = event => {
  const data = JSON.parse(event.data)
  console.warn(data)
}
wsDev.onopen = () => console.warn('ws opened')
wsDev.onerror = err => console.warn('ws error', err)

export const events = new EventEmitter()

ws.onmessage = event => {
  events.emit('event', event)
}

wsDev.onmessage = event => {
  events.emit('deviceEvent', event)
}
