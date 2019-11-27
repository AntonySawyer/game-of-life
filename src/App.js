import React, { Component } from 'react';
import './App.css';
import Navbar from './components/Navbar';
import Field from './components/Field';
import checkNeibors from './utils/checkNeibors';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isStarted: false,
      field: new Array(10).fill(new Array(10).fill(0))
    };
  }

  setNewField() {
      const width = +document.getElementById('fieldWidth').value;
      const height = +document.getElementById('fieldHeigth').value;
      const blankField = new Array(width).fill(new Array(height).fill(0));
      this.setState({
        field: blankField
      });
  }

  playControl() {
    if (this.state.isStarted) {
      this.stopGame();
    } else {
      this.startNewGame();
    }
  }

  startNewGame() {
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
    if (!this.state.isStarted) {
      const idArr = cellId.split('_');
      const rowIndex = +idArr[0].substring(3);
      const colIndex = +idArr[1].substring(3);
      this.setState((prevState, props) => {
        const targetRow = prevState.field[rowIndex].slice();
        targetRow[colIndex] = targetRow[colIndex] === 0 ? 1 : 0;
        prevState.field[rowIndex] = targetRow;
        return prevState;
      })
    }
  }

  nextStep() {
    this.setState({field: checkNeibors(this.state.field)});
  }

  render() {
    return (
      <div className="App">
        <Navbar isStarted={this.state.isStarted}
                setNewField={this.setNewField.bind(this)} 
                playControl={this.playControl.bind(this)}
                stopGame={this.stopGame.bind(this)}
                clearAll={this.clearAll.bind(this)}
                nextStep={this.nextStep.bind(this)} />
        <Field field={this.state.field} 
               changeCell={this.changeCell.bind(this)} />
      </div>
    );
  }
}

export default App;
