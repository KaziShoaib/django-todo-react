import todoService from '../services/Todos'

const todoListReducer = (state = [], action) => {
  switch(action.type){
    case 'NEW_TODO':
      return [...state, action.data]
    case 'EDIT_TODO':
      const id = action.data.id      
      return state.map(item => item.id === id ? action.data : item)
    case 'INIT_TODOLIST':
      return action.data
    case 'DELETE_TODO':
      return state.filter(item => item.id !== action.id)
    default:
        return state
  }
}

export const deleteTodoItem = id => {
  return async dispatch => {
    const returnedItem = await todoService.removeItem(id)
    dispatch({
      type: 'DELETE_TODO',
      id
    })
  }
}

export const createTodoItem = item => {
  return async dispatch => {
    const returnedItem = await todoService.createItem(item)
    dispatch({
      type: 'NEW_TODO',
      data: returnedItem
    })
  }
}

export const editTodoItem = item => {
  return async dispatch => {
    const returnedItem = await todoService.editItem(item.id, item)
    dispatch({
      type: 'EDIT_TODO',
      data: returnedItem
    })
  }
}

export const initializeTodoList = () => {
  return async dispatch => {
    const todoList = await todoService.getAll()
    dispatch({
      type: 'INIT_TODOLIST',
      data: todoList
    })
  }
}

export default todoListReducer