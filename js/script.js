

// IIFE

const pokemonRepository = (function () {



    // Pokemon names

  let pokemonList = [
    {name: 'Charmander', height:0.6, types:['Fire']},
    {name: 'Charmeleon', height:1.1, types:['Fire']},
    {name: 'Charizard', height:1.7, types:['Fire','Flying']},
    {name: 'Onix', height:8.8, types:['Rock','Ground']},
    {name: 'Mr. Mime', height:1.3, types:['Psychic','Fairy']},
    {name: 'Snorlax', height:2.1, types:['Normal']}
  ];


  // Add Pokemon Function manually

  function add(pokemon) {
    if (typeof pokemon  == 'object') {
      pokemonList.push(pokemon);
    } else {
      alert('Wrong type of data has been chosen! Please try again...');
    }
  }

  // Print all Pokemon

  function getAll() {
    return pokemonList;
  }

  function addListItem(pokemon) {
    // Adding pokemons
    let pokemonList = document.querySelector(".pokemon-list");
    let listpokemon = document.createElement("li");
    let container = document.createElement('div');
    let button = document.createElement("button");
    button.innerText = pokemon.name;
    
    //adds](//adds) class button for css styling
    container.classList.add("pokemon-button");
    button.classList.add("pokemonName-button");
    
    // Append all the items
    container.appendChild(button);
    listpokemon.appendChild(container);
    pokemonList.appendChild(listpokemon);


    button.addEventListener('click', function (pokemon){
      return showDetails(button.innerText);
    });
  }

  function showDetails(pokemon){
    console.log(pokemon);
  }

  function getKeys(pokemon) {
    Object.keys(pokemon).forEach(function(property) {
      document.write(pokemon[property]);
    });
  }

  function getInfo(pokemon) {
    let objectPokemonResult = pokemonList.find(element => element.name === pokemon);
    return document.write(objectPokemonResult.height); 
  }


  return {
    add,
    getAll,
    getKeys,
    addListItem,
    getInfo,
    showDetails
  };
})();

pokemonRepository.getAll().forEach(function (pokemon) {
  pokemonRepository.addListItem(pokemon)
  });
  
