import React from 'react';
import Head from 'next/head';
import Footer from '../../components/Footer';
import Skeleton from 'react-loading-skeleton-2';
import HeaderOther from '../../components/HeaderOther';

function Bible() {
  return (
    <>
    <Head>
        <title>Basebiblique | Bible en ligne</title>
    </Head>
      <HeaderOther />
        <div className="all_pages">
          <div className='container'>
            <h1 className='h1'>Bible en ligne</h1>
            <Skeleton count={10}/>
            <p>
          Contenu bientôt disponible...
            </p>
          </div>
        </div>
        <div className='container'>
          <hr className="my-5" />
        </div>
      <Footer />
    </>
  );
};

export default Bible;