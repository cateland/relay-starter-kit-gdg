import 'babel-polyfill';

import React from 'react';
import ReactDOM from 'react-dom';
import Relay from 'react-relay';

import {Router, Route, hashHistory} from 'react-router';

function createRelayContainer(Component, props) {
  if (Relay.isContainer(Component)) {
    // Construct the RelayQueryConfig from the route and the router props.
    var {name, queries} = props.route;
    var {params} = props;
    return (
      <Relay.RootContainer
        Component={Component}
        renderFetched={(data) => <Component {...props} {...data} />}
        route={{name, params, queries}}
      />
    );
  } else {
    return <Component {...props}/>;
  }
}

ReactDOM.render(
  <Router
    history={hashHistory}
    createElement={createRelayContainer}>
    <Route>
      <Route 
        name="home"
        path="/"
        component= {App}
        queries={HomeQueries}/>
      <Route
        name="people"
        path="people/:peopleID"
        component={PeopleCard}
        queries={PeopleQueries}
      />
      <Route
        name="film"
        path="film/:filmID"
        component={FilmCard}
        queries={FilmQueries}
      />
      <Route
        name="sondage"
        path="sondage/:sondageID"
        component={Sondage}
        queries={SondageQueries}
      />
    </Route>
  </Router>,
  document.getElementById('root')
);
  
  
  