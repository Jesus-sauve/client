import React from 'react';
import Head from 'next/head';
import Footer from '../../components/Footer';
import renderHTML from 'react-render-html';
import HeaderOther from '../../components/HeaderOther';
import {list} from '../../actions/theologie';
import { withRouter } from 'next/router';
import { API, DOMAIN, APP_NAME } from '../../config';

const Theology = ({ theologie }) => {

  const head = () => (
    <Head>
        <title>{APP_NAME} | Théologie</title>
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
    <Head>
        <title>Basebiblique | Théologie</title>
    </Head>
      <HeaderOther />
        <div className="all_pages theologie_page">
          <div className='container-fluid'>
            <h1 className='h1'>Théologie</h1>


            
            <div className="row">

  <div className="col-md-2">
    <div className="nav flex-column nav-tabs text-center" id="v-tabs-tab" role="tablist" aria-orientation="vertical">
      {
        !theologie ?
        <>
          <Skeleton count={10}/>
              <p>
            Contenu bientôt disponible...
              </p>
        </> :
        theologie.map((t, i) => (
          <a key={i} className="nav-link" id={`${t.slug}`} data-mdb-toggle="tab" href={`#${t.slug}-44`} role="tab" aria-controls={`${t.slug}-44`} aria-selected="true">{t.title}</a>
        ))
      }

    </div>
  </div>

  <div className="col-md-10">
    <div className="tab-content" id="v-tabs-tabContent">
      {
         !theologie ?
         <>
           <Skeleton count={10}/>
               <p>
             Contenu bientôt disponible...
               </p>
         </> :
         theologie.map((t, i) => (
      <div key={i} className="tab-pane scrollbar fade" id={`${t.slug}-44`} role="tabpanel" aria-labelledby={`${t.slug}`}>
        {renderHTML(t.body)}
      </div>
      ))
      }

    </div>
  </div>
</div>


          <hr className="my-5" />
</div>
          


        </div>
      <Footer />
    </>
  );
};

Theology.getInitialProps = () => {
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


export default withRouter(Theology);