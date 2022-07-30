import Link from 'next/link';
import moment from 'moment';
import { API } from '../../config';



const Card = ({ enseignement }) => {


    const showAllCategories = enseignement => 
        enseignement.categories.map((c, i) => (
          <Link key={i} href={`/category/${c.slug}`}>
            <a className='btn btn-sm btn-dark mx-2 '>{c.name}</a>
          </Link>
          ));
      


    return (
        <div className="lead mb-5">
        <header>
        <span>Thème : </span><Link href={`/enseignements/${enseignement.slug}`}><a className='pt-3 pb-3 text-danger fw-bold'><strong>{enseignement.title}</strong></a></Link>
        </header>
        <section>
          <p className="mark ml-1 p-1 fs-6">
            Posté {moment(enseignement.updatedAt).fromNow()}
          </p>
        </section>
        <section>
         {showAllCategories(enseignement)}
        </section>
  
  
        <div className="row">
          <div className="col-md-4">
            <section>
            <div className="bg-image hover-overlay ripple shadow-2-strong rounded-5 mt-4" data-mdb-ripple-color="light">
              <img src={`${API}/enseignement/photo/${enseignement.slug}`} alt={enseignement.title} className="img-fluid" style={{ maxHeight: '200px', width: '100%', minHeight: '200px' }}/>
              <a href="#!">
                <div className="mask" style={{backgroundColor: '#00000078'}}></div>
              </a>
            </div>
            </section>
          </div>
  
          <div className="col-md-8">
            <section>
              <div className='pb-3 mt-4' dangerouslySetInnerHTML={{ __html: enseignement.excerpt }}></div>
              <Link href={`/enseignements/${enseignement.slug}`}>
                <a className='btn myBtn text-white'>Lire plus</a>
              </Link>
            </section>
          </div>
  
        </div>
  
      </div>
    );
};

export default Card;