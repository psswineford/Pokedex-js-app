//wrap pokemon list in IIFE variable
let pokemonRepository = (function() {
  //define pokemon array
  let pokemonList = [];
  let apiUrl = "https://pokeapi.co/api/v2/pokemon/?limit=150";
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
  function addListItem(pokemon){
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
    loadDetails(pokemon).then(function (){
      console.log(pokemon);
    });
  };

//fetch list of pokemon from API
  function loadList(){
    return fetch(apiUrl).then(function (response){
      return response.json();
    }).then(function (json) {
      json.results.forEach(function (item) {
        let pokemon = {
          name: item.name,
          detailsUrl: item.url
        };
        add(pokemon);
      });
    }).catch(function (e){
      console.error(e);
    })
  };

//return pokemon details from the API
  function loadDetails(item){
    let url = item.detailsUrl;
    return fetch(url).then(function (response){
      return response.json();
    }).then(function (details){
      item.imageUrl = details.sprites.front_default;
      item.height = details.height;
      item.types = details.types;
    }).catch(function (e){
      console.error(e);
    });
  };


  return {
    add: add,
    getAll: getAll,
    loadList: loadList,
    loadDetails: loadDetails,
    addListItem: addListItem,
    showDetails: showDetails
  };
})();

  
pokemonRepository.loadList().then(function(){
  //retrieve pokemon array and display into HTML
  pokemonRepository.getAll().forEach(function(pokemon) {
    pokemonRepository.addListItem(pokemon);
  });
});
