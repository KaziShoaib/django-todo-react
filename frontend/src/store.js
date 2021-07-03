import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'

import activeItemReducer from './reducers/activeItemReducer'
import filterReducer from './reducers/filterReducer'
import modalReducer from './reducers/modalReducer'
import todoListReducer from './reducers/todoListReducer'

const reducer = combineReducers({
  todoList: todoListReducer,
  activeItem: activeItemReducer,
  filter: filterReducer,
  modal: modalReducer
})

const store = createStore(
  reducer,
  composeWithDevTools(
    applyMiddleware(thunk)
  )
)

export default store