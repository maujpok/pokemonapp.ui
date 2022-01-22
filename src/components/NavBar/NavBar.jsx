import React from "react";
import { Link } from "react-router-dom";
import { pokemonLogo } from "../../helpers";
import "./NavBar.css";

export default function NavBar() {

    return (
        <div className='navbar'>
            <Link to='/home'><img src={pokemonLogo} alt='imagen' width='180px'/></Link>
            <h2>Find any Pokemon and create your own!</h2>
            <Link to='/create'><p id='p'>Create new!</p></Link>
        </div>
    )
};