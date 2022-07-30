import fetch from 'isomorphic-fetch';
import { API } from '../config';

export const createTheologie = (theologie) => {
    return fetch(`${API}/theologie`, {
        method: 'POST',
        headers: {
            Accept: 'application/json'
        },
        body: theologie
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
};

export const listTheologie = (skip, limit) => {

    const data = {
        limit, skip
    }
    
    return fetch(`${API}/theologies`, {
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

export const singleTheologie = slug => {
    return fetch(`${API}/theologie/${slug}`, {
        method: 'GET'
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
};


export const list = () => {

    return fetch(`${API}/theologies`, {
        method: 'GET'
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
};

export const removeThheologie = (slug) => {

    return fetch(`${API}/theologie/${slug}`, {
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

export const updateTheologie = (theologie, slug) => {

    return fetch(`${API}/theologie/${slug}`, {
        method: 'PUT',
        headers: {
            Accept: 'application/json'
        },
        body: theologie
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
};





