import React, { useState } from 'react';
import Head from 'next/head';
import Footer from '../../components/Footer';
import Skeleton from 'react-loading-skeleton-2';
import HeaderOther from '../../components/HeaderOther';
import { withRouter } from 'next/router';
import Link from 'next/link';
import 'moment/locale/fr';
import {listEnseignementWithCategories} from '../../actions/enseignement';
import Card from '../../components/Enseignement/Card';
import Search from '../../components/Enseignement/Search';
import { DOMAIN, APP_NAME } from '../../config';

const Enseignements = ({ enseignements, categories, totalEnseignements, enseignementsLimit, enseignementSkip, router }) => {

  const [limit, setLinit] = useState(enseignementsLimit);
  const [skip, setSkip] = useState(0);
  const [size, setSize] = useState(totalEnseignements);
  const [loadedEnseignements, setLoadedEnseignements] = useState([]);

  const loadMore = () => {
    let toSkip = skip + limit
    listEnseignementWithCategories(toSkip, limit).then(data => {
      if(data.error) {
        console.log(data.error);
      } else {
        setLoadedEnseignements([...loadedEnseignements, ...data.enseignements])
        setSize(data.size)
        setSkip(toSkip)
      }
    });
  };


  const loadMoreButton = () => {
    return (
      size > 0 && 
      size >= limit && 
        (
          <button onClick={loadMore} className='btn btn-dark btn-lg'>
            Charger plus
          </button>
        )
    );
};

const showLoadedEnseignements = () => {
  return loadedEnseignements.map((enseignement, i) => {
      // ()
      return (
          <article key={i}>
              <Card enseignement={enseignement} />
              <hr />
          </article>
      );
  });
};


const showAllEnseignements = () => {
  return enseignements.map((enseignement, i) => {
      // ()
      return (
          <article key={i}>
              <Card enseignement={enseignement} />
              <hr />
          </article>
      );
  });
};

const showAllCategories = () => {
  return categories.map(item => (
    <Link key={item._id} href={`/category/${item.slug}`}>
      <a className='btn btn-dark m-2'>{item.name}</a>
    </Link>
    ))
}


const head = () => (
  <Head>
      <title>{APP_NAME} | Enseignements</title>
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
    <React.Fragment>
    {head()}
      <HeaderOther />
        <div className="all_pages">
          <div className='container'>
            <div>
              <div className="row">
                <div className="col-md-6">
                  <h1 className='h1'>Enseignements</h1>
                </div>
                <div className="col-md-6">
                  <Search />
                </div>
              </div>
            </div>

            <hr className="my-5" />
            
            <div className="row">
              
           <div className="col-md-8">
             { !enseignements ? 
            <div className='container'>
              <Skeleton count={10}/>
              <p>
                Contenu bientôt disponible...
              </p>
            </div>
            :
            <div>
              {showAllEnseignements()}  
              {showLoadedEnseignements()}

              <div className='text-center m-3'>
                {loadMoreButton()} 
              </div>
            </div>
            }
           </div>

           <div className="col-md-4">
            <h4 className='mb-5 titres_bas_presentation'><strong>Nos différentes catégories</strong></h4>
              { !categories ? 
              <div className='container'>
                <Skeleton count={2}/>
                <p>
                  Thèmes bientôt disponible...
                </p>
              </div>
              :
              <div>{showAllCategories()}</div>
              }
          </div>

          </div>
          <hr className="my-5" />

          </div>
          
        </div>
      <Footer />
    </React.Fragment>
  );
};

Enseignements.getInitialProps = () => {
  let skip = 0;
  let limit = 2;
  return listEnseignementWithCategories(skip, limit).then(data => {
    if(data.error) {
      console.log(data.error);
    } else {
      return {
        enseignements: data.enseignements,
        categories: data.categories,
        totalEnseignements: data.size,
        enseignementsLimit: limit,
        enseignementSkip: skip
      }
    }
  })
}


export default withRouter(Enseignements);