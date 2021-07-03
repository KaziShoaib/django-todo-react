import React, { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"

import Modal from './components/Modal'
import NewTask from "./components/NewTask"
import TabList from "./components/TablLst"
import TodoList from "./components/TodoList"

import { initializeTodoList } from "./reducers/todoListReducer"

const App = () => {
  const dispatch = useDispatch()
  
  useEffect(() => {
    dispatch(initializeTodoList())
  }, [dispatch]) 
  
  const modal = useSelector(state => state.modal)

  return (
    <main className='container'>
      <h1 className='text-white text-uppercase text-center my-4'>Todo App</h1>
      <div className='row'>
        <div className='col-md-6 col-sm-10 mx-auto p-0'>
          <div className='card p-3'>
            <NewTask />
            <TabList />
            <TodoList />
          </div>
        </div>
      </div>
      {modal ? (
        <Modal/>
      ) : null}
    </main>
  )

}


export default App;


