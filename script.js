const pokemonName = document.querySelector('.pokemon__name');
const pokemonNumber = document.querySelector('.pokemon__number');
const pokemonImage = document.querySelector('.pokemon__image');
const notPokemonImage = document.querySelector('.not__pokemon');

const form = document.querySelector('.form');
const input = document.querySelector('.input__search');
const buttonPrev = document.querySelector('.btn-prev');
const buttonNext = document.querySelector('.btn-next');

let searchPokemon = 1;

const fetchPokemon = async (pokemon) => {
  try {
    const APIResponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);
    
    if (APIResponse.status === 200) {
      const data = await APIResponse.json();
      return data;
    } else {
      console.error('Failed to fetch Pokémon data');
      return null;
    }
  } catch (error) {
    console.error('Error fetching Pokémon:', error);
    return null;
  }
};

const renderPokemon = async (pokemon) => {
  pokemonName.innerHTML = ' Loading . . .';
  pokemonNumber.innerHTML = '';

  const data = await fetchPokemon(pokemon);

  if (data) {
    const { name, id, sprites } = data;

    pokemonImage.style.display = 'block';
    input.value = '';
    pokemonName.innerHTML = name;
    pokemonNumber.innerHTML = id;
    pokemonImage.src = sprites.versions['generation-v']['black-white'].animated.front_default;
    notPokemonImage.style.display = 'none'; 
    input.value = '';
    searchPokemon = id;
  } else {
    input.value = '';
    pokemonImage.style.display = 'none';
    pokemonName.innerHTML = '404 Not found';
    pokemonNumber.innerHTML = '';
    notPokemonImage.style.display = 'block'; 
  }
};

form.addEventListener('submit', (event) => {
  event.preventDefault();
  renderPokemon(input.value.toLowerCase());
});

buttonPrev.addEventListener('click', () => {
  if (searchPokemon > 1) {
    searchPokemon -= 1;
    renderPokemon(searchPokemon);
  }
});

buttonNext.addEventListener('click', () => {
  searchPokemon += 1;
  renderPokemon(searchPokemon);
});

renderPokemon(searchPokemon);
