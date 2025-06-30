// const section=document.querySelector("section");
// const loadMore=document.getElementById("loadMore");

// async function pokeUrl(url) {
//     const response=await fetch(url);
//     const result=response.json();
//     return result;

// }

// const limit=20;
// const offset=0;




// function all (){
// const api="https://pokeapi.co/api/v2/pokemon?limit="+limit+"&offset="+offset;

// window.addEventListener("load",async()=>{
// const data=await pokeUrl(api);

// console.log(data);

// data.results.map(async(a)=>{
//     console.log(a);

//     const obj=await pokeUrl(a.url);
//     console.log(obj);

//     const flip=document.createElement("div")
//     flip.classList.add("flip-card");

//     const flipInner=document.createElement("div");
//     flipInner.classList.add("flip-card-inner");


//     const flipFront=document.createElement("div");
//     flipFront.classList.add("flip-card-front")


//     const anchor=document.createElement("a")
//     anchor.href="singlePoke.html?id="+obj.id;


//     const image=document.createElement("img")
//     image.src=obj.sprites.other.dream_world.front_default;

//     anchor.append(image)

//     const name=document.createElement("h1");
//     name.textContent=obj.name;

//     const type=document.createElement("p");
//     type.textContent=obj.types.map((a)=> a.type.name).join(",");

//     console.log(type);

//     const flipBack=document.createElement("div");
//     flipBack.classList.add("flip-card-back");

//     const height=document.createElement("h2");
//     height.textContent=obj.height;

//     const weight=document.createElement("h2");
//     weight.textContent=obj.weight;


//     const stats=obj.stats;
//     console.log(stats);

//     stats.map((a)=>{
//       const data=a;
//       console.log(data.base_stat);   

//       const hp=document.createElement("h2");
//     hp.textContent=data.base_stat; 

//     const attack=document.createElement("h2");
//     attack.textContent=data.base_stat;

//     const defense=document.createElement("h2");
//     defense.textContent=data.base_stat;

//     const sAttack=document.createElement("h2");
//     sAttack.textContent=data.base_stat;

//     const sDefense=document.createElement("h2");
//     sDefense.textContent=data.base_stat;

//     const speed=document.createElement("h2");
//     speed.textContent=data.base_stat;

//     console.log(data.base_stat);

 // flipBack.append(statshp,stats.attack,stats.defense,stats.sAttack,stats.sDefense,stats.speed)
//     })



//     flipFront.append(anchor,name,type);

//     

//     flipInner.append(flipFront,flipBack)

//     flip.append(flipInner);

//     section.append(flip);

// });

// });

// }

// all();




// loadMore.addEventListener("click",()=>{
// offset+=limit;
// console.log("clicked");

// console.log(offset);
// const api="https://pokeapi.co/api/v2/pokemon?limit="+limit+"&offset="+offset;
// console.log(api);
// section.innerHTML="";

// all();
//   console.log(section.innerHTML);
// });



// const section = document.querySelector("section");
// const loadMore = document.getElementById("loadMore");
// const searchInput = document.getElementById("searchInput");
// const typeSelect = document.getElementById("typeSelect");
// const noResultMsg = document.getElementById("noResultMsg");

// let offset = 0;
// const limit = 20;

// // Fetch helper
// async function fetchData(url) {
//   const res = await fetch(url);
//   return res.json();
// }

// // Create flip card
// function createCard(pokemon) {
//   const flip = document.createElement("div");
//   flip.classList.add("flip-card", "parent");

//   const flipInner = document.createElement("div");
//   flipInner.classList.add("flip-card-inner");

//   const flipFront = document.createElement("div");
//   flipFront.classList.add("flip-card-front");

//   const img = document.createElement("img");
//   img.src = pokemon.sprites.other.dream_world.front_default || pokemon.sprites.front_default;
//   img.alt = pokemon.name;

//   const name = document.createElement("h1");
//   name.textContent = pokemon.name;

//   const type = document.createElement("p");
//   type.textContent = pokemon.types.map(t => t.type.name).join(", ");

//   flipFront.append(img, name, type);

//   const flipBack = document.createElement("div");
//   flipBack.classList.add("flip-card-back");

//   const statsMap = {};
//   pokemon.stats.forEach(stat => {
//     statsMap[stat.stat.name] = stat.base_stat;
//   });

//   flipBack.innerHTML =   "<h2> Height: " + height + "cm</h2>" +
//         "<h2> Weight: " + weight + "kg</h2>" +
//         "<h2>HP: " + stats.hp + "</h2>" +
//         "<h2>Attack: " + stats.attack + "</h2>" +
//         "<h2>Defense: " + stats.defense + "</h2>" +
//         "<h2>Sp. Attack: " + stats["special-attack"] + "</h2>" +
//         "<h2>Sp. Defense: " + stats["special-defense"] + "</h2>" +
//         "<h2>Speed: " + stats.speed + "</h2>";

//   flipInner.append(flipFront, flipBack);
//   flip.append(flipInner);
//   section.appendChild(flip);
// }

// // Load paginated Pokémon
// async function loadPokemons() {
//   const url = `https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`;
//   const data = await fetchData(url);

//   for (const item of data.results) {
//     const pokeData = await fetchData(item.url);
//     createCard(pokeData);
//   }

//   offset += limit;
//   filterCards(); // filter again after loading
// }

// // Load type list
// async function loadTypes() {
//   const data = await fetchData("https://pokeapi.co/api/v2/type");
//   typeSelect.innerHTML = `<option value="all types" selected>All types</option>`;
//   data.results.forEach(type => {
//     const opt = document.createElement("option");
//     opt.value = type.name;
//     opt.textContent = type.name.charAt(0).toUpperCase() + type.name.slice(1);
//     typeSelect.appendChild(opt);
//   });
// }

// // Filter visible cards
// function filterCards() {
//   const searchVal = searchInput.value.toLowerCase().trim();
//   const selectedType = typeSelect.value.toLowerCase();

//   let visibleCount = 0;

//   document.querySelectorAll(".parent").forEach(card => {
//     const name = card.querySelector("h1").textContent.toLowerCase();
//     const type = card.querySelector("p").textContent.toLowerCase();

//     const nameMatch = name.includes(searchVal);
//     const typeMatch = selectedType === "all types" || type.includes(selectedType);

//     if (nameMatch && typeMatch) {
//       card.style.display = "block";
//       visibleCount++;
//     } else {
//       card.style.display = "none";
//     }
//   });

//   noResultMsg.style.display = visibleCount === 0 ? "block" : "none";
// }

// // Event listeners
// searchInput.addEventListener("input", filterCards);
// typeSelect.addEventListener("change", filterCards);
// loadMore.addEventListener("click", loadPokemons);

// // On page load
// window.addEventListener("load", () => {
//   loadTypes();
//   loadPokemons();
// });
const section = document.querySelector("section");
const loadMore = document.getElementById("loadMore");
const searchInput = document.getElementById("searchInput");
const typeSelect = document.getElementById("typeSelect");
const noResultMsg = document.getElementById("noResultMsg");

let offset = 0;
const limit = 20;


async function fetchData(url) {
  const res = await fetch(url);
  return res.json();
}

window.addEventListener("load", () => {
  loadTypes();
  loadPokemons();
});

function createCard(pokemon) {
  const flip = document.createElement("div");
  flip.classList.add("flip-card", "parent");

  const flipInner = document.createElement("div");
  flipInner.classList.add("flip-card-inner");

  const flipFront = document.createElement("div");
  flipFront.classList.add("flip-card-front");

  const img = document.createElement("img");
  img.src = pokemon.sprites.other?.dream_world?.front_default || pokemon.sprites.front_default;
  img.alt = pokemon.name;

  const name = document.createElement("h1");
  name.textContent = pokemon.name;

  const type = document.createElement("p");
  type.textContent = pokemon.types.map(t => t.type.name).join(", ");

  flipFront.append(img, name, type);

  const flipBack = document.createElement("div");
  flipBack.classList.add("flip-card-back");

  const statsMap = {};
  pokemon.stats.forEach(stat => {
    statsMap[stat.stat.name] = stat.base_stat;
  });

  const height = pokemon.height;
  const weight = pokemon.weight;

  flipBack.innerHTML =
    `<h2>Height: ${height} dm</h2>
     <h2>Weight: ${weight} hg</h2>
     <h2>HP: ${statsMap.hp}</h2>
     <h2>Attack: ${statsMap.attack}</h2>
     <h2>Defense: ${statsMap.defense}</h2>
     <h2>Sp. Attack: ${statsMap["special-attack"]}</h2>
     <h2>Sp. Defense: ${statsMap["special-defense"]}</h2>
     <h2>Speed: ${statsMap.speed}</h2>`;

  flipInner.append(flipFront, flipBack);
  flip.append(flipInner);
  section.appendChild(flip);
}


async function loadPokemons() {
  const url = `https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`;
  const data = await fetchData(url);

  for (const item of data.results) {
    const pokeData = await fetchData(item.url);
    createCard(pokeData);
  }

  offset += limit;
  filterCards(); 
}


async function loadTypes() {
  const data = await fetchData("https://pokeapi.co/api/v2/type");
  typeSelect.innerHTML = `<option value="all types" selected>All types</option>`;
  data.results.forEach(type => {
    const opt = document.createElement("option");
    opt.value = type.name;
    opt.textContent = type.name.charAt(0).toUpperCase() + type.name.slice(1);
    typeSelect.appendChild(opt);
  });
}


function filterCards() {
  const searchVal = searchInput.value.toLowerCase().trim();
  const selectedType = typeSelect.value.toLowerCase();

  let visibleCount = 0;

  document.querySelectorAll(".parent").forEach(card => {
    const name = card.querySelector("h1").textContent.toLowerCase();
    const type = card.querySelector("p").textContent.toLowerCase();

    const nameMatch = name.includes(searchVal);
    const typeMatch = selectedType === "all types" || type.includes(selectedType);

    if (nameMatch && typeMatch) {
      card.style.display = "block";
      visibleCount++;
    } else {
      card.style.display = "none";
    }
  });

  noResultMsg.style.display = visibleCount === 0 ? "block" : "none";
}


searchInput.addEventListener("input", filterCards);
typeSelect.addEventListener("change", filterCards);
loadMore.addEventListener("click", loadPokemons);




