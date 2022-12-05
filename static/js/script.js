/*
    API weather em https://home.openweathermap.org/
*/

// VARIÁVEIS -----------------------------------------------------------------

const apiKey = "03f10dde58544cdcbfe2ae211cfe1a7b"; //chave API key
const apiCountryURL = "https://countryflagsapi.com/png/"; //bandeira do país
const apIconURL = "http://openweathermap.org/img/wn/" //icone do weather

// Botões e inputs
const cityInput = document.querySelector("#city-input");
const searchBtn = document.querySelector("#search");
const weatherData = document.querySelector("#weather-data")
// Elementos a serem manpulados
const cityElement = document.querySelector("#city");
const tempElement = document.querySelector("#temperature span");
const descElement = document.querySelector("#description");
const weatherIconElement = document.querySelector("#weather-icon");
const countryElement = document.querySelector("#country");
const umidityElement = document.querySelector("#umidity span");
const windElement = document.querySelector("#wind span");

// FUNÇÕES ------------------------------------------------------------------
const getWeatherData = async(city) => {

    console.log(city);
    // Link de requisição da API
    const apiWeatherURL = 'https://api.openweathermap.org/data/2.5/weather?q=' + city + '&units=metric&appid=' + apiKey + '&lang=pt_br'
    // Aguarda a resposta da API
    const res = await fetch(apiWeatherURL);
    // Responta em um json
    const data = await res.json();

    console.log(data);
    // Abaixo vamos retirar o que queremos da resposta JSON
    speedWind = data['wind']['speed'];
    country = data['sys']['country'];
    temperature = data['main']['temp'];
    humidity = data['main']['humidity'];
    icon = data['weather']['0']['icon'];
    description = data['weather']['0']['description'];

    // Editando os elementos HTML para exibir o que queremos
    cityElement.innerText = city;
    countryElement.setAttribute('src', apiCountryURL + country);
    tempElement.innerText = temperature;
    descElement.innerText = description;
    weatherIconElement.setAttribute('src', apIconURL + icon + ".png");
    umidityElement.innerText = humidity;
    windElement.innerText = speedWind;
    cityInput.setAttribute("style", "color:red");
    weatherData.classList.remove("hide");
    cityInput.value = "";
    cityInput.focus();
}

// eventos
searchBtn.addEventListener("click", (e) => {
    //evita enviar form
    e.preventDefault();
    // Pega o input e se tiver valor chama função GetWeatherData
    if(cityInput.value) {
        const city = cityInput.value;
        getWeatherData(city)
    }
    else {
        cityInput.placeholder = "Digite uma cidade válida!";
        cityInput.setAttribute("style", "color:red");
    }
});