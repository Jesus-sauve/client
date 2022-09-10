import React from 'react';
import Head from 'next/head';
import Footer from '../../components/Footer';
import HeaderOther from '../../components/HeaderOther';
import { APP_NAME, DOMAIN } from '../../config';
import { useRouter } from "next/router";
import MonSkeleton from '../../components/monSkeleton';

function Church() {

  const router = useRouter();


  const head = () => (
    <Head>
        <title>{APP_NAME} | Church map</title>
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
        <div className="all_pages">
          <div className='container'>
            <h1 className='h1'>Church map</h1>
            <MonSkeleton />
          </div>
        </div>
        <div className='container'>
          <hr className="my-5" />
        </div>
      <Footer />
    </>
  );
};
export default Church;