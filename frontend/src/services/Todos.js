import axios from 'axios'

let baseURL = '/api/todos/'

const getAll = () => {
  let request = axios.get(baseURL)
  return request.then(response => response.data)
}

const createItem = (newObject) => {
  let request = axios.post(baseURL, newObject)
  return request.then(response => response.data)
}

const removeItem = (id) => {
  let request = axios.delete(`${baseURL}${id}/`)
  return request.then(response => response.data)
}

const editItem = (id, newObjedt) => {
  let request = axios.put(`${baseURL}${id}/`, newObjedt)
  return request.then(response => response.data)
}

export default {getAll, createItem, removeItem, editItem}