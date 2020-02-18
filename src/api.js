import axios from 'axios'

const port = 3000

export const api = axios.create({
  baseURL: `http://localhost:${port}/api`
})

export const ws = new WebSocket(`ws://localhost:${port}/api`)