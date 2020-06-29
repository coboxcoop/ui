import {EventEmitter} from 'events'
import axios from 'axios'

const port = process.env.VUE_APP_API_PORT

export const api = axios.create({
  baseURL: `http://localhost:${port}/api`
})

const socketEndpoints = {
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
    // FIXME: Some ambiguity in the payload response?
    const type = payload.type || (payload.data ? payload.data.type : null)
    console.info(name, type, payload)
    events.emit(type, payload)
  }
})