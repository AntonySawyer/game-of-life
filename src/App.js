import React, { Component } from 'react';
import './App.css';
import Navbar from './components/Navbar';
import Field from './components/Field';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isStarted: false,
      field: new Array(5).fill(new Array(5).fill(0))
    };
  }

  setNewField() {
    const width = +document.getElementById('fieldWidth').value;
    const height = +document.getElementById('fieldHeigth').value;
    const blankField = new Array(width).fill(new Array(height).fill(0));
    this.setState({field: blankField});
  }

  playControl() {
    if (this.state.isStarted) {
      this.stopGame();
    } else {
      this.startNewGame();
    }
  }

  startNewGame() {
    this.setNewField();
    this.setState({
      isStarted: true
    })
    console.log('something here');
  }

  stopGame() {
    this.setState({isStarted: false});
  }

  clearAll() {
    this.stopGame();
    this.setNewField();
  }

  changeCell(cellId) {
    const cell = document.getElementById(cellId);
    const currentCellState = cell.innerText;
    cell.innerText = +currentCellState === 0 ? 1 : 0;
  }

  render() {
    return (
      <div className="App">
        <Navbar isStarted={this.state.isStarted}
                setNewField={this.setNewField.bind(this)} 
                playControl={this.playControl.bind(this)}
                stopGame={this.stopGame.bind(this)} />
        <Field field={this.state.field} 
               changeCell={this.changeCell.bind(this)} />
      </div>
    );
  }
}

export default App;
