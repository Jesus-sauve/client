import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import Footer from '../../components/Footer';
import HeaderOther from '../../components/HeaderOther';
import { singleTheme, allTheme } from '../../actions/theologieTheme';
import { DOMAIN, APP_NAME, API } from '../../config';
import Link from 'next/link';
import axios from 'axios';
import { withRouter } from 'next/router';

import { Fade } from "react-awesome-reveal";
import MonSkeleton from '../../components/monSkeleton';

const SingleTheologie = ({ theme, query, router }) => {

    const [themes, setThemes] = useState([]);
    const [theologieActuel, setTheologieActuel] = useState('');
    var tmp = theme.theologieTheme;

  const head = () => (
    <Head>
        <title>{APP_NAME} | Théologie - {router.query.slug}</title>
        <meta
            name="description"
            content="Blogs chrétien, enseignements, vidéos, prédications baseBiblique pour une édification totale"
        />
       <link rel="canonical" href={`${DOMAIN}/theologie/${router.query.slug}`} />
        <meta property="og:title" content={`${router.query.slug} | ${APP_NAME}`} />
        <meta property="og:description" content="Blogs chrétien, enseignements, vidéos, prédications baseBiblique pour une édification totale" />
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

  const showTheologieActuel = () => {
    axios.get(`${API}/theologie-theme-actuel/${router.query.slug}`,)
    .then(response => {
        let info = response.data
        setTheologieActuel(info)
    });
  };
  
  useEffect(() => {
    {allThemes()}
    {showTheologieActuel()}
  }, []);

  return (
    <>
    {head()}
      <HeaderOther />
        <div className="all_pages theologie_page">
          <div className='container-fluid'>
            
          <div className="container">
            <h1 className='h1'>Théologie</h1>

            <div className='list_theme'>
              {themes.length === 0 ? <MonSkeleton /> : (
              themes.map((t, i) => (
                <Link key={i} href={`/theologie/${t.slug}`}>
                  <a className={`nav-link btn mx-2 ${router.query.slug == t.slug ? 'btn-primary' : 'btn-outline-dark'}`} data-mdb-ripple-color="dark">{t.name}</a>
                </Link>
              )))}
            </div>
          </div>
          

          <div className="row">
            <div className="col-md-2">
                <div className="nav flex-column text-center mt-5">
                    {tmp.length === 0 ? <MonSkeleton /> : (
                    tmp.map((tmp, i) => (
                      <Fade key={i} cascade damping={0.1}>
                        <Link href={`/theologie/sous-theme/${tmp.slug}`}>
                          <div style={{ display:'flex', alignItems:'center', justifyContent:"center" }}>
                            <p className='p-2 m-1'>{i + 1}</p>
                            <a className="btn btn-outline-dark btn-block p-2 m-2" data-mdb-ripple-color="dark">{tmp.name}</a>
                          </div>
                        </Link>
                      </Fade>
                    )))}
                </div>
            </div>
            <div className="col-md-10 theologie_content mt-3">
              <Fade cascade damping={0.1}>
                  <div>
                  { tmp.length === 0 ? <MonSkeleton /> :  <></>}
                  </div>
              </Fade>
            </div>
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

SingleTheologie.getInitialProps = ({ query }) => {
    return singleTheme(query.slug).then(data => {
        if(data.error) {
            console.log(data.error);
        } else {
            return {
                theme: data, query
            };
        }
    });
};


export default withRouter(SingleTheologie);