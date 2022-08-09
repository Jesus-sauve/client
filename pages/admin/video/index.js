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
import { createVideo } from '../../../actions/videos';
import Router from 'next/router';
import { Context } from '../../../context';

function Video({ router }) {

  
  const { state, dispatch } = useContext(Context);
  const { user } = state;

  useEffect(() => {
    if (user === null || user.role.includes("Utilisateur")) {
      router.push('/')
    } 
  }, []);


  const videoFromLS = () => {
    if (typeof window === 'undefined') {
        return false;
    }

    if (localStorage.getItem('video')) {
        return JSON.parse(localStorage.getItem('video'));
    } else {
        return false;
    }
};

const [body, setBody] = useState(videoFromLS());
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
}, [router]);

const publishVideo = e => {

  e.preventDefault();
  // console.log('ready to publishBlog');
  createVideo(formData).then(data => {
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
          setValues({ ...values, title: '', error: '', success: "Nouvelle vidéo enrégistrée" });
          setBody('');
          Router.push(`/admin`);
          new Noty({
            type: 'success',
            theme: 'metroui',
            layout: 'topRight',
            text: `Nouvelle vidéo enrégistrée`,
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
      localStorage.setItem('video', JSON.stringify(e));
  }
};

  return (
    <>
    <Head>
        <title>Basebiblique | Vidéo</title>
    </Head>
      <HeaderOther />
        <div className="all_pages page_enseignement">
          <div className='container'>
            <Link href="/admin">
                <a className="btn m-2 btn-dark">
                    Retour
                </a> 
            </Link>
            <Link href="/admin/video/gestion">
                <a className="btn m-2 btn-dark">
                    Gestion des vidéos
                </a> 
            </Link>
            <h1 className='h1'>Vidéos</h1>
            
            <form >

              <div className="row">
                <div className='col-lg-8 col-md-8 col-sm-12'>
                  <span>Veuillez saisir le titre de la vidéo</span>
                  <div className="form-floating mb-4">
                    <input type="text" value={title} onChange={handleChange('title')} id="titreEnseignement" className="form-control" required placeholder='Titre' />
                    <label className="form-label" htmlFor="titreEnseignement">Titre*</label>
                  </div>
                  <span>Veuillez saisir le contenu de la vidéo et d'ajouter le lien</span>
                  <ReactQuill onChange={handleBody} value={body} className="quill_form" modules={QuillModules} formats={QuillFormats} placeholder="Saisissez le contenu de la page de l'enseignement..."/>
                </div>
              </div>

                <button className="submit_Form btn myBtn mt-2 text-black" onClick={publishVideo} type="submit">Publier</button>
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
export default withRouter(Video);