import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { listSearch } from '../../actions/enseignement';


const Search = () => {
    const [values, setValues] = useState({
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
                <div className="col-md-10 search_bar">
                    <input type="search" className="form-control search_bar" placeholder="Recherche" onChange={handleChange} required />

                    <div className="col-md-2 search_button">
                        <button className="btn btn-dark btn-block" type="submit">
                            <i className="fa-solid fa-magnifying-glass"></i>
                        </button>
                    </div>
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

