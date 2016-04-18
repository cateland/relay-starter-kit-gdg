import Relay from 'react-relay';

export default class extends Relay.Route {
  static queries = {
    people: () => Relay.QL`
      query {
        people(id:$userID)
      }
    `,
  };
  static paramDefinitions = {
    userID: {required: true},
  };
  static routeName = 'AppHomeRoute';
}
