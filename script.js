const container = document.getElementById("container");
const cards_Count = 260;

const colors = {
  fire: "#FDDFDF",
  grass: "#DEFDE0",
  electric: "#FCF7DE",
  water: "#DEF3FD",
  ground: "#f4e7da",
  rock: "#d5d5d4",
  fairy: "#fceaff",
  poison: "#98d7a5",
  bug: "#f8d5a3",
  dragon: "#97b3e6",
  psychic: "#eaeda1",
  flying: "#F5F5F5",
  fighting: "#E6E0D4",
  normal: "#F5F5F5",
};
const main_types = Object.keys(colors);

const fetchPokemons = async () => {
  for (let i = 1; i < cards_Count; i++) {
    await getPokiCard(i);
  }
};

const getPokiCard = async (id) => {
  const url = `https://pokeapi.co/api/v2/pokemon/${id}`;

  const res = await fetch(url);
  const data = await res.json();

  createPokiCards(data);
};
fetchPokemons();
const createPokiCards = (pokemon) => {
  const pokeEl = document.createElement("div");
  pokeEl.classList.add("pokemon");

  const name = pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1);
  const id = pokemon.id.toString().padStart(3, "0");

  const pokeTypes = pokemon.types.map((type) => type.type.name);
  const type = main_types.find((type) => pokeTypes.indexOf(type) > -1);
  const color = colors[type];
  pokeEl.style.backgroundColor = color;
  pokeEl.innerHTML = `
    <div class="img-container">
    <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.id}.png" alt="" />
    </div>
    <div class="info">
    <span class="number">#${id}</span>
    <h3 class="name">${name}</h3>
    <h5>Weight: <span>${pokemon.weight}</span> </h5>
    <small class="type">Type: <span>${type}</span> </small>
    </div>
  `;
  container.appendChild(pokeEl);
};
