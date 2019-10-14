import React, { Component } from 'react';
import MovieList from '../stateless/MovieList';
import Scroll from '../stateless/Scroll';
import Smiley from '../stateless/Smiley';
import './App.css';
import {shuffle, find, sortBy, zip, initial} from 'underscore';

class App extends Component {
  constructor() {
    super()
    this.state = {
      upperMovieList: [],
      lowerMovieList: [],
      correctMovieList: [],
      initialMovieList: [],
      answerIsCorrect: false,
      lowerMovieListVisibility: "visible",
      smileyAreaVisibility: "hidden",
    };
  };

  componentDidMount() {
    fetch('https://swapi.co/api/films')
    .then(response => response.json())
    .then(movies => this.setState({ initialMovieList: movies.results, correctMovieList: sortBy(movies.results, "release_date"), lowerMovieList: shuffle(movies.results) }));
  }

  onMovieClick = (event) => {
    const titleOfMovieToMove = event.target.textContent
    if (this.state.lowerMovieList.some(movie => movie.title === titleOfMovieToMove))  {
      {/* The movie clicked is in the lower list */}
      if (this.state.upperMovieList.length + 1 === this.state.initialMovieList.length ) {
        {/* The upper list will contain all movies after the move */}
        if (zip(this.state.upperMovieList, initial(this.state.correctMovieList)).reduce((acc, [upperMovie, correctMovie]) => {return acc && (upperMovie.release_date === correctMovie.release_date)}, true)) {
          {/* The order of movies in the upper list will be correct after the move */}
          this.setState({ answerIsCorrect: true, lowerMovieListVisibility: "hidden", smileyAreaVisibility: "visible" });
        } else {
          {/* The order of movies in the upper list will be incorrect after the move */}
          this.setState({ answerIsCorrect: false, lowerMovieListVisibility: "hidden", smileyAreaVisibility: "visible" });
        }
      }
      {/* The upper list will not contain all movies after the move */}
      {/* So move the movie clicked from the lower list to the upper list */}
      const movieToMove = find(this.state.lowerMovieList, movie => movie.title === titleOfMovieToMove);
      this.setState({ lowerMovieList: this.state.lowerMovieList.filter(movie => movie.title  !== titleOfMovieToMove), upperMovieList: this.state.upperMovieList.concat([movieToMove]) });
    } else {
      {/* The movie clicked is in the upper list */}
      if (this.state.lowerMovieListVisibility === "visible") {
        {/* The lower movie list is visible */}
        {/* So move the movie clicked from the upper list to the lower list */}
        const movieToMove = find(this.state.upperMovieList, movie => movie.title === titleOfMovieToMove);
        this.setState({ upperMovieList: this.state.upperMovieList.filter(movie => movie.title  !== titleOfMovieToMove), lowerMovieList: this.state.lowerMovieList.concat([movieToMove]) });
      }
    }
  }

  render() {
    if (this.state.initialMovieList.length === 0) {
      return <h2 className='loading'>Loading ...</h2>;
    } else {
      return (
        <div className='tc'>
          <h1 className='f1'>The Star Wars Movie Quiz</h1>
          <Scroll scrollAreaVisibility="visible">
            <MovieList movies={this.state.upperMovieList} movieClick={this.onMovieClick} />
          </Scroll>
          <p className='f3 instruction'>Select the movies below in release date order.</p>
          <Scroll scrollAreaVisibility={this.state.lowerMovieListVisibility}>
            <MovieList movies={this.state.lowerMovieList} movieClick={this.onMovieClick} />
          </Scroll>
          <Smiley smileyAreaVisibility={this.state.smileyAreaVisibility} answerIsCorrect={this.state.answerIsCorrect} />
        </div>
      )
    }
  }
}

export default App;