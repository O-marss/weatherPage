let data;

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

let date;
let time;

let allDayDataContainer;
let slideItem;

async function getWeather() {
  try {
    let response = await fetch(
      "https://api.weatherapi.com/v1/forecast.json?key=fce8cbf1c3744e6f8bd22436240212&q=makkah&days=3"
    );
    data = await response.json();
    console.log(data);
    getFullDayWeather();
  } catch (error) {
    console.log(error);
  }
}

function getEachHour(date) {
  const d = new Date(date);

  return d.toLocaleString([], {
    hour: "2-digit",
  });
}

let dayInfoContainer = document.getElementById("dayInfoContainer");

function getFullDayWeather() {
  let slideContainer = ``;
  let nextDay = false;
  let dayCounter = 0;
  for (let i = 0; i < 3; i++) {
    slideContainer += `
    <div class="container header-container position-relative z-1 h-auto d-flex flex-column justify-content-center align-items-center ">
        <div  class="row">
        <div class="row col-12 col-md-6">
         <div class="col-12">
          <div class=" text-center">
            <div
              class="temp-container d-flex align-items-center justify-content-center mt-5"
            >
              <span
                id="temperature"
                class="temperature text-capitalize fa-4x fw-bold"
              >${data.forecast.forecastday[i].day.avgtemp_c}</span
              ><span class="text-capitalize fa-5x fw-bold mb-0 ms-3"
                ><img src="svg/celsius(1).svg" alt="" class="align-middle"
              /></span>
            </div>
          </div>
        </div>

        <div class="col-12">
          <div class="weather-condition text-center">
            <p id="weatherCondition" class="text-capitalize">${
              data.forecast.forecastday[i].day.condition.text
            }</p>
          </div>
        </div>

        <div class="col-12">
          <div class="city text-center">
            <p id="cityName" class="city-name text-capitalize mb-0">${
              data.location.name
            }</p>
            <p class="country-name text-capitalize fw-normal mb-0 mt-0">${
              data.location.country
            }</p>
          </div>
        </div>

        <div class="col-12">
          <div class="date-container text-center mt-4">
            <span id="date" class="date">${moment(
              data.forecast.forecastday[i].date
            )
              .add(0, "days")
              .format("dddd, D MMMM yyyy")}</span>
          </div>
        </div>

        <div class="col-12">
          <div class="time-container text-center">
            <p id="time" class="d-none time">${moment(
              data.location.localtime
            ).format("LT")}</p>
          </div>
        </div>
      </div>
        <div class="row py-5 col-12 col-md-6">
          <div class="col-6  d-flex align-items-center justify-content-between">
            <div class="humidity-container d-flex align-items-center gap-4 py-3 py-md-0">
              <img src="svg/humidity.svg" alt="" />
              <div>
                <h3 class="sub-heading">Humidity</h3>
                <div id="humidity" class="result">${
                  data.forecast.forecastday[i].day.avghumidity
                } %</div>
              </div>
            </div>
        </div>

        <div class="col-6  d-flex align-items-center justify-content-between">
          <div class="visibility-container d-flex align-items-center gap-4 py-3 py-md-0">
            <img src="svg/vis2.svg" alt="" />
            <div>
              <h3 class="sub-heading">Visibility</h3>
              <div id="visibility" class="result">${
                data.forecast.forecastday[i].day.avgvis_km
              } km</div>
            </div>
          </div>
        </div>

        <div class="col-6  d-flex align-items-center justify-content-between">
          <div class="rain-container d-flex align-items-center gap-4 py-3 py-md-0">
            <img src="svg/rain.svg" alt="" />
            <div>
              <h3 class="sub-heading">Chance of Rain</h3>
              <div id="chanceOfRain" class="result">${
                data.forecast.forecastday[i].day.daily_chance_of_rain
              } %</div>
            </div>
          </div>
        </div>

        <div class="col-6  d-flex align-items-center justify-content-between">
          <div class="wind-speed-container d-flex align-items-center gap-4 py-3 py-md-0">
            <img src="svg/wind-speed.svg" alt="" />
            <div>
              <h3 class="sub-heading">Wind Speed</h3>
              <div id="windSpeed" class="result">${
                data.forecast.forecastday[i].day.maxwind_mph
              } mph</div>
            </div>
          </div>
      </div>
      </div>
      </div>

        <div id="allDayDataContainer" class="owl-carousel mt-5 pe-md-5">${getAllDayTemp(
          i
        )}</div>
        </div>
`;

    if (i > 0) {
      nextDay = true;
    } else {
      nextDay = false;
    }
  }

  dayInfoContainer.innerHTML = slideContainer;
  date = document.getElementById("date");
  time = document.getElementById("time");

  $(".full-page-slide").owlCarousel({
    loop: false,
    margin: 10,
    nav: true,
    mouseDrag: false,
    touchDrag: false,
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

  $(".full-page-slide").owlCarousel({
    loop: true,
    margin: 10,
    nav: true,
    responsive: {
      0: {
        items: 1,
      },
      600: {
        items: 3,
      },
      1000: {
        items: 5,
      },
    },
  });
  $(".owl-carousel").owlCarousel({
    loop: true,
    margin: 20,
    responsiveClass: true,
    dots: false,
    responsive: {
      0: {
        items: 1,
        nav: true,
      },
      600: {
        items: 3,
        nav: false,
      },
      1000: {
        items: 5,
        nav: true,
        loop: false,
      },
    },
  });

  if (nextDay == true) {
    time.classList.remove("d-none");
  }
}

let currentTime = ``;

function getAllDayTemp(index) {
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
        <div id="slideItem" class="item d-flex flex-column justify-content-center align-items-center ${currentTime}">
          <div>  
                <p class="day-time fs-6 w-100 text-start fw-lighter">${getEachHour(
                  data.forecast.forecastday[index].hour[i].time
                )}</p>
                <p id="dayTemp" class="fw-bold mt-3">${
                  data.forecast.forecastday[index].hour[i].temp_c
                }${" °C"}</p>
                <img id="dayCondition" src=${
                  data.forecast.forecastday[index].hour[i].condition.icon
                }>
            </div>
        </div>
    `;
  }
  return allDayData;
}

getWeather();
