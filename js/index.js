//!
let data;
let bgData;

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
  date: ``,
  time: ``,
  dayInfoContainer: document.getElementById("dayInfoContainer"),
  cityNameInput: document.getElementById("cityNameInput"),
  search: document.getElementById("search"),
};

let weatherVariabels = {
  apiKey: "fce8cbf1c3744e6f8bd22436240212",
  baseUrl: "https://api.weatherapi.com/v1/forecast.json",
  numberOfDays: 7,
};

let bgVariabels = {
  apiKey: "5s9IIt9eJCnJ8pjKgMjoApcuZ6SvP5IH3NlT92CIHn0",
  baseUrl: "https://api.unsplash.com/search/photos",
};

async function getCityBg() {
  try {
    const bgResponse = await fetch(
      `${bgVariabels.baseUrl}?client_id=${
        bgVariabels.apiKey
      }&orientation=landscape&query=${getTimeOfDay()}`
    );
    bgData = await bgResponse.json();
    setBg();
  } catch (error) {
    console.log(error);
  }
}

function setBg() {
  let randomNum = Math.floor(Math.random() * 10);
  document.body.style.backgroundImage = `url(${bgData.results[randomNum].urls.full})`;
}

// ^=========================> Events <=======================& //
window.onload = getWeather();

htmlVariabels.search.addEventListener("click", function (e) {
  $(".owl-carousel").trigger("destroy.owl.carousel");
  getWeather(htmlVariabels.cityNameInput.value);
  e.stopPropagation();
  e.preventDefault();
});

// &=========================> Functions <=======================& //
async function getWeather(city = "cairo") {
  try {
    const response = await fetch(
      `${weatherVariabels.baseUrl}?key=${weatherVariabels.apiKey}&q=${city}&days=${weatherVariabels.numberOfDays}&aqi=no&alerts=no`
    );
    data = await response.json();
    getFullDayWeather();
    getCityBg();
    reset();
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
  class="container-fluid header-container position-relative z-1 d-flex flex-column justify-content-between align-items-between gap-5"
>
  <div class="row align-items-center">
    <div class="col-12 col-md-6 col-xl-5 col-xxl-6">
      <div>
        <div class="row">
          <div class="col-12">
            <div class="text-center">
              <div
                class="temp-container d-flex align-items-center justify-content-center mt-5"
              >
                <span
                  id="temperature"
                  class="temperature text-capitalize fa-4x fw-bold"
                  >${data.forecast.forecastday[i].day.avgtemp_c} °C</span
                >
              </div>
            </div>
          </div>

          <div class="col-12">
            <div class="weather-condition text-center">
              <p id="weatherCondition" class="text-capitalize">
                ${data.forecast.forecastday[i].day.condition.text}
              </p>
            </div>
          </div>

          <div class="col-12">
            <div class="city text-center">
              <p id="cityName" class="city-name text-capitalize mb-0">
                ${data.location.name}
              </p>
              <p class="country-name text-capitalize fw-normal mb-0 mt-0">
                ${data.location.country}
              </p>
            </div>
          </div>

          <div class="col-12">
            <div class="date-container text-center mt-4">
              <span id="date" class="date"
                >${moment(data.forecast.forecastday[i].date)
                  .add(0, "days")
                  .format("dddd, D MMMM yyyy")}</span
              >
            </div>
          </div>

          <div class="col-12">
            <div class="time-container text-center">
              <p id="time" class="d-none time">
                ${moment(data.location.localtime).format("LT")}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="col-12 col-md-6 p-xxl-5 mt-3 mt-md-0 col-xl-7 col-xxl-6">
      <div class="p-xxl-5">
        <div class="row gy-4 gy-xxl-0 day-weather-info rounded-4 p-xl-4 p-xxl-5 mx-auto">
          <div class="col-6 p-xxl-4">
            <div
              class="humidity-container d-flex align-items-center gap-4 py-0   info"
            >
              <img src="svg/humidity.svg" alt="" />
              <div>
                <h3 class="sub-heading">Humidity</h3>
                <div id="humidity" class="result">
                  ${data.forecast.forecastday[i].day.avghumidity} %
                </div>
              </div>
            </div>
          </div>

          <div class="col-6 p-xxl-4">
            <div
              class="visibility-container d-flex align-items-center gap-4 py-0  info"
            >
              <img src="svg/vis2.svg" alt="" />
              <div>
                <h3 class="sub-heading">Visibility</h3>
                <div id="visibility" class="result">
                  ${data.forecast.forecastday[i].day.avgvis_km} km
                </div>
              </div>
            </div>
          </div>

          <div class="col-6 p-xxl-4">
            <div
              class="rain-container d-flex align-items-center gap-4 py-0  info"
            >
              <img src="svg/rain.svg" alt="" />
              <div>
                <h3 class="sub-heading">Chance of Rain</h3>
                <div id="chanceOfRain" class="result">
                  ${data.forecast.forecastday[i].day.daily_chance_of_rain} %
                </div>
              </div>
            </div>
          </div>

          <div class="col-6 p-xxl-4">
            <div
              class="wind-speed-container d-flex align-items-center gap-4 py-0  info"
            >
              <img src="svg/wind-speed.svg" alt="" />
              <div>
                <h3 class="sub-heading">Wind Speed</h3>
                <div id="windSpeed" class="result">
                  ${data.forecast.forecastday[i].day.maxwind_mph} mph
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div
    id="allDayDataContainer"
    class="each-hour-carousel owl-carousel mt-5 "
  >
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

  $("#dayInfoContainer").owlCarousel({
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
        items: 2,
        nav: false,
      },
      768: {
        items: 4,
        nav: true,
      },
      1200: {
        items: 6,
        nav: true,
      },
    },
  });
}

let currentTime = ``;
function getAllHoursTemp(index) {
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
        <div id="slideItem" class="item d-flex flex-column justify-content-center gap-3  ${currentTime}">

          <div class="d-flex justify-content-between align-items-center">
              <p class="each-hour text-start fw-lighter mb-0">${getEachHour(
                data.forecast.forecastday[index].hour[i].time
              )}</p>
          </div>
           <img id="hourCondition" class="align-self-center pe-2" src=${
             data.forecast.forecastday[index].hour[i].condition.icon
           }>
          <p id="hourTemp" class="fw-bold mt-3 align-self-center">${
            data.forecast.forecastday[index].hour[i].temp_c
          }${" °C"}</p>
              
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

function reset() {
  cityNameInput.value = null;
}
