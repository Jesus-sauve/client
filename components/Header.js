import React, {useRef} from 'react';
import Navbar from './Navbar';
import Link from 'next/link';

function Header() {

 
  return (
    <header>
      <Navbar />
      <div id="introCarousel" className="carousel slide carousel-fade shadow-2-strong" data-mdb-ride="carousel">
    
        <ol className="carousel-indicators">
          <li data-mdb-target="#introCarousel" data-mdb-slide-to="0" className="active"></li>
          <li data-mdb-target="#introCarousel" data-mdb-slide-to="1"></li>
          <li data-mdb-target="#introCarousel" data-mdb-slide-to="2"></li>
        </ol>
  
    
        <div className="carousel-inner">
          <div className="carousel-item active">
          <img src="./images/image1.jpg" className="d-block w-100 bg-image h-100 img-fluid" alt="Wild Landscape"/>
            <div className="mask" style={{backgroundColor: '#00000078'}}>
              <div className="d-flex justify-content-center align-items-center h-100">
                <div className="text-white text-center">
                  <div className='ecriture_carousel_1'>
                    <h1>Base Biblique</h1>
                    <p>Retour aux fondements bibliques</p> 
                  </div>
                
                </div>
              </div>
            </div>
          </div>
  
          <div className="carousel-item">
          <img src="./images/image2.jpg" className="d-block w-100 bg-image h-100 img-fluid" alt="Wild Landscape"/>
            <div className="mask" style={{backgroundColor: '#00000078'}}>
              <div className="d-flex justify-content-center align-items-center h-100">
                <div className="text-white text-center div_accueil_news_letter">

                  <div className="accueil_news_letter">
                    <h1>Base Biblique</h1>
                      <h2 className='text-white'>Découvrez nos enseignements</h2><br />
                      <div className="text-center mb-3">
                      <Link href="/enseignements">
                        <a className="btn myBtn px-3 mx-2 text-black"> Enseignements</a>
                      </Link>
                      </div>

                  </div>
                </div>
              </div>
            </div>
          </div>
  
          <div className="carousel-item">
          <img src="./images/image3.jpg" className="d-block w-100 bg-image h-100 img-fluid" alt="Wild Landscape"/>
            <div className="mask" style={{backgroundColor: '#00000078'}}>
              <div className="d-flex justify-content-center align-items-center h-100">
                <div className="text-white text-center">
                  <div className="sola_contenu">
                    <h1 className="sola_titre text-white">Les 5 Solas de la réforme</h1>
                    <p><span className="sola_text">SOLI DEO GLORIA : </span>À Dieu seul soit la gloire (car tout vient de Lui !) <span className="sola_verset">1 corinthiens 10 v 31</span></p>
                    <p><span className="sola_text">SOLA GRATIA : </span>par grâce seulement (notre âme est sauvée)  <span className="sola_verset">éphesiens 2 v 8</span></p>
                    <p><span className="sola_text">SOLUS CHRISTUS : </span>par Christ seulement (et personne d’autre) <span className="sola_verset">jean 14 v 5 a 6</span></p>
                    <p><span className="sola_text">SOLA FIDE : </span>par la foi seulement (et non par les œuvres) <span className="sola_verset">éphesiens 2 v 8</span></p>
                    <p><span className="sola_text">SOLA SCRIPTURA : </span>par l’Écriture seulement (notre foi est régie) <span className="sola_verset">2 timothée 3 v 16</span></p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
    </header>
  )
}

export default Header;