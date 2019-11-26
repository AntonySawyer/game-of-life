import React from 'react';
import './Navbar.css';

function Navbar(props) {
  return (
    <header>
      <input type="number" id="fieldWidth" defaultValue="10" onChange={props.setNewField} />
      <span>x</span>
      <input type="number" id="fieldHeigth" defaultValue="10" onChange={props.setNewField} />
      <input type="button" id="playBtn" value={props.isStarted ? 'Stop' : 'Start'} onClick={props.playControl} />
      <input type="button" value="Clear all" />
      <input type="button" value="Next generation"/>
      <input type="button" value="save" />
      <input type="button" value="load" />
      <input type="button" value="-" />
      <input type="text" defaultValue="interval" />
      <input type="button" value="+" />
      <span>12368 generation</span>
    </header>
  );
}

export default Navbar;
