import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import Footer from '../../components/Footer';
import renderHTML from 'react-render-html';
import HeaderOther from '../../components/HeaderOther';
import {list} from '../../actions/theologie';
import { allTheme } from '../../actions/theologieTheme';
import { withRouter } from 'next/router';
import { DOMAIN, APP_NAME } from '../../config';
import Link from 'next/link';
import Reveal from 'react-reveal/Fade';

const Theologie = ({ router }) => {

  const [themes, setThemes] = useState([]);

  const head = () => (
    <Head>
        <title>{APP_NAME} | Théologie</title>
        <meta
            name="description"
            content="Blogs chrétien, enseignements, vidéos, prédications baseBiblique pour une édification totale"
        />
        <link rel="canonical" href={`${DOMAIN}${router.pathname}`} />
        <meta property="og:title" content={`Retour aux fondements bibliques | ${APP_NAME}`} />
        <meta
            property="og:description"
            content="Blogs chrétien, enseignements, vidéos, prédications baseBiblique pour une édification totale"
        />
        <meta property="og:type" content="webiste" />
        <meta property="og:url" content={`${DOMAIN}${router.pathname}`} />
        <meta property="og:site_name" content={`${APP_NAME}`} />

        <meta property="og:image" content={`${DOMAIN}/static/images/bible.jpg`} />
        <meta property="og:image:secure_url" content={`${DOMAIN}/static/images/bible.jpg`} />
        <meta property="og:image:type" content="bible/jpg" />
    </Head>
);


const allThemes = () => {
  allTheme().then(data => {
    let newInfo = data;
    if(data.error) {
      console.log(data.error);
    } else {
      setThemes(newInfo)
    }
  })
}

useEffect(() => {
  {allThemes()}
}, []);

  return (
    <>
    {head()}
      <HeaderOther />
        <div className="all_pages theologie_page">
          <div className='container-fluid'>
            
          <div className="container">
            <h1 className='h1'>Théologie</h1>
            <p>Merci de choisir un thème</p>

            <Reveal left>
            <div className='list_theme'>
              {themes.map((t, i) => (
                <Link key={i} href={`/theologie/${t.slug}`}>
                  <a className="nav-link btn mx-2 btn-outline-dark" data-mdb-ripple-color="dark">{t.name}</a>
                </Link>
              ))}
            </div>
            </Reveal>
            
          </div>
          <div className="container">
            <hr className="my-5" />
          </div>

          </div>
        </div>
      <Footer />
    </>
  );
};

Theologie.getInitialProps = () => {
  return list().then(data => {
    if(data.error) {
      console.log(data.error);
    } else {
      return {
        theologie: data
      }
    }
  })
}


export default withRouter(Theologie);