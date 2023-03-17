import {useState} from 'react'
import './Styles/index.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faDroplet, faSun} from '@fortawesome/free-solid-svg-icons'

const options = {
  method: 'GET',
  headers: {
    'X-RapidAPI-Key': '7632f6ab30mshfe41249fd386ccdp18d667jsne3f0704cc7ee',
    'X-RapidAPI-Host': 'weatherapi-com.p.rapidapi.com'
  }
};

function App() {
  const [query, SetQuery] = useState('');
  const [weather, setWeather] = useState('');
  const [temp, setTemp] = useState();
  const [moreAbout, setMoreAbout] = useState();
  const [humidity, setHumidity] = useState();
  const [country, setCountry] = useState()
  const [ressenti, setRessenti] = useState();
  const [uvNmbrs, setUvNmbrs] = useState();

  const dateBuilder = (d) => {
    let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "November", "October", "December"];
    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

    let day = days[d.getDay()];
    let month = months[d.getMonth()];
    let year = d.getFullYear();
    let date = d.getDate();
    let time = d.getTime();
    return `${day} ${date} ${month} ${year} `
  }

  const search = evt => {
    if (evt.key === "Enter") {
      fetch(`https://weatherapi-com.p.rapidapi.com/current.json?q=${query}`, options)
        .then(response => response.json())
        .then(response => {
          console.log(response)

          setHumidity(response.current.humidity);
          setWeather(response.location.name);
          setTemp(response.current.temp_c);
          setMoreAbout(response.current.condition.text);
          setCountry(response.location.country);
          setRessenti(response.current.feelslike_c);
          setUvNmbrs(response.current.uv);
        })
        .catch(err => console.error(err));
    }
  }
  return (
    <>
      <div className={(typeof weather != "undefined") ? ((temp < 16) ? 'app warm' : ' app') : 'app'}>
        <main>
          <div className='search-box'>
            <input
              type="text"
              className='search-bar'
              placeholder='Search...'
              onChange={(e) => SetQuery(e.target.value)}
              value={query}
              onKeyPress={search}
            />
          </div>
          {(typeof weather != "undefined") ? (
            <div>
              <div className='location-box'>
                <div className='location name'>{weather}, {country}</div>
                <div className='location date'>{dateBuilder(new Date())}</div>
              </div>
              <div className="weather-box">
                <div className="temp">{temp}°c</div>
                <div className="weather">{moreAbout}</div>
                <br />
                <div className='humidity'>Humidity : {humidity} <FontAwesomeIcon style={{ color: 'blue' }} icon={faDroplet} /></div>
                <br />
                <div className='ressenti'>Feel like : {ressenti}°c</div>
                <br />
                <div className='uv'>Uv : {uvNmbrs}/10 <FontAwesomeIcon style={{ color: 'yellow' }} icon={faSun} /></div>
              </div>
            </div>
          )
            : ('')
          }
        </main>
      </div>
    </>
  )
}

export default App
