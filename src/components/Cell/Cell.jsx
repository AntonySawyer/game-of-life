import React from 'react';
import './Cell.css';

function Cell(props) {
  return (
    <div id={props.cellId} onClick={() => props.changeCell(props.cellId)}>{props.val }</div>
  );
}

export default Cell;
