import React, { useState, useEffect, useContext } from 'react';
import Head from 'next/head';
import Footer from '../../../components/Footer';
import { withRouter } from 'next/router';
import dynamic from 'next/dynamic';
const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });
import '../../../node_modules/react-quill/dist/quill.snow.css'
import Noty from 'noty';
import { QuillModules, QuillFormats } from '../../../helpers/quil';
import HeaderOther from '../../../components/HeaderOther';
import Link from 'next/link';
import { createTheologie } from '../../../actions/theologie';
import { all_sous_Theme } from '../../../actions/theologieSousTheme';
import Router from 'next/router';
import { Context } from '../../../context';

function Theologie({ router }) {

  
  const { state, dispatch } = useContext(Context);
  const { user } = state;

  useEffect(() => {
    if (user === null || user.role.includes("Utilisateur")) {
      router.push('/')
    } 
  }, [])


  const blogFromLS = () => {
    if (typeof window === 'undefined') {
        return false;
    }

    if (localStorage.getItem('theologie')) {
        return JSON.parse(localStorage.getItem('theologie'));
    } else {
        return false;
    }
};

const [sousThemes, setSousThemes] = useState([]);
const [checked, setChecked] = useState([]); // categories

const [body, setBody] = useState(blogFromLS());
const [values, setValues] = useState({
    error: '',
    sizeError: '',
    success: '',
    formData: typeof window !== 'undefined' && new FormData(),
    title: '',
    hidePublishButton: false
});

const { error, sizeError, success, formData, title, hidePublishButton } = values;

useEffect(() => {
  setValues({ ...values, formData});
  initSousThemes();
}, [router]);

const initSousThemes = () => {
  all_sous_Theme().then(data => {
      if (data.error) {
          setValues({ ...values, error: data.error });
      } else {
          setSousThemes(data);
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

const showSousThemes = () => {
  return ( sousThemes &&
      sousThemes.map((t, i) => (
          <div key={i} className='form-check form-switch'>
              <input onChange={handleToggle(t._id)} className="form-check-input" type="checkbox" id={t.name} role="switch" />
              <label className="form-check-label" htmlFor={t.name}>{t.name}</label>
          </div>
      ))
  );
};

const publishTheologie = e => {

  e.preventDefault();
  createTheologie(formData).then(data => {
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
          setValues({ ...values, title: '', error: '', success: "Nouvel enseignement ajouté" });
          setBody('');
          Router.push(`/admin/theologie`);
          new Noty({
            type: 'information',
            theme: 'metroui',
            layout: 'topRight',
            text: `Nouvel enseignement ajouté`,
            timeout: 3000
        }).show();
      }
  });
};

const handleChange = name => e => {
  // console.log(e.target.value);
  const value = name === 'photo' ? e.target.files[0] : e.target.value;
  formData.set(name, value);
  setValues({ ...values, [name]: value, formData, error: '' });
};

const handleBody = e => {
  // console.log(e);
  setBody(e);
  formData.set('body', e);
  if (typeof window !== 'undefined') {
      localStorage.setItem('theologie', JSON.stringify(e));
  }
};

  return (
    <>
    <Head>
        <title>Basebiblique | Théologie</title>
    </Head>
      <HeaderOther />
        <div className="all_pages page_enseignement">
          <div className='container'>
            <Link href="/admin">
                <a className="btn m-2 btn-dark">
                    Retour
                </a> 
            </Link>
            <Link href="/admin/theologie/gestion">
                <a className="btn m-2 btn-dark">
                    Gestion des enseignements
                </a> 
            </Link>
            <Link href="/admin/theologie/theme">
                <a className="btn m-2 btn-dark">
                    Gestion des thèmes
                </a> 
            </Link>
            <Link href="/admin/theologie/sous-theme">
                <a className="btn m-2 btn-dark">
                    Gestion des sous thèmes
                </a> 
            </Link>
            <h1 className='h1'>Théologie</h1>
            <h3>Publier un enseignement</h3>
            <form >

              <div className="row">
                <div className='col-lg-8 col-md-8 col-sm-12 mt-2'>
                  <span>Veuillez saisir le titre de l'enseignement</span>

                  <div className="form-floating mt-4 mb-4">
                    <input type="text" value={title} onChange={handleChange('title')} id="titreEnseignement" className="form-control input-form" required autoComplete="new-title" placeholder="Entrez le titre de l'enseignement" />
                    <label className="form-label" htmlFor="titreEnseignement">Entrez le titre de l'enseignement*</label>
                  </div>

                  <span>Veuillez saisir le contenu de l'enseignement</span>
                  <ReactQuill onChange={handleBody} value={body} className="quill_form" modules={QuillModules} formats={QuillFormats} placeholder="Saisissez le contenu de la page de l'enseignement..."/>
                </div>

                <div className='col-lg-4 col-md-4 col-sm-12' style={{ backgroundColor: '#c5a54621', padding: '20px', borderRadius: '5px' }}>
                  <h5 className='text-center mb-5'><strong>Merci de cocher l'un des thèmes présents ci-dessous</strong></h5>
                    {showSousThemes()}
                    
                </div>

              </div>
                <button className="submit_Form btn myBtn mt-2 text-black" onClick={publishTheologie} type="submit">Publier</button>
            </form>
          </div>
        </div>
        <div className='container'>
          <hr className="my-5" />
        </div>
      <Footer />
    </>
  );
};
export default withRouter(Theologie);