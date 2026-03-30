const key = 'YOUR_API_KEY';

document.querySelector('#button-input').addEventListener('click', () => {
    fetchWeather();
});

document.querySelector('#input').addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
        fetchWeather();
    }
});

function fetchWeather(){
    const button = document.querySelector('#input');
    console.log(button.value);

    fetch(`https://api.openweathermap.org/geo/1.0/direct?q=${button.value}&appid=${key}`)
        .then(response => response.json())
        .then(data => {
            if(data.length > 0){
                const lat = data[0]['lat'];
                const lon = data[0]['lon'];
                
                return fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${key}`);
            }
        })
        .then(response => response.json())
        .then(weather => {
            //console.log(weather);
            
            //now defining the weather paramters to be displayed :-
            const a = (weather.main.temp - 273).toFixed(2); //current weather
            const b = weather.main.humidity; //humidity percentage
            const c = weather.wind.speed; //wind speed

            document.querySelector('.js-info').innerHTML = `
                <div class="weather-card">
                    <h2>Weather Information</h2>
                    <div class="weather-row">
                        <div class="weather-item">
                        <span class="icon">🌡️</span>
                        <p>Temperature</p>
                        <strong>${a} °C</strong>
                        </div>
                        <div class="weather-item">
                        <span class="icon">💧</span>
                        <p>Humidity</p>
                        <strong>${b}%</strong>
                        </div>
                        <div class="weather-item">
                        <span class="icon">🌬️</span>
                        <p>Wind Speed</p>
                        <strong>${c} km/h</strong>
                        </div>
                    </div>
                </div>
            `; 

            const ele1 = document.querySelector('.line2');
            ele1.style.marginTop = '150px';

            if(document.querySelector('#input').value = ""){
                document.querySelector('.js-info').innerHTML = "";
            }
        });
}
