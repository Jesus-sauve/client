import fetch from 'isomorphic-fetch';
import { API } from '../config';

export const createBible = (bible) => {
    return fetch(`${API}/bible-en-ligne`, {
        method: 'POST',
        headers: {
            Accept: 'application/json'
        },
        body: bible
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
};

export const list = () => {

    return fetch(`${API}/bible-en-ligne`, {
        method: 'GET'
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
};

export const removeBible = (slug) => {

    return fetch(`${API}/bible-en-ligne/${slug}`, {
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




