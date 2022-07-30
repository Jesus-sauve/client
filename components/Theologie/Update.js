import Link from 'next/link';
import { useState, useEffect } from 'react';
import Router from 'next/router';
import dynamic from 'next/dynamic';
import { withRouter } from 'next/router';
import { singleTheologie, updateTheologie } from '../../actions/theologie';
const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });
import '../../node_modules/react-quill/dist/quill.snow.css';
import { QuillModules, QuillFormats } from '../../helpers/quil';
import { API } from '../../config';
import Noty from 'noty';

const TheologieUpdate = ({ router }) => {
    const [body, setBody] = useState('');

    const [values, setValues] = useState({
        title: '',
        error: '',
        success: '',
        formData: '',
        title: '',
        body: '',
        formData: typeof window !== 'undefined' && new FormData(),
    });

    
    const { error, success, formData, title } = values;

     useEffect(() => {
        setValues({ ...values, formData});
        initTheologie();
    }, [router]);

    const initTheologie = () => {
        if (router.query.slug) {
            singleTheologie(router.query.slug).then(data => {
                if (data.error) {
                    console.log(data.error);
                } else {
                    setValues({ ...values, title: data.title });
                    setBody(data.body);
                }
            });
        }
    };

    const handleChange = name => e => {
        // console.log(e.target.value);
        const value = name === 'photo' ? e.target.files[0] : e.target.value;
        formData.set(name, value);
        setValues({ ...values, [name]: value, formData, error: '' });
      };
      
      const handleBody = e => {
        // console.log(e);
        setBody(e);
        formData.set('body', e);
      };

      const editTheologie = e => {
        e.preventDefault();
        updateTheologie(formData, router.query.slug).then(data => {
            if (data.error) {
                setValues({ ...values, error: data.error });
                new Noty({
                    type: 'error',
                    theme: 'bootstrap-v4',
                    theme: 'mint',
                    layout: 'topRight',
                    text: data.error,
                    timeout: 3000
                  }).show();
            } else {
                setValues({ ...values, title: '', success: `Enseignement mis à jour` });
                setBody('');
                Router.push(`/admin`);
                new Noty({
                    type: 'success',
                    theme: 'bootstrap-v4',
                    layout: 'topRight',
                    text: `Enseignement mis à jour`,
                    timeout: 3000
                }).show();
            }
        });
    };

    const updateTheologieForm = () => {
        return (
            <>
            <form onSubmit={editTheologie}>

              <div className="row">
                <div className='col-lg-8 col-md-8 col-sm-12'>
                  <span>Veuillez saisir le titre de l'enseignement</span>
                  <div className="form-outline mb-4">
                    <input type="text" value={title} onChange={handleChange('title')} id="titreEnseignement" className="form-control" required />
                  </div>
                  <span>Veuillez saisir le contenu de l'enseignement</span>
                  <ReactQuill onChange={handleBody} value={body} className="quill_form" modules={QuillModules} formats={QuillFormats} placeholder="Saisissez le contenu de la page de l'enseignement..."/>
                </div>
              </div>

            <button className="submit_Form btn myBtn mt-2 text-white" type="submit">Modifier</button>
           
            </form>

           
            </>
        )
    }

    return (

        <div className='page_update_enseignement'>
            <h1 className='h1'>{title}</h1>
            {updateTheologieForm()}
        </div>
    )
};

export default withRouter(TheologieUpdate)