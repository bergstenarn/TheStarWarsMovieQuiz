import React from 'react';
import './Scroll.css';

const Scroll = ( { scrollAreaVisibility, children } ) => {
  return (
    <div  className={scrollAreaVisibility}>
      <div style={{overflowY: 'scroll', border: '1px solid silver', margin: '40px', height: '250px'}}>
        {children}
      </div>
    </div>
  )
};

export default Scroll;
