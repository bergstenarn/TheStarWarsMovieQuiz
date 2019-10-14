import React from 'react';
import './Smiley.css';

const Smiley = ( { smileyAreaVisibility, answerIsCorrect } ) => {
  let thumbsUpSmileyURL = "http://www.i2symbol.com/pictures/emojis/a/f/f/2/aff22723ab391b694c9bcae65ee2da76_384.png";
  let thumbsDownSmileyURL = "http://www.i2symbol.com/pictures/emojis/4/9/7/2/49724b4bd12443c9764ffb57cabbce24_384.png";
  let smileyURL = thumbsDownSmileyURL;
  if (answerIsCorrect) {
    smileyURL = thumbsUpSmileyURL;
  }

  const refreshPage = () => {
    window.location.reload();
  }

  return (
    <div className={smileyAreaVisibility}>
      <button type="button" onClick={refreshPage} style={{background: 'Transparent', border: 'none'}}>
        <img src={smileyURL} alt='smiley' height='240' width='240'/>
        <p>Try again</p>
      </button>
    </div>
  );
}

export default Smiley;
