//wrap pokemon list in IIFE variable
let pokemonRepository = (function() {
  //define pokemon array
  const pokemonList = [
    {
      name: 'Bulbasaur',
      height: 0.7,
      type: ['grass', 'poison']
    },
    {
      name: 'Charizard',
      height: 1.7,
      type: ['fire', 'flying']
    },
    {
      name: 'Jigglypuff',
      height: 0.5,
      type: ['fairy', 'normal']
    },
    {
      name: 'Vulpix',
      height: 0.6,
      type: ['fire']
    },
    {
      name: 'Pikachu',
      height: 0.4,
      type: ['electric']
    }
  ];
  //add pokemon function
  function add(pokemon) {
    if(typeof pokemon === "object"){ // checking to make sure pokemon is object before allowing add
    pokemonList.push(pokemon);
    }
  };
  //return all pokemon function
  function getAll() {
    return pokemonList;
  };


  //create list of pokemon buttons
  function addPokemonListItem(pokemon){
    let pokemonListElement = document.querySelector(".pokemon-list"); //select the UL from index page
    let pokemonListItem = document.createElement("li");
    let button = document.createElement("button");
    button.innerText = pokemon.name;
    button.classList.add("pokemon-button-class");
    button.addEventListener('click', function(){
      showDetails(pokemon);
    });
    pokemonListItem.appendChild(button);
    pokemonListElement.appendChild(pokemonListItem);
  };
  //return the details of pokemon
  function showDetails(pokemon) {
    console.log(pokemon);
  };

  return {
    add: add,
    getAll: getAll,
    addPokemonListItem: addPokemonListItem,
    showDetails: showDetails
  };
})();

//retrieve pokemon array and display into HTML
pokemonRepository.getAll().forEach(function(pokemon) {
  pokemonRepository.addPokemonListItem(pokemon);
});
