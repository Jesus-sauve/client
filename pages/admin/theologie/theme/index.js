import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import Footer from '../../../../components/Footer';
import HeaderOther from '../../../../components/HeaderOther';
import { create, allTheme, removeTheme, updateTheme } from '../../../../actions/theologieTheme';
import Link from 'next/link';
import Noty from 'noty';
import Router from 'next/router';
import axios from 'axios';
import { API } from '../../../../config';

function Thème() {

    const [values, setValues] = useState({
        name: '',
        error: false,
        success: false,
        themes: [],
        removed: false,
        reload: false,
        update: false,
        updateItem: ""
    })

    const { name, error, success, themes, removed, reload, update, updateItem } = values;

    useEffect(() => {
        loadThemes();
    }, [reload]);

    const loadThemes = () => {
        allTheme().then(data => {
            if (data.error) {
                console.log(data.error);
            } else {
                setValues({ ...values, themes: data })
            }
        });
    };

    const showThemes = () => {
        return themes.map((t, i) => {
            return (
                <div key={i} className='col-md-4'>
                    <div className="card my-2">
                        <div className="card-body">
                            <h5 className="card-title">{t.name}</h5>
                            <p className="card-text">Vous pouvez modifier ou supprimer ce thème en cliquant sur le bouton correspondant.</p>
                            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                <i onDoubleClick={() => deleteConfirm(t.slug)} title='Faites un double clique pour supprimer le thème' className="fas fa-trash-alt" style={{ cursor: 'pointer' }}></i>
                                <i onDoubleClick={() => updateThemeTheologie(t._id, t.name)} title='Faites un double clique pour modifier le thème' className="fas fa-edit" style={{ cursor: 'pointer' }}></i>
                            </div>
                        </div>
                    </div>
                </div>
            )
        })
    }

    const deleteConfirm = slug => {
        let answer = window.confirm('Êtes-vous sûre de vouloir supprimer ce thème ?');
        if (answer) {
            deleteTheme(slug);
        }
    };

    const updateThemeTheologie = (_id, name) => {
        setValues({ ...values, update: true, updateItem: _id, name: name });
    }

    const clickUpdate = (e) => {
        e.preventDefault();
        console.log(updateItem);
        axios.put(`${API}/theologie-theme-actuel/${updateItem}`, { name })
            .then(response => {
                setValues({ ...values, error: false, success: false, name: '', removed: !removed, reload: !reload, update: false, updateItem: "" });
                new Noty({
                    type: 'info',
                    theme: 'metroui',
                    layout: 'topRight',
                    text: `Thème modifié`,
                    timeout: 3000
                }).show();
                Router.push(`/admin/theologie`);
            })
            .catch(err => console.log(err))
    }

    const deleteTheme = slug => {
        console.log('delete', slug);
        removeTheme(slug).then(data => {
            if (data.error) {
                console.log(data.error);
                new Noty({
                    type: 'warning',
                    theme: 'metroui',
                    layout: 'topRight',
                    text: data.error,
                    timeout: 3000
                }).show();
            } else {
                setValues({ ...values, error: false, success: false, name: '', removed: !removed, reload: !reload });
                new Noty({
                    type: 'error',
                    theme: 'metroui',
                    layout: 'topRight',
                    text: `Thème supprimé`,
                    timeout: 3000
                }).show();
            }
        });
    };

    const handleChange = e => {
        setValues({ ...values, name: e.target.value, error: false, success: false, removed: '' });
    }

    const clickSubmit = e => {
        e.preventDefault()
        create({ name }).then(data => {
            if (data.error) {
                setValues({ ...values, error: data.error, success: false });
                new Noty({
                    type: 'error',
                    theme: 'metroui',
                    layout: 'topRight',
                    text: data.error,
                    timeout: 3000
                }).show();
            } else {
                setValues({ ...values, error: false, success: true, name: '' });
                new Noty({
                    type: 'info',
                    theme: 'metroui',
                    layout: 'topRight',
                    text: `Nouveau thème créé`,
                    timeout: 3000
                }).show();
                Router.push(`/admin/theologie`);
            }
        })
    }

    return (
        <>
            <Head>
                <title>Basebiblique | Thème</title>
            </Head>
            <HeaderOther />
            <div className="all_pages">
                <div className='container categorie_page'>
                    <Link href="/admin/theologie">
                        <a className="btn btn-dark btn-retour">
                            Retour
                        </a>
                    </Link>
                    <h1 className='h1'>Thème</h1>
                    <div className="row">
                        <div className='col-lg-4 col-md-4 col-sm-12 my-3'>
                            <form onSubmit={update == true ? clickUpdate : clickSubmit}>
                                <span>Veuillez saisir le thème</span>
                                <div className="form-floating my-4 w-75">
                                    <input onChange={handleChange} type="text" value={name} id="textCategorie" className="form-control" required placeholder='Thème' />
                                    <label className="form-label" htmlFor="textCategorie">Thème*</label>
                                </div>

                                <button className="submit_Form btn myBtn mt-2 text-black" type="submit">{update == true ? "Modifier" : "Créer"}</button>
                            </form>
                        </div>
                        <div className='col-lg-8 col-md-8 col-sm-12' style={{ backgroundColor: '#c5a54621', padding: '20px', borderRadius: '5px' }}>
                            <span>Liste de tous les thèmes créés</span><br />
                            <div className='row'>
                                {showThemes()}
                            </div>
                        </div>
                    </div>
                </div>

            </div>
            <div className='container'>
                <hr className="my-5" />
            </div>
            <Footer />
        </>
    );
};
export default Thème;