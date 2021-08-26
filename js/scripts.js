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

  return {
    add: add,
    getAll: getAll
  };
})();

//retrieve pokemon array and display into HTML
pokemonRepository.getAll().forEach(function(pokemon) {
  let comment = '';  //initialize comment variable
  if (pokemon.height > 1){
    comment = "Wow, What a big Pokemon!";
  }else if (pokemon.height < 0.5) {
    comment = "What a tiny Pokemon!";
  }else {
    comment = "That's a cute Pokemon!";
  }
  document.write(`${pokemon.name} - Height: ${pokemon.height} -- ${comment} <br>`);

});
