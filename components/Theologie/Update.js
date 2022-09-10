import Link from 'next/link';
import { useState, useEffect } from 'react';
import Router from 'next/router';
import dynamic from 'next/dynamic';
import { withRouter } from 'next/router';
import { singleTheologie, updateTheologie } from '../../actions/theologie';
import { all_sous_Theme } from '../../actions/theologieSousTheme';
const RichTextEditor = dynamic(() => import('@mantine/rte'), { ssr: false });
import { API } from '../../config';
import Noty from 'noty';

const TheologieUpdate = ({ router }) => {
    const [body, setBody] = useState('');
    const [theologieSousThemes, setTheologieSousThemes] = useState([]);
    const [checked, setChecked] = useState([]);

    const [values, setValues] = useState({
        title: '',
        error: '',
        success: '',
        title: '',
        body: '',
        formData: typeof window !== 'undefined' && new FormData(),
    });


    const { error, success, formData, title } = values;

    useEffect(() => {
        setValues({ ...values, formData });
        initTheologie();
        initSousThemes();
    }, [router]);

    const initTheologie = () => {
        if (router.query.slug) {
            singleTheologie(router.query.slug).then(data => {
                if (data.error) {
                    console.log(data.error);
                } else {
                    setValues({ ...values, title: data.title });
                    setBody(data.body);
                    setTheologieSousThemesArray(data.theologieSousThemes);
                }
            });
        }
    };

    const setTheologieSousThemesArray = theologieTheologieSousThemes => {
        let ts = [];
        theologieTheologieSousThemes.map((t, i) => {
            ts.push(t._id);
        });
        setChecked(ts);
    };

    const initSousThemes = () => {
        all_sous_Theme().then(data => {
            if (data.error) {
                setValues({ ...values, error: data.error });
            } else {
                setTheologieSousThemes(data);
            }
        });
    };

    const handleToggle = t => () => {
        setValues({ ...values, error: '' });

        const clickedTheme = checked.indexOf(t);
        const sousThemes = [...checked]

        if (clickedTheme === -1) {
            sousThemes.push(t);
        } else {
            sousThemes.splice(clickedTheme, 1);
        }
        setChecked(sousThemes);
        formData.set('theologieSousThemes', sousThemes);
    };

    const findOutSousTheme = t => {
        const result = checked.indexOf(t);
        if (result !== -1) {
            return true;
        } else {
            return false;
        }
    };

    const showSousThemes = () => {
        return (
            theologieSousThemes && theologieSousThemes.map((t, i) => (
                <div key={i} className='form-check form-switch'>
                    <input onChange={handleToggle(t._id)} checked={findOutSousTheme(t._id)} className="form-check-input" type="checkbox" id={t.name} />
                    <label className="form-check-label" htmlFor={t.name}>{t.name}</label>
                </div>
            ))
        );
    };

    const handleChange = name => e => {
        const value = name === 'photo' ? e.target.files[0] : e.target.value;
        formData.set(name, value);
        setValues({ ...values, [name]: value, formData, error: '' });
    };

    const handleBody = e => {
        setBody(e);
        formData.set('body', e);
    };

    const editTheologie = e => {
        e.preventDefault();
        updateTheologie(formData, router.query.slug).then(data => {
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
                setValues({ ...values, title: '', success: `Enseignement mis à jour` });
                setBody('');
                Router.push(`/admin/theologie/gestion`);
                new Noty({
                    type: 'info',
                    theme: 'metroui',
                    layout: 'topRight',
                    text: `Enseignement mis à jour`,
                    timeout: 3000
                }).show();
            }
        });
    };

    const updateTheologieForm = () => {
        return (
            <>
                <form onSubmit={editTheologie}>

                    <div className="row">
                        <div className='col-lg-8 col-md-8 col-sm-12'>
                            <span>Veuillez saisir le titre de l'enseignement</span>

                            <div className="form-outline mb-4">
                                <input type="text" value={title} onChange={handleChange('title')} id="titreEnseignement" className="form-control" required />
                            </div>

                            <span>Veuillez saisir le contenu de l'enseignement</span>
                            <RichTextEditor value={body || " "} onChange={handleBody} placeholder="Saisissez le contenu de la page de l'enseignement..." />
                        </div>

                        <div className='col-lg-4 col-md-4 col-sm-12'>
                            <p>Liste des sous-thèmes</p>
                            {showSousThemes()}
                        </div>
                    </div>

                    <button className="submit_Form btn myBtn mt-2 text-black" type="submit">Modifier</button>

                </form>
            </>
        )
    }

    return (

        <div className='page_update_enseignement'>
            <h1 className='h1'>{title}</h1>
            {updateTheologieForm()}
        </div>
    )
};

export default withRouter(TheologieUpdate)