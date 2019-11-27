import React from 'react';
import './Row.css';
import Cell from '../Cell';

function Row(props) {
  return (
    <div className="row" id={props.colId}>
      {props.row.map((val, index) => {
        const uniqueId = `${props.rowId}_col${index}`;
        return <Cell key={uniqueId} 
                    val={val}
                    changeCell={props.changeCell}
                    cellId={uniqueId} />
      })}
    </div>
  );
}

export default Row;
