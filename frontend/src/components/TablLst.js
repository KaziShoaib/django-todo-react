import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setFilter } from '../reducers/filterReducer'

const TabList = () => {
  const dispatch = useDispatch()
  const filter = useSelector(state => state.filter)

  return (
    <div className="nav nav-tabs">
      <span 
        className={filter ? "nav-link active" : "nav-link"}
        onClick = {() => dispatch(setFilter(true))}
      >
        Complete
      </span>
      <span 
        className={filter ? "nav-link" : "nav-link active"}
        onClick = {() => dispatch(setFilter(false))}
      >
        Incomplete
      </span>
    </div>
  )
}

export default TabList