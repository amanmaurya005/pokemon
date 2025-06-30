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







const section = document.querySelector("section");
const loadMore = document.getElementById("loadMore");
const searchInput = document.getElementById("searchInput");
const typeSelect = document.getElementById("typeSelect");

let limit = 20;
let offset = 0;
let loadedPokemon = []; 

async function pokeUrl(url) {
  const response = await fetch(url);
  return await response.json();
}

function showPokemonCard(obj) {
  const flip = document.createElement("div");
  flip.classList.add("flip-card");

  const flipInner = document.createElement("div");
  flipInner.classList.add("flip-card-inner");

  const flipFront = document.createElement("div");
  flipFront.classList.add("flip-card-front");

  const anchor = document.createElement("a");
  anchor.href = "singlePoke.html?id=" + obj.id;

  const image = document.createElement("img");
  image.src = obj.sprites.other.dream_world.front_default;

  anchor.append(image);

  const name = document.createElement("h1");
  name.textContent = obj.name;

   const type=document.createElement("p");
   type.textContent=obj.types.map((a)=> a.type.name).join(",");

  const flipBack = document.createElement("div");
  flipBack.classList.add("flip-card-back");

  const height = document.createElement("h2");
  height.textContent = "Height: " + obj.height;

  const weight = document.createElement("h2");
  weight.textContent = "Weight: " + obj.weight;

  flipBack.append(height, weight);

  obj.stats.forEach(function (stat) {
    const statElem = document.createElement("h2");
    statElem.textContent = stat.stat.name + ": " + stat.base_stat;
    flipBack.append(statElem);
  });

  flipFront.append(anchor, name, type);
  flipInner.append(flipFront, flipBack);
  flip.append(flipInner);
  section.append(flip);
}

async function all(api) {
  const data = await pokeUrl(api);

  for (const a of data.results) {
    const obj = await pokeUrl(a.url);
    loadedPokemon.push(obj); 
    showPokemonCard(obj);
  }
}

async function loadTypes() {
  const data = await pokeUrl("https://pokeapi.co/api/v2/type");
  data.results.forEach(function (type) {
    const option = document.createElement("option");
    option.value = type.name;
    option.textContent = type.name;
    typeSelect.append(option);
  });
}

function handleFilters() {
  const name = searchInput.value.toLowerCase().trim();
  const type = typeSelect.value;

  section.innerHTML = "";

  const filtered = loadedPokemon.filter(function (pokemon) {
    const matchName = name === "" || pokemon.name.includes(name);
    const matchType =
      type === "" ||
      pokemon.types.some(function (t) {
        return t.type.name === type;
      });
    return matchName && matchType;
  });

  if (filtered.length === 0) {
    section.innerHTML = "<h2>No Pokémon match your search.</h2>";
  } else {
    filtered.forEach(showPokemonCard);
  }
}


window.addEventListener("load", function () {
  const api = "https://pokeapi.co/api/v2/pokemon?limit=" + limit + "&offset=" + offset;
  all(api);
  loadTypes();
});


searchInput.addEventListener("input", handleFilters);
typeSelect.addEventListener("change", handleFilters);


loadMore.addEventListener("click", function () {
  offset += limit;
  const api = "https://pokeapi.co/api/v2/pokemon?limit=" + limit + "&offset=" + offset;
  all(api);
});

