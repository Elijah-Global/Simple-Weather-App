// API Key
const apiKey = 'e7edfe1218e8b2d6f33edc392d63a7ab'; // ← Replace with your actual API key

// DOM Element References
const getWeatherBtn = document.getElementById('getWeatherBtn');
const weatherResult = document.getElementById('weatherResult');
// getWeatherBtn: Button that, when clicked, triggers the weather fetch.
// weatherResult: Where the weather result (or error message) will be displayed on the page.

// Adds a click event listener to the button.
// The function inside runs asynchronously using async/await

getWeatherBtn.addEventListener('click', async () => {
  const city = document.getElementById('cityInput').value.trim();
  // Retrieves the value from the input field with ID cityInput.
// trim() removes extra spaces before/after the name.

  if (!city) {
    weatherResult.innerHTML = '<p>Please enter a city name.</p>';
    return;
  }
  // If the input is empty, it shows a message and stops the function with return.


  const apiURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

  // Constructs the full API URL to get weather data for the input city.
  // q=${city} → city name
  // appid=${apiKey} → your API key
  // units=metric → gets temperature in Celsius

  // Sends a GET request to the API and waits for the response.
  try {
    const response = await fetch(apiURL);
    // Error Handling: Bad Response
    // If the response is not OK (e.g. city doesn't exist), throws an error.
    if (!response.ok) {
      throw new Error('City not found');
    }
    // Converts the response to JSON.
    const data = await response.json();
    const temp = data.main.temp;
    const desc = data.weather[0].description;
// temp: temperature value
// desc: weather condition description (e.g., "clear sky")

// Display Weather Data
    weatherResult.innerHTML = `
      <h2>${data.name}</h2>
      <p><strong>Temperature:</strong> ${temp} °C</p>
      <p><strong>Condition:</strong> ${desc}</p>
    `;
    // Inserts the city name, temperature, and weather description into the weatherResult container.

    // Handle Errors
  } catch (error) {
    weatherResult.innerHTML = `<p>Error: ${error.message}</p>`;
  }
});
// If anything goes wrong (e.g. bad city name, network issue), it catches the error and shows a friendly error message.