import React, { useState } from 'react';
import Head from 'next/head';
import Footer from '../../components/Footer';
import HeaderOther from '../../components/HeaderOther';
import { emailContactForm } from '../../actions/contact';
import Noty from 'noty';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import { SyncOutlined } from "@ant-design/icons";
import { APP_NAME, DOMAIN } from '../../config';
import { withRouter } from 'next/router';

const Contact = ({ router }) => {

  const head = () => (
    <Head>
      <title>{APP_NAME} | Contact</title>
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

  const [message, setMessage] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [sent, setSent] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);
  const [buttonText, setButtonText] = useState('Envoie du Message');

  const clickSubmit = e => {
    e.preventDefault();
    const infos = { name, email, phone, message };
    setButtonText('Envoie...');
    setSent(true);
    emailContactForm(infos).then(data => {
      if (data.error) {
        setError(data.error);
        console.log(data.error);
        setSent(false);
        new Noty({
          type: 'error',
          theme: 'metroui',
          layout: 'topRight',
          text: data.error,
          timeout: 3000
        }).show();
      } else {
        setName("");
        setEmail("");
        setPhone("");
        setMessage("");
        new Noty({
          type: 'info',
          theme: 'metroui',
          layout: 'topRight',
          text: "Votre message a bien été envoyé",
          timeout: 3000
        }).show();
        setSent(false);
      }
    });
  };


  return (
    <>
      {head()}
      <HeaderOther />
      <div className="all_pages">
        <div className='container'>
          <div className='contact_form'>

            <h1 className='h1'>Formulaire de contact</h1>

            <div className="row">

              <div className="col-md-6 contact_page_info">
                <p className='text-start'><strong>Merci de contacter via nos numéros de téléphone, appel direct ou par whatsapp.<br /> Vous pouvez aussi nous laisser un message via le formulaire de contact</strong></p><br /><br />
                <p className='text-start'><strong><i className="fa-solid fa-envelope-circle-check"></i> Basebiblique@gmail.com</strong></p>
                <p className='text-start'><strong><i className="fa-solid fa-square-phone"></i> +1 (443) 839-4079 / +1 (717) 205-9660</strong></p>
                <p className='text-start'><strong><i className="fa-brands fa-whatsapp"></i> +212 701-123199</strong></p>
              </div>
              <div className="col-md-6 contacp_page_form">
                <p>Merci de remplir ce formulaire de contact afin de nous faire part de votre demande.</p>

                <div className='formulaire'>
                  <form className='form_custom' onSubmit={clickSubmit} style={{ width: 'auto', marginTop: '3em' }}>


                    <div className="col-md-12 col-sm-12">
                      <div className="form-floating mb-3">

                        <input
                          type="nom"
                          className="form-control input-form"
                          id="nomContact"
                          required
                          autoComplete="new-nom"
                          onChange={(e) => setName(e.target.value)}
                          value={name}
                          placeholder="Entrez votre Nom" />

                        <label htmlFor="nomContact">Entrez votre Nom*</label>

                      </div>
                    </div>

                    <div className="col-md-12 col-sm-12 mb-3">
                      <PhoneInput
                        placeholder="Saisissez votre numero de téléphone"
                        onChange={setPhone}
                        value={phone}
                      />
                    </div>


                    <div className="form-floating mb-3">
                      <input
                        type="email"
                        className="form-control input-form"
                        onChange={(e) => setEmail(e.target.value)}
                        value={email} required id="emailContact"
                        autoComplete="new-email"
                        placeholder="Entrez votre Email" />

                      <label htmlFor="emailContact">Email*</label>
                    </div>



                    <div className="form-floating mb-3">
                      <textarea style={{ height: '100px' }} onChange={(e) => setMessage(e.target.value)}
                        className="form-control input-form" id="message" rows="4" value={message} required placeholder="Entrez votre Email"></textarea>
                      <label htmlFor="message">Merci de saisir votre message</label>
                    </div>

                    <button type="submit" className="btn myBtn mb-4 text-black">{sent ? <SyncOutlined spin /> : "Envoyer"}</button>

                    <p>* Champs obligatoires</p>
                  </form>

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
  )
}

export default withRouter(Contact);