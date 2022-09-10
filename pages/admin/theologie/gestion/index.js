import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import Footer from '../../../../components/Footer';
import HeaderOther from '../../../../components/HeaderOther';
import Link from 'next/link';
import { list, removeThheologie } from '../../../../actions/theologie';

function GestionT() {
  const [theologies, setTheologies] = useState([]);
  const [message, setMessage] = useState('');

  useEffect(() => {
    loadTheologies()
  }, []);

  const loadTheologies = () => {
    list().then(data => {
      if (data.error) {
        console.log(data.error);
      } else {
        setTheologies(data);
      }
    });
  };

  const deleteTheologie = (slug) => {
    removeThheologie(slug).then(data => {
      if (data.error) {
        console.log(data.erro);
      } else {
        setMessage(data.message)
        loadTheologies();
      }
    })
  }

  const deleteConfirm = (slug) => {
    let answer = window.confirm("Confirmez-vous cette suppression ?")
    if (answer) {
      deleteTheologie(slug)
    }
  }

  const showUpdateButton = (theologie) => {
    return (
      <Link href={`/admin/theologie/${theologie.slug}`}>
        <a className='btn m-1 btn-sm btn-dark'>Modifier</a>
      </Link>
    )
  }

  const showAllTheologies = () => {
    return theologies.map((theologie, i) => {
      return (
        <div key={i} className="mt-2">
          <h3>{theologie.title}</h3>
          <button className='btn m-1 btn-sm btn-danger' onClick={() => deleteConfirm(theologie.slug)}>
            supprimer
          </button>

          {showUpdateButton(theologie)}
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
          <Link href="/admin/theologie">
            <a className="btn m-2 btn-dark btn-retour">
              Retour
            </a>
          </Link>
          <h1 className='h1'>Gestion des enseignements</h1>
          {message && <div className='alert alert-warning'>{message}</div>}
          {showAllTheologies()}
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