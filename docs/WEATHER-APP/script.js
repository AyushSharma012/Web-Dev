const resultArea = document.querySelector(".container-result")


document.getElementById("submit").addEventListener("click", () => {
    resultArea.innerHTML = "";
    const locInput = document.getElementById("location").value.trim().toLowerCase();

    const url = "https://api.tomorrow.io/v4/weather/realtime?location=" + locInput + "&apikey=lB6aFgiPU9cfznSNzXT20wwGIWKrxVUU"

    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error("Response not available right now")
            }
            return response.json()
        })
        .then(data => {
            resultArea.style.marginTop = "12px";

            // container for City Name and temperature
            let tempContainer = document.createElement("div");
            tempContainer.className = "container-temp"
            let cityName = document.createElement("p");
            cityName.className = "city"
            let temperature = document.createElement("p");
            temperature.className = "temp"

            cityName.textContent = data.location.name;
            temperature.textContent = data.data.values.temperature + "°C";

            let weatherCode = data.data.values.weatherCode;
            let iconPath = getWeatherIconPath(weatherCode);

            // <img> element
            let weatherIcon = document.createElement("img");
            weatherIcon.src = iconPath;
            weatherIcon.alt = "weather icon";
            weatherIcon.width = 70; 
            weatherIcon.height = 70;
            weatherIcon.style.marginTop = "12px"
            weatherIcon.style.marginBottom = "12px"

            tempContainer.append(cityName);
            tempContainer.append(weatherIcon);
            tempContainer.append(temperature);

            //container for humidity, wind-speed, visibility, uv index
            const extrasData = [
                { label: "Humidity", value: data.data.values.humidity + "%" },
                { label: "Wind Speed", value: data.data.values.windSpeed + " m/s" },
                { label: "UV Index", value: data.data.values.uvIndex },
                { label: "Visibility", value: data.data.values.visibility + " km" }
            ];

            const extrasContainer = document.createElement("div");
            extrasContainer.className = "container-extras";

            extrasData.forEach(item => {
                const wrapper = document.createElement("div");
                const paragraph = document.createElement("p");

                paragraph.textContent = `${item.label}\n${item.value}`;
                paragraph.style.whiteSpace = "pre-line"; // for '\n'

                wrapper.appendChild(paragraph);
                extrasContainer.appendChild(wrapper);
            });


            resultArea.append(tempContainer);
            resultArea.append(extrasContainer);

            console.log(data);
        })
        .catch(error => console.error(error))

})

function getWeatherIconPath(code) {
    if (code === 1000) return "icons/weather-clear.png"; // Clear
    if ([1001, 1100, 1101, 1102].includes(code)) return "icons/cloudy-weather.png"; // Cloudy
    if ([4000, 4001, 4200, 4201].includes(code)) return "icons/rain.png"; // Rain
    if ([5000, 5001, 5100, 5101, 6000, 6001, 6200, 6201].includes(code)) return "icons/snow-weather.png"; // Snow
    if (code === 8000) return "icons/thunderstorm-weather.png"; // Thunderstorm
    if ([2000, 2100].includes(code)) return "icons/fog-weather.png"; // Fog

    return "icons/unknown.png"; // Default
}