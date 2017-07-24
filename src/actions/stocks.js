import yahooStocks from 'yahoo-stocks';

export const setState = (state) => {
  return dispatch => {
    dispatch({
      type: 'SET_STATE',
      state,
    });
  }
};

export const addStock = (value, label) => {
  return dispatch => {
    dispatch({
      type: 'FETCH_DATA',
    });

    yahooStocks.lookup(value).then(response => {
      const price = response.currentPrice;

      dispatch({
        type: 'ADD_STOCK',
        value,
        label,
        price,
      });
    })
      .catch(() => {
        alert(`We're sorry :( There are problems with getting data from this company.`);
      });
  }
};

export const deleteStock = (id) => {
  return dispatch => {
    dispatch({
      type: 'DELETE_STOCK',
      id,
    });
  }
};

const getStockData = (stock) => {
  return dispatch => {
    yahooStocks.lookup(stock.value).then(response => {
      const price = response.currentPrice;

      dispatch({
        type: 'UPDATE_STOCK',
        value: response.symbol,
        label: response.name,
        price,
      });
    });
  }
};

export const updateStocks = (stocks) => {
  return dispatch => {
    stocks.forEach(stock => {
      dispatch(getStockData(stock));
    })
  }
};
