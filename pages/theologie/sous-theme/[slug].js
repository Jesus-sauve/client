import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import Footer from '../../../components/Footer';
import HeaderOther from '../../../components/HeaderOther';
import renderHTML from 'react-render-html';
import { allTheme } from '../../../actions/theologieTheme';
import { single_sous_Theme, sous_Theme_actuel } from '../../../actions/theologieSousTheme';
import { DOMAIN, APP_NAME, API } from '../../../config';
import Link from 'next/link';
import axios from 'axios';
import Reveal from 'react-reveal/Fade';

const SingleSousTheologie = ({ theme, query }) => {

    const [themes, setThemes] = useState([]);
    const [sousThemeActuel, setSousThemeActuel] = useState('');
    const [theologies, setTheologies] = useState([]);

  const head = () => (
    <Head>
        <title>{APP_NAME} | Théologie - {sousThemeActuel.name}</title>
        <meta
            name="description"
            content="Blogs chrétien, enseignements, vidéos, prédications baseBiblique pour une édification totale"
        />
       <link rel="canonical" href={`${DOMAIN}/theologie/${query.slug}`} />
        <meta property="og:title" content={`${theme.name} | ${APP_NAME}`} />
        <meta
            property="og:description"
            content="Blogs chrétien, enseignements, vidéos, prédications baseBiblique pour une édification totale"
        />
        <meta property="og:type" content="webiste" />
        <meta property="og:url" content={`${DOMAIN}/videos/${query.slug}`} />
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

     const sousTheme = () => {
        axios.get(`${API}/theologie-sous-theme-actuel/${query.slug}`,)
        .then(response => {
            let info = response.data
            setSousThemeActuel(info)
      });
    };

    const showTheologies = () => {
        axios.get(`${API}/theologie-sous-theme/${query.slug}`,)
        .then(response => {
            let infos = response.data.theologies
        setTheologies(infos)
        // console.log(infos);
      });
    };
  
  useEffect(() => {
    {allThemes()}
    {sousTheme()}
    {showTheologies()}
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
              {themes.map((t, i) => (
                <Link key={i} href={`/theologie/${t.slug}`}>
                  <a className="nav-link btn mx-2 btn-outline-dark" data-mdb-ripple-color="dark">{t.name}</a>
                </Link>
              ))}
            </div>
          </div>

          {
            !query.slug ? <p>En cours</p>

            :

         

          <div className="row">
            <div className="col-md-2">
                <div className="nav flex-column text-center mt-5">
                <Reveal left>
                    {
                    <Link href={`/theologie/sous-theme/${sousThemeActuel.slug}`}>
                        <a className="btn btn-dark p-2 my-2" data-mdb-ripple-color="dark">
                            {sousThemeActuel.name}
                        </a>
                    </Link>
                    }
                </Reveal>
                </div>
            </div>

            <Reveal right>
                <div className="col-md-10 mt-5">
                    <Reveal left>
                            <div className="nav nav-pills mb-3 text-center p-0" id="v-tabs-tab" role="tablist">
                            {
                                theologies.map((t, i) => (
                                <a key={i} className="nav-link" id={`${t.slug}`} data-mdb-toggle="tab" href={`#${t.slug}-44`} role="tab" aria-controls={`${t.slug}-44`} aria-selected="true">{t.title}</a>
                                ))
                            }

                            </div>

                            <div className="tab-content" id="v-tabs-tabContent">
                            {
                                theologies.map((t, i) => (
                            <div key={i} className="tab-pane scrollbar fade" id={`${t.slug}-44`} role="tabpanel" aria-labelledby={`${t.slug}`}>
                                {renderHTML(t.body)}
                            </div>
                            ))
                            }

                            </div>
                    </Reveal>
                </div>
            </Reveal>
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


export default SingleSousTheologie;