// IIFE

const pokemonRepository = (() => {
  let modalContainer = document.querySelector("#modal-container");

  // Pokemon names
  let pokemonList = [],
    waitingMessage = "Loading... Please wait!";

  // Add Pokemon Function manually
  let add = (pokemon) => {
    typeof pokemon === "object" && "name" in pokemon
      ? pokemonList.push(pokemon)
      : alert("Wrong type of data has been chosen! Please try again...");
  };

  // Print all Pokemon
  let getAll = () => pokemonList;

  let loadingMessage = document.querySelector(".loading-message");

  function showLoadingMessage() {
    loadingMessage.classList.add("show");
  }

  function hideLoadingMessage() {
    loadingMessage.classList.remove("show");
  }

  let addListItem = (pokemon) => {
    // Adding pokemons
    const pokemonListContainer = document.querySelector(".row");
    let container = document.createElement("div"),
        pokemonImg = document.createElement('img');
        pokemonImg.setAttribute("alt", "Pokemon image of " + pokemon.name);
        pokemonImg.setAttribute("role", "image");
    container.innerText = pokemon.name;
    
    container.innerText.toUpperCase();

    // Sizing of the Grid
    container.classList.add("col-6");
    container.classList.add("col-xs-5");
    container.classList.add("col-sm-4");
    container.classList.add("col-md-3");
    container.classList.add("col-lg-2");
    container.classList.add("col-xl-1");

    // Append the items
    container.appendChild(pokemonImg);
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
    showLoadingMessage();
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
    showLoadingMessage();
    let url = item.detailsUrl;
    return fetch(url)
      .then(function (response) {
        return response.json();
      })
      .then(function (details) {
        hideLoadingMessage();
        item.imageUrl = details.sprites.other["official-artwork"].front_default
        item.height = details.height;
        let arrayNamesTypes = details.types.map((o) => o.type.name);
        item.type = arrayNamesTypes.join(", ");
        item.weight = details.weight;
      })
      .catch(function (e) {
        hideLoadingMessage();
        console.error(e);
      });
  }

  let showModal = (title, image, height, weight, type) => {
    modalContainer.innerHTML = "";

    // Creating modal elements
    let modal = document.createElement("div");
    modal.classList.add("modal");

    let closeButtonElement = document.createElement("button");
    closeButtonElement.classList.add("btn");
    closeButtonElement.classList.add("btn-primary");
    closeButtonElement.innerText = "X";
    closeButtonElement.addEventListener("click", hideModal);

    let titleElement = document.createElement("h1");
    titleElement.innerText = title;

    let heightElement = document.createElement("p"),
      weightElement = document.createElement("p"),
      imageContainer = document.createElement("div"),
      typeContainer = document.createElement("p"),
      infoContainer = document.createElement("div"),
      imageElement = document.createElement("img");
    imageElement.setAttribute("src", image);
    heightElement.innerText =
      "Height: " + (Math.round(height * 0.1).toFixed(2) + " m");
    weightElement.innerText =
      "Weight: " + (Math.round(weight * 0.1).toFixed(3) + " kgs");

    // Assigning the elements
    imageContainer.appendChild(imageElement);
    imageContainer.classList.add("pokemon-image");

    typeContainer.innerText = "Type: " + type;

    infoContainer.appendChild(imageContainer);
    infoContainer.appendChild(heightElement);
    infoContainer.appendChild(weightElement);
    infoContainer.appendChild(typeContainer);
    infoContainer.classList.add("pokemon-info-container");

    modal.appendChild(closeButtonElement);
    modal.appendChild(titleElement);
    modal.appendChild(imageContainer);
    modal.appendChild(infoContainer);
    modalContainer.appendChild(modal);

    modalContainer.classList.add("is-visible");
  };

  let showContactModal = () => {
    modalContainer.innerHTML = "";

    // Creating modal elements
    let modal = document.createElement("div");
    modal.classList.add("modal");

    let closeButtonElement = document.createElement("button");
    closeButtonElement.classList.add("btn");
    closeButtonElement.innerText = "X";
    closeButtonElement.addEventListener("click", hideModal);

    let titleElement = document.createElement("h1");
    titleElement.innerText = "Contact";

    let contactForm = document.createElement("form");
    contactForm.classList.add("contact-form");

    // eMail Element
    let emailContainer = document.createElement("div"),
      emailLabelElement = document.createElement("label"),
      emailInputElement = document.createElement("input");
    emailContainer.classList.add("col");
    emailLabelElement.innerText = "Enter your email (required)";
    emailLabelElement.classList.add("standard-label");
    emailLabelElement.setAttribute("for", "contact-email");
    emailInputElement.setAttribute("type", "email");
    emailInputElement.setAttribute("id", "contact-email");
    emailInputElement.setAttribute("name", "user_Email");
    emailInputElement.setAttribute("placeholder", ".@...");

    // Telephone Element
    let telephoneContainer = document.createElement("div"),
      telephoneLabelElement = document.createElement("label"),
      telephoneInputElement = document.createElement("input");
    telephoneContainer.classList.add("col");
    telephoneLabelElement.innerText = "Telephone (optional)";
    telephoneLabelElement.classList.add("standard-label");
    telephoneLabelElement.setAttribute("for", "contact-telephone");
    telephoneInputElement.setAttribute("type", "tel");
    telephoneInputElement.setAttribute("id", "contact-telephone");
    telephoneInputElement.setAttribute("name", "user_Telephone");
    telephoneInputElement.setAttribute("pattern", "d{3}[-]d{3}[-]d{4}");

    // Text Element
    let textContainer = document.createElement("div"),
      textLabelElement = document.createElement("label"),
      textInputElement = document.createElement("textarea");
    textContainer.classList.add("col");
    textLabelElement.innerText = "Your message";
    textLabelElement.classList.add("standard-label");
    textLabelElement.setAttribute("for", "contact-message");
    textInputElement.setAttribute("id", "contact-message");
    textInputElement.setAttribute("name", "user_Telephone");

    emailContainer.appendChild(emailLabelElement);
    emailContainer.appendChild(emailInputElement);
    telephoneContainer.appendChild(telephoneLabelElement);
    telephoneContainer.appendChild(telephoneInputElement);
    textContainer.appendChild(textLabelElement);
    textContainer.appendChild(textInputElement);
    contactForm.appendChild(emailContainer);
    contactForm.appendChild(telephoneContainer);
    contactForm.appendChild(textContainer);

    // Assigning the elements

    modal.appendChild(closeButtonElement);
    modal.appendChild(titleElement);
    modal.appendChild(contactForm);
    modalContainer.appendChild(modal);

    modalContainer.classList.add("is-visible");
  };

  function showContactDialog() {
    showContactModal();

    let modal = modalContainer.querySelector(".modal"),
        buttonContainer = modalContainer.querySelector(".contact-form");

    submitButton = document.createElement("button");
    submitButton.classList.add("modal-submit");
    submitButton.innerText = "Submit";
    buttonContainer.appendChild(submitButton);
    modal.appendChild(buttonContainer);

    submitButton.focus();

    return new Promise((resolve, reject) => {
      submitButton.addEventListener("click", () => {
        dialogPromiseReject = null;
        hideModal();
        resolve();
      });

      dialogPromiseReject = reject;
    });
  }

  let hideModal = () => {
    modalContainer.classList.remove("is-visible");
  };

  // Event listeners for modal
  window.addEventListener("keydown", (e) => {
    let modalContainer = document.querySelector("#modal-container");
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
    .querySelector(".row")
    .addEventListener("click", () => showModal);

  document
    .querySelector(".navigation-list__Contact")
    .addEventListener("click", () => showContactDialog());

  return {
    getAll,
    addListItem,
    loadList,
    loadDetails,
    showDetails,
    showModal,
    hideModal,
    showContactModal,
    showContactDialog,
  };
})();


 pokemonRepository.loadList().then( () =>
  pokemonRepository.getAll().forEach( pokemon =>
    pokemonRepository.addListItem(pokemon)));

(function() {
  let form = document.querySelector('#contact-form');
  let emailInput = document.querySelector('#contact-email');

  function showErrorMessage(input, message) {
    let container = input.parentElement;

    // Remove an existing error
    let error = container.querySelector('.error-message');
    if (error) {
      container.removeChild(error);
    }

    // Now add the error, if the message is not empty
    if (message) {
      let error = document.createElement('div');
      error.classList.add('error-message');
      error.innerText = message;
      container.appendChild(error);
    }
  }

  function validateEmail() {
    let value = emailInput.value;

    if (!value) {
      showErrorMessage(emailInput, 'Email is a required field.');
      return false;
    }

    if (value.indexOf('@') === -1) {
      showErrorMessage(emailInput, 'You must enter a valid email address.');
      return false;
    }

    showErrorMessage(emailInput, null);
    return true;

  }

  function validateForm() {
      let isValidEmail = validateEmail();
      return isValidEmail;
  }

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    if (validateForm()) {
      alert('Success!');
    }
  });

  emailInput.addEventListener('input', validateEmail);
})();
