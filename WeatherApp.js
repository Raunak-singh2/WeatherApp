const apiKey = "e3e1f974b954b2d475740251aaf5706f";
// const URL = "";

const formEl = document.querySelector("form");
const cityInputEl = document.getElementById("city-input");
const weatherDataEl = document.getElementById("weather-data");

formEl.addEventListener("submit", (e) => {
  e.preventDefault();
  const cityValu = cityInputEl.value;
  getweatherData(cityValu);
});

async function getweatherData(cityValu) {
  try {
    const respons = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${cityValu}&appid=${apiKey}&units=metric`
    );
    if (!respons.ok) {
      throw new Error("Network respose wad not ok");
    }
    const data = await respons.json();

    // console.log(data);
    const temprature = Math.round(data.main.temp);

    const decription = data.weather[0].description;

    const icon = data.weather[0].icon;

    const deatils = [
      `Feel like:${Math.round(data.main.feels_like)}`,
      `Humidity:${data.main.humidity}%`,
      `Wind speed:${data.wind.speed} m/s`,
    ];

    weatherDataEl.querySelector(".icon").innerHTML = `<img
   src="http://openweathermap.org/img/wn/${icon}.png"
   alt="weather icon"/>`;
  //  weatherDataEl.querySelector(".icon").style.backgroundColor='red';


    weatherDataEl.querySelector(".tempurater").textContent =`${temprature}°C`;
    weatherDataEl.querySelector(".description").textContent = `${decription}`;

    weatherDataEl.querySelector(".details").innerHTML = deatils.map(
      (deatil) => `<div>${deatil}</div>`
    ).join("");
  } catch (error) {}
}
