import React, { useState, useEffect, useContext } from 'react';
import Head from 'next/head';
import Footer from '../../../components/Footer';
import { withRouter } from 'next/router';
import dynamic from 'next/dynamic';
const RichTextEditor = dynamic(() => import('@mantine/rte'), { ssr: false });
import Noty from 'noty';
import HeaderOther from '../../../components/HeaderOther';
import Link from 'next/link';
import { createEnseignement } from '../../../actions/enseignement';
import { getCategories } from '../../../actions/category';
import Router from 'next/router';
import { Context } from '../../../context';

function Enseignement({ router }) {


  const { state, dispatch } = useContext(Context);
  const { user } = state;

  useEffect(() => {
    if (user === null || user.role.includes("Utilisateur")) {
      router.push('/')
    }
  }, [])

  const [image, setImage] = useState(null)

  const blogFromLS = () => {
    if (typeof window === 'undefined') {
      return false;
    }

    if (localStorage.getItem('enseignement')) {
      return JSON.parse(localStorage.getItem('enseignement'));
    } else {
      return false;
    }
  };

  const [categories, setCategories] = useState([]);
  const [checked, setChecked] = useState([]); // categories

  const [controlImage, setControlImage] = useState(false);

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
    setValues({ ...values, formData });
    initCategories();
  }, [router]);

  const initCategories = () => {
    getCategories().then(data => {
      if (data.error) {
        setValues({ ...values, error: data.error });
      } else {
        setCategories(data);
      }
    });
  };

  const publishEnseignement = e => {

    e.preventDefault();
    if (controlImage === false) {
      new Noty({
        type: 'error',
        theme: 'metroui',
        layout: 'topRight',
        text: "Merci de choisir une image",
        timeout: 3000
      }).show();
    } else if (checked.length !== 1) {
      new Noty({
        type: 'error',
        theme: 'metroui',
        layout: 'topRight',
        text: "Vous devez choisir au moins une catégorie",
        timeout: 3000
      }).show();
    } else {
    createEnseignement(formData).then(data => {
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
        setValues({ ...values, title: '', error: '', success: "Nouvel enseignement créé" });
        setBody('');
        setControlImage(false)
        Router.push(`/admin`);
        new Noty({
          type: 'info',
          theme: 'metroui',
          layout: 'topRight',
          text: `Nouvel enseignement créé`,
          timeout: 3000
        }).show();
      }
    });
  }};

  const handleChange = name => e => {
    const value = name === 'photo' ? e.target.files[0] : e.target.value;
    formData.set(name, value);
    setValues({ ...values, [name]: value, formData, error: '' });
    if (e.target.files && e.target.files[0]) {
      setImage(URL.createObjectURL(e.target.files[0]));
      setControlImage(true)
    }
  };

  const handleBody = e => {
    setBody(e);
    formData.set('body', e);
    if (typeof window !== 'undefined') {
      localStorage.setItem('enseignement', JSON.stringify(e));
    }
  };

  const handleToggle = c => () => {
    setValues({ ...values, error: '' });
    const clickedCategory = checked.indexOf(c);
    const all = [...checked];

    if (clickedCategory === -1) {
      all.push(c);
    } else {
      all.splice(clickedCategory, 1);
    }
    setChecked(all);
    formData.set('categories', all);
  };

  const showCategories = () => {
    return (
      categories &&
      categories.map((c, i) => (
        <li key={i} className="list-unstyled">
          <div className="form-check form-switch">
            <input onChange={handleToggle(c._id)} className="form-check-input" type="checkbox" id={c.name} role="switch" />
            <label className="form-check-label" htmlFor={c.name}>{c.name}</label>
          </div>
        </li>
      ))
    );
  };

  return (
    <>
      <Head>
        <title>Basebiblique | Enseignement</title>
      </Head>
      <HeaderOther />
      <div className="all_pages page_enseignement">
        <div className='container'>
          <Link href="/admin">
            <a className="btn m-2 btn-dark">
              Retour
            </a>
          </Link>
          <Link href="/admin/enseignement/gestion">
            <a className="btn m-2 btn-dark">
              Gestion des enseignements
            </a>
          </Link>
          <h1 className='h1'>Enseignement</h1>

          <form >

            <div className="row">
              <div className='col-lg-8 col-md-8 col-sm-12'>
                <span>Veuillez saisir le titre de l'enseignement</span>

                <div className="form-floating mb-4">
                  <input type="text" value={title} onChange={handleChange('title')} id="titreEnseignement" className="form-control" required placeholder="Entrez le titre de l'enseignement" />
                  <label className="form-label" htmlFor="titreEnseignement">Entrez le titre de l'enseignement*</label>
                </div>

                <span>Veuillez saisir le contenu de l'enseignement</span>
                <RichTextEditor value={body || " "} onChange={handleBody} placeholder="Saisissez le contenu de la page de présentation..." />
              </div>

              <div className='col-lg-4 col-md-4 col-sm-12' style={{ backgroundColor: '#c5a54621', padding: '20px', borderRadius: '5px' }}>
                <span>Merci de choisir des catégories associées à l'enseignement</span>
                <div>
                  <h5 className='couleur'>Catégories</h5>
                  <hr />
                  <ul style={{ maxHeight: '200px', overflowY: 'scroll' }}>
                    {categories.length === 0 ? (
                      <>
                      <p>Merci de créer une catégorie</p>
                        <Link href="/admin/enseignement/categories">
                          <a className="btn m-2 btn-dark">
                            Catégorie
                          </a>
                        </Link>
                      </>) : (showCategories())}
                  </ul>
                </div>

                <div className="form-group pb-2">
                  <h5 className='couleur'>image</h5>
                  <hr />

                  <small className="text-muted">Max size: 1mb</small>
                  <br />
                  <label className="btn btn-dark mb-4">
                    Choisissez une image
                    <input onChange={handleChange('photo')} type="file" accept="image/*" hidden required />
                  </label>

                  <img className="img-fluid rounded" style={{ width: '70%' }} src={image} />

                </div>

              </div>
            </div>

            <button className="submit_Form btn myBtn mt-2 text-black" onClick={publishEnseignement} type="submit">Publier</button>
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
export default withRouter(Enseignement);