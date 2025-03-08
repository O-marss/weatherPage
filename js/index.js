//!
let data;
let locationData;
let bgData;
let coordinates;
let city;

let dataVariabels = {
  cityName: document.getElementById("cityName"),
  temperature: document.getElementById("temperature"),
  weatherCondition: document.getElementById("weatherCondition"),
  weatherIcon: document.getElementById("weatherIcon"),
  humidity: document.getElementById("humidity"),
  visibility: document.getElementById("visibility"),
  chanceOfRain: document.getElementById("chanceOfRain"),
  windSpeed: document.getElementById("windSpeed"),
};

let htmlVariabels = {
  header: document.getElementById("header"),
  date: ``,
  time: ``,
  dayInfoContainer: document.getElementById("dayInfoContainer"),
  mainContent: document.getElementById("mainContent"),
  allHourDataContainer: document.getElementById("allHourDataContainer"),
  mainContent: ``,
  cityNameInput: document.getElementById("cityNameInput"),
  form: document.getElementById("form"),
};

let weatherVariabels = {
  apiKey: "6e58cedd22434823bd2150533252502",
  baseUrl: "https://api.weatherapi.com/v1/forecast.json",
  numberOfDays: 7,
};

let bgVariabels = {
  apiKey: "5s9IIt9eJCnJ8pjKgMjoApcuZ6SvP5IH3NlT92CIHn0",
  baseUrl: "https://api.unsplash.com/photos/random/",
};

let locationParams = {
  accessKey: `3b9713e8dc0819fef3ce3a7fae9bb782`,
  baseUrl: `http://api.ipapi.com/api/161.185.160.93`
}

// ^=========================> Events <=======================& //

htmlVariabels.form.addEventListener("submit", function (e) {
  e.preventDefault();
  e.stopPropagation();

  $(".owl-carousel").trigger("destroy.owl.carousel");

  let cityName = htmlVariabels.cityNameInput.value;
  getCoordinatesByCity(cityName);

  htmlVariabels.cityNameInput.value = '';
  coordinates = '';
});

window.onload = getLocation()


// &=========================> Functions <=======================& //

async function getCoordinatesByCity(city) {
  try {
    const response = await fetch(
      `${weatherVariabels.baseUrl}?key=${weatherVariabels.apiKey}&q=${city}&days=${weatherVariabels.numberOfDays}&aqi=no&alerts=no`
    );
    data = await response.json();
    coordinates = `${data?.location.lat},${data?.location.lon}`
    getWeather(cityName, coordinates);
  } catch (error) {
    console.log(error);
  }
}

async function getUserCountry() {
  try {
    let response = await fetch(`http://ip-api.com/json/`)
    locationData = await response.json()
    coordinates = `${locationData.lat},${locationData.lon}`;
    city = locationData.city
    getWeather(city, coordinates)
  } catch (error) {
    console.log(error);
  }
}
function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      () => {
        getUserCountry()
      },
      (error) => {
        if (error.code === error.PERMISSION_DENIED) {
          getWeather('tokyo', '35.6764, 139.6500')
        } else {
          console.log("An error occurred:", error.message);
        }
      }
    );
  } else {
    alert("Geolocation is not supported by this browser")
  }
};

async function getWeather(city = "tokyo", coordinates = ('35.6764,139.6500')) {
  try {
    const response = await fetch(
      `${weatherVariabels.baseUrl}?key=${weatherVariabels.apiKey}&q=${coordinates}&days=${weatherVariabels.numberOfDays}&aqi=no&alerts=no`
    );
    data = await response.json();
    getFullDayWeather();
    getCityBg(city);
    reset();
  } catch (error) {
    console.log(error);
  }
}

async function getCityBg(city = "tokyo") {
  try {
    const bgResponse = await fetch(
      `${bgVariabels.baseUrl}?client_id=${bgVariabels.apiKey
      }&orientation=landscape&query=$${getTimeOfDay()} nature views`
    );
    bgData = await bgResponse.json();
    setBg(".main-content");
  } catch (error) {
    console.log(error);
  }
}

function getFullDayWeather() {
  let slideContainer = ``;
  let nextDay = false;
  for (let i = 0; i < weatherVariabels.numberOfDays; i++) {
    slideContainer += `
<div
  class="container-fluid section-container position-relative z-1 d-flex flex-column justify-content-between align-items-between gap-5 mt-5 mx-0"
>
  <div id="mainContent" class="main-content row align-items-center gy-3 px-0 py-4 p-md-5">
    <div class="col-12 col-md-6 position-relative z-1">
      <div>
        <div class="row">
          <div class="col-12">
            <div class="text-center">
              <p id="cityName" class="city-name text-capitalize mb-0">
                ${data?.location.name}
              </p>
              <p class="country-name text-capitalize fw-normal mb-0 mt-0">
                ${data?.location.country}
              </p>
            </div>
          </div>

          <div class="col-12">
            <div class="date-container text-center mt-4">
              <span id="date" class="date"
                >${moment(data?.forecast?.forecastday[i].date)
        .add(0, "days")
        .format("dddd, D MMMM yyyy")}</span
              >
            </div>
          </div>

          <div class="col-12">
            <div class="time-container text-center mb-4">
              <p id="time" class="d-none time">
                ${moment(data?.location.localtime).format("LT")}
              </p>
            </div>
          </div>
          <div class="col-12 col-xl-10 col-xxl-8 mx-auto">
            <div>
              <div class="row day-weather-info rounded-4 mx-auto">
                <div class="col-6 p-2">
                  <div
                    class="humidity-container d-flex align-items-center gap-4 py-0 info"
                  >
                    <img src="svg/humidity.svg" alt="" />
                    <div>
                      <h3 class="sub-heading">Humidity</h3>
                      <div id="humidity" class="result">
                        ${data?.forecast.forecastday[i].day.avghumidity} %
                      </div>
                    </div>
                  </div>
                </div>
                <div class="col-6 p-2">
                  <div
                    class="visibility-container d-flex align-items-center gap-4 py-0 info"
                  >
                    <img src="svg/vis2.svg" alt="" />
                    <div>
                      <h3 class="sub-heading">Visibility</h3>
                      <div id="visibility" class="result">
                        ${data?.forecast.forecastday[i].day.avgvis_km} km
                      </div>
                    </div>
                  </div>
                </div>

                <div class="col-6 p-2">
                  <div
                    class="rain-container d-flex align-items-center gap-4 py-0 info"
                  >
                    <img src="svg/rain.svg" alt="" />
                    <div>
                      <h3 class="sub-heading">Chance of Rain</h3>
                      <div id="chanceOfRain" class="result">
                        ${data?.forecast.forecastday[i].day.daily_chance_of_rain}
                        %
                      </div>
                    </div>
                  </div>
                </div>

                <div class="col-6 p-2">
                  <div
                    class="wind-speed-container d-flex align-items-center gap-4 py-0 info"
                  >
                    <img src="svg/wind-speed.svg" alt="" />
                    <div>
                      <h3 class="sub-heading">Wind Speed</h3>
                      <div id="windSpeed" class="result">
                        ${data?.forecast.forecastday[i].day.maxwind_mph} mph
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div
      id="mainCard"
      class="col-8 col-md-4 col-lg-3 col-xxl-2 item d-flex flex-column justify-content-center gap-3 mx-auto px-3 pb-4 pt-0"
    >
      <div class="d-flex justify-content-between align-items-center">
        <div class="d-flex justify-content-start align-items-center ms-2">
          <p class="each-day text-start fw-lighter mb-0">
            ${moment(data?.forecast.forecastday[i].hour[i].time).format("dddd")}
          </p>
        </div>
      </div>
      <p id="temperature" class="temperature fw-bold align-self-center">
        ${Math.ceil(data?.forecast.forecastday[i].hour[i].temp_c)}${" °C"}
      </p>
      
      <div class="d-flex justify-content-center align-items-center gap-3"> 
        <p class="fs-3 text-capitalize text-center m-0">
        ${data?.forecast.forecastday[i].day.maxtemp_c} °C
      </p>
      <span class="">-</span>
      <p class="fs-3 text-capitalize text-center m-0">
        ${data?.forecast.forecastday[i].day.mintemp_c} °C
      </p>
      </div>
      
    </div>
  </div>
  <div id="allHourDataContainer" class="each-hour-carousel owl-carousel mt-5">
    ${getAllHoursTemp(i)}
  </div>
</div>

`;

    if (i > 0) {
      nextDay = true;
    } else {
      nextDay = false;
    }
  }

  htmlVariabels.dayInfoContainer.innerHTML = slideContainer;
  getAllDaysCarousel();
  getAllHoursCarousel();

  if (nextDay == true) {
    htmlVariabels.time.classList.remove("d-none");
  }
}

function getAllDaysCarousel() {
  htmlVariabels.date = document.getElementById("date");
  htmlVariabels.time = document.getElementById("time");

  $(".full-page-slide").owlCarousel({
    loop: false,
    margin: 10,
    nav: true,
    dots: false,
    mouseDrag: false,
    touchDrag: false,
    items: weatherVariabels.numberOfDays,
    responsive: {
      0: {
        items: 1,
      },
      600: {
        items: 1,
      },
      1000: {
        items: 1,
      },
    },
  });
  document.querySelector(
    '.full-page-slide > .owl-nav > .owl-next > [aria-label="Next"]'
  ).innerHTML = "Next Day";
  document.querySelector(
    '.full-page-slide > .owl-nav > .owl-prev > [aria-label="Previous"]'
  ).innerHTML = "Prev Day";
}

function getAllHoursCarousel() {
  var startIndex = $(".each-hour-carousel .active-hour").index();
  $(".each-hour-carousel").owlCarousel({
    loop: false,
    margin: 10,
    responsiveClass: true,
    startPosition: startIndex,
    dots: false,
    responsive: {
      0: {
        items: 1,
        nav: false,
      },
      768: {
        items: 3,
        nav: true,
      },
      1200: {
        items: 4,
        nav: true,
      },
      1400: {
        items: 5,
        nav: true,
      },
    },
  });
}

function getAllHoursTemp(index) {
  let currentTime = ``;
  let allDayData = ``;

  for (let i = 0; i < 24; i++) {
    if (
      getEachHour(data.forecast.forecastday[index].hour[i].time) ==
      getEachHour(data.location.localtime)
    ) {
      currentTime = `active-hour`;
    } else {
      currentTime = ``;
    }
    allDayData += `
      <div
  id="slideItem"
  class="item d-flex flex-column justify-content-center gap-3 ${currentTime} px-3"
>
  <div class="d-flex justify-content-between align-items-center">
    <div class="d-flex justify-content-start align-items-center gap-2">
      <p class="each-day text-start fw-lighter mb-0">
        ${moment(data.forecast.forecastday[index].hour[i].time).format("ddd")}
      </p>
      <p class="each-hour text-start fw-lighter mb-0">
        ${getEachHour(data.forecast.forecastday[index].hour[i].time)}
      </p>
    </div>
  </div>
  <p id="hourTemp" class="fw-bold mt-3 align-self-center">
    ${Math.ceil(data.forecast.forecastday[index].hour[i].temp_c)}${" °C"}
  </p>

  <div class="d-flex justify-content-center align-items-center gap-3">
    <div class="d-flex align-items-center gap-3">
      <img class="hourly-wind-img" src="svg/wind-speed.svg" alt="" />
      <p class="hourly-results m-0">
        ${data.forecast.forecastday[index].day.maxwind_mph} mph
      </p>
    </div>
    <div class="d-flex align-items-center gap-3">
        <img class="hourly-rain-img" src="svg/rain.svg" alt="" />
        <p class="hourly-results m-0">
          ${data.forecast.forecastday[index].day.daily_chance_of_rain} %
        </p>
    </div>
  </div>
  <p class="hourly-condition text-capitalize text-center">
    ${data.forecast.forecastday[index].day.condition.text}
  </p>
</div>

    `;
  }
  return allDayData;
}

function getEachHour(date) {
  const d = new Date(date);

  return d.toLocaleString([], {
    hour: "2-digit",
  });
}

function getTimeOfDay() {
  let hour = moment(data.location.localtime).format("H");
  if (hour >= 5 && hour < 12) {
    return "Morning";
  } else if (hour === 12) {
    return "Noon";
  } else if (hour > 12 && hour < 17) {
    return "Afternoon";
  } else {
    return "Night";
  }
}

function setBg(className) {
  document.querySelectorAll(className).forEach((el) => {
    el.style.backgroundImage = `url(${bgData.urls.full})`;
    el.style.backgroundRepeat = "no-repeat";
    el.style.backgroundPosition = "center";
    el.style.backgroundSize = "cover";
  });
}

function reset() {
  cityNameInput.value = null;
}
