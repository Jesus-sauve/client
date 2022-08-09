import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { emailContactForm } from '../actions/contact';
import Noty from 'noty';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';


function Footer() {

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
        const infos = {name, email, phone, message};
        setButtonText('Envoie...');
        setSent(true);
              emailContactForm(infos).then(data => {
                  if (data.error) {
                    setError( data.error );
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
    

    const router = useRouter();

    const isActiveNav = (r) => {
        if (r === router.pathname) {
            return ' activeNav'
        } else {
            return ''
        }
    }

    useEffect(() => {
        // 👇️ scroll to top on page load
        window.scrollTo({top: 0, left: 0, behavior: 'smooth'});
      }, []);
    
  return (
    <div className='my_footer'>
        <div className="my_footer_contenu container">
            <div className='footer_menu'>
                <h5>Liens utiles</h5>
                <div className='onglet_footer'>
                    <li className="nav-item">
                    <Link href="/">
                    <a className={"nav-link" + isActiveNav('/')}>Base biblique</a> 
                    </Link>
                    </li>
                    <li className="nav-item">
                    <Link href="/enseignements">
                        <a className={"nav-link" + isActiveNav('/enseignements')}>Enseignements</a> 
                    </Link>
                    </li>
                    <li className="nav-item">
                    <Link href="/theology">
                        <a className={"nav-link" + isActiveNav('/theology')}>Théologie</a> 
                    </Link>
                    </li>
                    <li className="nav-item">
                    <Link href="/videos">
                        <a className={"nav-link" + isActiveNav('/videos')}>Vidéos</a> 
                    </Link>
                    </li>
                    <li className="nav-item">
                    <Link href="/bible">
                        <a className={"nav-link" + isActiveNav('/bible')}>Bible en ligne</a> 
                    </Link>
                    </li>
                    <li className="nav-item">
                    <Link href="/church">
                        <a className={"nav-link" + isActiveNav('/church')}>Church Map</a> 
                    </Link>
                    </li>
                    <li className="nav-item">
                    <Link href="/contact">
                        <a className={"nav-link" + isActiveNav('/contact')}>Contact</a> 
                    </Link>
                    </li>
                </div>
            </div>

            <div className="footer_contact">
            <h5>Laissez-nous un message</h5>
                <form onSubmit={clickSubmit}>

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

                    <div className=" mb-3">
                    <PhoneInput
                        placeholder="Saisissez votre numero de téléphone"
                        onChange={setPhone}
                        value={phone}
                        />
                    </div>

                    <div className="form-floating mb-3">
                    <textarea style={{ height: '100px' }} onChange={(e) => setMessage(e.target.value)}
                    className="form-control input-form" id="message" rows="4" value={message} required placeholder="Entrez votre Email"></textarea>
                    <label htmlFor="message">Merci de saisir votre message</label>
                    </div>

                    <button type="submit" className="btn myBtn my-2 text-black">Envoyer</button>

                </form>
            </div>

            <div className="footer_news_letter">
                <h5>Inscrivez-vous à notre news-letter</h5>
                <form>
                    <div className="form-outline mb-4">
                        <input type="email" id="email" className="form-control" />
                        <label className="form-label" htmlFor="email">Adresse email</label>
                    </div>
                    <button className="btn myBtn my-2 text-black" disabled type="button" id="button-email" data-mdb-ripple-color="dark">
                        S'inscrire
                    </button>
                </form>
            </div>


        </div>
        <div className="my_footer_bottom mt-5">
            <div className='container my_footer_bottom_contenu'>
                <div className='footer_joinUs'>
                    <p>Contactez-nous:</p>
                    <span><i className="fa-solid fa-envelope mx-1"></i>basebiblique@gmail.com</span>
                    <span><i className="fa-solid fa-phone mx-1"></i>+1 (443) 839-4079</span>
                </div>
                <div className="footer_copyright">
                    <span className='text-center'><span className='basebiblique_style_logo'>BaseBiblique</span>.org © 2022</span>
                </div>
                <div className="heberge_par">
                    <p>Développé et hébergé par{" "}<a target="_blank" href="https://horebmastertech.com/">Horebmastertech</a></p>
                </div>
            </div>
            
        </div>

        <button
        onClick={() => {
          window.scrollTo({top: 0, left: 0, behavior: 'smooth'});
        }}
        style={{
          position: 'absolute',
          padding: '.4rem .8rem',
          fontSize: '15px',
          bottom: '70px',
          right: '40px',
          backgroundColor: '#c5a546',
          color: '#000',
          textAlign: 'center',
          borderRadius: '50px',
          zIndex: 99,
          border: 'none'
        }}
      >
        <i className="fa-solid fa-angles-up"></i>
      </button>
    </div>
  )
}

export default Footer;