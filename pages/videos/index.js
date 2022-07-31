import React from 'react';
import Footer from '../../components/Footer';
import Skeleton from 'react-loading-skeleton-2';
import HeaderOther from '../../components/HeaderOther';
import Head from 'next/head';
import renderHTML from 'react-render-html';
import {list} from '../../actions/videos';
import Link from 'next/link';
import { DOMAIN, APP_NAME } from '../../config';
import { withRouter } from 'next/router';

const Videos = ({ videos, router }) => {

  const head = () => (
    <Head>
        <title>{APP_NAME} | Video</title>
        <meta
            name="description"
            content="Jésus lui dit: Je suis le chemin, la vérité, et la vie. Nul ne vient au Père que par moi."
        />
        <link rel="canonical" href={`${DOMAIN}${router.pathname}`} />
        <meta property="og:title" content={`Retour aux fondements bibliques | ${APP_NAME}`} />
        <meta
            property="og:description"
            content="Jésus lui dit: Je suis le chemin, la vérité, et la vie. Nul ne vient au Père que par moi."
        />
        <meta property="og:type" content="webiste" />
        <meta property="og:url" content={`${DOMAIN}${router.pathname}`} />
        <meta property="og:site_name" content={`${APP_NAME}`} />

        <meta property="og:image" content={`${DOMAIN}/static/images/bible.jpg`} />
        <meta property="og:image:secure_url" content={`${DOMAIN}/static/images/bible.jpg`} />
        <meta property="og:image:type" content="image/jpg" />
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
              {
                !videos ? 
                <>
                  <Skeleton count={10}/>
              <p>
            Contenu bientôt disponible...
              </p> 
                </> :
                videos.map((video, i) => (
                  <div key={i} className="col-md-4">
                  <div className="card" style={{ height: '460px' }}>
                  <div className="bg-image hover-overlay ripple" data-mdb-ripple-color="light">
                  <img src="https://res.cloudinary.com/basebiblique/image/upload/v1658598522/video-thumbnail_muc9ab.jpg" className="card-img-top img-fluid" alt="Video"/>
                    <Link href={`/videos/${video.slug}`}>
                      <a>
                        <div className="mask"></div>
                      </a>
                    </Link>
                  </div>
                  
                    <div className="card-body">
                      <h5 className="card-title">{video.title}</h5>
                      <div className="pb-3">{renderHTML(video.excerpt)}</div>
                    </div>
                  </div>
                </div>
                ))
              }
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