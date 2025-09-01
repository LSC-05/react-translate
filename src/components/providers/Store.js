export const reducer = (state, action) => {
  switch (action.type) {
    case "save":
      return saveTextList(state, action);

    case "delete":
      return deleteTextList(state, action);

    case "star":
      return changeStar(state, action);

    default:
      return state;
  }
};

const saveTextList = (state, action) => {
  const { data } = action.payload;

  const id = state.textlist.length + 1;
  data.id = id;
  data.isStar = false;
  return{
    ...state,
    textlist: state.textlist.concat(data),
  }
};

const deleteTextList = (state, action) => {
  const {id} = action.payload;
  
  return{
    ...state,
    textlist: state.textlist.filter(t => t.id !== id),
  }
};

const changeStar = (state, action) => {
  const {id} = action.payload;
  
  return{
    ...state,
    textlist: state.textlist.map(t => {
      if(t.id === id){
        return{
          ...t,
          isStar : !t.isStar,
        };
      }
      return t;
    })
  }
};
