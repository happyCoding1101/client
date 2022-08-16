import React, { useEffect, useState } from 'react';


const SearchBar = ({onSearchSubmit}) => {
    const [term, setTerm] = useState('');

   // submit a new search
   useEffect(() => {
    if(term !== ''){
        onSearchSubmit(term);
    }
}, [term]);

    return (
      <div className='searchbar'>
        <input 
            className='searchbar-input' 
            type='text' 
            placeholder="Search. . ."
            onChange={e => setTerm(e.target.value)}
            value={term}/>
      </div>
    );
};

export default SearchBar;