import React, { useState, useEffect, useContext } from 'react';
import Head from 'next/head';
import Footer from '../../../../components/Footer';
import HeaderOther from '../../../../components/HeaderOther';
import Link from 'next/link';
import { list, removeBible } from '../../../../actions/bible';
import moment from 'moment';
import 'moment/locale/fr';

function GestionT() {
  const [bibles, setBibles] = useState([]);
  const [message, setMessage] = useState('');

  useEffect(() => {
    loadBibles()
  }, []);

 const loadBibles = () => {
  list().then(data => {
    if(data.error) {
      console.log(data.error);
    } else {
      setBibles(data);
    }
  });
 };

 const deleteBible = (slug) => {
  removeBible(slug).then(data => {
    if(data.error) {
      console.log(data.erro);
    } else {
      setMessage(data.message)
      loadBibles();
    }
  })
 }

 const deleteConfirm = (slug) => {
  let answer = window.confirm("Confirmez-vous cette suppression ?")
  if(answer) {
    deleteBible(slug)
  }
 }


const showAllBibleLink = () => {
  return bibles.map((bible, i) => {
    return (
      <div key={i} className="mt-2">
        <h3>{bible.title}</h3>
        <p className="lead pt-1 pb-1 mark ml-1 p-1 fs-6">
          Posté {moment(bible.updatedAt).fromNow()}
        </p>
        <button className='btn m-1 btn-sm btn-danger' onClick={() => deleteConfirm(bible.slug)}>
          supprimer
        </button>
       
      </div>
    )
  })
}

  return (
    <>
    <Head>
        <title>Basebiblique | Gestion des Liens de bible</title>
    </Head>
      <HeaderOther />
        <div className="all_pages">
          <div className='container'>
          <Link href="/admin">
              <a className="btn m-2 btn-dark">
                  Retour
              </a> 
          </Link>
            <h1 className='h1'>Gestion des enseignements</h1>
            {message && <div className='alert alert-warning'>{message}</div>}
            {showAllBibleLink()}
          </div>
        </div>
        <div className='container'>
          <hr className="my-5" />
        </div>
      <Footer />
    </>
  );
};

export default GestionT;