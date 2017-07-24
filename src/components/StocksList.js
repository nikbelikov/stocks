import React, { Component } from 'react';
import PropTypes from 'prop-types';
import stocksHelper from './../shared/stocksHelper';

export default class StocksList extends Component {
  renderStockItem(item) {
    return (
      <li
        key={stocksHelper.getKey()}
        data-id={item.value}
        onClick={this.props.onDeleteItem.bind(this)}
      >
        {`${item.value} (${item.label}) = ${item.price ? item.price : 'Loading...'}`}
      </li>
    );
  }

  render() {
    return (
      <ul>
        {this.props.items.map(item => this.renderStockItem(item))}
      </ul>
    );
  }
}

StocksList.propTypes = {
  items: PropTypes.array,
  onDeleteItem: PropTypes.func,
};
