const apiKey = "dccf2cc739ae381f211855a68c5a0c1c";
const cors_api_host = "cors-anywhere.herokuapp.com";
const cors_api_url = "https://" + cors_api_host + "/";

document.getElementById("btn").addEventListener("click", onButtonClick);

toggleWeatherUI(false);
setLoadingSpinner(false);
setError(false);

function onButtonClick() {
  const searchInput = document.getElementById("search");
  const searchText = searchInput.value;

  const isValid = validateData();

  if (!isValid) {
    return;
  }

  const city = searchText;
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;

  setLoadingSpinner(true);
  setError(false);

  fetch(cors_api_url + url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((response) => {
      if (response.ok) {
        return response.json();
      }

      throw Error(response.message);
    })
    .then((response) => {
      const city = response.name;
      const description = response.weather[0].main;
      const temperature = (response.main.temp - 273.15).toFixed(1);
      const temperatureText = temperature + "˚C";
      const icon = response.weather[0].icon;
      const iconClass = "icon__" + icon;
      const temperatureTableFeels = (response.main.feels_like - 273.15).toFixed(1);
      const temperatureTableMax = (response.main.temp_max - 273.15).toFixed(1);
      const temperatureTableMin = (response.main.temp_min - 273.15).toFixed(1);
      const temperatureTextFeels = temperatureTableFeels + "˚C";
      const temperatureTextMax = temperatureTableMax + "˚C";
      const temperatureTextMin = temperatureTableMin + "˚C";

      const cityEl = document.getElementById("city");
      const descriptionEl = document.getElementById("description");
      const temperatureEl = document.getElementById("temp");
      const iconEl = document.getElementById("icon");

      const temperatureFeelse = document.getElementById("temperature-feels");
      const temperatureMax = document.getElementById("temperature-max");
      const temperatureMin = document.getElementById("temperature-min");

      cityEl.innerText = city;
      descriptionEl.innerText = description;
      temperatureEl.innerText = temperatureText;

      temperatureFeelse.innerText = temperatureTextFeels; 
      temperatureMax.innerText = temperatureTextMax;
      temperatureMin.innerText = temperatureTextMin;

      iconEl.classList.replace(iconEl.classList[2], iconClass);
      //   iconEl.classList.add(iconClass);

      toggleWeatherUI(true);
      setLoadingSpinner(false);
    })
    .catch((error) => {
      console.dir(error);
      toggleWeatherUI(false);
      setLoadingSpinner(false);
      setError(true, error.message);
    });
}

function toggleWeatherUI(show) {
  const block = document.querySelector(".current");

  setElementDisplay(block, show);
}
function setLoadingSpinner(show) {
  const loadingSpinner = document.querySelector(".lds-roller");

  setElementDisplay(loadingSpinner, show);
}

function validateData() {
  const searchInput = document.getElementById("search");
  const searchText = searchInput.value;
  let isValid = true;

  if (!searchText) {
    isValid = false;
  }

  if (isValid) {
    searchInput.parentElement.classList.remove("error");
  } else {
    searchInput.parentElement.classList.add("error");
  }

  return isValid;
}

function setError(show, message) {
  const errorBlock = document.querySelector("#response-error");

  setElementDisplay(errorBlock, show);

  if (message) {
    const errorMessageEl = document.querySelector(
      "#response-error .error-message"
    );

    errorMessageEl.innerText = message;
  }
}

function setElementDisplay(el, show) {
  el.style.display = show ? "" : "none";
}

