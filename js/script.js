
// IIFE

const pokemonRepository = ( () => {

    // Pokemon names
  let pokemonList = [];
  let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=1118';
  let waitingMessage = "Loading... Please wait!";

  // Add Pokemon Function manually
  let add = pokemon => {
    typeof pokemon  === 'object' && "name" in pokemon ?
      pokemonList.push(pokemon):
      alert('Wrong type of data has been chosen! Please try again...');
  }

  // Print all Pokemon
  let getAll = () => pokemonList;

  let loadingMessage = document.querySelector(".loading-message");

  function showLoadingMessage() {
    loadingMessage.classList.add('show');
  }

  function hideLoadingMessage() {
    loadingMessage.classList.remove('show');
  }

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
    button.addEventListener('click', () => showDetails(pokemon));
  }

  let showDetails = item => pokemonRepository.loadDetails(item).then( ()  => console.log(item));

  function loadList() {
    showLoadingMessage();
    return fetch(apiUrl).then(function (response) {
      return response.json();
    }).then(function (json) {
      json.results.forEach(function (item) {
        let pokemon = {
          name: item.name,
          detailsUrl: item.url
        };
        add(pokemon);
      });
    }).catch(function (e) {
      hideLoadingMessage();
      console.error(e);
    })
  }
  

  function loadDetails(item) {
      showLoadingMessage();
      let url = item.detailsUrl;
      return fetch(url).then(function (response) {
        return response.json();
      }).then(function (details) {
        hideLoadingMessage();
        item.imageUrl = details.sprites.front_default;
        item.height = details.height;
        item.types = details.types;
      }).catch(function (e) {
        hideLoadingMessage();
        console.error(e);
      });
  }

  return {
    getAll,
    addListItem,
    loadList,
    loadDetails
  };
})();

 pokemonRepository.loadList().then( () =>
  pokemonRepository.getAll().forEach( pokemon =>
    pokemonRepository.addListItem(pokemon)))







    