import React from 'react';

const Movie = ( { episode_id, title, release_date, movieClick } ) => {
  return (
    <h2 className='tc bg-light-green dib br3 pa3 ma2 grow bw2 shadow-5' onClick={movieClick}>{title}</h2>
  )
}

export default Movie;
