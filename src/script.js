// "use strict";

// prettier-ignore
const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

const form = document.querySelector(".form");
const containerWorkouts = document.querySelector(".workouts");
const inputType = document.querySelector(".form__input--type");
const inputDistance = document.querySelector(".form__input--distance");
const inputDuration = document.querySelector(".form__input--duration");
const inputCadence = document.querySelector(".form__input--cadence");
const inputElevation = document.querySelector(".form__input--elevation");

const popupContent = "Vihanga";

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
        const slector = "";
        getMarker([lat, lng], map);
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
