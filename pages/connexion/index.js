import React, { useState, useContext, useEffect } from 'react';
import Head from 'next/head';
import Footer from '../../components/Footer';
import HeaderOther from '../../components/HeaderOther';
import Noty from 'noty';
import axios from 'axios';
import { API, APP_NAME, DOMAIN } from '../../config';
import { SyncOutlined } from "@ant-design/icons";
import Router, { useRouter } from "next/router";
import Link from 'next/link';
import { Context } from "../../context";
import { Fade } from "react-awesome-reveal";

function Connexion() {

  const head = () => (
    <Head>
      <title>{APP_NAME} | Connexion</title>
      <meta
        name="description"
        content="Blogs chrétien, enseignements, vidéos, prédications baseBiblique pour une édification totale"
      />
      <link rel="canonical" href={`${DOMAIN}${router.pathname}`} />
      <meta property="og:title" content={`Retour aux fondements bibliques | ${APP_NAME}`} />
      <meta
        property="og:description"
        content="Blogs chrétien, enseignements, vidéos, prédications baseBiblique pour une édification totale"
      />
      <meta property="og:type" content="webiste" />
      <meta property="og:url" content={`${DOMAIN}${router.pathname}`} />
      <meta property="og:site_name" content={`${APP_NAME}`} />

      <meta property="og:image" content={`${DOMAIN}/static/images/bible.jpg`} />
      <meta property="og:image:secure_url" content={`${DOMAIN}/static/images/bible.jpg`} />
      <meta property="og:image:type" content="bible/jpg" />
    </Head>
  );

  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [allUser, setAllUser] = useState([]);

  const getUser = () => {
    axios.get(`${API}/users`)
      .then(response => {
        setAllUser(response.data)
      })
      .catch(err => console.log(err))
  }

  const {
    state: { user },
    dispatch,
  } = useContext(Context);

  useEffect(() => {
    { getUser() }
  }, [user]);

  const handleSubmitConnexion = async (e) => {
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
        type: 'info',
        theme: 'metroui',
        layout: 'topRight',
        text: `Connexion réussit`,
        timeout: 3000
      }).show();
      setLoading(false);
      router.push("/admin");
      window.localStorage.setItem("user", JSON.stringify(data));
    } catch (err) {
      new Noty({
        type: 'error',
        theme: 'metroui',
        layout: 'topRight',
        text: err.response.data.error,
        timeout: 3000
      }).show();
      setLoading(false);
    }
  };

  const handleSubmitInscription = async (e) => {
    try {
      setLoading(true);
      e.preventDefault();
      const { data } = await axios.post(`${API}/signup`, {
        email,
        password,
      });
      new Noty({
        type: 'info',
        theme: 'metroui',
        layout: 'topRight',
        text: `Connexion réussit`,
        timeout: 3000
      }).show();
      setLoading(false);
      Router.push(`/admin`);
    } catch (err) {
      new Noty({
        type: 'error',
        theme: 'metroui',
        layout: 'topRight',
        text: err.response.data.error,
        timeout: 3000
      }).show();
      setLoading(false);
    }
  };


  return (
    <>
      {head()}
      <HeaderOther />
      <div className="all_pages login_page">
        <div className='container'>
          <div className='contact_form'>

            <h1 className='h1'>Connection</h1>
            <p>Merci de saisir votre e-mail et votre mot de passe afin de vous connecter</p>

            <div className='formulaire'>
              <div className="row">
                <div className="col-md-6 col-sm-12 connexion_info">
                  <h2 className='text-info'>Basebiblique</h2>
                  <p>Réservé à l'administrateur</p>
                  <p>Merci de vous connecter pour effectuer la modification des différentes pages</p>
                </div>
                <div className="col-md-6 col-sm-12 contact_form_formulaire">
                  <Fade cascade damping={0.1}>
                    <form className='form_custom' style={{ width: 'auto', marginTop: '3em' }} onSubmit={allUser.length !== 0 ? handleSubmitConnexion : handleSubmitInscription} autoComplete="false">

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

                        <label htmlFor="emailConnexion">email*</label>
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

                      <button type="submit" className="btn myBtn mb-4 text-black" disabled={!email || !password || loading}>{loading ? <SyncOutlined spin /> : "Valider"}</button>

                      <p>* Champs obligatoires</p>
                      <p className="text-center">
                        <Link href="/mot-de-passe">
                          <a className='text-danger'>Mot de passe oublié </a>
                        </Link>
                      </p>
                    </form>
                  </Fade>
                </div>

              </div>

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