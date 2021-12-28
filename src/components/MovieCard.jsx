import React from 'react';
import PropTypes from 'prop-types';
import Rating from './Rating';

export default class MovieCard extends React.Component {
  render() {
    const { movie } = this.props;
    const {
      title,
      subtitle,
      storyline,
      rating,
      imagePath,
    } = movie;

    return (
      <article className="movie-card">
        <img className="movie-card-image" src={ imagePath } alt={ title } />
        <div className="movie-card-body">
          <header>
            <h4 className="movie-card-title">{ title }</h4>
            <h5 className="movie-card-subtitle">{ subtitle }</h5>
          </header>
          <section className="movie-card-rating">
            Rating:
            <Rating rating={ rating } />
          </section>
          <p className="movie-card-storyline">{ storyline }</p>
        </div>
      </article>
    );
  }
}

MovieCard.propTypes = {
  movie: PropTypes.shape({
    title: PropTypes.string.isRequired,
    subtitle: PropTypes.string,
    storyline: PropTypes.string,
    rating: PropTypes.number,
    imagePath: PropTypes.string,
  }).isRequired,
};
