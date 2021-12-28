import React from 'react';
import PropTypes from 'prop-types';
import MovieCard from './MovieCard';

export default class MovieList extends React.Component {
  render() {
    const { movies } = this.props;
    const moviesList = movies.map(
      (movie) => <MovieCard key={ movie.title } movie={ movie } />,
    );
    return (
      <section className="movie-list">
        { moviesList }
      </section>
    );
  }
}

MovieList.propTypes = {
  movies: PropTypes.arrayOf(PropTypes.object).isRequired,
};
