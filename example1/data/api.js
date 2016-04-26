import axios from 'axios';

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

export const peopleDataFetcher = id => {
    return axios.get(`http://swapi.co/api/people/${id}/`)
        .then(response => {
            return new People(response.data)
        })
};