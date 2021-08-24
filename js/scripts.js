let pokemonList = [
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

// loop through pokemonList array and print a list of pokemon
for (let i = 0; i < pokemonList.length; i++){
  let pokemonHeight = pokemonList[i].height;
  let comment = '';  // initilizing the comment variable
  //if else statement to set comment on pokemon based on height size
  if (pokemonHeight > 1) {
    comment = "Wow , what a big Pokemon!";
  } else if (pokemonHeight < 0.5){
    comment = "What a tiny Pokemon!";
  } else {
    comment = "That's a cute Pokemon!";
  }
  //write out the pokemon list to html
  document.write(pokemonList[i].name + ' - Height: ' + pokemonList[i].height + ' -- ' + comment + '<br>');
}
