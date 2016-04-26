import React from 'react';
import Relay from 'react-relay';
import {People} from './People';

class CreateIncrementVoteMutation extends Relay.Mutation {
  static fragments = {
    vote: () => Relay.QL`
      fragment on Vote { id }
    `,
  };
  getMutation() {
    return Relay.QL`
      mutation { incrementVote }
    `;
  }
  getFatQuery() {
    return Relay.QL`
      fragment on IncrementVotePayload { 
        vote
      }
    `;
  }
  getConfigs() {
    return [{
      type: 'FIELDS_CHANGE',
      fieldIDs: { vote: this.props.vote.id },
    }];
  }
  getVariables() {
    return { id: this.props.vote.id };
  }
}

const VoteComponent = React.createClass({
  _handleClick(e){
    e.preventDefault();
    Relay.Store.commitUpdate(
      new CreateIncrementVoteMutation({
        vote: this.props.vote
      })
    );
  },
  render(){
    const {vote} = this.props;
    return(<div><People people={vote.node} /> (count: {vote.count}) <button onClick={this._handleClick}>Vote</button></div>)
  }
});

export const Vote = Relay.createContainer(VoteComponent, {
  fragments: {
    vote: () =>  Relay.QL`
      fragment on Vote {
        id,
        node{
          ${People.getFragment('people')}
        },
        count,
        ${CreateIncrementVoteMutation.getFragment('vote')}
      }
    `
  }
});

const SondageCard = React.createClass({
  render() {
    return (
      <div>
        <h1>Sondage</h1>
        <h2>
            {this.props.sondage.titre}
        </h2>
        <ul>
          {this.props.sondage.votes.edges.map(this._renderVote)}
        </ul>
      </div>
    );
  },
  _renderVote(vote, i){
    return <li key={i}><Vote vote={vote.node} /></li>
  }
});

export default Relay.createContainer(SondageCard, {
  fragments: {
    sondage: () => Relay.QL`
      fragment on Sondage {
        titre,
        votes (first: 10){
          edges {
            node {
              ${Vote.getFragment('vote')}
            }
          }
        }
      }
    `,
  },
});