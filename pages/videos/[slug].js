import React, { useContext, useEffect, useState } from 'react';
import Head from 'next/head';
import Footer from '../../components/Footer';
import Skeleton from 'react-loading-skeleton-2';
import HeaderOther from '../../components/HeaderOther';
import { withRouter } from 'next/router';
import Link from 'next/link';
import moment from 'moment';
import 'moment/locale/fr';
import { singleVideo } from'../../actions/videos';
import axios from 'axios';
import { Context } from '../../context';
import Noty from 'noty';
import { API, DOMAIN, APP_NAME } from '../../config';

const SingleVideo = ({ video, query }) => {

  const head = () => (
    <Head>
        <title>
            {video.title} | {APP_NAME}
        </title>
        <meta name="description" content={video.mdesc} />
        <link rel="canonical" href={`${DOMAIN}/videos/${query.slug}`} />
        <meta property="og:title" content={`${video.title} | ${APP_NAME}`} />
        <meta property="og:description" content={video.mdesc} />
        <meta property="og:type" content="webiste" />
        <meta property="og:url" content={`${DOMAIN}/videos/${query.slug}`} />
        <meta property="og:site_name" content={`${APP_NAME}`} />

        <meta property="og:image" content={`${DOMAIN}/static/images/bible.jpg`} />
        <meta property="og:image:secure_url" content={`${DOMAIN}/static/images/bible.jpg`} />
        <meta property="og:image:type" content="image/jpg" />
    </Head>
);
  

    return (
        <>
       {head()}
          <HeaderOther />
            <div className="all_pages page_video_seul">
              <div className='container'>

                <Link href="/videos">
                    <a className="btn btn-dark my-5">
                        Retour
                    </a> 
                </Link>

                <div className='row'>
                  <div className="col-md-12">
                    <h1 className='h1'>{video.title}</h1>
                    <p className="lead pt-1 pb-1 mark ml-1 p-1 fs-6">
                      Posté {moment(video.updatedAt).fromNow()}
                    </p>

                    <section>
                      <div className='pb-3 mt-4 body_video' dangerouslySetInnerHTML={{ __html: video.body }}></div>
                    </section>
                  </div>
                </div>

                <hr className="my-5" />


              </div>
            </div>
          <Footer />
        </>
      );
    };

    SingleVideo.getInitialProps = ({ query }) => {
        return singleVideo(query.slug).then(data => {
            if(data.error) {
                console.log(data.error);
            } else {
                return {
                    video: data, query
                };
            }
        });
    };

export default SingleVideo;