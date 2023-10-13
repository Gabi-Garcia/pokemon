

const POKEMON_URL ='https://pokeapi.co/api/v2/pokemon/';

let searchInput = document.querySelector('#pokemon-search')
let pokemonContainer = document.querySelector('.pokemon-container')
let searchButton = document.querySelector('#search-button')
let currentPokemonId = 1;
let currentPokemon;
let pokemonRequests = [];

const getPokemonTemplate = () => {
  return `
  <div class="caja-grande">
      <div class="pokemon">
        <div class="imagen-caja">
              <ul class="ul-caja">
                    <li class="li-caja">
                      <div class="img-box">
                          <img src= "${currentPokemon.image}" alt="${currentPokemon.name}"/>
                      </div>
                    </li>     
              </ul>
        </div>
      </div>
        <div class="bajo-img">
              <h4>Nombre: ${currentPokemon.name.toUpperCase()}</h4>
              <h4>Ability: ${currentPokemon.ability.toUpperCase()}</h4>
              <h4>ID: ${currentPokemon.id}</h4>
        </div>
  </div>      
              `;
}
const renderPokemon = () => {
    const template = getPokemonTemplate()
    pokemonContainer.innerHTML += template
}
const fetchPokemon = () => {
    if(pokemonRequests.includes(currentPokemonId)){
      return
    }else{
        pokemonRequests.push(currentPokemonId)
    }
    fetch(`${POKEMON_URL}${currentPokemonId}`)
    .then((res) => res.json())
    .then((response)=> {
     currentPokemon = {
        id: response.id,
        name: response.name,
        image: response.sprites.front_default,
        ability: response.types[0].type.name,
     }
     renderPokemon();
    })
}
const handleSearch = () => {
 const inputValue = searchInput.valueAsNumber;
 currentPokemonId = inputValue; 
 fetchPokemon();
}
searchInput.value = currentPokemonId;
fetchPokemon();
searchButton.addEventListener('click', handleSearch)
