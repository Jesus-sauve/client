import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import Footer from '../../components/Footer';
import HeaderOther from '../../components/HeaderOther';
import { withRouter } from 'next/router';
import { singleCategory } from'../../actions/category';
import Card from '../../components/Enseignement/Card'
import Search from '../../components/Enseignement/Search';

const Category = ({ category, enseignements, query }) => {


    return (
        <>
        <Head>
            <title>Basebiblique | Catégorie - {category.name}</title>
        </Head>
      <HeaderOther />
        <div className="all_pages page_enseignement_seul">
          <div className='container'>

            <header>
                <div className='col-md-12 pt-3'>
                <h1 className='h1'>{category.name}</h1>
                <Search />
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