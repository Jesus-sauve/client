import React, { useContext, useEffect, useState } from 'react';
import Head from 'next/head';
import Footer from '../../../../components/Footer';
import HeaderOther from '../../../../components/HeaderOther';
import { create, getCategories, removeCategory } from '../../../../actions/category';
import Link from 'next/link';
import Noty from 'noty';

function Categories() {

    const [values, setValues] = useState({
        name: '',
        error: false,
        success: false,
        categories: [],
        removed: false,
        reload: false
    })

    const { name, error, success, categories, removed, reload } = values;

    useEffect(() => {
        loadCategories();
    }, [reload]);

    const loadCategories = () => {
        getCategories().then(data => {
            if(data.error) {
                console.log(data.error);
            } else {
                setValues({ ...values, categories: data })
            }
        });
    };

    const showCategories = () => {
        return categories.map((c, i) => {
            return <button onDoubleClick={() => deleteConfirm(c.slug)} title='Faites un double clique pour supprimer la catégorie' key={i} className="btn btn-light m-2" data-mdb-ripple-color="dark">
                {c.name}
            </button>
        })
    }

    const deleteConfirm = slug => {
        let answer = window.confirm('Êtes-vous sûre de vouloir supprimer cette catégorie ?');
        if (answer) {
            deleteCategory(slug);
        }
    };

    const deleteCategory = slug => {
        console.log('delete', slug);
        removeCategory(slug).then(data => {
            if (data.error) {
                console.log(data.error);
                new Noty({
                    type: 'success',
                    theme: 'bootstrap-v4',
                    layout: 'topRight',
                    text: `Nouvelle catégorie créée`,
                    timeout: 3000
                }).show();
            } else {
                setValues({ ...values, error: false, success: false, name: '', removed: !removed, reload: !reload });
                new Noty({
                    type: 'error',
                    theme: 'mint',
                    layout: 'topRight',
                    text: "catégorie supprimée",
                    timeout: 3000
                  }).show();
            }
        });
    };

    const handleChange = e => {
        setValues({...values, name: e.target.value, error: false, success: false, removed: ''});
    }

    const clickSubmit = e => {
        e.preventDefault()
        // console.log('Catégorie créée');
        create({ name }).then(data => {
            if(data.error) {
                setValues({ ...values, error: data.error, success: false });
                new Noty({
                    type: 'error',
                    theme: 'mint',
                    layout: 'topRight',
                    text: data.error,
                    timeout: 3000
                  }).show();
            } else {
                setValues({ ...values, error: false, success: true, name: '' });
                new Noty({
                    type: 'success',
                    theme: 'bootstrap-v4',
                    layout: 'topRight',
                    text: `Nouvelle catégorie créée`,
                    timeout: 3000
                }).show();
            }
        })
    }

  return (
    <>
    <Head>
        <title>Basebiblique | Catégories</title>
    </Head>
      <HeaderOther />
        <div className="all_pages">
          <div className='container categorie_page'>
            <Link href="/admin">
                <a className="btn btn-dark">
                    Retour
                </a> 
            </Link>
            <h1 className='h1'>Catégories</h1>
            <form onSubmit={clickSubmit}>
              <span>Veuillez saisir le nom de la Catégorie</span>
              <div className="form-outline my-4 w-75">
                <input onChange={handleChange} type="text" value={name} id="textCategorie" className="form-control" required />
                <label className="form-label" htmlFor="textCategorie">Nom de la Catégorie*</label>
              </div>

                <button className="submit_Form btn myBtn mt-2 text-white" type="submit">Créer</button>
            </form>
          </div>

        <div className='container'>
            <hr className="my-5" />
            <div>
                {showCategories()}
            </div>
        </div>

        </div>
        <div className='container'>
          <hr className="my-5" />
        </div>
      <Footer />
    </>
  );
};
export default Categories;