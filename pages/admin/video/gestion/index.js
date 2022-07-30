import React, { useState, useEffect, useContext } from 'react';
import Head from 'next/head';
import Footer from '../../../../components/Footer';
import { withRouter } from 'next/router';
import Noty from 'noty';
import HeaderOther from '../../../../components/HeaderOther';
import Link from 'next/link';
import Router from 'next/router';
import Skeleton from 'react-loading-skeleton-2';
import { list, removeVideo } from '../../../../actions/videos';
import moment from 'moment';
import 'moment/locale/fr';
import { Context } from '../../../../context';
import { useRouter } from "next/router";

function GestionV() {
  const [videos, setVideos] = useState([]);
  const [message, setMessage] = useState('');
  const router = useRouter();

  
  const { state, dispatch } = useContext(Context);
  const { user } = state;

  useEffect(() => {
    loadVideos()
  }, []);

 const loadVideos = () => {
  list().then(data => {
    if(data.error) {
      console.log(data.error);
    } else {
      setVideos(data);
    }
  });
 };

 const deleteVideo = (slug) => {
  removeVideo(slug).then(data => {
    if(data.error) {
      console.log(data.erro);
    } else {
      setVideos(data.message)
      loadVideos();
    }
  })
 }

 const deleteConfirm = (slug) => {
  let answer = window.confirm("Confirmez-vous cette suppression ?")
  if(answer) {
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
        <p className="lead pt-1 pb-1 mark ml-1 p-1 fs-6">
          Posté {moment(video.updatedAt).fromNow()}
        </p>
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