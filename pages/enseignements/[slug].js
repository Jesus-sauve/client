import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import Footer from '../../components/Footer';
import HeaderOther from '../../components/HeaderOther';
import Link from 'next/link';
import { API, DOMAIN, APP_NAME } from '../../config';
import moment from 'moment';
import 'moment/locale/fr';
import {listRelated, singleEnseignement} from'../../actions/enseignement';

import DisqusThread from '../../components/DisqusThread';
import MonSkeleton from '../../components/monSkeleton';

const SingleEnseignement = ({ enseignement, query }) => {

  const head = () => (
    <Head>
        <title>
            {enseignement.title} | {APP_NAME}
        </title>
        <meta name="description" content={enseignement.mdesc} />
        <link rel="canonical" href={`${DOMAIN}/enseignements/${query.slug}`} />
        <meta property="og:title" content={`${enseignement.title} | ${APP_NAME}`} />
        <meta property="og:description" content={enseignement.mdesc} />
        <meta property="og:type" content="webiste" />
        <meta property="og:url" content={`${DOMAIN}/enseignements/${query.slug}`} />
        <meta property="og:site_name" content={`${APP_NAME}`} />

        <meta property="og:image" content={`${DOMAIN}/static/images/bible.jpg`} />
        <meta property="og:image:secure_url" content={`${DOMAIN}/static/images/bible.jpg`} />
        <meta property="og:image:type" content="bible/jpg" />
    </Head>
);

  const [categories, setCategories] = useState([]);
  const [related, setRelated] = useState([]);
  

  const loadRelated = () => {
    listRelated({enseignement}).then(data => {
      if(data.error) {
        console.log(data.error);
      } else {
        setRelated(data);
      }
    });
  };

  const showRelatedEnseignement = () => {
    return related.map((r) => (
      <div className='col-md-4 mx-2' key={r._id}>
      <div className="card" style={{width: "350px"}}>
        <section>
          <Link href={`/enseignements/${r.slug}`}>
            <a>
              <div className="bg-image hover-overlay ripple" data-mdb-ripple-color="light">
                <img className='img img-fluid' src={`${API}/enseignement/photo/${r.slug}`} alt={r.title} style={{ height: '15rem' }} />
                <div className="mask" style={{backgroundColor: '#00000078'}}></div>
              </div>
            </a>
          </Link>
        </section>

        <div className="card-body" style={{ height:'12rem' }}>
          <section>
            <Link href={`/enseignements/${r.slug}`}>
                <h5 className='card-title text-danger'>{r.title}</h5>
            </Link>
            <div className='pb-3 mt-4 text-center' dangerouslySetInnerHTML={{ __html: r.excerpt }}></div>
          </section>
        </div>

        <div className="card-body text-center">
        <Link href={`/enseignements/${r.slug}`}>
            <a className='btn myBtn text-black mb-3'>Lire plus</a>
          </Link>

          <p className="mark ml-1 p-1 fs-6">
            Posté {moment(r.updatedAt).fromNow()}
        </p>
        </div>
      </div>
    </div>
  ))}

  const showComments = () => {return ( <div><DisqusThread id={enseignement._id} title={enseignement.title} path={`/enseignement/${enseignement.slug}`} /></div>)}

  const callCategories = async () => {
		try {
			const res = await fetch(`${API}/categories`);
			const data = await res.json();
      setCategories(data)
		} catch (err) {
			console.log(err);
		}
	};

  useEffect(() => {
    {callCategories()}
    loadRelated();
  }, []);
    
  const showAllCategories = enseignement => 
    enseignement.categories.map((c, i) => (
      <Link key={i} href={`/category/${c.slug}`}>
        <a className='btn btn-sm btn-dark m-1 '>{c.name}</a>
      </Link>
    ));

    return (
        <>
        {head()}
          <HeaderOther />
            <div className="all_pages page_enseignement_seul">
              <div className='container'>
                <Link href="/enseignements">
                    <a className="btn btn-dark my-5">
                        Retour
                    </a> 
                </Link>
                <div className='row'>
                  <div className="col-md-9">
                    <h1 className='h1'>{enseignement.title}</h1>
                    <p className="lead pt-1 pb-1 mark ml-1 p-1 fs-6">
                      Posté {moment(enseignement.updatedAt).fromNow()}
                    </p>
                    <section>
                      <div className='pb-3 mt-4' dangerouslySetInnerHTML={{ __html: enseignement.body }}></div>
                    </section>
                  </div>

                  <div className="col-md-3">
                    <section>
                      <div className="pb-3">
                        {showAllCategories(enseignement)}
                      </div>
                    </section>
                    <hr className="my-5" />
                    <section>
                      <div className="bg-image hover-overlay ripple shadow-2-strong rounded-5" data-mdb-ripple-color="light">
                        <img src={`${API}/enseignement/photo/${enseignement.slug}`} alt={enseignement.title} className="img img-fluid" style={{ maxHeight: 'auto', width: '100%', minHeight: 'auto' }} />
                        <a href="#!">
                        <div className="mask" style={{backgroundColor: '#00000078'}}></div>
                        </a>
                      </div>
                    </section>

                    <hr className="my-5" />
                    <h4 className='mb-5 titres_bas_presentation'><strong>Nos différentes catégories</strong></h4>
                    <section>
                      {categories === 0 ? ( <MonSkeleton /> ) : (categories.map((item, i) => (
                        <Link key={i} href={`/category/${item.slug}`}>
                          <a className='btn btn-sm btn-dark m-1 '>{item.name}</a>
                        </Link>
                        )))
                      }
                    </section>
                  </div>
                </div>

                <hr className="my-5" />
                <div>
                  <h4 className='mb-5 titres_bas_presentation text-center'><strong>Enseignements similaires</strong></h4>
                   <div className="row">
                      {showRelatedEnseignement()}
                   </div>
                </div>
              </div>
            </div>

            <div className='container'>
              <hr className="my-5" />
                {showComments()}
              <hr className="my-5" />
            </div>
          <Footer />
        </>
      );
    };

  SingleEnseignement.getInitialProps = ({ query }) => {
    return singleEnseignement(query.slug).then(data => {
      if(data.error) {
          console.log(data.error);
      } else {
        return {
          enseignement: data, query
        };
      }
    });
  };

export default SingleEnseignement;