import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { listSearch } from '../../actions/enseignement';


const Search = () => {
    const [ values, setValues ] = useState({
        search: undefined,
        results: [],
        searched: false,
        message: ''
    });

const { search, results, searched, message } = values;

const searchSubmit = e => {
    e.preventDefault();
    listSearch({ search }).then(data => {
        setValues({ ...values, results: data, searched: true, message: `${data.length} Enseignement non trouvé` });
    });
};

const handleChange = e => {
    // console.log(e.target.value);
    setValues({ ...values, search: e.target.value, searched: false, results: [] });
};

const searchedEnseignements = (results = []) => {
    return (
        <div className="jumbotron bg-white">
            {message && <p className="pt-4 text-muted font-italic">{message}</p>}

            {results.map((enseignement, i) => {
                return (
                    <div key={i}>
                        <Link href={`/enseignements/${enseignement.slug}`}>
                            <a className="text-primary">{enseignement.title}</a>
                        </Link>
                    </div>
                );
            })}
        </div>
    );
};

const searchForm = () => (
    <form onSubmit={searchSubmit}>
        <div className="row">
            <div className="col-md-10">
                <input type="search" className="form-control search_bar" placeholder="Merci de saisir le titre de l'enseignement que vous recherchez" onChange={handleChange} required />
            </div>

            <div className="col-md-2">
                <button className="btn btn-block btn-black" type="submit">
                    Rechercher
                </button>
            </div>
        </div>
    </form>
);

return (
    <div className="container-fluid">
        <div className="pt-3 pb-5">{searchForm()}</div>
        {searched && <div style={{ marginTop: '0px', marginBottom: '80px' }}>{searchedEnseignements(results)}</div>}
    </div>
);
}

export default Search;

