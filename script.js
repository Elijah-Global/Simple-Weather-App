const apiKey = 'e7edfe1218e8b2d6f33edc392d63a7ab'; // ← Replace with your actual API key
const getWeatherBtn = document.getElementById('getWeatherBtn');
const weatherResult = document.getElementById('weatherResult');

getWeatherBtn.addEventListener('click', async () => {
  const city = document.getElementById('cityInput').value.trim();

  if (!city) {
    weatherResult.innerHTML = '<p>Please enter a city name.</p>';
    return;
  }

  const apiURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

  try {
    const response = await fetch(apiURL);
    if (!response.ok) {
      throw new Error('City not found');
    }

    const data = await response.json();
    const temp = data.main.temp;
    const desc = data.weather[0].description;

    weatherResult.innerHTML = `
      <h2>${data.name}</h2>
      <p><strong>Temperature:</strong> ${temp} °C</p>
      <p><strong>Condition:</strong> ${desc}</p>
    `;
  } catch (error) {
    weatherResult.innerHTML = `<p>Error: ${error.message}</p>`;
  }
});
