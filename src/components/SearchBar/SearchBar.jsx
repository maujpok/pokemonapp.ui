import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {cleanSearchResult, filterItems, getTypes, orderItems, searchName} from "../../actions/actions";
import {Link} from "react-router-dom";
import { fromAtoZ, pokeball } from "../../helpers";
import "../Styles/SearchBar.css";


export default function SearchBar({setCurrentPage}) {

    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getTypes())
    }, [dispatch]);

    const types = useSelector((state) => state.types.sort(fromAtoZ));
    const search = useSelector((state) => state.search);
    const [input, setInput] = useState('');
    const [error, setError] = useState('');
    let pokemon = search.found[0];


    function validateInput(e) {
        if(!/^[A-Za-z]+$/.test(e)) {setError("Only letters is allow")}
        else {setError(''); setInput(e)}
        setInput(e)
    };

    return (
        <div className='searchbar'>
            <label>Find any!</label>
            {/* <form> */}
            <div id='searchdiv'>
                <input
                id='search_input'
                type='search'
                value={input}
                placeholder='Search any Pokemon...'
                autoComplete='off'
                required
                onChange={e => validateInput(e.target.value)}
                />
                {error ? 
                <span id='danger'>{error}</span>
                : 
                input ? 
                <button
                className='btn'
                type='button'
                value='GO'
                onClick={() => {dispatch(searchName(input.toLowerCase())); setInput('')}}
                >GO</button>
                : null
                }
                <div>
                    {search.loading ? <span>Searching..</span> : null}
                    {search.notfound !== '' ? <span id='danger'>{search.notfound}</span>
                    : null}
                    {
                        pokemon && 
                        <Link to={`/${pokemon.id}`}>
                        <img src={pokemon.img} alt={pokemon.name} width='20px'/>
                        <span onClick={e => dispatch(cleanSearchResult)}> {pokemon.name}</span>
                        </Link>
                    }
                </div>
            </div>
            {/* </form> */}
            <hr />
            <div id='filterdiv'>
                <form id='filterdiv'>
                <label>Filter</label>
                    <select 
                    id='order_filter'
                    data-default-value='choose'
                    onChange={e => {dispatch(filterItems(e.target.value)); setCurrentPage(1)}}>
                        <option value='choose'>Choose option</option>
                        <optgroup label='By Creator' selected>
                            <option value="created">Created Pokemons</option>
                            <option value="existing">Existing Pokemons</option>
                        </optgroup>
                        <optgroup label='By Type'>
                                {
                                    types.map( ({id, name}) => (
                                        <option 
                                        key={id}
                                        value={name}
                                        >{name}</option>
                                    ))
                                }
                        </optgroup>
                    </select>

                    <label>Order</label>
                    <select 
                    id='order_filter'
                    data-default-value='choose'
                    onChange={e => {
                        dispatch(orderItems(e.target.value))
                        setCurrentPage(1)}}>
                    <option value='choose'>Choose option</option>
                        <optgroup label='Alphabetic Name'>
                            <option value="A-Z">A-Z</option>
                            <option value="Z-A">Z-A</option>
                        </optgroup>
                        <optgroup label='By Attack'>
                            <option value="10-1">Higher to lower</option>
                            <option value="1-10">Lower to higher</option>
                        </optgroup>
                    </select>
                    <input type='reset' 
                    className='btn' 
                    value='Reset' 
                    onClick={(e) => {dispatch({type:"CLEAN_FILTERS"}); setCurrentPage(1);}} />
                </form>
                <hr />
                <img src={pokeball} alt="pokeball" width='100px'/>
            </div>
        </div>
    )
}; 