import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import Footer from '../../../../components/Footer';
import HeaderOther from '../../../../components/HeaderOther';
import { create, all_sous_Theme, remove_sous_Theme } from '../../../../actions/theologieSousTheme';
import { allTheme } from '../../../../actions/theologieTheme';
import Link from 'next/link';
import Noty from 'noty';
import Router from 'next/router';

function SousThème() {

    const [themes, setThemes] = useState([]);
    const [checked, setChecked] = useState([]); // categories

    const [values, setValues] = useState({
        name: '',
        error: '',
        success: '',
        sousThemes: [],
        removed: false,
        reload: false,
        formData: typeof window !== 'undefined' && new FormData(),
    });

    const { name, error, success, formData, sousThemes, removed, reload } = values;

    useEffect(() => {
        loadSousThemes();
        setValues({ ...values, formData });
        initThemes();
    }, [reload]);

    const initThemes = () => {
        allTheme().then(data => {
            if (data.error) {
                setValues({ ...values, error: data.error });
            } else {
                setThemes(data);
            }
        });
    };

    const loadSousThemes = () => {
        all_sous_Theme().then(data => {
            if (data.error) {
                console.log(data.error);
            } else {
                setValues({ ...values, sousThemes: data })
            }
        });
    };

    const showSousThemes = () => {
        return sousThemes.map((st, i) => {
            return (
                <div key={i} className='col-md-6'>
                    <div className="card my-2">
                        <div className="card-body">
                            <h5 className="card-title">{st.name}</h5>
                            <p className="card-text">Vous pouvez modifier ou supprimer ce thème en cliquant sur le bouton correspondant.</p>
                            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                <i onDoubleClick={() => deleteConfirm(st.slug)} title='Faites un double clique pour supprimer ce thème' className="fas fa-trash-alt" style={{ cursor: 'pointer' }}></i>
                                <i onClick={() => updateSousThemeTheologie(st.slug)} title='Faites un clique pour modifier ce thème' className="fas fa-edit" style={{ cursor: 'pointer' }}></i>
                            </div>
                        </div>
                    </div>
                </div>
            )
        })
    }

    const updateSousThemeTheologie = (slug) => {
        Router.push(`/admin/theologie/sous-theme/${slug}`);
    }

    const deleteConfirm = slug => {
        let answer = window.confirm('Êtes-vous sûre de vouloir supprimer ce thème ?');
        if (answer) {
            deleteSousTheme(slug);
        }
    };

    const deleteSousTheme = slug => {
        console.log('delete', slug);
        remove_sous_Theme(slug).then(data => {
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

    const handleChange = name => e => {
        const value = name === 'photo' ? e.target.files[0] : e.target.value;
        formData.set(name, value);
        setValues({ ...values, [name]: value, formData, error: '' });
    };

    const clickSubmit = e => {
        e.preventDefault()
        if (checked.length !== 1) {
            new Noty({
                type: 'error',
                theme: 'metroui',
                layout: 'topRight',
                text: "Vous devez cocher un thème",
                timeout: 3000
            }).show();
        } else {
            create(formData).then(data => {
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
                    setValues({ ...values, error: '', success: 'Nouveau thème créé', name: '' });
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
    };

    const handleToggle = t => () => {
        setValues({ ...values, error: '' });

        const clickedTheme = checked.indexOf(t);
        const theme = [...checked]

        if (clickedTheme === -1) {
            theme.push(t);
        } else {
            theme.splice(clickedTheme, 1);
        }

        setChecked(theme);
        formData.set('theologieTheme', theme);
    };

    const showThemes = () => {
        return (
            <div className="mb-4">
                {themes &&
                    themes.map((t, i) => (
                        <div key={i} className="form-check form-switch">
                            <input onChange={handleToggle(t._id)} className="form-check-input" type="checkbox" id={t.name} role="switch" />
                            <label className="form-check-label" htmlFor={t.name}>{t.name}</label>
                        </div>

                    ))}
            </div>
        );
    };

    return (
        <>
            <Head>
                <title>Basebiblique | Sous-thème</title>
            </Head>
            <HeaderOther />
            <div className="all_pages">
                <div className='container categorie_page'>
                    <Link href="/admin/theologie">
                        <a className="btn btn-dark btn-retour">
                            Retour
                        </a>
                    </Link>
                    <h1 className='h1'>Sous-thème</h1>
                    <div className="row">
                        <div className='col-lg-4 col-md-4 col-sm-12'>
                            <form>
                                <span>Veuillez saisir le sous thème</span>
                                <div className="form-floating my-4 w-75">
                                    <input onChange={handleChange('name')} type="text" value={name} id="textCategorie" className="form-control" required placeholder='Sous thème' />
                                    <label className="form-label" htmlFor="textCategorie">Sous thème*</label>
                                </div>
                                <div>
                                    <p>Merci de cocher le thème à associé</p>
                                    <p className='text-danger'>Vous devez seulement cocher un thème</p>
                                    {themes.length === 0 ? (
                                    <>
                                    <p>Merci de créer un thème</p>
                                        <Link href="/admin/theologie/theme">
                                        <a className="btn m-2 btn-dark">
                                            Thème
                                        </a>
                                        </Link>
                                    </>) : (showThemes())}
                                </div>

                                <button className="submit_Form btn myBtn mt-2 text-black" onClick={clickSubmit} type="submit">Créer</button>
                            </form>
                        </div>
                        <div className='col-lg-8 col-md-8 col-sm-12' style={{ backgroundColor: '#c5a54621', padding: '20px', borderRadius: '5px' }}>
                            <div>
                                <p>Liste des sous-thèmes créés</p>
                                <div className='row'>
                                    {showSousThemes()}
                                </div>
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
export default SousThème;