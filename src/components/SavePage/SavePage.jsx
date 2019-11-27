import React from 'react';
import './SavePage.css';

function SavePage(props) {
  return (
    <section className="saveWrapper">
      <input type="text" id="saveName" />
      <input type="button" value="Save" onClick={props.saveGame} />
    </section>
  );
}

export default SavePage;
