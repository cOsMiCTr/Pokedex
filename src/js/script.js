// IIFE

const pokemonRepository = (() => {
  let modalContainer = document.querySelector(".modal");
  let modalBody = $('.modal-body');
  let modalTitle = $('.modal-title');
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
    $("ul.row").html('<li class="list-group col-6 col-xs-5 col-sm-4 col-md-3 col-lg-2 pokemon-container"' +
    'data-toggle="modal"><p class="pokemon-name">' + pokemon.name + '</p>' + 
    '<img class="pokemon-image" src="' + pokemon.image + '"></li>');

    // Return button test when clicked
    container.addEventListener("click", () => showDetails(pokemon));

    let url = pokemon.detailsUrl;
    return fetch(url).then( (response) => {
      return response.json();
    }).then( (details) => {
      pokemon.image = details.sprites.front_default;
      pokemonImg.setAttribute ('src', pokemon.image);
    }).catch( (e) => {
      console.error(e);
    });

  };

  let showDetails = (item) =>
    pokemonRepository
      .loadDetails(item)
      .then(() =>
        showModal(item.name, item.imageUrl, item.height, item.weight, item.type)
      );

   let loadList = ()  => {
    return fetch('https://pokeapi.co/api/v2/pokemon/?limit=200').then(function (response) {
      return response.json();
    }).then( (json) => {
      json.results.forEach( (item) => {
        let pokemon = {
          name: item.name,
          detailsUrl: item.url
        };
        add(pokemon);
      });
    }).catch( (e) => {
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
    modalTitle.empty();
    modalBody.empty();

    let nameElement = $('<h1 class="text-capitalize">' + title + '</h1>');
    let imageElement = $('<img class="modal-img" style="width:30%">');
    imageElement.attr("src", image);

    let heightElement = $('<p>' + 'Height : ' + Math.round(height * 0.1).toFixed(2) + ' m</p>');
    let weightElement = $('<p>' + 'Weight : ' + Math.round(weight * 0.1).toFixed(3) + ' kgs</p>');
    let typeElement = $('<p>' + 'Type(s) : ' + type + '</p>');

    modalTitle.append(nameElement);
    modalBody.append(imageElement).append(heightElement).append(weightElement).append(typeElement);

    $('#PokedexModal').modal();
  }

  let showContactModal = () => {
    modalTitle.empty();
    modalBody.empty();

    let nameElement = $('<h1 class="text-capitalize">Contact</h1>'),
      emailElement = $('<label for="contact-email">Enter your Email address</label><input type="email" class="form-control" id="contact-email" aria-describedby="emailHelp" placeholder="Enter email">'),
      messageElement = $('<label for="contact-textarea">Your message</label><textarea class="form-control" id="contact-textarea" rows="3"></textarea>'),
      inputElement = $('<input class="btn btn-primary" type="submit" value="Submit">');

    modalBody.empty();

    modalTitle.append(nameElement);
    modalBody.append(emailElement).append(messageElement).append(inputElement);

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