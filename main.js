//https://pokeapi.co/api/v2/pokemon/__POKEMON_ID__

const getPokemon = id => `https://pokeapi.co/api/v2/pokemon/${id}`

let allPokemons = []

function capitalize(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

function getGenerations() {
    const selectEl = document.getElementById('gens')
    let text = selectEl.options[selectEl.selectedIndex].value
    console.log(text)
    if(text == '1'){loadPokemon(1, 151)}
    if(text == '2'){loadPokemon(152, 251)}
    if(text == '3'){loadPokemon(251, 386)}
    if(text == '4'){loadPokemon(387, 493)}
    if(text == '5'){loadPokemon(494, 649)}
    if(text == '6'){loadPokemon(650, 721)}
    if(text == '7'){loadPokemon(722, 809)}
    if(text == '8'){loadPokemon(810, 905)}
} 

function formatNumber(number) {
    if(number>=10 && number<100){
        return '0'+number
    }
    else if(number<10){
        return '00'+number
    }
    else{
        return number
    }
}

const container = document.querySelector("#container");

function searchPokemon() {
    const input = document.getElementById('search-input');
    const filter = input.value.toUpperCase();
    const pokemonCard = container.querySelectorAll('.pokemon-card');
  
    for (i = 0; i < pokemonCard.length; i++) {
        const h1 = pokemonCard[i].getElementsByTagName('h1')[0]
        const p = pokemonCard[i].getElementsByTagName('p')[0]
        let SearchByName = h1.innerText;
        let SearchByID = p.innerText;
        if (SearchByName.toUpperCase().indexOf(filter) > -1 || SearchByID.toUpperCase().indexOf(filter) > -1){ 
            pokemonCard[i].style.display = "";
        }
        else {
            pokemonCard[i].style.display = "none";
        }
    }
}
  

function loadPokemon(start, end) {
    allPokemons=[]
    container.innerHTML = ''
    for (let id = start; id <= end; id++) {
        allPokemons.push(fetch(getPokemon(id)).then(res => res.json()))
    }
    pokemonList()
}

loadPokemon(1, 151)

function pokemonList(){
    Promise.all(allPokemons)
    .then(pokemons => {
        pokemons.forEach(pokemon => {
            const div = document.createElement('div')
            div.classList.add('pokemon-card')
            //<img class="pokemon-img" src='${pokemon.sprites.front_default}'/>
            //<p>${pokemon.types.map(pkt=>pkt.type.name).join(' | ')}</p>
            div.innerHTML = `
            <img class="pokemon-img" src='https://assets.pokemon.com/assets/cms2/img/pokedex/detail/${formatNumber(pokemon.id)}.png'/>
            <p class="pokemon-id">
                <span>#</span>
                ${formatNumber(pokemon.id)}
            </p>
            <h1 class="pokemon-name">${capitalize(pokemon.name)}</h1>
            `
    
            if(pokemon.types.length == 1){
                div.innerHTML += `<button class="background-color-${pokemon.types[0].type.name}">${pokemon.types[0].type.name}</button>`
            }else{
                div.innerHTML += `
                <button class="background-color-${pokemon.types[0].type.name}">${pokemon.types[0].type.name}</button>
                <button class="background-color-${pokemon.types[1].type.name}">${pokemon.types[1].type.name}</button>`
            }
    
            container.appendChild(div)
        })
    })
}