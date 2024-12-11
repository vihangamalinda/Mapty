"use strict";

import {pokemonDataMap} from "./pokemon-data.js";


const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

const form = document.querySelector(".form");
const pokemonListContainer = document.querySelector(".pokemon-list-container");
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
    id = (new Date().getUTCMilliseconds() + "").slice(-10)+Math.random().toString(36);
    type;
    pokemonDetails;

    constructor(coordinates, pokeIndex) {
        this.coordinates = coordinates; //[lat,lng]
        console.log(pokeIndex);
        this.pokeIndex = pokeIndex;
        this.pokemonDetails = this._getPokemonDetails();
        this.type = this._getPokemonType();

    }

    _getPokemonType() {
        return this.pokemonDetails.type;
    };

    _getPokemonDetails() {
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
    #mapZoomLevel =18;
    #pokemonLocations = [];

    constructor() {
        this._getPosition();
        formInput.addEventListener("change", this._listenFormInput.bind(this));
        form.addEventListener("submit", this._newFoundInformation.bind(this));
        pokemonListContainer.addEventListener("click", this._moveToMarker.bind(this))
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
        this.#map = L.map("map").setView(coords, this.#mapZoomLevel);

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

        // Get form data
        const inputValue = formInput.value;
        if (inputValue === undefined) {
            alert("Please Select a Pokemon that you saw");
        }
        console.log("formInput.value", inputValue);
        const selectedPokemonData = pokemonDataMap.get(inputValue);
        console.log("selectedPokemonData");
        console.log(selectedPokemonData);

        const pokemonLocation = new PokemonLocator([lat, lng], inputValue);
        this.#pokemonLocations.push(pokemonLocation);

        getMarker(pokemonLocation, this.#map, selectedPokemonData);

        // Render location data on left panel
        this._renderPokemonLocation(pokemonLocation);
        // Hiding the form before animation transition
        form.style.display = "none";
        this._toggleForm();
        // Bringing back the form after animation transition
        setTimeout(() => form.style.display = "block", 1000);
    }

    _renderPokemonLocation(pokemonLocator) {
        console.log(pokemonLocator.type);
        const pokemonDetail = pokemonLocator.pokemonDetails;
        console.log(pokemonDetail);
        const [lat, lng] = pokemonLocator.coordinates;
        const uptoFiveDecimal = (val) => val.toString().slice(0, 7);

        const html = `
        <li class="pokemon-data type-${pokemonLocator.type.toLowerCase()}-data" data-id="${pokemonLocator.id}">
        <div class="data-box box-item">
                   <div class="pokemon-name box-item">
                        <span>${pokemonDetail.pokemonName}</span>
                        <span class="type-emjoi">${getTypeEmoji(pokemonDetail.type)}</span>
                   </div>
                   <div class="details box-item">
                        <span>pokedex Id:</span>
                        <span>${pokemonDetail.id}</span>
                   </div>
                   <div class="locator box-item">
                   <span>location</span>
                   <span>{${uptoFiveDecimal(lat)},${uptoFiveDecimal(lng)}}</span>
                   
</div>
        </div>           
        </li>
        `;
        //                        <div class="workout__details">
        //                               <span class="workout__icon">🏃‍♂️</span>
        //                               <span class="workout__value">5.2</span>
        //                               <span class="workout__unit">km</span>
        //                             </div>
        //                             <div class="workout__details">
        //                               <span class="workout__icon">⏱</span>
        //                               <span class="workout__value">24</span>
        //                               <span class="workout__unit">min</span>
        //                             </div>
        const html2 = `<div>${pokemonLocator.type}</div>`
        form.insertAdjacentHTML('afterend', html);
    }

    _moveToMarker(e) {
        const pokemonMarkerEl = e.target.closest(".pokemon-data");
        console.log(pokemonMarkerEl);
        if (!pokemonMarkerEl) return;

        const pokemonLocation = this.#pokemonLocations
            .find((locationDetails) => locationDetails.id === pokemonMarkerEl.dataset.id);

        console.log(pokemonLocation);
        this.#map.setView(pokemonLocation.coordinates,this.#mapZoomLevel,{
            animate:true,
            pan:{
                duration:1
            }
        })
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

const getTypeEmoji =(pokemonType)=>{
    const type = pokemonType.toLowerCase();
    if(type ==='grass'){
        return '🍃🍃';
    }
    if(type === 'fire'){
        return '🔥🔥'
    }
    if(type === 'water'){
        return '💧💧'
    }
    if(type === 'ghost'){
        return '👻👻'
    }
    if(type === 'electric'){
        return '⚡⚡'
    }
    return 'Unknown';
}

const getMarker = (pokemonLocation, bindingingEl, pokemon) => {
    const markerInfo = ` #${pokemon.id}  ${pokemon.pokemonName}  ${getTypeEmoji(pokemon.type)}`;
    L.marker(pokemonLocation.coordinates)
        .addTo(bindingingEl)
        .bindPopup(getPopupObj(pokemon.type))
        .setPopupContent(markerInfo)
        .openPopup();
}

function getPopupObj(pokemonType) {
    return L.popup({
        maxWidth: 500,
        minWidth: 300,
        autoClose: false,
        closeButton:false,
        maxHeight: 800,
        closeOnClick: false,
        className: `type-${pokemonType.toLowerCase()}-popup`,
    });
}

new App();
// formInput.appendChild(getOption("999","Vihanga"))


