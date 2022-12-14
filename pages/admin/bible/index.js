import React, { useState, useEffect, useContext } from 'react';
import Head from 'next/head';
import Footer from '../../../components/Footer';
import { withRouter } from 'next/router';
import dynamic from 'next/dynamic';
const RichTextEditor = dynamic(() => import('@mantine/rte'), { ssr: false });
import Noty from 'noty';
import HeaderOther from '../../../components/HeaderOther';
import Link from 'next/link';
import { createBible } from '../../../actions/bible';
import Router from 'next/router';
import { Context } from '../../../context';

function Bible({ router }) {


  const { state, dispatch } = useContext(Context);
  const { user } = state;

  useEffect(() => {
    if (user === null || user.role.includes("Utilisateur")) {
      router.push('/')
    }
  }, [])


  const bibleFromLS = () => {
    if (typeof window === 'undefined') {
      return false;
    }

    if (localStorage.getItem('bible-en-ligne')) {
      return JSON.parse(localStorage.getItem('bible-en-ligne'));
    } else {
      return false;
    }
  };

  const [body, setBody] = useState(bibleFromLS());
  const [values, setValues] = useState({
    error: '',
    sizeError: '',
    success: '',
    title: '',
    hidePublishButton: false,
    formData: typeof window !== 'undefined' && new FormData(),
  });

  const { error, sizeError, success, formData, title, hidePublishButton } = values;

  useEffect(() => {
    setValues({ ...values, formData });
  }, [router]);



  const publishBible = e => {

    e.preventDefault();
    createBible(formData).then(data => {
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
        setValues({ ...values, title: '', error: '', success: "Nouveau lien ajouté" });
        setBody('');
        Router.push(`/admin`);
        new Noty({
          type: 'success',
          theme: 'metroui',
          layout: 'topRight',
          text: `Nouveau lien ajouté`,
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

  const handleBody = e => {
    setBody(e);
    formData.set('body', e);
    if (typeof window !== 'undefined') {
      localStorage.setItem('bible-en-ligne', JSON.stringify(e));
    }
  };

  return (
    <>
      <Head>
        <title>Basebiblique | Bible en ligne</title>
      </Head>
      <HeaderOther />
      <div className="all_pages page_enseignement">
        <div className='container'>
          <Link href="/admin">
            <a className="btn m-2 btn-dark">
              Retour
            </a>
          </Link>
          <Link href="/admin/bible/gestion">
            <a className="btn m-2 btn-dark">
              Gestion des liens
            </a>
          </Link>
          <h1 className='h1'>Bible en ligne</h1>

          <form >

            <div className="row">
              <div className='col-lg-8 col-md-8 col-sm-12'>
                <span>Veuillez saisir un titre pour ce lien</span>
                <div className="form-floating mb-4">
                  <input type="text" value={title} onChange={handleChange('title')} id="titreEnseignement" className="form-control" required placeholder='Titre' />
                  <label className="form-label" htmlFor="titreEnseignement">Titre*</label>
                </div>
                <span>Veuillez saisir un contenu</span>
                <RichTextEditor onChange={handleBody} value={body} placeholder="Saisissez un contenu..." />
              </div>
            </div>

            <button className="submit_Form btn myBtn mt-2 text-black" onClick={publishBible} type="submit">Publier</button>
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
export default withRouter(Bible);