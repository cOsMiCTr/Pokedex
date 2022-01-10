const pokemonRepository=(()=>{let e=document.querySelector(".modal"),t=$(".modal-body"),a=$(".modal-title"),o=[],n=e=>pokemonRepository.loadDetails(e).then(()=>l(e.name,e.imageUrl,e.height,e.weight,e.type));loadList=(()=>fetch("https://pokeapi.co/api/v2/pokemon/?limit=200").then(function(e){return e.json()}).then(e=>{e.results.forEach(e=>{(e=>{"object"==typeof e&&"name"in e?o.push(e):alert("Wrong type of data has been chosen! Please try again...")})({name:e.name,detailsUrl:e.url})})}).catch(e=>{hideLoadingMessage(),console.error(e)}));let l=(e,o,n,l,i)=>{a.empty(),t.empty();let s=$('<h1 class="text-capitalize">'+e+"</h1>"),r=$('<img class="modal-img" style="width:30%">');r.attr("src",o);let d=$("<p>Height : "+Math.round(.1*n).toFixed(2)+" m</p>"),c=$("<p>Weight : "+Math.round(.1*l).toFixed(3)+" kgs</p>"),p=$("<p>Type(s) : "+i+"</p>");a.append(s),t.append(r),t.append(d),t.append(c),t.append(p),$("#PokedexModal").modal()},i=()=>{a.empty(),t.empty();let e=$('<h1 class="text-capitalize">Contact</h1>'),o=$('<label for="contact-email">Enter your Email address</label><input type="email" class="form-control" id="contact-email" aria-describedby="emailHelp" placeholder="Enter email">'),n=$('<label for="contact-textarea">Your message</label><textarea class="form-control" id="contact-textarea" rows="3"></textarea>'),l=$('<input class="btn btn-primary" type="submit" value="Submit">');t.empty(),a.append(e),t.append(o),t.append(n),t.append(l),$("#ContactModal").modal()},s=()=>{e.classList.remove("is-visible")};return $(document).ready(()=>{$(".search-pokemon").on("input",function(){let e=$(this).val().toLowerCase();$(".pokemon-container").filter(function(){$(this).toggle($(this).text().toLowerCase().indexOf(e)>-1)})})}),window.addEventListener("keydown",e=>{let t=document.querySelector(".modal");"Escape"===e.key&&t.classList.contains("is-visible")&&s()}),e.addEventListener("click",t=>{t.target===e&&s()}),document.querySelector(".Contact").addEventListener("click",()=>i()),{getAll:()=>o,addListItem:e=>{const t=document.querySelector(".row");let a=document.createElement("li"),o=document.createElement("img"),l=document.createElement("p");o.setAttribute("alt","Pokemon image of "+e.name),o.setAttribute("role","image"),o.classList.add("pokemon-image"),l.classList.add("pokemon-name"),l.innerText=e.name,a.innerText.toUpperCase(),a.classList.add("list-group"),a.classList.add("col-6"),a.classList.add("col-xs-5"),a.classList.add("col-sm-4"),a.classList.add("col-md-3"),a.classList.add("col-lg-2"),a.classList.add("pokemon-container"),a.setAttribute("data-toggle","modal"),a.appendChild(l),a.appendChild(o),t.appendChild(a),a.addEventListener("click",()=>n(e));let i=e.detailsUrl;return fetch(i).then(e=>e.json()).then(t=>{e.image=t.sprites.front_default,o.setAttribute("src",e.image)}).catch(e=>{console.error(e)})},loadList:loadList,loadDetails:function(e){let t=e.detailsUrl;return fetch(t).then(function(e){return e.json()}).then(function(t){e.imageUrl=t.sprites.other["official-artwork"].front_default,e.height=t.height;let a=t.types.map(e=>e.type.name);e.type=a.join(", "),e.weight=t.weight}).catch(function(e){console.error(e)})},showDetails:n,showModal:l,hideModal:s,showContactModal:i}})();pokemonRepository.loadList().then(()=>pokemonRepository.getAll().forEach(e=>pokemonRepository.addListItem(e)));