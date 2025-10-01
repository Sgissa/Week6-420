const fetchBtn = document.getElementById('fetchBtn');
const pokemonNmaeInput = document.getElementById('pokemonName');
const pokemonInfo = document.getElementById('pokemonInfo');

fetchBtn.addEventListener('click', () => {
    const pokemon = pokemonNmaeInput.value.trim();
    if(pokemon) {
        fetchPokemon(pokemon);
    } else {
        pokemonInfo.innerHTML = `<p class=" text-red-500 font-bold"> Please enter the Pokemon name</p> `
    }
});

async function fetchPokemon(pokemon) {
    try{
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon.toLowerCase()}`);
        if (!response.ok) {
            throw new Error('Pokemon not found');
        }
        const data = await response.json();
        console.log(data);
        pokemonInfo.innerHTML = `
        <h2 class="text-2xl font-bold mb-4 capitalize text-yellow-600">${data.name}</h2>
        <img src="${data.sprites.front_default}" alt="${data.name}" class="mb-4">
        <p class="mb-2"><strong>Height:</strong> ${data.height}</p>
        <p class="mb-2"><strong>Weight:</strong> ${data.weight}</p>
        <p class="mb-2"><strong>Types:</strong>
         ${data.types.map(typeInfo => typeInfo.type.name).join(',')}
         </p>
        <p class="mb-2"><strong>Types:</strong>
         ${data.stats.map(statInfo => `${statInfo.stat.name}: ${statInfo.base_stat}`).join('|')}
         </p>
        `;
    } catch(error) {
        console.log(error);
    }
}


