import React from 'react';
import Relay from 'react-relay';
import {Link} from 'react-router';
import {People} from './People';

const FilmComponent = React.createClass({
  render(){
    const {film} = this.props;
    return(<Link to={`/film/${film.swapiId}`}>{film.title}</Link>)
  }
});

export const Film = Relay.createContainer(FilmComponent, {
  fragments: {
    film: () =>  Relay.QL`
      fragment on Film {
        id,
        swapiId,
        title
      }
    `
  }
});

class FilmCard extends React.Component {
  render() {
    return (
      <div>
        <h1>Films details</h1>
        <h2>
            Titre: {this.props.film.title}
            <ul>
              {this.props.film.characters.edges.map(this._renderCharacters)}
            </ul>
        </h2>
      </div>
    );
  }
  _renderCharacters(character,i){
    return <li key={i}>
        <People people={character.node}/>
      </li>
  }
}

export default Relay.createContainer(FilmCard, {
  fragments: {
    film: () => Relay.QL`
      fragment on Film {
        title,
        characters (first: 10){
          edges {
            node {
              ${People.getFragment('people')}
            }
          }
        }
      }
    `,
  },
});
