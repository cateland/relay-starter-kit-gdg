import axios from 'axios';
import _ from 'lodash';

export const findIdFromUrl = url => {
    return /([0-9]+)\/$/.exec(url)[1];
};

export function People(data){
    this.id = findIdFromUrl(data.url);
    this.swapiId = findIdFromUrl(data.url);
    this.name = data.name;
    this.gender = data.gender;
    this.url = data.url;
    this.films = data.films.map(filmsUrl => {
        return findIdFromUrl(filmsUrl);
    });
};

export function Film(data){
    this.id = findIdFromUrl(data.url);
    this.swapiId = findIdFromUrl(data.url);
    this.title = data.title;
    this.characters = data.characters.map(characterUrl => {
       return findIdFromUrl(characterUrl); 
    });
}

export const peopleDataFetcher = _.memoize(id => {
    return axios.get(`http://swapi.co/api/people/${id}/`)
        .then(response => {
            return new People(response.data)
        })
});

export const filmDataFetcher = _.memoize(id => {
    return axios.get(`http://swapi.co/api/films/${id}/`)
        .then(response => {
            return new Film(response.data)
        })
});