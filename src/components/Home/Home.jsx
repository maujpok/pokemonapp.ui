import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchApi } from "../../actions/actions";
import { imageLoading } from "../../helpers";
import Pokemon from "../Pokemon/Pokemon";
import Paginator from "../Paginator/Paginator";
import SearchBar from "../SearchBar/SearchBar";
import "../Styles/Home.css";


export default function Home() { 

    const dispatch = useDispatch();
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(12);
    const loading = useSelector((state) => state.loading);   
    const pokemons = useSelector((state) => state.pokemonsCopy);
    const control = useSelector((state) => state.pokemons);
    
    useEffect(()=> {
        if(!pokemons.length && !control.length) dispatch(fetchApi())
    },[dispatch, pokemons, control]);
    
    const indexLast = currentPage * itemsPerPage;
    const indexFirst =  indexLast - itemsPerPage;
    const current = pokemons.slice(indexFirst, indexLast);
    const changePage = (pages) => setCurrentPage(pages);

    return (
        <>
        <div className='home'>
            <SearchBar setCurrentPage={setCurrentPage}/>
            <div id='home_container'>
                <h3>Find and create any Pokemon!</h3>
                {loading ? <><img src={imageLoading} alt="loading" width='400'/></>
                    : pokemons.length === 0 ?
                    <h3>No pokemons on this filter</h3>
                    :
                    <>
                    <div className='showall'>
                    {current.map(({id, name, types, img}) => 
                        <Pokemon
                            key={id}
                            id={id}
                            name={name}
                            types={types}
                            img={img}/>
                            )}
                    </div>
                    <Paginator 
                    itemsPerPage={itemsPerPage}
                    totalPokemons={pokemons.length}
                    changePage={changePage}
                    />
                    </>
                }
            </div>
        </div>
        </>
    )
};