import React from 'react';
import Movie from './Movie';

const MovieList = ( { movies, movieClick } ) => {
  return (
    <div>
      { movies.map(({episode_id, title, release_date}) => {return <Movie key={episode_id} episode_id={episode_id} title={title} release_date={release_date} movieClick={movieClick} />}) }
    </div>
  );
}

export default MovieList;
