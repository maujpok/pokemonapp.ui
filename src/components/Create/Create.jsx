import React, { useEffect, useState} from "react";
import { useDispatch, useSelector} from "react-redux";
import { Link } from "react-router-dom";
import { getTypes, sendData } from "../../actions/actions";
import { createJson, fromAtoZ, newPokemon, nums, attributes, cleanCheckbox, validURL } from "../../helpers";
import "../Styles/Create.css";

export default function Create () {

    const dispatch = useDispatch();
    useEffect(()=> {
        dispatch(getTypes())
    }, [dispatch]);
    
    const totalNames = useSelector((state) => state.pokemons.map(e => e.name));
    const types = useSelector((state) => state.types.sort(fromAtoZ))
    const createdOK = useSelector((state) => state.pokemonCreated.result)
    const id = useSelector((state) => state.pokemonCreated.id)

    const [Input, setInput] = useState(newPokemon);
    const [_types, setTypes] = useState([]);
    const [error, setError] = useState('');
    const [errortype, setErrortype] = useState('');
    const [errorurl, setErrorurl] = useState('');
    const [available, setAvailable] = useState('');


    function validateName(e) {
        if(!/^[A-Za-z0-9_-]*$/.test(e)) {
            setError('Only alphanumeric characters, no specials or spaces')
        } else if(e.length<4){
            setError('Minimum 4 characters')
        } else if(e.length>10){
            setError('Maximum 10 characters')
        } else if (totalNames.includes(e)){
            setError('The name is not available')
        } else {
            setError('')
            setAvailable('Name available')
        }
        setInput({...Input, name: e})
    };

    function validateUrl(e) {
        if(!validURL.test(e)) {setErrorurl('Enter a valid image URL')}
        else {setErrorurl('')}
        setInput({...Input, img: e})
    }

    function inputChange (e) {
        setInput({...Input, [e.target.name]: parseInt(e.target.value)});
    };

    function selectType(e) {
        setErrortype('');
        let valueNum = parseInt(e);

        _types.includes(valueNum) ?
        setTypes(_types.filter(e => e !== valueNum))
        :
        setTypes([..._types, valueNum])
    };

    function onSubmit (e) {
        e.preventDefault()
        if(error || errorurl) return alert('Please fix the form');
        if(_types.length === 0) return setErrortype('You must choose a type');
        dispatch(sendData(createJson(Input, _types)));
        setInput(newPokemon)
        setAvailable('')
        cleanCheckbox();
    };

    return (
        <div className='background'>
            <h1>Create your own Pokemon!</h1>
            <div id='form_container' >
            <form onSubmit={onSubmit} name='create_form'>
                    <label>Name*</label>
                    <input
                        id='form'
                        name='name'
                        type='text'
                        placeholder='Enter name...'
                        autoComplete='off'
                        value={Input.name}
                        onChange={e => validateName(e.target.value)}
                        required />
                    {error ? <span id='danger'>{error}</span> :
                    available ? <span id='created'>{available}</span> : null}
                    <div id='attributes'> 
                    {
                        attributes.map(e =>(
                            <div key={e}>
                                <label>{e}</label>
                                <select name={e.toLowerCase()} 
                                        key={e}
                                        id={e}
                                        onChange={e=>inputChange(e)}>
                                    {
                                        nums.map(e=> 
                                        <option
                                        key={e}
                                        value={e}
                                        >{e}</option> )
                                    }
                                </select>
                            </div>
                            
                        ))
                    }
                    </div>

                    <label>URL Image (optional) </label>
                    <input
                        id='form'
                        name='img'
                        type='link'
                        placeholder='Enter image link...'
                        autoComplete='off'
                        value={Input.img}
                        onChange={e => validateUrl(e.target.value)} />
                    {errorurl ? <span id='danger'>{errorurl}</span> : null}

                    <div id='container_types'>
                        <b>Select type/s *</b>
                        <div id='types'>
                        {
                            types.map(e => (
                                <div key={e.id} 
                                    id='form_unit'>
                                    <input
                                    id='type_checkbox'
                                    type="checkbox"
                                    value={e.id}
                                    onClick={e => selectType(e.target.value)}
                                    />
                                    <span id='names'>{e.name}</span>
                                </div>
                            ))
                        }
                        </div>
                    </div>
                    {errortype ? <span id='danger'>{errortype}</span>:null}
                    <p>Items marked as * are required</p>
                    {
                        createdOK ? null :
                        <button 
                        className='btn'
                        type='submit'
                        >Create!</button>
                    }
            </form>
            {
                createdOK ? 
                <>
                    <span id='created'>Pokemon created! </span>
                    <Link to={`/${id}`}>
                    <button
                    className='btn'
                    >See it!</button>
                    </Link>
                </>
                : null
            }
            </div>
    </div>
    )
};

