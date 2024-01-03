
async function fetchBackground(){
    fetch(`https://apis.scrimba.com/unsplash/photos/random?orientation=landscape&query=nature`, { method: "GET" })
    .then(res => res.json())
    .then(data => {
        document.body.style.backgroundImage = `url('${data.urls.full}')`;
        document.getElementById("author").innerText = `By: ${data.user.name}`
    })
}
async function fetchCrypto(){
    fetch("https://api.coingecko.com/api/v3/coins/ethereum")
    .then(res => {
        if (!res.ok) {
            throw Error("Something went wrong")
        }
        return res.json()
    })
    .then(data => {
        document.getElementById("crypto-top").innerHTML = `
            <img src = '${data.image.small}'/>
            <span>${data.name}</span>`
        document.getElementById("crypto").innerHTML += `
            <p>🎯: $${data.market_data.current_price.usd}</p>
            <p>👆: $${data.market_data.high_24h.usd}</p>
            <p>👇: $${data.market_data.low_24h.usd}</p>
        `
    })
    .catch(err => console.error(err))
}
function getTime(){
    const date = new Date()
    let time = date.toLocaleTimeString("en-us",{timeStyle:"short"})
    document.getElementById("time").innerText = time
}
function getWeather(){
    navigator.geolocation.getCurrentPosition((position) => {
        const lat = position.coords.latitude
        const long = position.coords.longitude        
      fetch(`https://apis.scrimba.com/openweathermap/data/2.5/weather?lat=${lat}&lon=${long}&units=metric`)
        .then(res => {
            if(!res.ok){
                throw Error("Weather data not available")
            }
            return res.json()
        })
        .then(data => {
            console.log(data)
            document.getElementById("weather").innerHTML = `
            <img src="https://openweathermap.org/img/wn/${data.weather[0].icon}.png"/>
            <p class="weather-temp">${Math.round(data.main.temp * 10) / 10}°C</p>
            <p class="location">${data.name}</p>
            `
        }).catch(err => console.log(err))
      });
}
fetchBackground()
fetchCrypto()
setInterval(getTime, 1000)
getWeather()