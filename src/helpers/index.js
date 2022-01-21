
export function fromAtoZ(a, b) {
    if(a.name > b.name) return 1;
    if (a.name < b.name) return -1;
    return 0;
 };

 export function fromZtoA(a, b) {
    if(a.name > b.name) return -1;
    if (a.name < b.name) return 1;
    return 0;
};

export function attackAsc(a, b) {
    if(a.attack > b.attack) return 1;
    if (a.attack < b.attack) return -1;
    return 0;
};

export function attackDesc(a, b) {
if(a.attack > b.attack) return -1;
if (a.attack < b.attack) return 1;
return 0;
};

export function createJson(data1, data2) {
    data1.types = data2
    return data1;
};

export const newPokemon = {
    name: "",
    hp: 1,
    attack: 1,
    defense: 1,
    speed: 1,
    height: 1,
    weight: 1,
    img: "",
    types: ""
};

export const redirect = (id) => {
    window.location.href = `/${id}`;
};

export const nums = [];

for(var i=1; i<101; i++) {
    nums.push(i)
};

export const attributes = ['Hp', 'Attack', 'Defense', 'Speed', 'Height', 'Weight'];

export const validURL = /(http(s?):)([/|.|\w|\s|-])*\.(?:jpg|gif|png)/gi;

export const imageLoading = 'https://images.chesscomfiles.com/uploads/v1/group/76962.73d2aef4.50x50o.05adf4794fcc.gif';

export const pokemonLogo = 'https://upload.wikimedia.org/wikipedia/commons/9/98/International_Pok%C3%A9mon_logo.svg';

export const pokeball = "https://66.media.tumblr.com/9697ebbc4887dc57620c50a12f24c61d/tumblr_nc1rokF7r31s1rd1xo1_500.gif";

export function cleanCheckbox() {
    for (var i=0;i<document.create_form.elements.length;i++)
       if(document.create_form.elements[i].type === "checkbox")
          document.create_form.elements[i].checked=0
 };

//  export const validsURL = ['png', 'jpg', 'jpeg', 'gif', 'svg'];