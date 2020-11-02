import React, { useState } from 'react'
import { Input } from 'antd';
import Axios from 'axios';

const { Search } = Input;


function SearchInput() {
    const [query, setQuery] = useState('');
    const [error,setError] = useState('')
    const [result,setResult] = useState('');

    const onSearch = (e) => {
        setQuery(e)
        if(!query){
            return;
        }
        
        Axios.get('/getall',{params: {name:query}})
        .then((res) => {
            console.log(res.data);
			const resultNotFoundMsg = !res.data.length
				? 'There are no more search results. Please try a new search.'
                : '';
            setError(resultNotFoundMsg);
            setResult(res.data.user);
        })
        .catch(err=>{
            console.error(err);
        })
    }


    const renderSearchResult = () => {
        if (result.length){
            return (
                <div className="results-container">
                    {result.map((result) => {
                        return (
                            <a key={result._id} className="result-items">
                                <h6 className="image-username">{result.name}</h6>
                                <div className="image-wrapper">
                                    <img className="image" src={result.avatar}/>
                                </div>
                            </a>
                        );
                    })}
                </div>
            );
        }
        return '';
    }

    return (
        <div>
            <Search
                placeholder="input search text"
                allowClear
                enterButton="Search"
                size="large"
            
                onSearch={onSearch}
            />
            { renderSearchResult()}
        </div>
    )
}

export default SearchInput
