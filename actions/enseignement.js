import fetch from 'isomorphic-fetch';
import { API } from '../config';
import queryString from 'query-string';

export const createEnseignement = (enseignement) => {
    return fetch(`${API}/enseignement`, {
        method: 'POST',
        headers: {
            Accept: 'application/json'
        },
        body: enseignement
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
};

export const listEnseignementWithCategories = (skip, limit) => {

    const data = {
        limit, skip
    }
    
    return fetch(`${API}/enseignements-categories`, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
};

export const singleEnseignement = slug => {
    return fetch(`${API}/enseignement/${slug}`, {
        method: 'GET'
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
};


export const list = (code) => {
    return fetch(`${API}/enseignements`, {
        method: 'GET'
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
};

export const removeEnseignement = (slug) => {

    return fetch(`${API}/enseignement/${slug}`, {
        method: 'DELETE',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        }
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
};

export const updateEnseignement = (enseignement, slug) => {

    return fetch(`${API}/enseignement/${slug}`, {
        method: 'PUT',
        headers: {
            Accept: 'application/json'
        },
        body: enseignement
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
};

export const listSearch = (params) => {
    console.log('search params', params);
    let query = queryString.stringify(params);
    console.log('query params', query);
    return fetch(`${API}/enseignements/recherche?${query}`, {
        method: 'GET'
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
};

export const listRelated = enseignement => {
    return fetch(`${API}/enseignements/related`, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(enseignement)
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
};




