
// IIFE

let pokemonRepository = (function () {

  // Variables

  const heightHuge = "Wow, that\’s big! ";
  const divPokemonList = "<div class=\"pokemon-list\">";
  const divClose = "</div>";
  const spanExcitement = "<span class=\"excitement\">";
  const spanClose = "</span>";

  // Pokemon names

  let pokemonList = [
    {name: 'Charmander', height:0.6, types:['Fire']},
    {name: 'Charmeleon', height:1.1, types:['Fire']},
    {name: 'Charizard', height:1.7, types:['Fire','Flying']},
    {name: 'Onix', height:8.8, types:['Rock','Ground']},
    {name: 'Mr. Mime', height:1.3, types:['Psychic','Fairy']},
    {name: 'Snorlax', height:2.1, types:['Normal']}
  ];

  // Add Pokemon Function

  function add(pokemon) {
    if (typeof pokemon  == 'object') {
    pokemonList.push(pokemon);
    } else {
      alert('Wrong type of data has been chosen! Please try again...');
    }
  }

  // Print all Pokemon

  function getAll() {
    pokemonList.forEach(function(pokemon) {
      if(pokemon.height >= 2.0) {
        return document.write(divPokemonList + pokemon.name + " ( height : " + pokemon.height + " ) - " + spanExcitement + heightHuge + spanClose + divClose);
      } else {
        return document.write(divPokemonList + pokemon.name + " ( height : " + pokemon.height + " )" + divClose);
      }
    });
  }

  function getKeys(pokemon) {
    Object.keys(pokemon).forEach(function(property) {
      document.write(pokemon[property]);
    });
  }

  function getInfo(pokemon) {
    let xx = pokemonList.filter(function(pokemonName) {
      return document.write(pokemonName.name); 
      
    });
  }

  return {
    add: add,
    getAll: getAll,
    getKeys: getKeys,
    getInfo: getInfo
  };
})();

// Add a Pokemon

pokemonRepository.add({ name:'Pikachu', height:1.04, types:'Electric' });

// Print everything inside the array

pokemonRepository.getAll();

pokemonRepository.getKeys({ name: 'Pikachu', height:1.04 });

// I AM HAVING PROBLEM WITH THE FILTER!!!!!

pokemonRepository.getInfo('Onix');