import React, { useState, useEffect, useContext } from 'react';
import Head from 'next/head';
import Footer from '../../../../components/Footer';
import HeaderOther from '../../../../components/HeaderOther';
import Link from 'next/link';
import { list, removeEnseignement } from '../../../../actions/enseignement';
import moment from 'moment';
import 'moment/locale/fr';

function GestionE() {
  const [enseignements, setEnseignements] = useState([]);
  const [message, setMessage] = useState('');

  useEffect(() => {
    loadEnseignements()
  }, []);

 const loadEnseignements = () => {
  list().then(data => {
    if(data.error) {
      console.log(data.error);
    } else {
      setEnseignements(data);
    }
  });
 };

 const deleteEnseignement = (slug) => {
  removeEnseignement(slug).then(data => {
    if(data.error) {
      console.log(data.erro);
    } else {
      setMessage(data.message)
      loadEnseignements();
    }
  })
 }

 const deleteConfirm = (slug) => {
  let answer = window.confirm("Confirmez-vous cette suppression ?")
  if(answer) {
    deleteEnseignement(slug)
  }
 }

 const showUpdateButton = (enseignement) => {
  return (
    <Link href={`/admin/enseignement/${enseignement.slug}`}>
      <a className='btn m-1 btn-sm btn-dark'>Modifier</a>
    </Link>
  )
 }

const showAllEnseignements = () => {
  return enseignements.map((enseignement, i) => {
    return (
      <div key={i} className="mt-2">
        <h3>{enseignement.title}</h3>
        <p className="lead pt-1 pb-1 mark ml-1 p-1 fs-6">
          Posté {moment(enseignement.updatedAt).fromNow()}
        </p>
        <button className='btn m-1 btn-sm btn-danger' onClick={() => deleteConfirm(enseignement.slug)}>
          supprimer
        </button>
        {showUpdateButton(enseignement)}
      </div>
    )
  })
}

  return (
    <>
    <Head>
        <title>Basebiblique | Gestion des enseignements</title>
    </Head>
      <HeaderOther />
        <div className="all_pages">
          <div className='container'>
          <Link href="/admin/enseignement">
              <a className="btn m-2 btn-dark">
                  Retour
              </a> 
          </Link>
            <h1 className='h1'>Gestion des enseignements</h1>
            {message && <div className='alert alert-warning'>{message}</div>}
            {showAllEnseignements()}
          </div>
        </div>
        <div className='container'>
          <hr className="my-5" />
        </div>
      <Footer />
    </>
  );
};

export default GestionE;