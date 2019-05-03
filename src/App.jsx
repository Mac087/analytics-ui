import React, { Component } from 'react';
import Navbar from './components/Navbar.jsx';
import Footer from './components/Footer.jsx';
import ScatterChart from './components/Chart.jsx';

import './styles/App.css';
import Papa from 'papaparse';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      headers: [],
      colY: '',
      colX: '',
      limit: '',
      scatterData: [],
      scatterName: '',
      dataSet: 'p2p_loans',
      errorMsg: ''
    };

    this.updateData = this.updateData.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    const filePath = require('./data/ui_coding_assignment.csv');
    Papa.parse(filePath, {
      header: true,
      download: true,
      skipEmptyLines: true,
      complete: this.updateData
    });
  }

  updateData(result) {
    const data = result.data;
    const headers = Object.keys(data[0]).map(e => <option key={e} value={e}>{e}</option>);
    const scatterName = `${headers[0].key} vs ${headers[0].key}`;
    this.setState({ data, headers, scatterName, colX: headers[0].key, colY: headers[0].key });
  }

  handleChange(e) {
    this.setState({ [e.target.id]: e.target.value });
  }

  handleSubmit(e) {
    e.preventDefault();
    if (this.state.colX === this.state.colY) {
      setTimeout(() => { this.setState({ errorMsg: '' }); }, 3000);
      return this.setState({ errorMsg: 'x column and y column must be different' });
    }
    if (isNaN(this.state.limit)) {
      setTimeout(() => { this.setState({ errorMsg: '' }); }, 3000);
      return this.setState({ errorMsg: 'limit must be a number' });
    }

    let scatterData = [];
    const scatterName = `${this.state.colX} vs ${this.state.colY}`;
    this.state.data.forEach(e => {
      scatterData.push({ x: e[this.state.colX], y: e[this.state.colY] });
    });
    if (this.state.limit !== '') {
      scatterData = scatterData.slice(0, Number(this.state.limit));
    }
    this.setState({ scatterData, scatterName });
  }

  render() {
    return (
      <div className="app">
        <Navbar />
        <main role="main" className="container">
          <form onSubmit={this.handleSubmit}>
            <div className="row">
              <div className="col">
                <label htmlFor="dataSet">Dataset</label>
                <input type="text" className="form-control" id="dataSet" value={this.state.dataSet}></input>
              </div>
              <div className="col">
                <label htmlFor="colX">Column X</label>
                <select id="colX" className="form-control" onChange={this.handleChange}>
                  {this.state.headers}
                </select>
              </div>
              <div className="col">
                <label htmlFor="colY">Column Y</label>
                <select id="colY" className="form-control" onChange={this.handleChange}>
                  {this.state.headers}
                </select>
              </div>
              <div className="col">
                <label htmlFor="limit">Limit</label>
                <input type="text" className="form-control" id="limit" value={this.state.limit} onChange={this.handleChange}></input>
              </div>
              <div className="col">
                <button type="submit" className="btn btn-outline-primary">Plot</button>
              </div>
            </div>
          </form>
          <div className="row">
            {this.state.errorMsg === '' ? '' : <div class="alert alert-danger alert-dismissible fade show" role="alert">{this.state.errorMsg}</div>}
          </div>
          <div className="row graph">
            <ScatterChart data={this.state.scatterData} name={this.state.scatterName} />
          </div>
        </main>
        <Footer />
      </div>
    );
  }
}

export default App;