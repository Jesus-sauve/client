import React, { useState, useContext, useEffect } from 'react';
import Head from 'next/head';
import Footer from '../../components/Footer';
import HeaderOther from '../../components/HeaderOther';
import Reveal from 'react-reveal/Fade';
import { authenticate, signin, isAuth } from '../../actions/auth';
import Noty from 'noty';
import Router from 'next/router';
import axios from 'axios';
import { API } from '../../config';
import { SyncOutlined } from "@ant-design/icons";
import { useRouter } from "next/router";
import Link from 'next/link';
import { Context } from "../../context";

function Connexion() {

  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

    const {
    state: { user },
    dispatch,
  } = useContext(Context);

    useEffect(() => {
    if (user !== null) router.push("/");
  }, [user]);

const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    setLoading(true);
    const { data } = await axios.post(`${API}/signin`, {
      email,
      password
    });
    dispatch({
      type: "LOGIN",
      payload: data,
    });
    new Noty({
      type: 'success',
      layout: 'topRight',
      text: `Connexion réussit`,
      timeout: 3000
    }).show();
    setLoading(false);
    router.push("/");
    window.localStorage.setItem("user", JSON.stringify(data));
  } catch (err) {
         new Noty({
        type: 'error',
        layout: 'topRight',
        text: err.response.data.error,
        timeout: 3000
      }).show();
      setLoading(false);
  }
};


  return (
    <>
    <Head>
        <title>Basebiblique | Connexion</title>
    </Head>
    <HeaderOther />
        <div className="all_pages login_page">
            <div className='container'>
                <div className='contact_form'>

                    <h1 className='h1'>Connection</h1>
                    <p>Merci de saisir votre e-mail et votre mot de passe afin de vous connecter</p>

                      <div className='formulaire'>
                      <Reveal left>
                        <form className='form_custom' style={{ width: 'auto', marginTop: '3em' }} onSubmit={handleSubmit} autoComplete="false">


                          <div className="form-floating mb-4">
                            <input 
                              type="email" 
                              className="form-control input-form" 
                              id="emailConnexion" 
                              value={email} 
                              required
                              autoComplete="new-email"
                              onChange={(e) => setEmail(e.target.value)} 
                              placeholder="Entrez votre email*" />

                            <label htmlFor="emailConnexion">Merci de saisir votre adresse mail*</label>
                          </div>

                          <div className="form-floating mb-4">
                            <input 
                              type="password" 
                              className="form-control input-form" 
                              id="passwordConnexion" 
                              value={password} 
                              required
                              autoComplete="new-password"
                              onChange={(e) => setPassword(e.target.value)} 
                              placeholder="Entrez votre password*" />

                            <label htmlFor="passwordConnexion">Mot de passe*</label>
                          </div>

                          <button type="submit" className="btn myBtn mb-4 text-white"  disabled={!email || !password || loading}>{loading ? <SyncOutlined spin /> : "Valider"}</button>

                          <p>* Champs obligatoires</p>
                          {/* <p className="text-center">
                            Pas encore inscrit ? {" "}
                            <Link href="/inscription">
                              <a className='couleur'>Inscription</a>
                            </Link>
                          </p> */}
                          <p className="text-center">
                            <Link href="/mot-de-passe">
                            <a className='text-danger'>Mot de passe oublié </a>
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
  );
};

export default Connexion;