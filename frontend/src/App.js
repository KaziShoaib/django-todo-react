import React, {useState, useEffect} from "react";
import Modal from './components/Modal'
import todoService from './services/Todos'


const App = () => {
  const [viewCompleted, setViewCompleted] = useState(true)
  const [todoList, setTodoList] = useState([])
  const [modal, setModal] = useState(false)
  const blankItem = {title:"", description:"", completed:false}
  const [activeItem, setActiveItem] = useState(blankItem)

  useEffect(() => {
    todoService
      .getAll()
      .then(initialTodos => setTodoList(initialTodos))
  })
  
  const displayCompleted = (status) => setViewCompleted(status)

  const toggle = () => setModal(!modal)

  const handleSubmit = (item) => {
    console.log(item)
    toggle()
    if(!item.id){
      if(window.confirm("do you want to add new item?")){
        todoService
          .createItem(item)
          .then(returnedItem => {
            console.log(returnedItem)
            setTodoList(todoList.concat(returnedItem))
          })
          .catch(error => console.log(error))
      }
    }
    else{
      if(window.confirm("save changes?")){
        todoService
          .editItem(item.id, item)
          .then(returnedItem => 
            setTodoList(todoList.map(todo => todo.id === returnedItem.id ? returnedItem : todo))  
          )
      }
    }
  }

  const handleDelete = (item) => {
    if(window.confirm(`delete ${item.title}?`)){
      todoService
        .removeItem(item.id)
        .then(returnedItem => 
          setTodoList(todoList.filter(todo => todo.id !== item.id))
        )
    }
  }

  const createItem = () => {
    setActiveItem(blankItem)
    toggle()
  }

  const editItem = (item) => {
    setActiveItem(item)
    toggle()
  }

  const renderTabList = () => {
    return (
      <div className="nav nav-tabs">
        <span 
          className={viewCompleted ? "nav-link active" : "nav-link"}
          onClick = {() => displayCompleted(true)}
        >
          Complete
        </span>
        <span 
          className={viewCompleted ? "nav-link" : "nav-link active"}
          onClick = {() => displayCompleted(false)}
        >
          Incomplete
        </span>
      </div>
    )
  }

  const renderItems = () => {
    const newItems = todoList.filter(item => item.completed === viewCompleted)
    return (
      <ul className='list-group list-group-flush bt-0'>
        {
          newItems.map(item => (
            <li 
              key={item.id}
              className='list-group-item d-flex justify-content-between align-items-center'
            >
              <span
                className={`todo-title mr-2 ${
                  viewCompleted ? "completed-todo" : ""}
                `}
                title={item.description}
              >
                {item.title}
              </span>
              <span>
                <button
                  className='btn btn-secondary mr-2'
                  onClick={() => editItem(item)}
                >
                  Edit
                </button>
                <button
                  className='btn btn-danger'
                  onClick={() => handleDelete(item)}
                >
                  Delete
                </button>
              </span>
            </li>
          ))
        }
      </ul>
    )
  }

  return (
    <main className='container'>
      <h1 className='text-white text-uppercase text-center my-4'>Todo App</h1>
      <div className='row'>
        <div className='col-md-6 col-sm-10 mx-auto p-0'>
          <div className='card p-3'>
            <div className='mb-4'>
              <button className='btn btn-primary' onClick={createItem}>
                Add Task
              </button>
            </div>
            {renderTabList()}
            {renderItems()}
          </div>
        </div>
      </div>
      {modal ? (
        <Modal
          activeItem={activeItem}
          toggle={toggle}
          onSave={handleSubmit}
        />
      ) : null}
    </main>
  )

}


export default App;


