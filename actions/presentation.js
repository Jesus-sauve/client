import fetch from 'isomorphic-fetch';
import { API } from '../config';


export const createPresentation = (presentation) => {

    return fetch(`${API}/presentation`, {
        method: 'POST',
        headers: {
            Accept: 'application/json'
        },
        body: presentation
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
};

export const showPresentation = () => {

    return fetch(`${API}/presentation`, {
        method: 'GET'
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
};


export const onePresentation = slug => {

    return fetch(`${API}/presentation/${slug}`, {
        method: 'GET'
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
};

export const updatePresentation = (presentation, slug) => {

    return fetch(`${API}/presentation/${slug}`, {
        method: 'PUT',
        headers: {
            Accept: 'application/json'
        },
        body: presentation
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
};





