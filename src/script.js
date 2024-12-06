"use strict";

import {pokemonDataMap} from "./pokemon-data.js";


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

class PokemonLocator {
    date = new Date();
    id = (new Date().getUTCMilliseconds() + "").slice(-10);

    constructor(coordinates, pokeIndex) {
        this.coordinates = coordinates;
        console.log(pokeIndex);
        this.pokeIndex = pokeIndex;
    }

    getPokemonDetails() {
        let pokeDetails;
        if (pokemonDataMap.has(this.pokeIndex)) {
            pokeDetails = pokemonDataMap.get(this.pokeIndex)
        } else {
            console.log("Unknown Pokemon");
            pokeDetails = '';
        }
        return pokeDetails;
    }
}

class App {
    #map;
    #mapEvent;

    constructor() {
        this._getPosition();
        formInput.addEventListener("change", this._listenFormInput.bind(this));
        form.addEventListener("submit", this._newFoundInformation.bind(this));
    }

    _getPosition() {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(this._loadMap.bind(this),
                (errorMsg) => {
                    console.log(errorMsg);
                    alert("Could not get your location");
                }
            );
        }
    };

    _loadMap(position) {
        console.log(position);
        const {latitude} = position.coords;
        const {longitude} = position.coords;
        const location = `https://www.google.com/maps/@${latitude},${longitude},15z?entry=ttu&g_ep=EgoyMDI0MTExOS4yIKXMDSoASAFQAw%3D%3D`;
        console.log(location);
        console.log(this);
        const coords = [latitude, longitude];
        this.#map = L.map("map").setView(coords, 18);

        L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
            attribution:
                '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        }).addTo(this.#map);

        // L.marker(coords)
        //     .addTo(this.#map)
        //     .bindPopup("A pretty CSS popup.<br> Easily customizable.")
        //     .openPopup();

        // console.dir(map)
        //   Handling clicks on map
        this.#map.on("click", this._showForm.bind(this));

    }

    _showForm(mapE) {
        this.#mapEvent = mapE;
        // console.log(mapE);
        // const { lat, lng } = mapE.latlng;
        // form.classList.toggle("hidden");
        this._toggleForm();
    }

    _toggleForm() {
        form.classList.toggle("hidden");
    }

    _toggleElevationField() {

    }

    _listenFormInput(e) {
        console.log(e);
        console.log(formInput.value);
        const pokemonData = pokemonDataMap.get(formInput.value);

        console.log(pokemonData.type);

        formPokeIdentifier.textContent = `#${pokemonData.id}`;
        formPokeName.textContent = `${pokemonData.pokemonName}`;
        formPokemonImage.src = pokemonData.imgPath;
        formPokeType.innerHTML = `<div>${pokemonData.type}</div>`;
        formPokeDetails.innerHTML = `<div>${pokemonData.info}</div>`;
        console.log(pokemonData);
    }

    _newFoundInformation(e) {
        e.preventDefault();
        console.log(this.#mapEvent);
        const {lat, lng} = this.#mapEvent.latlng;
        // form.classList.remove("hidden");

        getMarker([lat, lng], this.#map);
        this._toggleForm();
    }
}

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

const getMarker = (coordinates, bindingingEl) =>
    L.marker(coordinates)
        .addTo(bindingingEl)
        .bindPopup(getPopupObj())
        .setPopupContent(popupContent)
        .openPopup();


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

new App();
// formInput.appendChild(getOption("999","Vihanga"))


