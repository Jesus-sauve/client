import { useState, useContext, useEffect } from "react";
import axios from "axios";
import { SyncOutlined } from '@ant-design/icons';
import Link from 'next/link';
import Noty from 'noty';
import { Context } from "../context";
import { useRouter } from "next/router";
import { API } from '../config';
import Reveal from 'react-reveal/Fade';
import Head from 'next/head';
import Footer from '../components/Footer';
import HeaderOther from '../components/HeaderOther';

const Password = () => {
    // state
    const [email, setEmail] = useState('');
    const [success, setSuccess] = useState(false);
    const [code, setCode] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [loading, setLoading] = useState(false);

    // context
    const {state : {user}} = useContext(Context)
    // router
    const router = useRouter();

    // redirect if user il logged in
    useEffect(() => {
        if(user !== null) router.push('/')
    }, [user]);


    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            setLoading(false);
            const { data } = await axios.post(`${API}/forgot-password`, { email });
            setSuccess(true);
            new Noty({
                type: 'success',
                theme: 'bootstrap-v4',
                layout: 'topRight',
                text: `Merci de vérifier votre boite mail`,
                timeout: 3000
              }).show();
        } catch (err) {
            new Noty({
                type: 'success',
                theme: 'bootstrap-v4',
                layout: 'topRight',
                text: `${err.response.data}`,
                timeout: 3000
              }).show();
            setLoading(false);
        }
    };

    const handleResetPassword = async (e) => {
        e.preventDefault();
        // console.log(email, code, newPassword);
        // return;
        try {
          setLoading(true);
          const { data } = await axios.post(`${API}/reset-password`, {
            email,
            code,
            newPassword,
          });
          setEmail("");
          setCode("");
          setNewPassword("");
          setLoading(false);
          new Noty({
            type: 'success',
            theme: 'bootstrap-v4',
            layout: 'topRight',
            text: `Votre mot de passe a bien été réinitialisé`,
            timeout: 3000
          }).show();
          // redirect
          router.push("/connexion");
        } catch (err) {
          setLoading(false);
          new Noty({
            type: 'success',
            theme: 'bootstrap-v4',
            layout: 'topRight',
            text: `${err.response.data}`,
            timeout: 3000
          }).show();
        }
      };

    return (
        <>
        <Head>
            <title>Basebiblique | Mot de passe</title>
        </Head>
        <HeaderOther />
            <div className="all_pages login_page">
                <div className='container'>
                    <div className='contact_form'>
    
                        <h1 className='h1'>Réinitialisation</h1>
                        <p>Merci de saisir votre e-mail afin de réinitialiser votre mot de passe</p>
    
                          <div className='formulaire'>
                          <Reveal left>
                            <form className="form_custom" style={{ width: 'auto', marginTop: '5em' }}onSubmit={success ? handleResetPassword : handleSubmit}>
                    <div className="form-floating mb-3">
                      <input 
                        type="email" 
                        className="form-control input-form" 
                        id="email" 
                        value={email} 
                        required
                        autoComplete="new-email"
                        onChange={(e) => setEmail(e.target.value)} 
                        placeholder="Entrer votre email" />

                      <label htmlFor="email">Entrez votre email</label>
                    </div>
                     {success && (
                        <>
                        <div className="form-floating mb-3">
                      <input 
                        type="text" 
                        className="form-control input-form" 
                        id="code" 
                        value={code} 
                        required
                        autoComplete="new-text"
                        onChange={(e) => setCode(e.target.value)} 
                        placeholder="Entrer votre code" />

                      <label htmlFor="code">Entrez le code</label>
                    </div>

                        <div className="form-floating mb-3">
                      <input 
                        type="password" 
                        className="form-control input-form" 
                        value={newPassword} 
                        onChange={(e) => setNewPassword(e.target.value)} 
                        placeholder="Nouveau mot de passe"
                        autoComplete="new-password"
                        required
                        id="password"
                        />

                      <label htmlFor="password">Entrez votre nouveau mot de passe</label>
                    </div>
                        </>
                    )}
                    <br />
                    <div className="text-center">

                    <button type="submit" className="btn myBtn mb-4 text-dark"
                        disabled={!email || loading}
                        >{loading ? <SyncOutlined spin /> : "Valider"}
                    </button>
                    <p className="text-center p-1">
                    Connectez-vous - {" "}
                    <Link href="/connexion">
                        <a className="text-danger">Connexion</a>
                    </Link>
                    </p>
                    </div>
                    </form>
                    </Reveal>
                  </div>
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
export default Password;