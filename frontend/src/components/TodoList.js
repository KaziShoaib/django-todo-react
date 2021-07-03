import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { deleteTodoItem } from '../reducers/todoListReducer'
import { setModal } from '../reducers/modalReducer'
import { setActiveItem } from '../reducers/activeItemReducer'

const TodoItem = ( {item, handleDelete, handleEdit} ) => {
  return (
    <li
      className='list-group-item d-flex justify-content-between align-items-center'
    >
      <span
        className={'todo-title mr-2'}
        title={item.description}
      >
        {item.title}
      </span>
      <span>
        <button
          className='btn btn-secondary mr-2'
          onClick={handleEdit}
        >
          Edit
        </button>
        <button
          className='btn btn-danger'
          onClick={handleDelete}
        >
          Delete
        </button>
      </span>
    </li>
  )
}


const TodoList = () => {
  const dispatch = useDispatch()
  const todoList = useSelector(state => state.todoList.filter(item => item.completed === state.filter))

  return (
    <ul className='list-group list-group-flush bt-0'>
      {todoList.map(item => 
        <TodoItem 
          key={item.id}
          item = {item}
          handleDelete = {() => {
            if(window.confirm(`delete ${item.title}?`)){
              dispatch(deleteTodoItem(item.id))
            }
          }}
          handleEdit = {() => {
            dispatch(setActiveItem(item))
            dispatch(setModal(true))            
          }}
        />
      )}
    </ul>
  )
}

export default TodoList