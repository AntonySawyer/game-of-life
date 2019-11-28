import React from 'react';
import './LoadPage.css';

function LoadPage(props) {
  return (
    <section className="listWrapper">
      <ul>
        {props.saves.map(save => {
          return <li key={save._id} id={save._id} onClick={props.loadGame}>{save.name}</li>
        })}
      </ul>
    </section>
  );
}

export default LoadPage;
