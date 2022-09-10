import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import Footer from '../../../components/Footer';
import HeaderOther from '../../../components/HeaderOther';
import renderHTML from 'react-render-html';
import { allTheme } from '../../../actions/theologieTheme';
import { single_sous_Theme } from '../../../actions/theologieSousTheme';
import { DOMAIN, APP_NAME, API } from '../../../config';
import Link from 'next/link';
import axios from 'axios';
import Router, { withRouter } from 'next/router';

import { Fade } from "react-awesome-reveal";
import MonSkeleton from '../../../components/monSkeleton';

const SingleSousTheologie = ({ theme, router }) => {

    const [themes, setThemes] = useState([]);
    const [sousThemeActuel, setSousThemeActuel] = useState('');
    const [theologies, setTheologies] = useState([]);
    const [onlyTheologieTheme, setOnlyTheologieTheme] = useState({});
    const [onlyTheologieThemeSlug, setOnlyTheologieThemeSlug] = useState({});
    const [allSousTheme, setAllSousTheme] = useState([]);
    const [tmpValue, settmpValue] = useState([]);
    const [tmpValue1, settmpValue1] = useState([]);

  const head = () => (
    <Head>
        <title>{APP_NAME} | Théologie - {sousThemeActuel.name}</title>
        <meta
            name="description"
            content="Blogs chrétien, enseignements, vidéos, prédications baseBiblique pour une édification totale"
        />
       <link rel="canonical" href={`${DOMAIN}/theologie/${router.query.slug}`} />
        <meta property="og:title" content={`${sousThemeActuel.name} | ${APP_NAME}`} />
        <meta
            property="og:description"
            content="Blogs chrétien, enseignements, vidéos, prédications baseBiblique pour une édification totale"
        />
        <meta property="og:type" content="webiste" />
        <meta property="og:url" content={`${DOMAIN}/videos/${router.query.slug}`} />
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

    const allSousThemeTheologie = () => {
      axios.get(`${API}/theologie-sous-themes`,)
        .then(response => {
          settmpValue(response.data)
        });
      }



     const sousTheme = () => {
        axios.get(`${API}/theologie-sous-theme-actuel/${router.query.slug}`,)
        .then(response => {
            let info = response.data
            setSousThemeActuel(info)
            setOnlyTheologieTheme(response.data.theologieTheme[0]._id)
            setOnlyTheologieThemeSlug(response.data.theologieTheme[0].slug)
      });
    };

    const showTheologies = () => {
        axios.get(`${API}/theologie-sous-theme/${router.query.slug}`,)
        .then(response => {
            let infos = response.data.theologies
        setTheologies(infos)
        
      });
    };

  useEffect(() => {
    {allThemes()}
    {sousTheme()}
    {showTheologies()}
    {allSousThemeTheologie()}
  }, []);

  return (
    <>
    {head()}
      <HeaderOther />
        <div className="all_pages theologie_page">
          <div className='container-fluid'>
            
          <div className="container">
            <h1 className='h1'>Théologie - {sousThemeActuel.name}</h1>
            
            <div className='list_theme'>
              {themes.length === 0 ? <MonSkeleton /> : (
              themes.map((t, i) => (
                <Link key={i} href={`/theologie/${t.slug}`}>
                  <a className={`nav-link btn mx-2 ${onlyTheologieThemeSlug == t.slug ? 'btn-primary' : 'btn-outline-dark'}`} data-mdb-ripple-color="dark">{t.name}</a>
                </Link>
              )))}
            </div>

          <button className='btn btn-dark mx-2 my-4' onClick={() => router.back()}><i className="fa-solid fa-arrow-left"></i></button>
          
          </div>
          
          { !router.query.slug ? <p>Indisponible</p> :
            <div className="row">
              <div className="col-md-2">
                  <div className="nav flex-column text-center mt-5">

                  <Fade cascade damping={0.1}>
                    {tmpValue.map((item, i) => {
                      if (item.theologieTheme.includes(onlyTheologieTheme)){
                      return (
                        <Link key={i} href={`/theologie/sous-theme/${item.slug}`}>
                          <a target="_blank" className={`btn btn-block p-2 my-2 ${sousThemeActuel.slug == item.slug ? 'btn-dark' : 'btn-outline-dark'}`} data-mdb-ripple-color="dark">{i+1}{" "}{item.name}</a>
                      </Link> ) } else null })}
                    </Fade>
                    
                  </div>
              </div>

              <div className="col-md-10 mt-5">
                <Fade cascade damping={0.1}>
                  <div className="nav nav-pills mb-3 text-center p-0" id="v-tabs-tab" role="tablist">
                    { theologies.length === 0 ? <MonSkeleton /> : (
                      theologies.map((t, i) => (
                      <a key={i} className="nav-link" id={`${t.slug}`} data-mdb-toggle="tab" href={`#${t.slug}-44`} role="tab" aria-controls={`${t.slug}-44`} aria-selected="true">{t.title}</a>
                    )))}
                  </div>
                  <div className="tab-content" id="v-tabs-tabContent">
                    {theologies.map((t, i) => (
                      <div key={i} className="tab-pane scrollbar fade" id={`${t.slug}-44`} role="tabpanel" aria-labelledby={`${t.slug}`}>
                          {renderHTML(t.body)}
                      </div>
                    ))}
                  </div>
                </Fade>
            </div>
        </div>
      } 
          <div className="container">
            <hr className="my-5" />
          </div>

          </div>
        </div>
      <Footer />
    </>
  );
};

SingleSousTheologie.getInitialProps = ({ query }) => {
    return single_sous_Theme(query.slug).then(data => {
        if(data.error) {
            console.log(data.error);
        } else {
            return {
                theme: data, query
            };
        }
    });
};


export default withRouter(SingleSousTheologie);