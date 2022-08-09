import Link from 'next/link';
import { useState, useEffect } from 'react';
import Router from 'next/router';
import dynamic from 'next/dynamic';
import { withRouter } from 'next/router';
import { getCategories } from '../../actions/category';
import { singleEnseignement, updateEnseignement } from '../../actions/enseignement';
const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });
import '../../node_modules/react-quill/dist/quill.snow.css';
import { QuillModules, QuillFormats } from '../../helpers/quil';
import { API } from '../../config';
import Noty from 'noty';

const EnseignementUpdate = ({ router }) => {
    const [body, setBody] = useState('');
    const [categories, setCategories] = useState([]);
    const [image, setImage] = useState(null)

    const [checked, setChecked] = useState([]); // categories

    const [values, setValues] = useState({
        title: '',
        error: '',
        success: '',
        title: '',
        body: '',
        formData: typeof window !== 'undefined' && new FormData(),
    });
    
    const { error, success, formData, title } = values;

     useEffect(() => {
        setValues({ ...values, formData});
        initEnseignement();
        initCategories();
    }, [router]);

    const initEnseignement = () => {
        if (router.query.slug) {
            singleEnseignement(router.query.slug).then(data => {
                if (data.error) {
                    console.log(data.error);
                } else {
                    setValues({ ...values, title: data.title });
                    setBody(data.body);
                    setCategoriesArray(data.categories);
                }
            });
        }
    };

    const setCategoriesArray = enseignementCategories => {
        let ca = [];
        enseignementCategories.map((c, i) => {
            ca.push(c._id);
        });
        setChecked(ca);
    };

    const initCategories = () => {
        getCategories().then(data => {
            if (data.error) {
                setValues({ ...values, error: data.error });
            } else {
                setCategories(data);
            }
        });
    };

    const handleToggle = c => () => {
        setValues({ ...values, error: '' });
        // return the first index or -1
        const clickedCategory = checked.indexOf(c);
        const all = [...checked];

        if (clickedCategory === -1) {
            all.push(c);
        } else {
            all.splice(clickedCategory, 1);
        }
        console.log(all);
        setChecked(all);
        formData.set('categories', all);
    };

    const findOutCategory = c => {
        const result = checked.indexOf(c);
        if (result !== -1) {
            return true;
        } else {
            return false;
        }
    };

    const showCategories = () => {
        return (
            categories &&
            categories.map((c, i) => (
                <li key={i} className="list-unstyled">
                    <div className="form-check form-switch">
                        <input
                            onChange={handleToggle(c._id)}
                            checked={findOutCategory(c._id)}
                            type="checkbox"
                            className="form-check-input"
                            role="switch"
                        />
                        <label className="form-check-label">{c.name}</label>
                    </div>
                </li>
            ))
        );
    };

    const handleChange = name => e => {
        // console.log(e.target.value);
        const value = name === 'photo' ? e.target.files[0] : e.target.value;
        formData.set(name, value);
        setValues({ ...values, [name]: value, formData, error: '' });
        if (e.target.files && e.target.files[0]) {
            setImage(URL.createObjectURL(e.target.files[0]));
          }
      };
      
      const handleBody = e => {
        // console.log(e);
        setBody(e);
        formData.set('body', e);
      };

      const editEnseignement = e => {
        e.preventDefault();
        updateEnseignement(formData, router.query.slug).then(data => {
            if (data.error) {
                setValues({ ...values, error: data.error });
                new Noty({
                    type: 'error',
                    theme: 'metroui',
                    layout: 'topRight',
                    text: data.error,
                    timeout: 3000
                  }).show();
            } else {
                setValues({ ...values, title: '', success: `Enseignement mis à jour` });
                setBody('');
                setCategories([]);
                Router.push(`/admin`);
                new Noty({
                    type: 'info',
                    theme: 'metroui',
                    layout: 'topRight',
                    text: `Enseignement mis à jour`,
                    timeout: 3000
                }).show();
            }
        });
    };

    const updateEnseignementForm = () => {
        return (
            <>
             {body && (
                <img className="img img-fluid" style={{ width: '17%', height: '200px', borderRadius: '50%' }}  src={`${API}/enseignement/photo/${router.query.slug}`} alt={title}  />
            )}
            <form onSubmit={editEnseignement}>

              <div className="row">
                <div className='col-lg-8 col-md-8 col-sm-12'>
                  <span>Veuillez saisir le titre de l'enseignement</span>
                  <div className="form-floating mb-4">
                    <input type="text" value={title} onChange={handleChange('title')} id="titreEnseignement" className="form-control" required placeholder="Titre de l'enseignement" />
                    <label className="form-label" htmlFor="titreEnseignement">Titre de l'enseignement*</label>
                  </div>
                  <span>Veuillez saisir le contenu de l'enseignement</span>
                  <ReactQuill onChange={handleBody} value={body} className="quill_form" modules={QuillModules} formats={QuillFormats} placeholder="Saisissez le contenu de la page de l'enseignement..."/>
                </div>

                <div className='col-lg-4 col-md-4 col-sm-12' style={{ backgroundColor: '#c5a54621', padding: '20px', borderRadius: '5px' }}>
                  <span>Merci de choisir des catégories associées à l'enseignement</span>
                  <div>
                      <h5 className='couleur'>Catégories</h5>
                      <hr />
                      <ul style={{ maxHeight: '200px', overflowY: 'scroll' }}>{showCategories()}</ul>
                  </div>

                  <div className="form-group pb-2">
                    <h5 className='couleur'>image</h5>
                    <hr />

                    <small className="text-muted">Max size: 1mb</small>
                    <br />
                    <label className="btn btn-dark mb-4 text-white">
                        Choisissez une image
                        <input onChange={handleChange('photo')} type="file" accept="image/*" hidden />
                    </label>
                
                    <img className="img-fluid rounded" style={{ width: '70%' }} src={image} />
                </div>


               </div>
              </div>

            <button className="submit_Form btn myBtn mt-2 text-black" type="submit">Modifier</button>
           
            </form>

           
            </>
        )
    }

    return (

        <div className='page_update_enseignement'>
            <h1 className='h1'>{title}</h1>
            {updateEnseignementForm()}
        </div>
    )
};

export default withRouter(EnseignementUpdate)