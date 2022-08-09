import fetch from 'isomorphic-fetch';
import { API } from '../config';

export const create = (theme) => {

    return fetch(`${API}/theologie-theme`, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(theme)
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
};

export const allTheme = () => {
    return fetch(`${API}/theologie-themes`, {
        method: 'GET'
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
};

export const singleThemeActuel = slug => {
    return fetch(`${API}/theologie-theme-actuel/${slug}`, {
        method: 'GET'
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
};

export const singleTheme = slug => {
    return fetch(`${API}/theologie-theme/${slug}`, {
        method: 'GET'
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
};

export const removeTheme = (slug) => {
    return fetch(`${API}/theologie-theme/${slug}`, {
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