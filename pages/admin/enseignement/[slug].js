import React, { useContext, useEffect } from 'react';
import Head from 'next/head';
import Footer from '../../../components/Footer';
import Skeleton from 'react-loading-skeleton-2';
import HeaderOther from '../../../components/HeaderOther';
import Update from '../../../components/Enseignement/Update';
import { Context } from '../../../context';
import Noty from 'noty';
import { useRouter } from "next/router";
import Link from 'next/link';

function Enseignement({ enseignement }) {

  const router = useRouter();

  
  const { state, dispatch } = useContext(Context);
  const { user } = state;

  useEffect(() => {
    if (user === null || user.role.includes("Utilisateur")) {
      router.push('/')
    } 
  }, [])
  return (
    <>
      <Head>
          <title>Basebiblique | Enseignements</title>
      </Head>
      <HeaderOther />
        <div className="all_pages">
          <div className='container'>
          <Link href="/admin">
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
export default Enseignement;