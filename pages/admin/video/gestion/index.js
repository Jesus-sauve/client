import React, { useState, useEffect, useContext } from 'react';
import Head from 'next/head';
import Footer from '../../../../components/Footer';
import HeaderOther from '../../../../components/HeaderOther';
import Link from 'next/link';
import { list, removeVideo } from '../../../../actions/videos';

function GestionV() {
  const [videos, setVideos] = useState([]);
  const [message, setMessage] = useState('');

  useEffect(() => {
    loadVideos()
  }, []);

  const loadVideos = () => {
    list().then(data => {
      if (data.error) {
        console.log(data.error);
      } else {
        setVideos(data);
      }
    });
  };

  const deleteVideo = (slug) => {
    removeVideo(slug).then(data => {
      if (data.error) {
        console.log(data.error);
      } else {
        setMessage(data.message)
        loadVideos();
      }
    })
  }

  const deleteConfirm = (slug) => {
    let answer = window.confirm("Confirmez-vous cette suppression ?")
    if (answer) {
      deleteVideo(slug)
    }
  }

  const showUpdateButton = (video) => {
    return (
      <Link href={`/admin/video/${video.slug}`}>
        <a className='btn m-1 btn-sm btn-dark'>Modifier</a>
      </Link>
    )
  }

  const showAllVideos = () => {
    return videos.map((video, i) => {
      return (
        <div key={i} className="mt-2">
          <h3>{video.title}</h3>
          <button className='btn m-1 btn-sm btn-danger' onClick={() => deleteConfirm(video.slug)}>
            supprimer
          </button>
          {showUpdateButton(video)}
        </div>
      )
    })
  }

  return (
    <>
      <Head>
        <title>Basebiblique | Gestion des vidéos</title>
      </Head>
      <HeaderOther />
      <div className="all_pages">
        <div className='container'>
          <Link href="/admin/video">
            <a className="btn m-2 btn-dark">
              Retour
            </a>
          </Link>
          <h1 className='h1'>Gestion des vidéos</h1>
          {message && <div className='alert alert-warning'>{message}</div>}
          {showAllVideos()}
        </div>
      </div>
      <div className='container'>
        <hr className="my-5" />
      </div>
      <Footer />
    </>
  );
};

export default GestionV;