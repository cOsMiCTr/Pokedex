
// IIFE

const pokemonRepository = ( () => {

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
  let add = pokemon => {
    typeof pokemon  == 'object' ?
      pokemonList.push(pokemon):
      alert('Wrong type of data has been chosen! Please try again...');
  }

  // Print all Pokemon
  let getAll = () => pokemonList;

  let addListItem = pokemon => {
    // Adding pokemons
    const pokemonListContainer = document.querySelector(".pokemon-list");
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
    pokemonListContainer.appendChild(listpokemon);

    // Return button test when clicked
    button.addEventListener('click', () => showDetails(button.innerText));
  }

  let showDetails = pokemon => console.log(pokemon);

  let getInfo = pokemon => {
    let objectPokemonResult = pokemonList.find(element => element.name === pokemon);
    return document.write(objectPokemonResult.height); 
  }

  return {
    getAll,
    addListItem
  };
})();

pokemonRepository.getAll().forEach( pokemon => pokemonRepository.addListItem(pokemon));
  
