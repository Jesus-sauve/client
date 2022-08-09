import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import Footer from '../../components/Footer';
import HeaderOther from '../../components/HeaderOther';
import { withRouter } from 'next/router';
import { singleCategory } from'../../actions/category';
import Card from '../../components/Enseignement/Card'
import Search from '../../components/Enseignement/Search';
import { DOMAIN, APP_NAME } from '../../config';

const Category = ({ category, enseignements, query }) => {

    const head = () => (
        <Head>
            <title>
            {category.name} | {APP_NAME}
            </title>
            <meta name="description" content="Blogs chrétien, enseignements, vidéos, prédications baseBiblique pour une édification totale" />
            <link rel="canonical" href={`${DOMAIN}/enseignements/${query.slug}`} />
            <meta property="og:title" content={`${category.name} | ${APP_NAME}`} />
            <meta property="og:description" content="Blogs chrétien, enseignements, vidéos, prédications baseBiblique pour une édification totale" />
            <meta property="og:type" content="webiste" />
            <meta property="og:url" content={`${DOMAIN}/enseignements/${query.slug}`} />
            <meta property="og:site_name" content={`${APP_NAME}`} />
    
            <meta property="og:image" content={`${DOMAIN}/static/images/bible.jpg`} />
            <meta property="og:image:secure_url" content={`${DOMAIN}/static/images/bible.jpg`} />
            <meta property="og:image:type" content="bible/jpg" />
        </Head>
    );


    return (
        <>
        {head()}
      <HeaderOther />
        <div className="all_pages page_enseignement_seul">
          <div className='container'>

            <header>
                <div className='col-md-12 pt-3'>
                    <div className="row">
                        <div className="col-md-6">
                            <h1 className='h1'>{category.name}</h1>
                        </div>
                        <div className="col-md-6">
                            <Search />
                        </div>
                    </div>
                </div>
            </header>

            <hr className="my-5" />

            {
            enseignements.map((e, i)=> (
                <div>
                    <Card key={i} enseignement={e} />
                   <hr />
                </div>
            ))}

            <hr className="my-5" />

            </div>
        </div>
        <Footer />
        </>
    );
};

Category.getInitialProps = ({query}) => {
    return singleCategory(query.slug).then(data => {
        if(data.error) {
            console.log(data.error);
        } else {
            return { 
                category: data.category,
                enseignements: data.enseignements,
                query
            }
            
        }
    });
};


export default withRouter(Category);