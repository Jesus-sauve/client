import Link from 'next/link';
import { useState, useEffect } from 'react';
import Router from 'next/router';
import dynamic from 'next/dynamic';
import { withRouter } from 'next/router';
import { singleVideo, updateVideo } from '../../actions/videos';
const RichTextEditor = dynamic(() => import('@mantine/rte'), { ssr: false });
import Noty from 'noty';

const VideoUpdate = ({ router }) => {
    const [body, setBody] = useState('');

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
        setValues({ ...values, formData });
        initVideo();
    }, [router]);

    const initVideo = () => {
        if (router.query.slug) {
            singleVideo(router.query.slug).then(data => {
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
        const value = name === 'photo' ? e.target.files[0] : e.target.value;
        formData.set(name, value);
        setValues({ ...values, [name]: value, formData, error: '' });
    };

    const handleBody = e => {
        setBody(e);
        formData.set('body', e);
    };

    const editVideo = e => {
        e.preventDefault();
        updateVideo(formData, router.query.slug).then(data => {
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
                setValues({ ...values, title: '', success: `Vidéo mis à jour` });
                setBody('');
                Router.push(`/admin`);
                new Noty({
                    type: 'info',
                    theme: 'metroui',
                    layout: 'topRight',
                    text: `Vidéo mis à jour`,
                    timeout: 3000
                }).show();
            }
        });
    };

    const updateVideoForm = () => {
        return (
            <>
                <form onSubmit={editVideo}>

                    <div className="row">
                        <div className='col-lg-8 col-md-8 col-sm-12'>
                            <span>Veuillez saisir le titre de la vidéo</span>
                            <div className="form-outline mb-4">
                                <input type="text" value={title} onChange={handleChange('title')} className="form-control" required />
                            </div>
                            <span>Veuillez saisir le contenu de la vidéo</span>
                            <RichTextEditor onChange={handleBody} value={body} placeholder="Saisissez le contenu de la page de la vidéo..." />
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
            {updateVideoForm()}
        </div>
    )
};

export default withRouter(VideoUpdate);