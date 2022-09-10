import React, { useContext, useEffect, useState } from 'react';
import Head from 'next/head';
import dynamic from 'next/dynamic';
import Noty from 'noty';
import Footer from '../../../components/Footer';
import Link from 'next/link';
import HeaderOther from '../../../components/HeaderOther';
import { showPresentation, updatePresentation } from '../../../actions/presentation';
import { withRouter } from 'next/router';
import Router from 'next/router';

const RichTextEditor = dynamic(() => import('@mantine/rte'), { ssr: false });

const Presentation = ({ router }) => {
  const [body, setBody] = useState('');
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
    setValues({ ...values, formData })
    initPresentation();
  }, [router]);

  const initPresentation = () => {
    if (router.query.slug) {
      showPresentation(router.query.slug).then(data => {
        if (data.error) {
          console.log(data.error);
        } else {
          setValues({ ...values, title: data[0].title })
          setBody(data[0].body);
        }
      });
    }
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

  const editPresentation = e => {
    e.preventDefault();
    updatePresentation(formData, router.query.slug).then(data => {
      if (data.error) {
        setValues({ ...values, error: data.error })
        new Noty({
          type: 'error',
          theme: 'metroui',
          layout: 'topRight',
          text: data.error,
          timeout: 3000
        }).show();
      } else {
        Router.replace(`/`);
        setValues({ ...values, title: '', success: "Text de présentation créé" })
        new Noty({
          type: 'info',
          theme: 'metroui',
          layout: 'topRight',
          text: `Texte de présentation ajouté`,
          timeout: 3000
        }).show();
      }
    })
  }


  return (
    <>
      <Head>
        <title>Basebiblique | Présentation</title>
      </Head>
      <HeaderOther />
      <div className="all_pages presentation_slug">
        <div className='container'>
          <Link href="/admin">
            <a className="btn btn-dark btn-retour">
              Retour
            </a>
          </Link>
          <h4 className='my-5 titres_bas_presentation text-black'><strong>Modification du texte de présentation</strong></h4>

          <form onSubmit={editPresentation}>
            <span>Veuillez saisir le titre du text de Présentation</span>

            <div className="form-floating mb-4">
              <input onChange={handleChange('title')} type="text" id='presentationTexte' value={title} className="form-control" required placeholder="Entrez le titre du texte de présentation" />
              <label htmlFor="presentationTexte">Entrez le titre du texte de présentation*</label>
            </div>

            <span>Veuillez saisir le text de Présentation</span>
            <RichTextEditor value={body || " "} onChange={handleBody} placeholder="Saisissez le contenu de la page de présentation..." />
            <button className="submit_Form btn myBtn mt-2 text-black" type="submit">Publier</button>
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



export default withRouter(Presentation);