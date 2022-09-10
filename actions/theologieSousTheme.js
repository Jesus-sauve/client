import fetch from 'isomorphic-fetch';
import { API } from '../config';

export const create = (theme) => {

    return fetch(`${API}/theologie-sous-theme`, {
        method: 'POST',
        headers: {
            Accept: 'application/json'
        },
        body: theme
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
};

export const all_sous_Theme = () => {
    return fetch(`${API}/theologie-sous-themes`, {
        method: 'GET'
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
};

export const sous_Theme_actuel = slug => {
    return fetch(`${API}/theologie-sous-theme-actuel/${slug}`, {
        method: 'GET'
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
};

export const single_sous_Theme = slug => {
    return fetch(`${API}/theologie-sous-theme/${slug}`, {
        method: 'GET'
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
};

export const remove_sous_Theme = (slug) => {
    return fetch(`${API}/theologie-sous-theme/${slug}`, {
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

export const update_sous_Theme = (theme, slug) => {

    return fetch(`${API}/theologie-sous-theme-actuel/${slug}`, {
        method: 'PUT',
        headers: {
            Accept: 'application/json'
        },
        body: theme
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
};