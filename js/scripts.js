//wrap pokemon list in IIFE variable
let pokemonRepository = (function() {
  //define pokemon array
  let pokemonList = [];
  let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150';

  //add pokemon function
  function add(pokemon) {
    if (typeof pokemon === 'object') {
      // checking to make sure pokemon is object before allowing add
      pokemonList.push(pokemon);
    }
  }
  //return all pokemon function
  function getAll() {
    return pokemonList;
  }

  //create list of pokemon buttons
  function addListItem(pokemon) {
    let pokemonListElement = document.querySelector('.list-group'); //select the UL from index page

    let pokemonListItem = document.createElement('li');
    pokemonListItem.classList.add('group-list-item');

    let button = document.createElement('button');
    button.innerText =
      pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1);
    button.classList.add('pokemon-button-class', 'btn', 'btn-primary');

    button.setAttribute('data-target', '#pokemonModal');
    button.setAttribute('data-toggle', 'modal');

    pokemonListItem.appendChild(button);
    pokemonListElement.appendChild(pokemonListItem);
    button.addEventListener('click', function() {
      showDetails(pokemon);
    });
  }
  //return the details of pokemon
  function showDetails(pokemon) {
    loadDetails(pokemon).then(function() {
      showModal(pokemon);
    });
  }

  //fetch list of pokemon from API
  function loadList() {
    return fetch(apiUrl)
      .then(function(response) {
        return response.json();
      })
      .then(function(json) {
        json.results.forEach(function(item) {
          let pokemon = {
            name: item.name,
            detailsUrl: item.url
          };
          add(pokemon);
        });
      })
      .catch(function(e) {
        /* eslint-disable no-console */
        console.error(e);
        /* eslint-enable no-console */
      });
  }

  //return pokemon details from the API
  function loadDetails(item) {
    let url = item.detailsUrl;
    return fetch(url)
      .then(function(response) {
        return response.json();
      })
      .then(function(details) {
        item.imageUrlFront = details.sprites.front_default;
        item.imageUrlBack = details.sprites.back_default;
        item.height = details.height;
        item.weight = details.weight;
        item.types = [];
        for (let i = 0; i < details.types.length; i++) {
          item.types.push(details.types[i].type.name);
        }
        item.abilities = [];
        for (let i = 0; i < details.abilities.length; i++) {
          item.abilities.push(details.abilities[i].ability.name);
        }
      })
      .catch(function(e) {
        /* eslint-disable no-console */
        console.error(e);
        /* eslint-enable no-console */
      });
  }

  //setup Modal Container
  function showModal(pokemon) {
    let modalBody = $('.modal-body');
    let modalTitle = $('.modal-title');
    //let modalHeader = $('.modal-header');

    modalTitle.empty();
    modalBody.empty();
    //creating elements to be added to Modal
    let nameElement = $('<h1>' + pokemon.name.toUpperCase() + '</h1>');
    let imageElementFront = $('<img class="modal-img" style="width:50%">');
    imageElementFront.attr('src', pokemon.imageUrlFront);
    let imageElementBack = $('<img class="modal-img" style="width:50%">');
    imageElementBack.attr('src', pokemon.imageUrlBack);
    let heightElement = $('<p>' + 'Height : ' + pokemon.height + '</p>');
    let weightElement = $('<p>' + 'Weight : ' + pokemon.weight + '</p>');
    let typesElement = $(
      '<p>' + 'Types : ' + pokemon.types.join(', ') + '</p>'
    );
    let abilitiesElement = $(
      '<p>' + 'Abilities : ' + pokemon.abilities.join(', ') + '</p>'
    );

    // display all details of the pokemon inside the modal
    modalTitle.append(nameElement);
    modalBody.append(imageElementFront);
    modalBody.append(imageElementBack);
    modalBody.append(heightElement);
    modalBody.append(weightElement);
    modalBody.append(typesElement);
    modalBody.append(abilitiesElement);
  }

  return {
    add: add,
    getAll: getAll,
    loadList: loadList,
    loadDetails: loadDetails,
    addListItem: addListItem,
    showDetails: showDetails,
    showModal: showModal
  };
})();

pokemonRepository.loadList().then(function() {
  //retrieve pokemon array and display into HTML
  pokemonRepository.getAll().forEach(function(pokemon) {
    pokemonRepository.addListItem(pokemon);
  });
});
