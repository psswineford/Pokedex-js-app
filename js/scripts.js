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
      //console.log(pokemon);
      showModal(pokemon);
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

//setup Modal Container
  function showModal(pokemon) {
    let modalContainer = document.querySelector('#modal-container');

    // Clear all existing modal content
    modalContainer.innerHTML = '';

    let modal = document.createElement('div');
    modal.classList.add('modal');

    // Add the new modal content
    let closeButtonElement = document.createElement('button');
    closeButtonElement.classList.add('modal-close');
    closeButtonElement.innerText = 'Close';
    closeButtonElement.addEventListener('click', hideModal);

    //set title to pokemon Name
    let nameElement = document.createElement('h1');
    nameElement.innerText = pokemon.name;

    //Set content to pokemon Height
    let heightElement = document.createElement('p');
    heightElement.innerText = `Height: ${pokemon.height}`;

    //Set image for to display image of pokemon
    let imageElement = document.createElement('img');
    imageElement.src = pokemon.imageUrl;
    imageElement.alt = `Front View of ${pokemon.name}`;

    modal.appendChild(closeButtonElement);
    modal.appendChild(imageElement);
    modal.appendChild(nameElement);
    modal.appendChild(heightElement);
    modalContainer.appendChild(modal);

    //close modal if user clicks outside window
    modalContainer.addEventListener('click', (e) => {
    let target = e.target;
      if (target === modalContainer) {
        hideModal();
      }
    });

    modalContainer.classList.add('is-visible');
}

  function hideModal() {
    let modalContainer = document.querySelector('#modal-container');
    modalContainer.classList.remove('is-visible');
  }
  //close modal with escape keydown
  window.addEventListener('keydown', (e) => {
  let modalContainer = document.querySelector('#modal-container');
    if (e.key === 'Escape' && modalContainer.classList.contains('is-visible')) {
      hideModal();
    }
  });



  return {
    add: add,
    getAll: getAll,
    loadList: loadList,
    loadDetails: loadDetails,
    addListItem: addListItem,
    showDetails: showDetails,
    showModal: showModal,
    hideModal:hideModal
  };
})();


pokemonRepository.loadList().then(function(){
  //retrieve pokemon array and display into HTML
  pokemonRepository.getAll().forEach(function(pokemon) {
    pokemonRepository.addListItem(pokemon);
  });
});
