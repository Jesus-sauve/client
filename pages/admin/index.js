import React, { useState, useEffect, useContext } from 'react';
import Head from 'next/head';
import Footer from '../../components/Footer';
import HeaderOther from '../../components/HeaderOther';
import Link from 'next/link';
import { useRouter } from 'next/router';
import Router from 'next/router';
import dynamic from 'next/dynamic';
const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });
import '../../node_modules/react-quill/dist/quill.snow.css'
import Noty from 'noty';
import { QuillModules, QuillFormats } from '../../helpers/quil';
import { createPresentation, showPresentation } from '../../actions/presentation';
import { Context } from '../../context';


function Admin() {

  const { state, dispatch } = useContext(Context);
  const { user } = state;

  const presentationFromLS = () => {
    if (typeof window === 'undefined' ) {
      return false
    }

    if (localStorage.getItem('presentation')) {
      return JSON.parse(localStorage.getItem('presentation'))
    } else {
      return false;
    }
  }

  const [presentation, setPresentation] = useState([]);
  const [body, setBody] = useState(presentationFromLS());
  const [values, setValues] = useState({
    error: '',
    sizeError: '',
    success: '',
    formData: typeof window !== 'undefined' && new FormData(),
    title: '',
    hidePublishButton: false
  })

  const {error, sizeError, success, title, formData, hidePublishButton} = values;

  const router = useRouter();

useEffect(() => {
  
  loadPresentation();
  if (user === null || user.role.includes("Utilisateur")) {
    router.push('/')
  } 
}, [])

const loadPresentation = () => {
  showPresentation().then(data => {
    if (data.error) {
      console.log(data.error);
    } else {
      setPresentation(data);
    }
  })
}

  useEffect(() => {
    setValues({ ...values, formData})
  }, [router])

 

  

  const handleChange = name => e => {
    // console.log(e.target.value);
    const value = name === 'photo' ? e.target.files[0] : e.target.value
    formData.set(name, value)
    setValues({ ...values, [name]: e.target.value, formData, error: '' })
  }

  const publishPresentation = (e) => {
    e.preventDefault()
    createPresentation(formData).then(data => {
      if(data.error) {
        setValues({...values, error: data.error});
        new Noty({
            type: 'error',
            theme: 'metroui',
            layout: 'topRight',
            text: data.error
          }).show();
    } else {
        setValues({...values, title: '', error: '', success: `Texte de présentation ajouté`});
        setBody('');
        new Noty({
            type: 'info',
            theme: 'metroui',
            layout: 'topRight',
            text: `Texte de présentation ajouté`,
          }).show();
        Router.push(`/admin`);
    }
});
};

  

  const handleBody = e => {
    // console.log(e);
    setBody(e)
    formData.set('body', e)
    if(typeof window !== 'undefined') {
      localStorage.setItem('presentation', JSON.stringify(e))
    }
  }
 

  return (
    <>
    <Head>
        <title>Basebiblique | Administration</title>
    </Head>
    <HeaderOther />
        <div className="all_pages administration_page">
          <div className='container'>
            <h1 className='h1'>Admin</h1> 
            <h4 className='mb-5 titres_bas_presentation'><strong>Gestionnaire des différentes pages</strong></h4>
            <hr className="my-5" />

              <ol>
                <li className="nav-item">
                  {
                    presentation.map(item => (
                      <Link key={item._id} href={`/admin/presentation/${item.slug}`}>
                        <a className="nav-link">
                            <span>{item.slug}</span>
                        </a> 
                      </Link>
                      ))
                    }
                  </li>
                  <li className="nav-item">
                  <Link href="/admin/enseignement">
                      <a className="nav-link">Enseignements</a> 
                  </Link>
                  </li>
                  <li className="nav-item">
                  <Link href="/admin/enseignement/categories">
                      <a className="nav-link">Catégories</a> 
                  </Link>
                </li>
                <li className="nav-item">
                  <Link href="/admin/theologie">
                      <a className="nav-link">Théologie</a> 
                  </Link>
                </li>
                <li className="nav-item">
                  <Link href="/admin/bible">
                      <a className="nav-link">Bible en ligne</a> 
                  </Link>
                </li>
                <li className="nav-item">
                  <Link href="/admin/video">
                      <a className="nav-link">Vidéos</a> 
                  </Link>
                </li>
              </ol>
              <hr className="my-5" />
            <div>
            <form onSubmit={publishPresentation}>
                <span>Veuillez saisir le titre du text de Présentation</span>

                <div className="form-floating mb-4">
                  <input onChange={handleChange('title')} type="text" id='presentationTexte' value={title} className="form-control" required placeholder="Entrez le titre du texte de présentation" />
                  <label htmlFor="presentationTexte">Entrez le titre du texte de présentation*</label>
                </div>

                <span>Veuillez saisir le text de Présentation</span>
                <ReactQuill className="quill_form" value={body || " "} modules={QuillModules} formats={QuillFormats} onChange={handleBody} placeholder="Saisissez le contenu de la page de présentation..."/>

                  <button className="submit_Form btn myBtn mt-2 text-black" type="submit">Publier</button>
              </form>
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

export default Admin;