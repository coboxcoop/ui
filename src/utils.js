export function formatTimestamp (timestamp) {
  const date = new Date(timestamp)
  const hour = date.getHours() >= 10 ? date.getHours() : `0${date.getHours()}`
  const minute = date.getMinutes() >= 10 ? date.getMinutes() : `0${date.getMinutes()}`
  const day = date.getDate() >= 10 ? date.getDate() : `0${date.getDate()}`
  const month = date.getMonth() + 1
  const monthzero = month >= 10 ? month : `0${month}`
  const year = date.getFullYear().toString().slice(2, 4)
  return `${hour}:${minute} on ${day}/${monthzero}/${year}`
}
