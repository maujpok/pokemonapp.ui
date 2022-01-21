import React from "react";
import {Link} from "react-router-dom";
import "../Styles/Landing.css";

export default function Landing () {

    return (
        <div className='landing'>
            <h1>Welcome to Pokemons World!</h1>
            <Link to='/home'>
                <button id='btn'>ENTER</button>
            </Link>
        </div>
    )
};