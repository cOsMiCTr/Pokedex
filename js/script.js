
// IIFE

const pokemonRepository = (function () {

  // Variables

  const heightHuge = "Wow, that\’s big! ";
  const divPokemonList = "<div class=\"pokemon-names\">";
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


  // div and class creation

  let createClassPokemonNames = document.querySelector('main');
  let divClassForPokemonNames = document.createElement('div');
  createClassPokemonNames.appendChild(divClassForPokemonNames);
  divClassForPokemonNames.classList = "pokemon-names";


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
    pokemonList.forEach(function(pokemon) {
      pokemon.height >= 2.0 ?
      divPokemonList + pokemon.name + " ( height : " + pokemon.height + " ) - " + spanExcitement + heightHuge + spanClose + divClose:
      divPokemonList + pokemon.name + " ( height : " + pokemon.height + " )" + divClose;
    });
  }



  function addListItem() {
    let elements = document.querySelector('.pokemon-names');
    let pokemonNames = elements.querySelectorAll('div');
    let newButton = document.createElement('button');


    pokemonNames.forEach(function(elements){
      newButton.innerText = "I am not a button!";  
      element.innerText = pokemon.name;
      elements.innerHTML = "<h2>" + pokemon.name + "</h2>";
      elements.appendChild(newButton);

    })
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
    getInfo
  };
})();


pokemonRepository.addListItem();


/*


pokemonList.forEach(function(pokemon) {
  pokemon.height >= 2.0 ?
  divPokemonList + pokemon.name + " ( height : " + pokemon.height + " ) - " + spanExcitement + heightHuge + spanClose + divClose:
  divPokemonList + pokemon.name + " ( height : " + pokemon.height + " )" + divClose;
});*/

/*
  // BOB Try-outs
  function getNodes(x) {
    let elements = document.querySelector('.pokemon-list')
    let bobsName = elements.querySelectorAll('div');
    let newButton = document.createElement('button');
    let elementToRemove = document.querySelector('div');



    bobsName.forEach(function(element){
      newButton.innerText = "I am not a button!";  
      element.innerText = x;
      elements.innerHTML = "<h2>" + x + "</h2>";
      elements.appendChild(newButton);
      //elementToRemove.parentElement.removeChild(elementToRemove);


    })
  }*/




// Add a Pokemon
/*
pokemonRepository.add({ name:'Pikachu', height:1.04, types:'Electric' });

// Print everything inside the array
pokemonRepository.getNodes('test');

pokemonRepository.getInfo('Pikachu');*/

/*
// WHY IS THIS NOT TURNING TO RED????
let button = document.querySelector('button');

button.addEventListener('click', function (event) {
  let target = event.target;
  target.classList.toggle('button--red');
  target.classList.toggle('button--green');


});*/

/*

// Remove submit to server
let form = document.querySelector('form');
let input = document.querySelector('input');
form.addEventListener('submit', function (event) {

  // submit only if there is text in the input
  !input.value ?
  event.preventDefault():
  form.submit();
});

*/


// hide the form whenever it is pressed to key "enter"
/*
function hideSurveyForm(event) {
  let survey_form = document.querySelector('#survey_form');
  let isFormHidden = survey_form.classList.contains('hidden');
  if( !isFormHidden && event.key === 'Enter'){
    survey_form.classList.add('hidden');
  } else { 
    survey_form.classList.remove('hidden');
  }
}

window.addEventListener('keydown', hideSurveyForm);

*/
