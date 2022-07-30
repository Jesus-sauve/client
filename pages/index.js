import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import Footer from '../components/Footer';
import Header from '../components/Header';
import Skeleton from 'react-loading-skeleton-2';
import Link from 'next/link';
import { withRouter } from 'next/router';
import {listEnseignementWithCategories} from '../actions/enseignement';
import axios from 'axios';
import moment from 'moment';
import 'moment/locale/fr';
import renderHTML from 'react-render-html';
import { API, DOMAIN, APP_NAME } from '../config';

const Accueil = ({ enseignements, router }) => {

  const head = () => (
    <Head>
        <title>{APP_NAME} | Accueil</title>
        <meta
            name="description"
            content="Jésus lui dit: Je suis le chemin, la vérité, et la vie. Nul ne vient au Père que par moi."
        />
        <link rel="canonical" href={`${DOMAIN}${router.pathname}`} />
        <meta property="og:title" content={`Retour aux fondements bibliques | ${APP_NAME}`} />
        <meta
            property="og:description"
            content="Jésus lui dit: Je suis le chemin, la vérité, et la vie. Nul ne vient au Père que par moi."
        />
        <meta property="og:type" content="webiste" />
        <meta property="og:url" content={`${DOMAIN}${router.pathname}`} />
        <meta property="og:site_name" content={`${APP_NAME}`} />

        <meta property="og:image" content={`${DOMAIN}/static/images/bible.jpg`} />
        <meta property="og:image:secure_url" content={`${DOMAIN}/static/images/bible.jpg`} />
        <meta property="og:image:type" content="image/jpg" />
    </Head>
);


  const [presentation, setPresentation] = useState();
  const [videos, setVideos] = useState([]);
  const [theologie, setTheologie] = useState([]);


  const showVideos = () => {
    axios.get('http://localhost:8000/api/videos',)
  .then(response => {
    let limit = response.data.length - 1
    let val = response.data[limit]
    setVideos(val)
  });
  };

  const showTheologie = () => {
    axios.get('http://localhost:8000/api/theologies',)
  .then(response => {
    let newVideos = response.data;
    setTheologie(newVideos)
  });
  };

  const callPresentation = async () => {
		try {
			const res = await fetch(`${API}/presentation`);
			const data = await res.json();
      setPresentation(data)
		} catch (err) {
			console.log(err);
		}
	};

  useEffect(() => {
    {callPresentation()}
    {showVideos()}
    {showTheologie()}
  }, [])


  const showEnseignement = () => {
    return enseignements.map((item, i) => (
      <div className='style_flex' key={i}>
        <div className="col-md-5 col-sm-12 gx-5 mb-5">
          <div className="bg-image hover-overlay ripple shadow-2-strong rounded-5" data-mdb-ripple-color="light">
            <img src={`${API}/enseignement/photo/${item.slug}`} alt={item.title} className="img-fluid" style={{ maxHeight: '200px', width: '100%', minHeight: '200px' }} />
            <a href="#!">
              <div className="mask" style={{backgroundColor: '#00000078'}}></div>
            </a>
          </div>
        </div>

        <div className="col-md-7 col-sm-12 gx-5 mb-4 p-4">
          <h4 className='couleur'><strong>{item.title}</strong></h4>
          <div className='mt-4 text-muted' dangerouslySetInnerHTML={{ __html: item.excerpt }}></div>
          <Link  href={`/enseignements/${item.slug}`}><a className="btn btn-sm myBtn mx-2 text-white">Voir plus</a></Link>
        </div>
      </div>
      ))
  }

  return (
    <>
    {head()}
      <Header />
        <main className="mt-5">

        <div className='all_pages presentation container'>
          <div className='mb-5'>

            { !presentation ? 
            <div className='container'>
              <h1 className='h1'>Présentation</h1>
              <Skeleton count={10}/>
              <p>
            Contenu bientôt disponible...
              </p>
            </div>
            :
            presentation.map(item => (
                <div key={item._id}>
                  <h1 className='h1'>{item.title}</h1>
                  <div dangerouslySetInnerHTML={{ __html: item.body }}></div>
                </div>
              ))
            }
           
        </div>
        <hr className="my-5" />
        <section>
          <div className='bas_presentation container'>
            <div className="row">
            <h4 className='mb-5 titres_bas_presentation'><strong>Nos dernières actualités</strong></h4>
            
            
            { !enseignements ? 
            <>
              <Skeleton count={10}/>
              <p>
            Contenu bientôt disponible...
              </p>
            </>
            :
            showEnseignement()}
            </div>

            <div className='video'>
              <h4 className='mb-5 titres_bas_presentation'><strong>Nouvelle prédication</strong></h4>
              <div className="bg-image hover-overlay ripple shadow-2-strong rounded-5">
                <img src="./images/video-thumb.jpg" alt="" className="img-fluid" />
                {
                  !videos ? <Skeleton count={1}/> : 
                  <Link href={`videos/${videos.slug}`}>
                    <a>
                      <div className="mask" style={{backgroundColor: '#00000078'}}></div>
                    </a>
                  </Link>
                }
              </div>
              <div className='video_contenu'>
                <p>{!videos ? <Skeleton count={1}/> : videos.title}</p>
                
                  {
                    !videos ? <Skeleton count={1}/> :
                    <span> Posté {moment(videos.updatedAt).fromNow()}</span>
                  }
                
                <p>Description</p>
                  {
                    !videos ? <Skeleton count={4}/> :
                    <span className='pb-3 mt-4 text-center text-black' dangerouslySetInnerHTML={{ __html: videos.excerpt }}></span>
                  }
                
                <Link  href="/videos"><a className="btn btn-sm myBtn mx-2 text-white">Voir toutes les vidéos</a></Link>
              </div>
            </div>
          </div>
        </section>
      </div>

      <section className="text-center theology">

      <div className="overlay"></div>
      <video playsInline autoPlay muted loop>
        <source src="https://res.cloudinary.com/basebiblique/video/upload/v1658262684/bible_z4v5sf.mp4" type="video/mp4" />
      </video>

      <div className="theology_content container">


          <h1 className="m-5 text-white h1"><strong>Théologie</strong></h1>

          <div className="row">
            {
              !theologie ?
              <>
                <Skeleton count={10}/>
              <p>
            Contenu bientôt disponible...
              </p>
              </> :
              theologie.map((t, i) => (
              <div key={i} className="col-lg-4 col-md-12 mb-4">
                <div className="card text-white" style={{backgroundColor: '#00000078'}}>
                  <div className="card-body">
                    <h5 className="card-title text-white">{t.title}</h5>
                    <div className="card-text">{renderHTML(t.excerpt)}</div>
                    <Link  href="/theology"><a className="btn btn-sm myBtn mx-2 text-white">Voir plus</a></Link>

                  </div>
                </div>
              </div>
              ))
            }
          </div>


          </div>

        </section>

        
      

        <div className='container'>
          <hr className="my-5" />
        </div>


        <section className="my-5 solas container">

          <div className="row d-flex justify-content-center">

          <div id="carouselExampleTouch" className="carousel slide" data-mdb-touch="false">
            <div className="carousel-inner">
              <div className="carousel-item active">
                <img src="./images/fond.png" className="img-fluid" alt="Wild Landscape"/>
                <div className="carousel-caption d-md-block">
                  <h5>SOLA SCRIPTURA</h5>
                  <p>La première sola, Sola Scriptura, signifie que seule l'Écriture peut et doit diriger notre foi et notre pratique chrétienne. La doctrine du Sola Scriptura répond aux questions suivantes : Quelle est la source de la vérité spirituelle qu’il nous faut croire et pratiquer ? Qui a autorité dans l’Église ?</p>
                </div>
              </div>
              <div className="carousel-item">
                <img src="./images/fond.png" className="img-fluid" alt="Camera"/>
                <div className="carousel-caption d-md-block">
                  <h5>SOLA GRATIA</h5>
                  <p>la Bible enseigne que le salut est Sola Gratia, seulement par la grâce de Dieu sans dépendre des œuvres : « Car tous ont péché et sont privés de la gloire de Dieu ; et ils sont gratuitement justifiés par sa grâce, par le moyen de la rédemption qui est en Jésus Christ […] l'homme est justifié par la foi, sans les œuvres de la loi » (Romains 3:23-24,28).</p>
                </div>
              </div>
              <div className="carousel-item">
                <img src="./images/fond.png"className="img-fluid" alt="Exotic Fruits"/>
                <div className="carousel-caption d-md-block">
                  <h5>SOLA FIDE</h5>
                  <p>Sola Fide, d’autre part, résume un autre aspect de notre salut, à savoir qu’il est par la foi seulement : « Car c'est par la grâce que vous êtes sauvés, par le moyen de la foi. Et cela ne vient pas de vous, c'est le don de Dieu. Ce n'est point par les œuvres, afin que personne ne se glorifie » (Éphésiens 2:8-9).</p>
                </div>
              </div>
              <div className="carousel-item">
                <img src="./images/fond.png"className="img-fluid" alt="Exotic Fruits"/>
                <div className="carousel-caption d-md-block">
                  <h5>SOLUS CHRISTUS</h5>
                  <p>« Je suis la porte. Si quelqu'un entre par moi, il sera sauvé… » (Jean 10:9), « Je suis le chemin, la vérité, et la vie. Nul ne vient au Père que par moi » (Jean 14:6). Il n’y a ni plusieurs vérités, ni plusieurs portes, ni plusieurs chemins pour avoir la vie éternelle. Jésus est la porte, le chemin, la vérité, et la vie, « car le salaire du péché, c'est la mort ; mais le don gratuit de Dieu, c'est la vie éternelle en Jésus Christ notre Seigneur » (Romains 6:23).</p>
                </div>
              </div>
              <div className="carousel-item">
                <img src="./images/fond.png"className="img-fluid" alt="Exotic Fruits"/>
                <div className="carousel-caption d-md-block">
                  <h5>SOLI DEO GLORIA</h5>
                  <p>Qui est responsable du salut des hommes ? Qui doit recevoir la gloire, l’homme, Dieu, ou les deux ? Quel est le but de la vie ? Pourquoi des événements tragiques se produisent dans nos vies ? Pourquoi Dieu permet-il la présence du mal dans le monde ?
                    Toutes ces questions, et bien d’autres, ont leur réponse dans la dernière Sola : Soli Deo Gloria – À Dieu seul soit la gloire. Il est écrit : « Tout a été créé par [Dieu le Fils] et pour lui » (Colossiens 1:16b), ou encore : « Soit donc que vous mangiez, soit que vous buviez, soit que vous fassiez quelque autre chose, faites tout pour la gloire de Dieu » (1 Corinthiens 10:31).</p>
                </div>
              </div>
            </div>
            <button className="carousel-control-prev" type="button" data-mdb-target="#carouselExampleTouch" data-mdb-slide="prev">
              <span className="carousel-control-prev-icon" aria-hidden="true"></span>
              <span className="visually-hidden">Previous</span>
            </button>
            <button className="carousel-control-next" type="button" data-mdb-target="#carouselExampleTouch" data-mdb-slide="next">
              <span className="carousel-control-next-icon" aria-hidden="true"></span>
              <span className="visually-hidden">Next</span>
            </button>
          </div>
          </div>
        </section>


        <div className="partie_trois_versets my-5">
        <div className='trois_versets container'>
          <div className='verset_1'>
            <i className="fa-solid fa-book-bible"></i>
            <p>Jésus-Christ :<br /> « Le chemin, la vérité et la vie, nul ne vient au pere que par lui… »</p> 
            <p className="verset">Jean 14 v 6</p>
          </div>
          <div  className='verset_1'>
            <i className="fa-solid fa-book-bible"></i>
            <p>Jésus-Christ :<br /> « Je suis la porte. Si quelqu'un entre par moi, il sera sauvé… »</p> 
            <p className="verset">Jean 10 v 9</p>
          </div>
          <div  className='verset_1'>
            <i className="fa-solid fa-book-bible"></i>
            <p>« car le salaire du péché, c'est la mort ; mais le don gratuit de Dieu, c'est la vie éternelle en Jésus Christ notre Seigneur »</p> 
            <p className="verset">Romains 6:23</p>
          </div>
        </div>
      </div>


      </main>
      
      <div className='container'>
          <hr className="my-5" />
        </div>

      <Footer />
    </>
  );
};

Accueil.getInitialProps = () => {
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
export default withRouter(Accueil);