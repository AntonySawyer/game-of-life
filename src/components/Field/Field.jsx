import React from 'react';
import './Field.css';
import Row from '../Row';

function Field(props) {
  return (
    <section className="field">
      {props.field.map((row, index) => {
        const uniqueId = `col${index}`;
        return <Row key={uniqueId} row={row} changeCell={props.changeCell} colId={uniqueId} />
      })}
    </section>
  );
}

export default Field;
