
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

let pokemonNames = "";
let heightHuge = "Wow, that’s big! ";
let divPokemonList = "<div class=\"pokemon-list\">"
let divClose = "</div>";
let spanExcitement = "<span class=\"excitement\">";
let spanClose = "</span>"

// Print on screen

for(i = 0; i < pokemonList.length; i++) {
  pokemonList[i].height >= 2.0 ?
  document.write(divPokemonList + pokemonList[i].name + " ( height : " + pokemonList[i].height + " ) - " + spanExcitement + heightHuge + spanClose + divClose):
  document.write(divPokemonList + pokemonList[i].name + " ( height : " + pokemonList[i].height + " )" + divClose)
}






/*
let person = [
  {name: "person1", age: 9},
  {name: "person2", age: 14},
  {name: "person3", age: 25}
  ];

for (let i=0; i < person.length; i++){
// If
    person[i].age <19 && person[i].age >13 ? 
// Then
    console.log(person[i].name + " is a teenager") :
// If
    person[i].age <13 ?
// Then
    console.log(person[i].name + " is a child") :
// Else
    console.log(person[i].name + " is an adult")
}
*/



/*
let fruits = ['apple', 'banana', 'mango', 'pear', 'apricot'];

let text = "";

for(i = 0; i < fruits.length; i++) {
  text = text + ' ' + fruits[i]
}

console.log(text);
  */