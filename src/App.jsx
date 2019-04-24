import React, { Component } from 'react';
import Navbar from './components/Navbar.jsx';
import Footer from './components/Footer.jsx';
import './styles/App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      colY: '',
      colX: '',
      dataSet: 'p2p_loans'
    };
  }
  render() {
    return (
      <div className="app">
        <Navbar />
        <main role="main" className="container">
          <form>
            <div className="row">
              <div className="col">
                <label htmlFor="dataSet">Dataset</label>
                <input type="text" className="form-control" id="dataSet" value={this.state.dataSet}></input>
              </div>
              <div className="col">
                <label htmlFor="colX">Column X</label>
                <input type="text" className="form-control" id="colX" value={this.state.colX}></input>
              </div>
              <div className="col">
                <label htmlFor="colY">Column X</label>
                <input type="text" className="form-control" id="colY" value={this.state.colY}></input>
              </div>
              <div className="col">
                <label htmlFor="limit">Column X</label>
                <input type="text" className="form-control" id="limit" value={this.state.limit}></input>
              </div>
              <div className="col">
                <button type="submit" class="btn btn-outline-primary">Plot</button>
              </div>
            </div>
          </form>
          <div className="row">
            GRAPH
          </div>
        </main>
        <Footer />
      </div>
    );
  }
}

export default App;