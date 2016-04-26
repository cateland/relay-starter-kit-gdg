import React from 'react';
import Relay from 'react-relay';
import {Link} from 'react-router';

class App extends React.Component {
  render() {
    const {people} = this.props;
    return (
      <div>
        <h1>Hello</h1>
        <span><Link to={`/people/${people.swapiId}`}>{people.name}</Link></span>
      </div>
    );
  }
}

export default Relay.createContainer(App, {
  fragments: {
    people: () => Relay.QL`
      fragment on People {
        id,
        swapiId,
        name
      }
    `,
    film: () => Relay.QL`
      fragment on Film {
        id,
        swapiId,
        title
      }
    ` 
  },
});
