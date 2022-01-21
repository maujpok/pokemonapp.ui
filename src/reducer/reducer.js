import { attackAsc, attackDesc, fromAtoZ, fromZtoA } from "../helpers";


const initialState = {
    pokemons: [],
    search: {found:[], loading:false, notfound: ''},
    loading: false,
    pokemonCreated: {id:'', result: false},
    pokemonLoaded: [],
    pokemonsCopy: [],
    filtered: [],
    types: []
};

const rootReducer = (state = initialState, action = {}) => {
    
    switch (action.type) {
        case "ADD_ITEMS": return {
            ...state,
            loading: false,
            pokemons: action.payload,
            pokemonsCopy: action.payload
        }
        case "SAVED": return {
            ...state,
            pokemonCreated: {
                id: action.payload,
                result: true
            }
        }
        case "CLEAN_RESULT": return {
            ...state,
            pokemonCreated: {
                id: '',
                result: false
            }
        }
        case "LOAD_POKEMON": return {
            ...state,
            loading: false,
            pokemonLoaded: action.payload
        }
        case "ADD_TYPES": return {
            ...state,
            types: action.payload
        }
        case "LOADING": return {
            ...state,
            loading: true
        }
        case "SEARCHING": return {
            ...state,
            search: {
                loading: true,
                found: [],
                notfound: action.payload
            }
        }
        case "NOT_FOUND": return {
            ...state,
            search: {
                loading: false,
                found: [],
                notfound: action.payload
            }
        }
        case "FOUND": return {
            ...state,
            search: {
                loading: false,
                found: [action.payload],
                notfound: ""
            }
        }
        case "CLEAN": return {
            ...state,
            search: {
                found: [],
                notfound: ""
            }
        }
        case "FILTER_CREATED": return {
            ...state,
            pokemonsCopy: state.pokemons.filter(e => e.id.length > 4)
        }
        case "FILTER_API": return {
            ...state,
            pokemonsCopy: state.pokemons.filter(e => e.id < 2000)
        }
        case "FILTER_TYPE": return {
            ...state,
            pokemonsCopy: state.pokemons.filter(e => e.types.includes(action.payload))
        }
        case "CLEAN_FILTERS": return {
            ...state,
            pokemonsCopy: state.pokemons
        }
        case "A-Z": return {
            ...state,
            filtered: state.pokemonsCopy.sort(fromAtoZ),
        }
        case "A-Z_COMPLETE": return {
            ...state,
            pokemonsCopy: [...state.filtered]
        }
        case "Z-A": return {
            ...state,
            filtered: state.pokemonsCopy.sort(fromZtoA)
        }
        case "Z-A_COMPLETE": return {
            ...state,
            pokemonsCopy: [...state.filtered]
        }
        case "1-10": return {
            ...state,
            filtered: state.pokemonsCopy.sort(attackAsc)
        }
        case "1-10_COMPLETE": return {
            ...state,
            pokemonsCopy: [...state.filtered]
        }
        case "10-1": return {
            ...state,
            filtered: state.pokemonsCopy.sort(attackDesc),
        }
        case "10-1_COMPLETE": return {
            ...state,
            pokemonsCopy: [...state.filtered]
        }
        case "RESET_ORDER": return {
            ...state,
            pokemonsCopy: [...state.pokemons]
        }

        default: return state;
    }
};

export default rootReducer; 