let formattedTime = "";
let cityname = "";
let c = 0;
let tempmin;
let tempmax;
let cou = 0;
let cou1 = 0;
let sunrise;
let sunset;
let tsunrise;
let cur;
let rise;
let set;
let trise;
const weathercard = document.querySelector(".card");
const currentweather = document.querySelector(".current");
var span = document.getElementById("locbut");
var sunbox = document.getElementById("3rdbox");
var content = document.getElementById("content");
var fpage = document.getElementById("fpage");
var searchicon = document.getElementById("searchicon");
searchicon.addEventListener("click", function () {
      span.classList.remove("text-[red]");
      const elements = document.querySelectorAll(".fadeanimation");
      elements.forEach((element) => {
            element.classList.remove("fade-in");
      });
      getlocation();
});
mylocation();
span.addEventListener("click", mylocation);
function mylocation() {
      span.classList.add("text-[red]");
      navigator.geolocation.getCurrentPosition(
            (position) => {
                  const { latitude, longitude } = position.coords;
                  const REVERSE_GEOCODING_URL = `http://api.openweathermap.org/geo/1.0/reverse?lat=${latitude}&lon=${longitude}&limit=1&appid=${API_KEY}`;
                  fetch(REVERSE_GEOCODING_URL)
                        .then((res) => res.json())
                        .then((data) => {
                              console.log(data);
                              const { name } = data[0];
                              cityname = name.trim();
                              getWeatherDetails(name, latitude, longitude);
                        })
                        .catch(() => {
                              alert(
                                    "An error occurred while fetching the city"
                              );
                        });
            },
            (error) => {
                  if (error.code === error.PERMISSION_DENIED)
                        alert(
                              "Location permission denied. Please grant access"
                        );
            }
      );
}
function convertToDate(dateInput, index) {
      const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
      if (!dateRegex.test(dateInput)) {
            console.error(
                  "Please enter a valid date in the format yyyy-mm-dd."
            );
            return null;
      }
      const selectedDate = new Date(dateInput);
      if (index === 0) {
            const dayOfWeek = selectedDate.getDay();
            const daysOfWeek = [
                  "Sun",
                  "Mon",
                  "Tue",
                  "Wed",
                  "Thr",
                  "Fri",
                  "Sat",
            ];
            const date = selectedDate.getDate();
            const months = [
                  "Jan",
                  "Feb",
                  "Mar",
                  "Apr",
                  "May",
                  "June",
                  "July",
                  "Aug",
                  "Sept",
                  "Oct",
                  "Nov",
                  "Dec",
            ];
            const month = selectedDate.getMonth();
            return `${daysOfWeek[dayOfWeek]},${months[month]} ${date}`;
      } else {
            const dayOfWeek = selectedDate.getDay();
            const daysOfWeek = [
                  "Sunday",
                  "Monday",
                  "Tuesday",
                  "Wednesday",
                  "Thursday",
                  "Friday",
                  "Saturday",
            ];
            return `${daysOfWeek[dayOfWeek]}`;
      }
}

const API_KEY = "811cbc5e69f7da32d785f312380a4be0";
let textInput = document.getElementById("textInput");
textInput.addEventListener("keypress", function (event) {
      if (event.keyCode === 13 || flag != 0) {
            span.classList.remove("text-[red]");
            const elements = document.querySelectorAll(".fadeanimation");
            elements.forEach((element) => {
                  element.classList.remove("fade-in");
            });
            getlocation();
      }
});

function getlocation() {
      cityname = textInput.value.trim();
      console.log(cityname);
      if (!cityname) return;
      adjustcitylength();
      const GEOCODING_API_URL = `http://api.openweathermap.org/geo/1.0/direct?q=${cityname}&limit=1&appid=${API_KEY}`;
      fetch(GEOCODING_API_URL)
            .then((res) => res.json())
            .then((data) => {
                  console.log(data);
                  if (!data.length) return (alert = "CITY NOT FOUND");
                  const { name, lat, lon } = data[0];
                  getWeatherDetails(name, lat, lon);
            })
            .catch(() => {
                  alert("An error occurred while fetching the API");
            });
}

function changeVideo() {
      var video1 = document.getElementById("video-background1");
      var video2 = document.getElementById("video-background2");
      let videos = [
            "fewclouds.mp4",
            "rain.mp4",
            "clearsky.mp4",
            "overcast.mp4",
            "fewclouds_night.mp4",
            "nightrain.mp4",
            "clearsky_night.mp4",
            "nightovercast.mp4",
            "snowfall.mp4",
      ];
      if (video1.classList.contains("hide")) {
            // Toggle to video1
            video1.src = videos[c - 1];
            video2.classList.add("hide");
            video2.classList.remove("bg");
            video1.classList.remove("hide");
            video1.classList.add("bg");
            document.body.classList.add("transition-enabled");
      } else {
            // Toggle to video2
            video2.src = videos[c - 1];
            video1.classList.remove("bg");
            video2.classList.add("bg");
            video2.classList.remove("hide");
            video1.classList.add("hide");
            document.body.classList.add("transition-enabled");
      }
}

function fadeOutAndComeBack() {
      const textContainers = document.querySelectorAll(".text-transition");
      // Fade out over 2 seconds for each element
      textContainers.forEach(function (container) {
            container.style.opacity = 0;
      });

      // After a delay of 2 seconds, come back by resetting the opacity for each element
      setTimeout(function () {
            textContainers.forEach(function (container) {
                  container.style.opacity = 1;
            });
      }, 200);
}

function adjustcitylength() {
      let l = cityname.length;
      let city = document.getElementById("city");
      if (l > 12) {
            if (l > 20) {
                  city.classList.remove("pb-20");
                  city.classList.remove("lg:pb-10");
                  city.classList.remove("md:pb-10");
                  city.classList.remove("sm:pb-10");
            } else {
                  city.classList.remove("pb-20");
                  city.classList.add("pb-14");
            }
      }
}

function uvindex(lat, weatherItem) {
      let uv = document.getElementById("uv");
      let uvdes = document.getElementById("uvdes");
      if (cur >= set || cur <= trise) {
            uv.innerText = 0;
            uvdes.innerText = "very low";
      } else if (
            weatherItem.weather[0].main === "Clouds" ||
            weatherItem.weather[0].main === "Rain" ||
            weatherItem.weather[0].main === "Snow"
      ) {
            uv.innerText = 0;
            uvdes.innerText = "very low";
      } else if (weatherItem.weather[0].description == "few clouds") {
            uv.innerText = 1;
            uvdes.innerText = "low";
      } else if (lat >= -10 && lat <= 10) {
            uv.innerText = 8;
            uvdes.innerText = "very high";
      } else if ((lat > 10 && lat <= 22) || (lat < -10 && lat >= -22)) {
            uv.innerText = 4;
            uvdes.innerText = "high";
      } else if ((lat > 22 && lat <= 40) || (lat < -22 && lat >= -40)) {
            uv.innerText = 3;
            uvdes.innerText = "moderate";
      } else if ((lat > 40 && lat <= 60) || (lat < -40 && lat >= -60)) {
            uv.innerText = 1;
            uvdes.innerText = "low";
      } else {
            uv.innerText = 0;
            uvdes.innerText = "very low";
      }
}

function humidlevel(weatherItem) {
      let k = weatherItem.main.humidity;
      let level = document.getElementById("bdes1");
      if (k < 20) {
            level.innerText = "Too dry";
      } else if (k >= 20 && k < 40) {
            level.innerText = "Dry";
      } else if (k >= 40 && k < 60) {
            level.innerText = "Moderate";
      } else if (k >= 60 && k < 80) {
            level.innerText = "Wet";
      } else {
            level.innerText = "Too wet";
      }
}

function convertToHours(timeString) {
      const timeArray = timeString.split(" ");
      const timeParts = timeArray[0].split(":");
      const period = timeArray[1];

      let hours = parseInt(timeParts[0]);
      const minutes = parseInt(timeParts[1]);
      const seconds = parseInt(timeParts[2]);

      if (period === "PM" && hours !== 12) {
            hours += 12;
      } else if (period === "AM" && hours === 12) {
            hours = 0;
      }

      const totalHours = hours + minutes / 60 + seconds / 3600;

      return totalHours;
}

async function getWeatherDetails(name, lat, lon) {
      const createWeatherCard = (weatherItem, index) => {
            const dt = weatherItem.dt_txt.split(" ")[0];
            const re = convertToDate(dt, index);
            if (index === 0) {
                  let inputString = weatherItem.weather[0].main;
                  let inputString1 = weatherItem.weather[0].description;
                  console.log(inputString);

                  if (formattedTime.substring(0, 2) == 24) {
                        formattedTime = "00" + formattedTime.substring(2);
                  }

                  let tem = (weatherItem.main.temp - 273.15).toFixed(0);
                  if (tem === "-0") {
                        tem = "0";
                  }
                  if (cur >= set || cur <= trise) {
                        document.body.classList.remove("text-black");
                        document.body.classList.add("text-white");
                        if (inputString1 === "few clouds") {
                              c = 5;
                        } else if (inputString === "Rain") {
                              c = 6;
                        } else if (inputString === "Clear") {
                              c = 7;
                        } else if (inputString === "Clouds") {
                              c = 8;
                        } else {
                              c = 9;
                        }
                  } else {
                        document.body.classList.remove("text-white");
                        document.body.classList.add("text-black");
                        if (inputString1 === "few clouds") {
                              c = 1;
                        } else if (inputString === "Rain") {
                              c = 2;
                        } else if (inputString === "Clear") {
                              c = 3;
                        } else if (inputString === "Clouds") {
                              c = 4;
                        } else {
                              c = 9;
                        }
                  }
                  changeVideo();

                  tempmin = parseInt(tempmin);
                  tempmax = parseInt(tempmax);
                  if (tem <= tempmin) {
                        let min = document.getElementById("min");
                        min.innerHTML = tem;
                  } else {
                        let min = document.getElementById("min");
                        min.innerHTML = tempmin;
                  }
                  if (tem >= tempmax) {
                        let max = document.getElementById("max");
                        max.innerHTML = tem;
                  } else {
                        let max = document.getElementById("max");
                        max.innerHTML = tempmax;
                  }

                  let feels = document.getElementById("feels");
                  feels.innerText = (
                        weatherItem.main.feels_like - 273.15
                  ).toFixed(0);

                  let pre = document.getElementById("pre");
                  pre.innerText = weatherItem.main.pressure;

                  let hum = document.getElementById("hum");
                  hum.innerText = weatherItem.main.humidity;

                  let wspeed = document.getElementById("wspeed");
                  wspeed.innerText = Math.ceil(weatherItem.wind.speed * 3.6);

                  uvindex(lat, weatherItem);
                  humidlevel(weatherItem);

                  return `<div class="flex ml-5">
                              <h1 id="temp" class="text-9xl text-transition">${tem}</h1>
                              <p class="text-3xl md:text-5xl lg:text-5xl font-bold text-transition">o</p>
                          </div>
                        <div class="flex flex-col items-center">
                              <div id="time" class="text-2xl md:text-5xl lg:text-5xl text-transition">
                                    ${formattedTime}
                              </div>
                              <div id="date" class="text-[15px] md:text-2xl lg:text-2xl font-bold text-transition">
                                    ${re}
                              </div>
                        </div>
                        <div class="mr-7 flex flex-col  items-center">
                              <img id="descimg" class="w-24 md:w-32 lg:w-32 h-24 md:h-32 lg:h-32  mt-[-25px] text-transition"
                              src="https://openweathermap.org/img/wn/${
                                    weatherItem.weather[0].icon
                              }@2x.png"
                              alt="a"/>
                              <p id="wdes" class="font-bold break-words text-center leading-tight text-xl md:text-2xl lg:text-2xl mt-[-20px] text-transition">${
                                    weatherItem.weather[0].description
                                          .substring(0, 1)
                                          .toUpperCase() +
                                    weatherItem.weather[0].description.substring(
                                          1
                                    )
                              }</p>
                        </div>`;
            }
            return `<div id="wcard${index}"
                    class="cards font-bold h-32 w-28 rounded-lg  bg-opacity-0-70">
                        <div class="cd flex flex-col justify-center items-center">
                              <p id="day${index}" class="text-sm text-transition">${re}</p>
                              <div class="flex flex-col justify-center items-center">
                                    <img id="img${index}" class="w-14 text-transition" src="https://openweathermap.org/img/wn/${
                  weatherItem.weather[0].icon
            }@2x.png" alt="" />
                                    <p class="text-transition">${
                                          weatherItem.weather[0].main
                                    }</p>
                              </div>
                              <p class="text-transition">${(
                                    weatherItem.main.temp - 273.15
                              ).toFixed(1)}°C</p>
                        </div>
                    </div>`;
      };

      function timecut(timeString) {
            let timeWithoutSeconds = timeString.substring(
                  0,
                  timeString.lastIndexOf(":")
            );
            let ampm = timeString.slice(-2).toLowerCase();
            return (timeWithoutSeconds += " " + ampm);
      }

      try {
            const latitude = lat;
            const longitude = lon;
            const apiKey = "BNAMB6BML8ZH";
            const timestamp = Math.floor(Date.now() / 1000);

            // First API call
            const timeZoneUrl = `http://api.timezonedb.com/v2.1/get-time-zone?key=${apiKey}&format=json&by=position&lat=${latitude}&lng=${longitude}`;
            const timeZoneResponse = await fetch(timeZoneUrl);
            const timeZoneData = await timeZoneResponse.json();

            if (timeZoneData.status === "OK") {
                  const offsetInSeconds = timeZoneData.gmtOffset;
                  const localTime = new Date(
                        timestamp * 1000 + offsetInSeconds * 1000
                  );
                  localTime.setHours(localTime.getHours() - 5);
                  localTime.setMinutes(localTime.getMinutes() - 30);
                  formattedTime = localTime.toLocaleTimeString("en-US", {
                        hour12: false,
                        hour: "2-digit",
                        minute: "2-digit",
                  });
            } else {
                  console.error(
                        "Failed to get time zone data:",
                        timeZoneData.message
                  );
            }

            //Second API call
            const apiUrl = `https://api.sunrisesunset.io/json?lat=${latitude}&lng=${longitude}&formatted=0`;
            try {
                  const response = await fetch(apiUrl);
                  const data = await response.json();

                  if (data.status === "OK") {
                        console.log(data);
                        sunrise = data.results.sunrise;
                        sunset = data.results.sunset;
                        console.log(`Sunrise: ${sunrise}\nSunset: ${sunset}`);
                        let srise = document.getElementById("sunrise");
                        srise.innerText = timecut(sunrise);
                        let sset = document.getElementById("sunset");
                        sset.innerText = timecut(sunset);
                        let dawn = document.getElementById("dawn");
                        dawn.innerText = timecut(data.results.dawn);
                        let dusk = document.getElementById("dusk");
                        dusk.innerText = timecut(data.results.dusk);
                        let noon = document.getElementById("noon");
                        noon.innerText = timecut(data.results.solar_noon);
                        let length = document.getElementById("length");
                        length.innerText =
                              data.results.day_length.substring(
                                    0,
                                    data.results.day_length.indexOf(":")
                              ) +
                              "h " +
                              data.results.day_length.substring(
                                    data.results.day_length.indexOf(":") + 1,
                                    data.results.day_length.lastIndexOf(":")
                              ) +
                              "m";
                  } else {
                        console.error(
                              `Error: ${data.status} - ${data.message}`
                        );
                  }
            } catch (error) {
                  console.error(`An error occurred: ${error}`);
            }
            //tomorrow sunrise time
            const apiUrl1 = `https://api.sunrisesunset.io/json?lat=${latitude}&lng=${longitude}&tomorrow&formatted=0`;
            try {
                  const response = await fetch(apiUrl);
                  const data = await response.json();
                  if (data.status === "OK") {
                        tsunrise = data.results.sunrise;
                  } else {
                        console.error(
                              `Error: ${data.status} - ${data.message}`
                        );
                  }
            } catch (error) {
                  console.error(`An error occurred: ${error}`);
            }
            let sun = document.getElementById("sun");
            let moon = document.getElementById("moon");
            rise = convertToHours(sunrise);
            set = convertToHours(sunset);
            trise = convertToHours(tsunrise);
            let limit = set - rise;
            let tlimit = trise + 24 - set;
            let timearr = formattedTime.split(":");
            let h = parseInt(timearr[0]);
            let m = parseInt(timearr[1]);
            cur = h + m / 60;
            let deg = 134;
            let fin, fin1;
            if (cur >= rise && cur <= set) {
                  let bar = deg / limit;
                  let pos = bar * (cur - rise) + 23;
                  sun.classList.remove(fin);
                  fin = "rotate-[" + pos + "deg]";

                  sun.classList.add(fin);
            } else if (cur > set) {
                  let bar = deg / tlimit;
                  let pos = bar * (cur - set) + 203;
                  sun.classList.remove(fin);
                  moon.classList.remove(fin1);
                  fin = "rotate-[" + pos + "deg]";
                  fin1 = "rotate-[" + -pos + "deg]";
                  sun.classList.add(fin);
                  moon.classList.add(fin1);
            } else {
                  cur = cur + 24;
                  let bar = deg / tlimit;
                  let pos = bar * (cur - set) + 203;
                  sun.classList.remove(fin);
                  moon.classList.remove(fin1);
                  fin = "rotate-[" + pos + "deg]";
                  fin1 = "rotate-[" + -pos + "deg]";
                  sun.classList.add(fin);
                  moon.classList.add(fin1);
            }

            // Third API call
            const weatherUrl = `http://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${API_KEY}`;
            const weatherResponse = await fetch(weatherUrl);
            const weatherData = await weatherResponse.json();

            let uniqueForecastDays = [];
            let firstForecastDateTime = null;

            cou = 0;
            cou1 = 0;
            max.innerHTML = "";
            min.innerHTML = "";

            const fiveDaysForecast = weatherData.list.filter((forecast) => {
                  const forecastDateTime = new Date(forecast.dt_txt);
                  //temparr to store max and min temp;
                  if (forecastDateTime.getHours() === 3 && cou === 0) {
                        tempmin = (forecast.main.temp - 277.15).toFixed(0);

                        cou++;
                  }
                  if (forecastDateTime.getHours() === 15 && cou1 === 0) {
                        tempmax = (forecast.main.temp - 273.15).toFixed(0);

                        cou1++;
                  }
                  //fivedayforecast function
                  if (!firstForecastDateTime) {
                        firstForecastDateTime = forecastDateTime;
                        return true;
                  }
                  if (
                        forecastDateTime.getHours() ===
                              firstForecastDateTime.getHours() &&
                        forecastDateTime.getMinutes() ===
                              firstForecastDateTime.getMinutes()
                  ) {
                        const forecastDate = forecastDateTime.getDate();
                        if (!uniqueForecastDays.includes(forecastDate)) {
                              uniqueForecastDays.push(forecastDate);
                              return true;
                        }
                  }
                  const isLastDay =
                        forecast ===
                        weatherData.list[weatherData.list.length - 1];
                  if (isLastDay) {
                        forecastDateTime.setHours(0, 0, 0, 0);
                  }
                  return isLastDay;
            });

            console.log(fiveDaysForecast);
            weathercard.innerHTML = "";
            currentweather.innerHTML = "";

            fiveDaysForecast.forEach((weatherItem, index) => {
                  if (index === 0) {
                        const city = document.getElementById("city");
                        city.innerText =
                              cityname.substring(0, 1).toUpperCase() +
                              cityname.substring(1);
                        currentweather.insertAdjacentHTML(
                              "beforeend",
                              createWeatherCard(weatherItem, index)
                        );
                  } else {
                        weathercard.insertAdjacentHTML(
                              "beforeend",
                              createWeatherCard(weatherItem, index)
                        );

                        const elements =
                              document.querySelectorAll(".fadeanimation");
                        elements.forEach((element) => {
                              element.classList.add("fade-in");
                        });
                        fadeOutAndComeBack();

                        //select wcards by id
                        let wcard1 = document.getElementById("wcard1");
                        let wcard2 = document.getElementById("wcard2");
                        let wcard3 = document.getElementById("wcard3");
                        let wcard4 = document.getElementById("wcard4");
                        let wcard5 = document.getElementById("wcard5");
                        //store wcards in array
                        let arrwcard = [wcard1, wcard2, wcard3, wcard4, wcard5];
                        //value of c is determined by create weathercard function and it is used to define theme
                        if (c == 1) {
                              //means few clouds
                              let gra = document.getElementById("gra");
                              let gra1 = document.getElementById("gra1");
                              let gra2 = document.getElementById("gra2");
                              let bgc = document.getElementById("suncont1");
                              bgc.style.boxShadow =
                                    "inset 0em 4em 10em #bae6fd";
                              gra2.style.background =
                                    "linear-gradient(#0862c4,transparent)";
                              gra.style.background =
                                    "linear-gradient(#0862c4,transparent)";
                              gra1.style.background =
                                    "linear-gradient(#0862c4,transparent)";
                              var classcard =
                                    document.querySelectorAll(".scards");
                              // Loop through the elements and change the background color
                              classcard.forEach(function (element) {
                                    element.style.background =
                                          "linear-gradient( #0862c4, #bae6fd)";
                              });
                              arrwcard[index - 1].style.background =
                                    "linear-gradient(#0862c4, #bae6fd)";
                        } else if (c == 2) {
                              let gra = document.getElementById("gra");
                              let gra1 = document.getElementById("gra1");
                              let gra2 = document.getElementById("gra2");
                              let bgc = document.getElementById("suncont1");
                              bgc.style.boxShadow =
                                    "inset 0em 4em 10em #acda87";
                              gra2.style.background =
                                    "linear-gradient(#4b7913,transparent)";
                              gra.style.background =
                                    "linear-gradient(#4b7913,transparent)";
                              gra1.style.background =
                                    "linear-gradient(#4b7913,transparent)";
                              var classcard =
                                    document.querySelectorAll(".scards");
                              // Loop through the elements and change the background color
                              classcard.forEach(function (element) {
                                    element.style.background =
                                          "linear-gradient(#4b7913,#acda87)";
                              });
                              arrwcard[index - 1].style.background =
                                    "linear-gradient(#4b7913,#acda87)";
                        } else if (c == 3) {
                              let gra = document.getElementById("gra");
                              let gra1 = document.getElementById("gra1");
                              let gra2 = document.getElementById("gra2");
                              let bgc = document.getElementById("suncont1");
                              bgc.style.boxShadow =
                                    "inset 0em 4em 10em #c6cddf";
                              gra2.style.background =
                                    "linear-gradient(#698bb4,transparent)";
                              gra.style.background =
                                    "linear-gradient(#698bb4,transparent)";
                              gra1.style.background =
                                    "linear-gradient(#698bb4,transparent)";
                              var classcard =
                                    document.querySelectorAll(".scards");
                              // Loop through the elements and change the background color
                              classcard.forEach(function (element) {
                                    element.style.background =
                                          "linear-gradient(#99b5d2,#c6cddf)";
                              });
                              arrwcard[index - 1].style.background =
                                    "linear-gradient(#99b5d2,#c6cddf)";
                        } else if (c == 4) {
                              let gra = document.getElementById("gra");
                              let gra1 = document.getElementById("gra1");
                              let gra2 = document.getElementById("gra2");
                              let bgc = document.getElementById("suncont1");
                              bgc.style.boxShadow =
                                    "inset 0em 4em 10em #d8d8d8";
                              gra2.style.background =
                                    "linear-gradient(#929292,transparent)";
                              gra.style.background =
                                    "linear-gradient(#929292,transparent)";
                              gra1.style.background =
                                    "linear-gradient(#929292,transparent)";
                              var classcard =
                                    document.querySelectorAll(".scards");
                              // Loop through the elements and change the background color
                              classcard.forEach(function (element) {
                                    element.style.background =
                                          "linear-gradient(#929292,#d8d8d8)";
                              });
                              arrwcard[index - 1].style.background =
                                    "linear-gradient(#929292,#d8d8d8)";
                        } else if (c == 5) {
                              let gra = document.getElementById("gra");
                              let gra1 = document.getElementById("gra1");
                              let gra2 = document.getElementById("gra2");
                              let bgc = document.getElementById("suncont1");
                              bgc.style.boxShadow = "0em -2em 4em  grey";
                              gra2.style.background =
                                    "linear-gradient(#1a1a16,transparent)";
                              gra.style.background =
                                    "linear-gradient(#1a1a16,transparent)";
                              gra1.style.background =
                                    "linear-gradient(#1a1a16,transparent)";
                              var classcard =
                                    document.querySelectorAll(".scards");
                              // Loop through the elements and change the background color
                              classcard.forEach(function (element) {
                                    element.style.background =
                                          "linear-gradient(#1a1a16,grey)";
                              });
                              arrwcard[index - 1].style.background =
                                    "linear-gradient(#1a1a16,grey)";
                        } else if (c == 6) {
                              let gra = document.getElementById("gra");
                              let gra1 = document.getElementById("gra1");
                              let gra2 = document.getElementById("gra2");
                              let bgc = document.getElementById("suncont1");
                              bgc.style.boxShadow = "0em -2em 4em  #505b65";
                              gra2.style.background =
                                    "linear-gradient(#1c2424,transparent)";
                              gra.style.background =
                                    "linear-gradient(#1c2424,transparent)";
                              gra1.style.background =
                                    "linear-gradient(#1c2424,transparent)";
                              var classcard =
                                    document.querySelectorAll(".scards");
                              // Loop through the elements and change the background color
                              classcard.forEach(function (element) {
                                    element.style.background =
                                          "linear-gradient(#1c2424,#505b65)";
                              });
                              arrwcard[index - 1].style.background =
                                    "linear-gradient(#1c2424,#505b65)";
                        } else if (c == 7) {
                              let gra = document.getElementById("gra");
                              let gra1 = document.getElementById("gra1");
                              let gra2 = document.getElementById("gra2");
                              let bgc = document.getElementById("suncont1");
                              bgc.style.boxShadow = "0em -2em 4em  #172832";
                              gra2.style.background =
                                    "linear-gradient(#0d1319,transparent)";
                              gra.style.background =
                                    "linear-gradient(#0d1319,transparent)";
                              gra1.style.background =
                                    "linear-gradient(#0d1319,transparent)";
                              var classcard =
                                    document.querySelectorAll(".scards");
                              // Loop through the elements and change the background color
                              classcard.forEach(function (element) {
                                    element.style.background =
                                          "linear-gradient(#0d1319,#172832)";
                              });
                              arrwcard[index - 1].style.background =
                                    "linear-gradient(#0d1319,#172832)";
                        } else if (c == 8) {
                              let gra = document.getElementById("gra");
                              let gra1 = document.getElementById("gra1");
                              let gra2 = document.getElementById("gra2");
                              let bgc = document.getElementById("suncont1");
                              bgc.style.boxShadow = "0em -2em 4em  #334d7f";
                              gra2.style.background =
                                    "linear-gradient(#07143d,transparent)";
                              gra.style.background =
                                    "linear-gradient(#07143d,transparent)";
                              gra1.style.background =
                                    "linear-gradient(#07143d,transparent)";
                              var classcard =
                                    document.querySelectorAll(".scards");
                              // Loop through the elements and change the background color
                              classcard.forEach(function (element) {
                                    element.style.background =
                                          "linear-gradient(#07143d,#334d7f)";
                              });
                              arrwcard[index - 1].style.background =
                                    "linear-gradient(#07143d,#334d7f)";
                        } else {
                              let gra = document.getElementById("gra");
                              let gra1 = document.getElementById("gra1");
                              let gra2 = document.getElementById("gra2");
                              let bgc = document.getElementById("suncont1");
                              bgc.style.boxShadow =
                                    "inset 0em 4em 10em #cfcfd6";
                              gra2.style.background =
                                    "linear-gradient(#626269,transparent)";
                              gra.style.background =
                                    "linear-gradient(#626269,transparent)";
                              gra1.style.background =
                                    "linear-gradient(#626269,transparent)";
                              var classcard =
                                    document.querySelectorAll(".scards");
                              // Loop through the elements and change the background color
                              classcard.forEach(function (element) {
                                    element.style.background =
                                          "linear-gradient(#626269,#cfcfd6)";
                              });
                              arrwcard[index - 1].style.background =
                                    "linear-gradient(#626269,#cfcfd6)";
                        }
                  }
                  fpage.classList.add("hide");
                  sunbox.classList.remove("hide");
                  content.classList.remove("hide");
                  body.classList.remove("overflow-y-hidden");
            });
      } catch (error) {
            console.error("Error:", error);
            alert("An error occurred while fetching weather details");
      }
      console.log(formattedTime);
}
