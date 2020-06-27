import React from 'react';
import './SearchBar.css';

const SearchBar = props =>{
    return(
        <div className="search__container">
            <p className="search__title">
                Слушај ги твоите омилени подкасти
            </p>
            <input className="search__input" type="text" placeholder="Search" onChange={props.searchChanged}/>
        </div>
    )

}

export default SearchBar;