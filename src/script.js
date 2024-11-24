"use strict";

import { pokemonDataMap } from "./pokemon-data.js";

// prettier-ignore
const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

const form = document.querySelector(".form");
const containerWorkouts = document.querySelector(".workouts");
const inputType = document.querySelector(".form__input--type");
const inputDistance = document.querySelector(".form__input--distance");
const inputDuration = document.querySelector(".form__input--duration");
const inputCadence = document.querySelector(".form__input--cadence");
const inputElevation = document.querySelector(".form__input--elevation");

const formInput = document.querySelector(".form-info-selector-label-value");
const formPokeName = document.querySelector(".form-identifier-name");
const formPokeIdentifier = document.querySelector(".form-identifier-number");
const formPokemonImage = document.querySelector(".poke-img");
const formPokeType = document.querySelector(".form-type-info");
const formPokeDetails = document.querySelector(".form-detail-infor");

const popupContent = "Vihanga";

const getOption = (pokeIndex, pokemonName) => {
  let option = document.createElement("option");
  option.value = pokeIndex;
  option.text = pokemonName;
  return option;
};

const setUpDropDownOptions = () => {
  pokemonDataMap.forEach((pokemon, pokeIndex) =>
    formInput.appendChild(getOption(pokeIndex, pokemon.pokemonName))
  );
};
setUpDropDownOptions();

const getMarker = (cordinates, bindingingEl) =>
  L.marker(cordinates)
    .addTo(bindingingEl)
    .bindPopup(getPopupObj())
    .setPopupContent(popupContent)
    .openPopup();

if (navigator.geolocation) {
  navigator.geolocation.getCurrentPosition(
    (position) => {
      console.log(position);
      const { latitude } = position.coords;
      const { longitude } = position.coords;
      const location = `https://www.google.com/maps/@${latitude},${longitude},15z?entry=ttu&g_ep=EgoyMDI0MTExOS4yIKXMDSoASAFQAw%3D%3D`;
      console.log(location);

      const coords = [latitude, longitude];
      const map = L.map("map").setView(coords, 18);

      L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution:
          '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      }).addTo(map);

      L.marker(coords)
        .addTo(map)
        .bindPopup("A pretty CSS popup.<br> Easily customizable.")
        .openPopup();

      // console.dir(map)
      map.on("click", (mapEvent) => {
        console.log(mapEvent);
        const { lat, lng } = mapEvent.latlng;
        form.classList.remove("hidden");

        // getMarker([lat, lng], map);
      });
    },
    (errorMsg) => {
      console.log(errorMsg);
      alert("Could not get your location");
    }
  );
}

function getPopupObj() {
  return L.popup({
    maxWidth: 500,
    minWidth: 300,
    autoclose: false,
    maxHeight: 800,
    closeOnClick: false,
    className: "running-popup",
  });
}

// formInput.appendChild(getOption("999","Vihanga"))

formInput.addEventListener("change", (event) => {
  console.log(event);
  console.log(formInput.value);
  const pokemonData = pokemonDataMap.get(formInput.value);

  console.log(pokemonData.type);

  formPokeIdentifier.textContent = `#${pokemonData.id}`;
  formPokeName.textContent = `${pokemonData.pokemonName}`;
  formPokemonImage.src = pokemonData.imgPath;
  formPokeType.innerHTML = `<div>${pokemonData.type}</div>`;
  formPokeDetails.innerHTML = `<div>${pokemonData.info}</div>`;
  console.log(pokemonData);
});
