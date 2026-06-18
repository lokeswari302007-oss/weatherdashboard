const btn = document.getElementById("searchBtn");
const cityInput = document.getElementById("city");
const weather = document.getElementById("weather");

// Paste your API key here
const API_KEY = "252de87c37a852537ff8dc8379bd823c";

// Fetch weather
async function getWeather(city) {

try {

weather.innerHTML =
"<p>Loading...</p>";

const response = await fetch(
`https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&appid=${API_KEY}&units=metric`
);

const data = await response.json();

if (!response.ok) {

throw new Error(
data.message || "City not found"
);

}

displayWeather(data);

}

catch (error) {

weather.innerHTML = `

<p class="error">
${error.message}
</p>
`;

}

}

// Show weather
function displayWeather(data) {

const city = data.name;

const temp =
Math.round(data.main.temp);

const humidity =
data.main.humidity;

const wind =
data.wind.speed;

const description =
data.weather[0].description;

weather.innerHTML = `

<h2>${city}</h2>

<p>
${description}
</p>

<div class="metric">

<div class="temp">

${temp}°C

</div>

</div>

<div class="metric">

Humidity:
${humidity}%

</div>

<div class="metric">

Wind:
${wind} m/s

</div>

`;

}

// Search button
btn.addEventListener(
"click",
() => {

const city =
cityInput.value.trim();

if (!city) {

weather.innerHTML =
"<p>Enter city name</p>";

return;

}

getWeather(city);

}
);

// Enter key
cityInput.addEventListener(
"keydown",
(e) => {

if (
e.key === "Enter"
) {

btn.click();

}

}
);
