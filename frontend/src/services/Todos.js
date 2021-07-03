import axios from 'axios'

let baseURL = '/api/todos/'

const getAll = async () => {
  let response = await axios.get(baseURL)
  return response.data
}

const createItem = async (newObject) => {
  let response = await axios.post(baseURL, newObject)
  return response.data
}

const removeItem = async (id) => {
  let response = await axios.delete(`${baseURL}${id}/`)
  return response.data
}

const editItem = async (id, newObjedt) => {
  let response = await axios.put(`${baseURL}${id}/`, newObjedt)
  return response.data
}

export default {getAll, createItem, removeItem, editItem}