import Link from 'next/link';
import React, { useState, useEffect } from 'react';
import Router from 'next/router';
import { withRouter } from 'next/router';
import { sous_Theme_actuel, update_sous_Theme } from '../../../../actions/theologieSousTheme';
import Noty from 'noty';
import Head from 'next/head';
import HeaderOther from '../../../../components/HeaderOther';
import Footer from '../../../../components/Footer';
import { allTheme } from '../../../../actions/theologieTheme';

const UpdateSousTheme = ({ router }) => {

    const [theologieThemes, setTheologieThemes] = useState([]);

    const [checked, setChecked] = useState([]); // Les thèmes checkés

    const [values, setValues] = useState({
        name: '',
        error: '',
        success: '',
        formData: typeof window !== 'undefined' && new FormData(),
    });

    const { name, error, success, formData } = values;

    useEffect(() => {
        setValues({ ...values, formData });
        initSousTheme();
        initTheologieTheme();
    }, [router]);

    const initSousTheme = () => {
        if (router.query.slug) {
            sous_Theme_actuel(router.query.slug).then(data => {
                if (data.error) {
                    console.log(data.error);
                } else {
                    setValues({ ...values, name: data.name });
                    setTheologieThemeArray(data.theologieTheme);
                }
            });
        }
    };

    const setTheologieThemeArray = ThemeOfSousTheme => {
        let tost = [];
        ThemeOfSousTheme.map((t, i) => {
            tost.push(t._id);
        });
        setChecked(tost);
    };

    const initTheologieTheme = () => {
        allTheme().then(data => {
            if (data.error) {
                setValues({ ...values, error: data.error });
            } else {
                setTheologieThemes(data);
            }
        });
    };

    const handleToggle = t => () => {
        setValues({ ...values });
        const clickedTheologieTheme = checked.indexOf(t);
        const all = [...checked];

        if (clickedTheologieTheme === -1) {
            all.push(t);
        } else {
            all.splice(clickedTheologieTheme, 1);
        }
        setChecked(all);
        formData.set('theologieTheme', all);
    };

    const findOutTheologieThemes = t => {
        const result = checked.indexOf(t);
        if (result !== -1) {
            return true;
        } else {
            return false;
        }
    };

    const showTheologieThemes = () => {
        return (
            theologieThemes &&
            theologieThemes.map((t, i) => (
                <li key={i} className="list-unstyled">
                    <div className="form-check form-switch">
                        <input
                            onChange={handleToggle(t._id)}
                            checked={findOutTheologieThemes(t._id)}
                            type="checkbox"
                            className="form-check-input"
                            role="switch"
                            id={t._id}
                        />
                        <label htmlFor={t._id} className="form-check-label">{t.name}</label>
                    </div>
                </li>
            ))
        );
    };

    const handleChange = name => e => {
        const value = name === 'photo' ? e.target.files[0] : e.target.value;
        formData.set(name, value);
        setValues({ ...values, [name]: value, formData, error: '' });
    };

    const editSousTheme = e => {
        e.preventDefault();
        if (checked.length !== 1) {
            new Noty({
                type: 'error',
                theme: 'metroui',
                layout: 'topRight',
                text: "Vous devez cocher un thème",
                timeout: 3000
            }).show();
        } else {
            update_sous_Theme(formData, router.query.slug).then(data => {
                if (data.error) {
                    setValues({ ...values, error: data.error });
                    new Noty({
                        type: 'error',
                        theme: 'metroui',
                        layout: 'topRight',
                        text: data.error,
                        timeout: 3000
                    }).show();
                } else {
                    setValues({ ...values, name: '', success: `Sous thème mis à jour` });
                    setTheologieThemes([]);
                    Router.push(`/admin/theologie/sous-theme`);
                    new Noty({
                        type: 'info',
                        theme: 'metroui',
                        layout: 'topRight',
                        text: `Sous thème mis à jour`,
                        timeout: 3000
                    }).show();
                }
            });
        }
    };


    return (
        <>
            <Head>
                <title>Basebiblique | Sous-thème</title>
            </Head>
            <HeaderOther />
            <div className="all_pages presentation_slug">
                <div className='container'>
                    <Link href="/admin/theologie/sous-theme">
                        <a className="btn btn-dark btn-retour">
                            Retour
                        </a>
                    </Link>
                    <h1 className='h1'>{name}</h1>
                    <div className="row">
                        <form onSubmit={editSousTheme}>
                            <span>Veuillez saisir le sous thème</span>
                            <div className="row">
                                <div className='col-lg-6 col-md-6 col-sm-12'>
                                    <div className="form-floating my-4 w-75">
                                        <input onChange={handleChange('name')} type="text" value={name} id="textCategorie" className="form-control" required placeholder='Sous thème' />
                                        <label className="form-label" htmlFor="textCategorie">Sous thème*</label>
                                    </div>
                                </div>

                                <div className='col-lg-6 col-md-6 col-sm-12' style={{ backgroundColor: '#c5a54621', padding: '20px', borderRadius: '5px' }}>
                                    <p>Merci de cocher le thème à associé</p>
                                    <p className='text-danger'>Vous devez seulement cocher un thème</p>

                                    {showTheologieThemes()}
                                </div>
                            </div>
                            <button className="submit_Form btn myBtn mt-2 text-black" type="submit">valider</button>
                        </form>
                    </div>
                </div>
            </div>
            <div className='container'>
                <hr className="my-5" />
            </div>
            <Footer />
        </>
    )
};

export default withRouter(UpdateSousTheme)