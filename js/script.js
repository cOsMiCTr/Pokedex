
// IIFE

const pokemonRepository = ( () => {

    // Pokemon names
  let pokemonList = [];
  let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=11';
  let loadingMessage = "Loading... Please wait!";

  // Add Pokemon Function manually
  let add = pokemon => {
    typeof pokemon  === 'object' && "name" in pokemon ?
      pokemonList.push(pokemon):
      alert('Wrong type of data has been chosen! Please try again...');
  }

  // Print all Pokemon
  let getAll = () => pokemonList;

  let showLoadingMessage = () => {
    let messageContainer = document.querySelector(".waiting-message");
    let waitingMessage = document.createElement('h3');
    waitingMessage.innerText = loadingMessage;
    messageContainer.appendChild(waitingMessage);
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
    let loadEverything = new Promise(function (resolve, reject){

      setTimeout(function(){
        fetch(apiUrl).then(function (response) {
          return response.json();
        }).then(function (json) {
          json.results.forEach(function (item) {
            let pokemon = {
              name: item.name,
              detailsUrl: item.url
            };
            resolve(add(pokemon));
          });
        }).catch(function (e) {
          reject(console.error(e));
        })
      
      }, 3000);
    });
    showLoadingMessage();
    return loadEverything;
  }

  function loadDetails(item) {
      let url = item.detailsUrl;
      return fetch(url).then(function (response) {
        return response.json();
      }).then(function (details) {
        // Now we add the details to the item
        item.imageUrl = details.sprites.front_default;
        item.height = details.height;
        item.types = details.types;
        hideLoadingMessage();
      }).catch(function (e) {
        console.error(e);
      });
  }

  return {
    getAll,
    addListItem,
    loadList,
    loadDetails,
    showLoadingMessage
  };
})();

 pokemonRepository.loadList().then( () =>
  pokemonRepository.getAll().forEach( pokemon =>
    pokemonRepository.addListItem(pokemon)))







    