import React from "react";
import { Link } from "react-router-dom";
import { pokemonLogo } from "../../helpers";
import "../Styles/NavBar.css";

export default function NavBar() {

    return (
        <div className='navbar'>
            <Link to='/home'>
                <img 
                src={pokemonLogo}
                alt='imagen'
                width='180px'/>
            </Link>
            <Link to='/create'><p id='p'>Create new!</p></Link>
        </div>
    )
};