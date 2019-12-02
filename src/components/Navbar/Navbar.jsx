import React from 'react';
import './Navbar.css';

function Navbar(props) {
  return (
    <header>
      <section>
        <input type="number" id="fieldWidth" disabled={props.isStarted ? true : false} defaultValue="10" onChange={props.setNewField} />
        <span>x</span>
        <input type="number" id="fieldHeigth" disabled={props.isStarted ? true : false} defaultValue="10" onChange={props.setNewField} />
        <input type="button" id="playBtn" value={props.isStarted ? 'Stop' : 'Start'} onClick={props.playControl} />
        <input type="button" value="Clear all" onClick={props.clearAll} />
        <input type="button" value="Next generation" onClick={props.nextStep} />
        <input type="button" value="save" onClick={props.showSavePage} />
        <input type="button" value="load" onClick={props.showLoadPage} />
      </section>
      <section>
        <input type="number" id="forward" defaultValue="10" />
        <input type="button" value="Forward >>" onClick={props.forward} />
        <input type="number" id="interval" defaultValue="500" step="50" min="50" 
          onChange={props.changeSpeed} />
        <span>{`Generation №${props.generationNum}`}</span>
        {!!props.period && <span>{` Cycle period = ${props.period}`}</span>}
      </section>
    </header>
  );
}

export default Navbar;
