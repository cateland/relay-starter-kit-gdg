/**
 * ./data/database.js
 */

// Model types

export function Sondage(data){
    this.id = data.id
    this.titre = data.titre;
    this.nodeType = data.nodeType
    this.votes = data.votes;
}

export function Vote(data){
  this.id = data.id;
  this.node = data.node;
  this.count = data.count;
}

const sondages = [
  new Sondage({
    id: "1",
    titre: 'Votre personnage préfére',
    nodeType: 'People',
    votes: ["1","2","3", "4", "5"],
    voters: []
  })
];

const votes = [
  new Vote({id: "1", node: 1, count: 0}),
  new Vote({id: "2", node: 2, count: 0}),
  new Vote({id: "3", node: 3, count: 0}),
  new Vote({id: "4", node: 4, count: 0}),
  new Vote({id: "5", node: 5, count: 0})
]


export const incrementVote = (idVote) => {
  const vote = votes.find(element => {
    return element.id = idVote;
  });
  vote.count += 1;
  return vote;
};

export const addVote = (idSondage, idVote, idPeople) => {
  const newVote = new Vote({id: idVote, node: idPeople, count: 0});
  votes.push(newVote);
  sondages.find(sondage => sondage.id === idSondage).votes.push(idVote);
  return newVote;
};

export const removeVote = (idSondage, idVote) => {
  const sondage = sondages.find(
    sondage => sondage.id === idSondage
  );
  console.info('sondage', sondage);
  const indexVoteSondageToRemove = sondage.votes.findIndex(vote => vote === idVote);
  console.info('indexVoteSondageToRemove', indexVoteSondageToRemove);
  sondage.votes.splice(indexVoteSondageToRemove, 1);
  
  const indexVoteToRemove = votes.findIndex(vote => vote.id === idVote);
  console.info('indexVoteToRemove', indexVoteToRemove);
  votes.splice(indexVoteToRemove,1);
  return 'deleted';
}

export const getVote = idVote => {
  return votes.find(element => {
    return element.id === idVote;
  });
}

export const getSondage = idSondage => {
  return sondages.find(element => {
    return element.id === idSondage;
  });
}