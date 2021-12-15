
// IIFE

let pokemonRepository = (function () {

  // Pokemon names

  let pokemonList = [
    {name: 'Charmander', height:0.6, types:['Fire']},
    {name: 'Charmeleon', height:1.1, types:['Fire']},
    {name: 'Charizard', height:1.7, types:['Fire','Flying']},
    {name: 'Onix', height:8.8, types:['Rock','Ground']},
    {name: 'Mr. Mime', height:1.3, types:['Psychic','Fairy']},
    {name: 'Snorlax', height:2.1, types:['Normal']}
  ];

  // Variables

  const heightHuge = "Wow, that\’s big! ";
  const divPokemonList = "<div class=\"pokemon-list\">";
  const divClose = "</div>";
  const spanExcitement = "<span class=\"excitement\">";
  const spanClose = "</span>";

  // Print on screen


  pokemonList.forEach(function(pokemon) {
    pokemon.height >= 2.0 ?
    document.write(divPokemonList + pokemon.name + " ( height : " + pokemon.height + " ) - " + spanExcitement + heightHuge + spanClose + divClose):
    document.write(divPokemonList + pokemon.name + " ( height : " + pokemon.height + " )" + divClose);
  });

})();