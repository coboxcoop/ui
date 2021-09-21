import {EventEmitter} from 'events'
import axios from 'axios'

const port = process.env.VUE_APP_API_PORT

export const baseURL = `http://localhost:${port}/api`

export const api = axios.create({baseURL, withCredentials: true})

export const events = new EventEmitter()

var socket = null

export function openWS () {
  if (socket) return
  socket = new WebSocket(`ws://localhost:${port}/api`)

  socket.onerror = (err) => console.error(err)
  socket.onopen = () => console.info('socket opened')
  socket.onclose = () => console.info('socket closed')

  socket.onmessage = event => {
    const payload = JSON.parse(event.data)
    // FIXME: Some ambiguity in the payload response?
    const type = payload.type || (payload.data ? payload.data.type : null)
    console.info(type, payload)
    events.emit(type, payload)
  }
}

export function closeWS () {
  if (!socket) return
  socket.close()
  socket = null
}
