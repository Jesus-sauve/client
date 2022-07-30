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

const [body, setBody] = useState(blogFromLS());
const [values, setValues] = useState({
    error: '',
    sizeError: '',
    success: '',
    formData: '',
    title: '',
    hidePublishButton: false
});

const { error, sizeError, success, formData, title, hidePublishButton } = values;

useEffect(() => {
  setValues({ ...values, formData: new FormData() });
}, [router]);



const publishTheologie = e => {

  e.preventDefault();
  // console.log('ready to publishBlog');
  createTheologie(formData).then(data => {
      if (data.error) {
          setValues({ ...values, error: data.error });
          new Noty({
            type: 'error',
            theme: 'mint',
            layout: 'topRight',
            text: data.error,
            timeout: 3000
          }).show();
      } else {
          setValues({ ...values, title: '', error: '', success: "Nouvel enseignement ajouté" });
          setBody('');
          Router.push(`/admin`);
          new Noty({
            type: 'success',
            theme: 'bootstrap-v4',
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
            <h1 className='h1'>Théologie</h1>
            
            <form >

              <div className="row">
                <div className='col-lg-8 col-md-8 col-sm-12'>
                  <span>Veuillez saisir le titre de l'enseignement</span>
                  <div className="form-outline mb-4">
                    <input type="text" value={title} onChange={handleChange('title')} id="titreEnseignement" className="form-control" required />
                    <label className="form-label" htmlFor="titreEnseignement">Titre*</label>
                  </div>
                  <span>Veuillez saisir le contenu de l'enseignement</span>
                  <ReactQuill onChange={handleBody} value={body} className="quill_form" modules={QuillModules} formats={QuillFormats} placeholder="Saisissez le contenu de la page de l'enseignement..."/>
                </div>
              </div>

                <button className="submit_Form btn myBtn mt-2 text-white" onClick={publishTheologie} type="submit">Publier</button>
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