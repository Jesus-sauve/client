import React from 'react';
import Head from 'next/head';
import Footer from '../../../components/Footer';
import HeaderOther from '../../../components/HeaderOther';
import Update from '../../../components/Theologie/Update';
import Link from 'next/link';

function Theologie() {

  return (
    <>
      <Head>
          <title>Basebiblique | Théologie</title>
      </Head>
      <HeaderOther />
        <div className="all_pages">
          <div className='container'>
          <Link href="/admin/theologie/gestion">
              <a className="btn m-2 btn-dark">
                  Retour
              </a> 
          </Link>
            
            <Update />
          </div>
        </div>
        <div className='container'>
          <hr className="my-5" />
        </div>
      <Footer />
    </>
  );
};
export default Theologie;