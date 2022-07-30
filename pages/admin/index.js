import React, { useState, useEffect, useContext } from 'react';
import Head from 'next/head';
import Footer from '../../components/Footer';
import dynamic from 'next/dynamic';
import HeaderOther from '../../components/HeaderOther';
import Link from 'next/link';
import { useRouter } from 'next/router';
import Router from 'next/router';
import { getCookie, isAuth, signout } from '../../actions/auth';
import '../../node_modules/react-quill/dist/quill.snow.css'
import Noty from 'noty';
import { showPresentation } from '../../actions/presentation';
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
    formData: '',
    title: '',
    hidePublishButton: false
  })

  const {error, sizeError, success, title, formData, hidePublishButton} = values;

  const router = useRouter();

  const isActiveOnglet = (r) => {
      if (r === router.pathname) {
          return ' activeOnglet'
      } else {
          return ''
      }
  }


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
    setValues({ ...values, formData: new FormData() })
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
            layout: 'topRight',
            text: data.error
          }).show();
    } else {
        setValues({...values, title: '', error: '', success: `Texte de présentation ajouté`});
        setBody('');
        new Noty({
            type: 'success',
            layout: 'topRight',
            text: `Texte de présentation ajouté`,
          }).show();
        Router.push(`/`);
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
                        <a className={"nav-link" + isActiveOnglet('/admin')}>
                            <span>{item.slug}</span>
                        </a> 
                      </Link>
                      ))
                    }
                  </li>
                  <li className="nav-item">
                  <Link href="/admin/enseignement">
                      <a className={"nav-link" + isActiveOnglet('/admin/enseignement')}>Enseignements</a> 
                  </Link>
                  </li>
                  <li className="nav-item">
                  <Link href="/admin/enseignement/categories">
                      <a className={"nav-link" + isActiveOnglet('/admin/enseignement/categories')}>Catégories</a> 
                  </Link>
                </li>
                <li className="nav-item">
                  <Link href="/admin/theologie">
                      <a className={"nav-link" + isActiveOnglet('/admin/theologie')}>Théologie</a> 
                  </Link>
                </li>
                <li className="nav-item">
                  <Link href="/admin/bible">
                      <a className={"nav-link" + isActiveOnglet('/admin/bible')}>Bible en ligne</a> 
                  </Link>
                </li>
                <li className="nav-item">
                  <Link href="/admin/video">
                      <a className={"nav-link" + isActiveOnglet('/admin/video')}>Vidéos</a> 
                  </Link>
                </li>
                
              </ol>

            <hr className="my-5" />
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