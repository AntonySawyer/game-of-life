import React from 'react';
import './LoadPage.css';

function LoadPage(props) {
  return (
    <section>
      <h3>Click to load</h3>
      {props.saves.map(save => {
        return <li key={save._id} id={save._id} onClick={props.loadGame}>{save.name}</li>
      })}
    </section>
  );
}

export default LoadPage;
