import React from 'react';
import Relay from 'react-relay';
import {Link} from 'react-router';
import {Film} from './Film';

const PeopleComponent = React.createClass({
  render(){
    const {people} = this.props;
    return(<Link to={`/people/${people.swapiId}`}>{people.name}</Link>)
  }
});

export const People = Relay.createContainer(PeopleComponent, {
  fragments: {
    people: () =>  Relay.QL`
      fragment on People {
        id,
        swapiId,
        name
      }
    `
  }
});

const PeopleCard = React.createClass({
  render() {
    return (
      <div>
        <h1>People details</h1>
        <h2>
            Nom: {this.props.people.name}<br />
            sexe: {this.props.people.gender}
            <ul>
              {this.props.people.films.edges.map(this._renderFilms)}
            </ul>
        </h2>
      </div>
    );
  },
  _renderFilms(film, i){
    return <li key={i}>
        <Film film={film.node} />
      </li>
  }
});

export default Relay.createContainer(PeopleCard, {
  fragments: {
    people: () => Relay.QL`
      fragment on People {
        name,
        gender,
        films (first: 10){
          edges {
            node {
              ${Film.getFragment('film')}
            }
          }
        }
      }
    `,
  },
});
