import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import Select from 'react-select';
import StocksList from './../../components/StocksList';
import 'react-select/dist/react-select.css';
import companies from './../../data/companies.json';
import config from './../../shared/config'

import './../../foundation.min.css';
import './../../styles.css';

import {
  setState,
  addStock,
  deleteStock,
  updateStocks,
} from '../../actions/stocks';

class Stocks extends Component {
  componentDidMount() {
    const state = window.localStorage.getItem('state');

    if (state) {
      let loadedState = JSON.parse(state);
      loadedState.loading = false;
      this.props.setState(loadedState);
    }

    this.autoUpdateStocks();
  }

  autoUpdateStocks() {
    setInterval(() => {
      this.handleUpdateStocks(this.props.items);
    }, config.autoUpdateInterval);
  }

  handleSelectItem(item) {
    this.props.addStock(item.value, item.label);
  }

  handleDeleteItem(e) {
    const id = e.target.getAttribute('data-id');
    this.props.deleteStock(id);
  }

  handleUpdateStocks() {
    this.props.updateStocks(this.props.items);
  }

  render () {
    const { loading } = this.props;

    return (
      <div className="main-container">
        <h1>Stocks</h1>

        <Select
          options={companies}
          onChange={this.handleSelectItem.bind(this)}
          placeholder={loading ? 'Loading...' : "Search company..."}
          disabled={loading}
        />

        <button className="button" onClick={this.handleUpdateStocks.bind(this)}>Update</button>

        <StocksList
          items={this.props.items}
          onDeleteItem={this.handleDeleteItem.bind(this)}
        />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  items: state.stocks.items,
  loading: state.stocks.loading,
});

const mapDispatchToProps = dispatch => bindActionCreators({
  setState,
  addStock,
  deleteStock,
  updateStocks,
}, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Stocks)
