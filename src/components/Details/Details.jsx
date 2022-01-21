import React, { useEffect } from "react";
import { getName } from "../../actions/actions";
import { useDispatch, useSelector } from "react-redux";
import {Link} from "react-router-dom";
import { imageLoading } from "../../helpers";
import "../Styles/Details.css"; 

export default function Details ({id}) {

    const dispatch = useDispatch(); 

    useEffect(() => {
        dispatch(getName(id))
        dispatch({type: "CLEAN_RESULT"})
    }, [dispatch, id]);
    
    const found = useSelector((state) => state.pokemonLoaded);
    const loading = useSelector((state) => state.loading);

    return(
        <div className='background'>
            <div id='details_header'>
                <Link to='/home'><span id='details_btn'> BACK HOME </span></Link>
            </div>
            <>
                <h1>Pokemon Details</h1>
            </>
        {
            loading ? <><img src={imageLoading} alt="loading" width='300'/></> 
            :
            <div>
                <div id='details_container'>
                    <div id='details_main'>
                        <img src={found.img} alt={found.name} id='details_img'/>
                        <h1>{found.name}</h1>
                        Type<h3>{found.types}</h3>
                    </div>
                    <div id='details_attributes'>
                        <>
                            <span><b>ID</b></span>
                            <span>{found.id}</span>
                            <span><b>HP</b></span>
                            <span>{found.hp}</span>
                            <span><b>SPEED</b></span>
                            <span>{found.speed}</span>
                            <span><b>ATTACK</b></span>
                            <span>{found.attack}</span>
                            <span><b>DEFENSE</b></span>
                            <span>{found.defense}</span>
                            <span><b>HEIGHT</b></span>
                            <span>{found.height}</span>
                            <span><b>WEIGHT</b></span>
                            <span>{found.weight}</span>
                        </>
                    </div>
                </div>
            </div>
        }
        </div>
    )
};