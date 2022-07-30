import fetch from 'isomorphic-fetch';
import { API } from '../config';
import queryString from 'query-string';

export const createVideo = (video) => {
    return fetch(`${API}/video`, {
        method: 'POST',
        headers: {
            Accept: 'application/json'
        },
        body: video
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
};

export const listVideos = (skip, limit) => {

    const data = {
        limit, skip
    }
    
    return fetch(`${API}/videos`, {
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

export const singleVideo = slug => {
    return fetch(`${API}/video/${slug}`, {
        method: 'GET'
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
};


export const list = () => {

    return fetch(`${API}/videos`, {
        method: 'GET'
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
};

export const removeVideo = (slug) => {

    return fetch(`${API}/video/${slug}`, {
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

export const updateVideo = (video, slug) => {

    return fetch(`${API}/video/${slug}`, {
        method: 'PUT',
        headers: {
            Accept: 'application/json'
        },
        body: video
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
    return fetch(`${API}/video/recherche?${query}`, {
        method: 'GET'
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
};




