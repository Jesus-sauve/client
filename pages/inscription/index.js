import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import Footer from '../../components/Footer';
import HeaderOther from '../../components/HeaderOther';
import Reveal from 'react-reveal/Fade';
import Link from 'next/link';
import Noty from 'noty';
import Router from 'next/router';
import { useRouter } from 'next/router';
import axios from 'axios';
import { API } from '../../config';
import { SyncOutlined } from "@ant-design/icons";

function Inscription() {

    const router = useRouter();

    const [nom, setNom] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);


    const handleSubmit = async (e) => {
        try {
          setLoading(true);
          e.preventDefault();
          const { data } = await axios.post(`${API}/signup`, {
            nom,
            email,
            password,
          });
          new Noty({
            type: 'info',
            theme: 'metroui',
            layout: 'topRight',
            text: `Inscription réussit`,
            timeout: 3000
          }).show();
          setLoading(false);
          Router.push(`/connexion`);
    } catch (err) {
        new Noty({
            type: 'error',
            theme: 'metroui',
            layout: 'topRight',
            text: `${err.response.data}`,
            timeout: 3000
          }).show();
          setLoading(false);
      }
      };



  return (
    <>
    <Head>
        <title>Basebiblique | Inscription</title>
    </Head>
    <HeaderOther />
        <div className="all_pages login_page">
            <div className='container'>
                <div className='contact_form'>

                    <h1 className='h1'>Inscription</h1>
                    <div className='formulaire'>
                      <Reveal left>
                        <form className='form_custom' style={{ width: 'auto', marginTop: '3em' }} onSubmit={handleSubmit}>
                        
                        <div className="form-floating mb-4">
                            <input 
                              type="nom" 
                              className="form-control input-form" 
                              id="nomInscription" 
                              value={nom} 
                              required
                              autoComplete="new-nom"
                              onChange={(e) => setNom(e.target.value)} 
                              placeholder="Entrez votre nom*" />

                            <label htmlFor="nomInscription">Nom*</label>
                          </div>

                        <div className="form-floating mb-4">
                            <input 
                              type="email" 
                              className="form-control input-form" 
                              id="emailInscrption" 
                              value={email} 
                              required
                              autoComplete="new-email"
                              onChange={(e) => setEmail(e.target.value)} 
                              placeholder="Entrez votre email*" />

                            <label htmlFor="emailInscrption">Email*</label>
                          </div>

                          <div className="form-floating mb-4">
                            <input 
                              type="password" 
                              className="form-control input-form" 
                              id="passwordInscription" 
                              value={password} 
                              required
                              autoComplete="new-password"
                              onChange={(e) => setPassword(e.target.value)} 
                              placeholder="Entrez votre password*" />

                            <label htmlFor="passwordInscription">Mot de passe*</label>
                          </div>

                          <button type="submit" className="btn myBtn mb-4 text-black"  disabled={!email || !password || loading}>{loading ? <SyncOutlined spin /> : "Valider"}</button>

                        <p>* Champs obligatoires</p>
                        <p className="text-center">
                         déjà inscrit ? {" "}
                          <Link href="/connexion">
                            <a className='couleur'>Connexion</a>
                          </Link>
                        </p>
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
  )
}

export default Inscription;