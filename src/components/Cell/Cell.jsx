import React from 'react';
import './Cell.css';

function Cell(props) {
  const classForCell = props.val === 0 ? 'empty' : 'filled';
  return (
    <div id={props.cellId} className={classForCell} onClick={() => props.changeCell(props.cellId)}></div>
  );
}

export default Cell;
