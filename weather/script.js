const API_KEY = '6ef5fa38aba5781c594c9908f06854f8';
// const removeBg = require('remove.bg');

// const removeBackground = async (imageUrl) => {
//     const result = await removeBg({
//         url: imageUrl,
//         apiKey: 'P4Hg22AkjuU6Ywmox42d5RUK',
//         size: 'auto',
//     });
//     return result;
// };

// (async () => {
//     const imageUrl = 'https://openweathermap.org/img/wn/10d@2x.png';
//     const result = await removeBackground(imageUrl);
//     const img = new Image();
//     img.src = URL.createObjectURL(result);
//     document.body.appendChild(img);
// })();
const toGMT = (time) => {
    // GMT+5:30 offset in seconds
    const offset = 5.5 * 3600; // 5.5 hours in seconds
    const adjustedTime = time + offset;
    const date = new Date(adjustedTime * 1000);  // Convert to milliseconds
    return date.toISOString().substring(11, 19);
}



const getWeather = async (city_name) => {
    let data = await fetch(`https://api.openweathermap.org/geo/1.0/direct?q=${city_name}&limit=${5}&appid=${API_KEY}`)
    let info = await data.json();

    let lat = info[0].lat
    let lon = info[0].lon

    let weatherD = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${API_KEY}`)
    let weather = await weatherD.json();
 

    let main=document.getElementsByClassName('status')[0]

    let status=weather.weather[0].main
    let desc=weather.weather[0].description
    let imgcode=weather.weather[0].icon
    main.innerHTML=`${status}<br> <span style="font-size: 14px;">${desc}</span><span class="statusimg">
              <img src="https://openweathermap.org/img/wn/${imgcode}@2x.png" alt="icon">
            </span> `


    let name=document.querySelector('.city');
    name.innerHTML=weather.name+`<img
                src="svg/location.svg"
                alt="location"
                class="invert location"
              />`;
            


    let loc=document.getElementsByClassName('location')[0];  
    loc.addEventListener('mouseover',()=>{
        loc.style.cursor='pointer';
    })

    loc.addEventListener('click',()=>{
        let place=document.getElementsByClassName('input')[0].value;
        window.open(`https://www.google.com/search?q=${place}`,'_blank')
    })

    
    let temp=document.querySelector('.temp')
    temp.innerHTML=weather.main.temp+'°C'


    let rise=document.querySelector('.rtime')
    let set=document.querySelector('.stime')
    rise.innerHTML=toGMT(weather.sys.sunrise)
    set.innerHTML=toGMT(weather.sys.sunset)

    let humidity=document.getElementsByTagName('b')[0]
   
    humidity.innerHTML=`${weather.main.humidity}%`

    let feelsLike=document.getElementsByTagName('b')[1]
    feelsLike.innerHTML=`${weather.main.feels_like}°C`



}



async function main() {


    let btn = document.getElementById('btn')
    btn.addEventListener('click', () => {
        city_name = document.getElementsByTagName('input')[0].value
        getWeather(city_name)
    })


}


main()


/*
{
    "coord": {
        "lon": 88.3577,
        "lat": 22.5414
    },
    "weather": [
        {
            "id": 803,
            "main": "Clouds",
            "description": "broken clouds",
            "icon": "04n"
        }
    ],
    "base": "stations",
    "main": {
        "temp": 27.96,
        "feels_like": 33.45,
        "temp_min": 27.96,
        "temp_max": 27.96,
        "pressure": 1002,
        "humidity": 89,
        "sea_level": 1002,
        "grnd_level": 1001
    },
    "visibility": 3000,
    "wind": {
        "speed": 2.57,
        "deg": 130
    },
    "clouds": {
        "all": 75
    },
    "dt": 1720021706,
    "sys": {
        "type": 1,
        "id": 9114,
        "country": "IN",
        "sunrise": 1719962772,
        "sunset": 1720011306
    },
    "timezone": 19800,
    "id": 1277155,
    "name": "Bara Bazar",
    "cod": 200
}

{"coord":{"lon":88.3577,"lat":22.5414},"weather":[{"id":500,"main":"Rain","description":"light rain","icon":"10n"}],"base":"stations","main":{"temp":27.96,"feels_like":33.45,"temp_min":27.96,"temp_max":27.96,"pressure":1002,"humidity":89,"sea_level":1002,"grnd_level":1001},"visibility":3000,"wind":{"speed":2.57,"deg":130},"clouds":{"all":75},"dt":1720022466,"sys":{"type":1,"id":9114,"country":"IN","sunrise":1719962772,"sunset":1720011306},"timezone":19800,"id":1277155,"name":"Bara Bazar","cod":200}
*/