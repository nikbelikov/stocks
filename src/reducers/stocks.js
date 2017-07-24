const initialState = {
  items: [],
  loading: false,
};

const saveState = (state) => {
  localStorage.setItem('state', JSON.stringify(state));
  return state;
};

export default (state = initialState, action) => {
  switch (action.type) {
    case 'SET_STATE': {
      return { ...action.state };
    }

    case 'FETCH_DATA':
      return {
        ...state,
        loading: true,
      };

    case 'ADD_STOCK':
      return saveState({
        ...state,
        items: [
          ...state.items,
          {
            value: action.value,
            label: action.label,
            price: action.price,
          },
        ],
        loading: false,
      });

    case 'DELETE_STOCK':
      return saveState({
        ...state,
        items: state.items.filter(item => item.value !== action.id),
      });

    case 'UPDATE_STOCK':
      return saveState({
        ...state,
        items: state.items.map((item) => {
          if (item.value === action.value) {
            return {
              value: action.value,
              label: action.label,
              price: action.price,
            }
          }
          return item;
        }),
      });

    default:
      return state;
  }
}
