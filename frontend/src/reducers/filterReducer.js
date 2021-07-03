const filterReducer = (state = true, action) => {
  switch(action.type){
    case 'SET_FILTER':
      return action.data
    default:
      return state
  }
}

export const setFilter = (status) => {
  return {
    type: 'SET_FILTER',
    data: status
  }
}

export default filterReducer