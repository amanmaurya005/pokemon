const section=document.querySelector("section");
const loadMore=document.getElementById("loadMore");

async function pokeUrl(url) {
    const response=await fetch(url);
    const result=response.json();
    return result;
    
}

const limit=20;
const offset=0;

const api="https://pokeapi.co/api/v2/pokemon?limit="+limit+"&offset="+offset;



function all (obj){
window.addEventListener("load",async()=>{
const data=await pokeUrl(api);
all()
console.log(data);


data.results.map(async(a)=>{
    console.log(a);
    
    const obj=await pokeUrl(a.url);
    console.log(obj);
    
    const parent=document.createElement("div")
    parent.classList.add("parent");

    const image=document.createElement("img")
    image.src=obj.sprites.other.dream_world.front_default;

    const name=document.createElement("h1");
    name.textContent=obj.name;

    const type=document.createElement("p");
    type.textContent=obj.types.map((a)=> a.type.name).join(",");

    console.log(type);
    

    parent.append(image,name,type);
    section.append(parent);

});

});

}

all();




loadMore.addEventListener("click",()=>{

const api="https://pokeapi.co/api/v2/pokemon?limit="+limit+"&offset="+offset;
console.log(hii);



all()
})

