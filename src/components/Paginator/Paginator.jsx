import React from "react";
import "../Styles/Paginator.css";

export default function Paginator({itemsPerPage, totalPokemons, changePage}) {
    
    const pages = [];

    for (let i=1; i <= Math.ceil(totalPokemons / itemsPerPage); i++) {
        pages.push(i);
    };

    return (
        <div className='paginator'>
                {pages.map(page => (
                    <button 
                    key={page} 
                    id="page-item"
                    onClick={() => changePage(page)}
                    >{page}</button>
                ))}
        </div>
    )
}; 