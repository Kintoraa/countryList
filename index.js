// 1 - Tester le lien de l'API dans le navigateur (https://restcountries.com/v3.1/all)

// 2 - Créer une fonction pour "fetcher" les données, afficher les données dans la console.
let countrys = [];

const card = document.querySelector(".countries-container");
const input = document.querySelector("input");
const inputRange = document.getElementById("inputRange");
const inputSearch = document.getElementById("inputSearch");
const btn = document.querySelectorAll("button");
// Get info API
let btnTri;

const fetchCountry = async () => {
  await fetch("https://restcountries.com/v3.1/all")
    .then((res) => res.json())
    .then((data) => (countrys = data));

  console.log(countrys);
  card.innerHTML = countrys
    .filter((country) =>
      country.name.common
        .toLowerCase()
        .includes(inputSearch.value.toLowerCase())
    )
    .sort((a, b) => {
      if (btnTri === "minToMax") {
        return a.population - b.population;
      } else if (btnTri === "maxToMin") {
        return b.population - a.population;
      } else if (btnTri === "alpha") {
        return a.name.common.localeCompare(b.name.common, "fr");
      }
    })
    .slice(0, inputRange.value)
    .map((country) => {
      return `
      <li class="card">
      <img src=" ${country.flags.png}" alt="${country.name.common}"</img>
      <p>${country.name.common}</p>
      <p> ${country.capital}
      <p>Population : ${country.population}</p>
      
      </li>
      
      `;
    })

    .join("");
};

window.addEventListener("load", fetchCountry);

input.addEventListener("input", () => {
  fetchCountry();
});

inputRange.addEventListener("change", (e) => {
  rangeValue.textContent = e.target.value;
  fetchCountry();
});

btn.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    fetchCountry();
    btnTri = e.target.id;
  });
});
