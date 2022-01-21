
export function fetchApi () {
    return async function(dispatch) {
        dispatch({type: "LOADING"});
        await fetch('http://localhost:3001/pokemons')
        .then(res => res.json())
        .then(data => {
            let items = data.map(e => {
                return {
                    id: e.id,
                    img: e.img,
                    name: e.name,
                    attack: e.attack,
                    types: e.types.join(' ')
                }
            })
            dispatch({type: "ADD_ITEMS", payload: items})
        })
    }
};


export function getName(id) {
    return function(dispatch) {
        dispatch({type: "LOADING"});
        fetch(`http://localhost:3001/pokemons/${id}`)
            .then(res => res.json())
            .then(data => {
                data.types = data.types.join(' ')
                dispatch({type: "LOAD_POKEMON", payload: data})
            })
        }
};

export function sendData(data) {
    return async function (dispatch) {
        await fetch('http://localhost:3001/pokemons',{
            method: "POST",
            body: JSON.stringify(data),
            headers: {'Content-Type' : 'application/json'}
        })
        .then(res => res.json())
        .then(data => data.id)
        .then(data => dispatch({type: "SAVED", payload: data}))
        .then(() => dispatch(fetchApi()))
    }
};

export function getTypes(){
    return async function(dispatch){
        await fetch('http://localhost:3001/types')
        .then(res => res.json())
        .then(data => {
            let types = data.map(({id, name}) => {
                return {
                    id,
                    name: name[0].toUpperCase() + name.slice(1)
                }
            })
            dispatch({type: "ADD_TYPES", payload: types})
        })
    }
};

export function searchName (name) {
    return function (dispatch) {
        dispatch(searching());
        fetch(`http://localhost:3001/pokemons?name=${name}`)
            .then(res => res.json())
            .then(data => {
                dispatch(foundSuccess(data))
            })
            .catch(error => {
                dispatch(foundFailure("Not found"))
            })
    }
};

function searching() {
    return {
        type: "SEARCHING"
    }
};

function foundSuccess (data) {
    return {
        type: "FOUND",
        payload: data
    }
};

function foundFailure (err) {
    return {
        type: "NOT_FOUND",
        payload: err
    }
};

export function cleanSearchResult(dispatch) {
        dispatch({type: "CLEAN"})
};

export function orderItems(value) {
    return function(dispatch) {
        switch (value) {
            case "A-Z": {
                dispatch({type: value})
                return dispatch({type: "A-Z_COMPLETE"})
            }
            case "Z-A": {
                dispatch({type: value})
                return dispatch({type: "Z-A_COMPLETE"})
            }
            case "10-1": {
                dispatch({type: value})
                return dispatch({type: "10-1_COMPLETE"})
                }
            case "1-10": {
                dispatch({type: value})
                return dispatch({type: "1-10_COMPLETE"})
            }
            default: dispatch({type: "RESET_ORDER"})
        }
    }
};

export function filterItems(value) {
    return function(dispatch) {
        switch (value) {
            case "created": return dispatch({type: "FILTER_CREATED"})
            case "existing": return dispatch({type: "FILTER_API"})
            case "clean": return dispatch({type: "CLEAN_FILTERS"})
            default: return dispatch({type: "FILTER_TYPE", payload: value.toLowerCase()})
        }
    }
};