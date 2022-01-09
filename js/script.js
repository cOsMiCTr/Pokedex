// IIFE

const pokemonRepository = (() => {
  let modalContainer = document.querySelector(".modal");

  // Pokemon names
  let pokemonList = [];


  // Add Pokemon Function manually
  let add = (pokemon) => {
    typeof pokemon === "object" && "name" in pokemon
      ? pokemonList.push(pokemon)
      : alert("Wrong type of data has been chosen! Please try again...");
  };

  // Print all Pokemon
  let getAll = () => pokemonList;

  let addListItem = (pokemon) => {
    // Adding pokemons
    const pokemonListContainer = document.querySelector('.row');
    let container = document.createElement('li'),
        // pokemonCardContainer = document.createElement('div'),
        pokemonCardImg = document.createElement('img'),
        pokemonImg = document.createElement('img'),
        pokemonName = document.createElement('p');

        // pokemonCardContainer.classList.add('pokemon-card-container');
        pokemonCardImg.classList.add('pokemon-card');
        pokemonCardImg.setAttribute("src", "./img/pokemon-card.png")
        pokemonCardImg.setAttribute("alt", "Pokemon Card");

        pokemonImg.setAttribute("alt", "Pokemon image of " + pokemon.name);
        pokemonImg.setAttribute("role", "image");
        pokemonImg.classList.add("pokemon-image");

        pokemonName.classList.add("pokemon-name");

        pokemonName.innerText = pokemon.name;
    
    container.innerText.toUpperCase();

    // Sizing of the Grid
    container.classList.add("col-6");
    container.classList.add("col-xs-5");
    container.classList.add("col-sm-4");
    container.classList.add("col-md-3");
    container.classList.add("col-lg-2");
    container.classList.add("pokemon-container");
    container.setAttribute("data-toggle", "modal");
    // Append the items
    
    container.appendChild(pokemonCardImg);
    container.appendChild(pokemonName);
    container.appendChild(pokemonImg);
    // container.appendChild(pokemonCardContainer);
    pokemonListContainer.appendChild(container);

    // Return button test when clicked
    container.addEventListener("click", () => showDetails(pokemon));

    let url = pokemon.detailsUrl;
    return fetch(url).then(function(response){
      return response.json();
    }).then(function(details){
      pokemon.image = details.sprites.front_default;
      pokemonImg.setAttribute ('src', pokemon.image);
    }).catch(function(e){
      console.error(e);
    });

  };


  let showDetails = (item) =>
    pokemonRepository
      .loadDetails(item)
      .then(() =>
        showModal(item.name, item.imageUrl, item.height, item.weight, item.type)
      );

  function loadList() {
    return fetch('https://pokeapi.co/api/v2/pokemon/?limit=200').then(function (response) {
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
    let url = item.detailsUrl;
    return fetch(url)
      .then(function (response) {
        return response.json();
      })
      .then(function (details) {
        item.imageUrl = details.sprites.other["official-artwork"].front_default
        item.height = details.height;
        let arrayNamesTypes = details.types.map((o) => o.type.name);
        item.type = arrayNamesTypes.join(", ");
        item.weight = details.weight;
      })
      .catch(function (e) {
        console.error(e);
      });
  }

  let showModal = (title, image, height, weight, type) => {
    let modalBody = $('.modal-body');
    let modalTitle = $('.modal-title');

    modalTitle.empty();
    modalBody.empty();

    let nameElement = $('<h1 class="text-capitalize">' + title + '</h1>');
    let imageElement = $('<img class="modal-img" style="width:30%">');
    imageElement.attr("src", image);

    let heightElement = $('<p>' + 'Height : ' + Math.round(height * 0.1).toFixed(2) + ' m</p>');
    let weightElement = $('<p>' + 'Weight : ' + Math.round(weight * 0.1).toFixed(3) + ' kgs</p>');
    let typeElement = $('<p>' + 'Type(s) : ' + type + '</p>');

    modalTitle.append(nameElement);
    modalBody.append(imageElement);
    modalBody.append(heightElement);
    modalBody.append(weightElement);
    modalBody.append(typeElement);

    $('#PokedexModal').modal();
  }

  let showContactModal = () => {
    let modalBody = $('.modal-body');
    let modalTitle = $('.modal-title');

    modalTitle.empty();
    modalBody.empty();

    let nameElement = $('<h1 class="text-capitalize">Contact</h1>');

    let emailElement = $('<label for="contact-email">Enter your Email address</label><input type="email" class="form-control" id="contact-email" aria-describedby="emailHelp" placeholder="Enter email">');

    let messageElement = $('<label for="contact-textarea">Your message</label><textarea class="form-control" id="contact-textarea" rows="3"></textarea>')

    let inputElement = $('<input class="btn btn-primary" type="submit" value="Submit">');



    modalBody.empty();

    modalTitle.append(nameElement);
    modalBody.append(emailElement);
    modalBody.append(messageElement);
    modalBody.append(inputElement);

    $('#ContactModal').modal();
  };

  let hideModal = () => {
    modalContainer.classList.remove("is-visible");
  };


  $(document).ready(() => {
    $(".search-pokemon").on("input", function() {
      let value = $(this).val().toLowerCase();
      $(".pokemon-container").filter(function() {
        $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
      });
    });
  });

  // Event listeners for modal
  window.addEventListener("keydown", (e) => {
    let modalContainer = document.querySelector(".modal");
    if (e.key === "Escape" && modalContainer.classList.contains("is-visible")) {
      hideModal();
    }
  });

  modalContainer.addEventListener("click", (e) => {
    let target = e.target;
    if (target === modalContainer) {
      hideModal();
    }
  });


  document
    .querySelector("#PokedexModal")
    .addEventListener("click", () => showModal);

  document
    .querySelector(".Contact")
    .addEventListener("click", () => showContactModal());

  return {
    getAll,
    addListItem,
    loadList,
    loadDetails,
    showDetails,
    showModal,
    hideModal,
    showContactModal
  };
})();


 pokemonRepository.loadList().then( () =>
  pokemonRepository.getAll().forEach( pokemon =>
    pokemonRepository.addListItem(pokemon)));