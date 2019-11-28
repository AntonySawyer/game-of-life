import React, { Component } from 'react';
import './App.css';
import Navbar from './components/Navbar';
import Field from './components/Field';
import checkNeibors from './utils/checkNeibors';
import LoadPage from './components/LoadPage';
import SavePage from './components/SavePage';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isStarted: false,
      field: new Array(10).fill(new Array(10).fill(0)),
      game: '',
      interval: 500,
      generationNum: 0,
      loadPage: false,
      savePage: false,
      saves: ''
    };
    this.nextStep = this.nextStep.bind(this);
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
    if (!this.state.loadPage && !this.state.savePage) {
      if (this.state.isStarted) {
        this.stopGame();
      } else {
        this.startNewGame();
      }
    } else {
      this.setState({loadPage: false, savePage: false});
    }
  }

  startNewGame() {
    this.setState({
      isStarted: true,
      game: setInterval(this.nextStep, this.state.interval)
    })
  }

  stopGame() {
    this.setState({isStarted: false});
    clearInterval(this.state.game);
  }

  clearAll() {
    this.stopGame();
    this.setNewField();
    this.setState({generationNum: 0});
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
    this.setState((prevState) => {
      return {field: checkNeibors(this.state.field), generationNum: prevState.generationNum+1}
    });
  }

  changeSpeed(e) {
    this.setState({interval: e.target.value});
    if (this.state.isStarted) {
      this.stopGame();
      this.startNewGame();
    }
  }

  showLoadPage() {
    fetch('/load', {
      method: 'post',
      headers: {'Content-Type':'application/json'},
      body: {}
    }).then(response => response.json())
      .then(result => {
        this.setState({
          loadPage: true,
          savePage: false,
          saves: result
        })
      })
  }

  showSavePage() {
    this.setState({savePage: true, loadPage: false});
  }

  saveGame() {
    const name = document.getElementById('saveName').value;
    const fieldSerial = this.serialField(this.state.field);
    fetch('/save', {
      method: 'post',
      headers: {'Content-Type':'application/x-www-form-urlencoded'},
      body: `name=${name}&field=${fieldSerial}`
    });
    this.setState({savePage: false});
  }

  serialField(field) {
    return field.join('|');
  }

  deserialField(str) {
    return str.split('|').map(inner => inner.split(',').map(el => +el));
  }
  loadGame(e) {
    let targetField;
    this.state.saves.forEach(el => {
      if (el._id === e.target.id) {
        targetField = this.deserialField(el.field);
      }
    });
    this.setState({field: targetField, loadPage: false});
  }

  forvard() {
    const length = +document.getElementById('forvard').value;
    console.log(`forvard to ${length}`);
    let modifiedField = this.state.field.slice();
    for (let i = 0; i < length; i++) {
      modifiedField = checkNeibors(modifiedField).slice();
    }
    this.setState((prevState) => {
      return {field: modifiedField, generationNum: prevState.generationNum + length}
    });
  }

  render() {
    return (
      <div className="App">
        <Navbar isStarted={this.state.isStarted}
                setNewField={this.setNewField.bind(this)} 
                playControl={this.playControl.bind(this)}
                stopGame={this.stopGame.bind(this)}
                clearAll={this.clearAll.bind(this)}
                nextStep={this.nextStep.bind(this)}
                changeSpeed={this.changeSpeed.bind(this)}
                generationNum={this.state.generationNum}
                showLoadPage={this.showLoadPage.bind(this)}
                showSavePage={this.showSavePage.bind(this)}
                forvard={this.forvard.bind(this)} />
        
        {this.state.loadPage && <LoadPage saves={this.state.saves} loadGame={this.loadGame.bind(this)} />}
        {this.state.savePage && <SavePage saveGame={this.saveGame.bind(this)} />}
        {!this.state.loadPage && !this.state.savePage && <Field field={this.state.field} changeCell={this.changeCell.bind(this)} />}
      </div>
    );
  }
}

export default App;
