import React from 'react';
import Footer from '../../components/Footer';
import HeaderOther from '../../components/HeaderOther';
import Head from 'next/head';
import {list} from '../../actions/videos';
import { DOMAIN, APP_NAME } from '../../config';
import { withRouter } from 'next/router';
import MonSkeleton from '../../components/monSkeleton';

const Videos = ({ videos, router }) => {

  const head = () => (
    <Head>
        <title>{APP_NAME} | Videos</title>
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

  return (
    <>
    {head()}
      <HeaderOther />
        <div className="all_pages all_video">
          <div className='container'>
            <h1 className='h1'>Vidéos</h1>
          <div className='row'>
            {videos.length === 0 ? (
              <MonSkeleton />
              ) : ( videos.map((video, i) => (
                <div key={i} className="col-md-4">
                  <div className="card" style={{ height: '350px' }}>
                    <h5 className="card-title couleur p-3">{video.title}</h5>
                    <div className="card-body">
                    <div className='body_video text-center p-3' dangerouslySetInnerHTML={{ __html: video.body }}></div>
                  </div>
                </div>
              </div>
              )))}
            </div>

          </div>
          </div>
        <div className='container'><hr className="my-5" /></div>
      <Footer/>
    </>
  );
};


Videos.getInitialProps = () => {
  return list().then(data => {
    if(data.error) {
      console.log(data.error);
    } else {
      return {
        videos: data
      }
    }
  })
}

export default withRouter(Videos);