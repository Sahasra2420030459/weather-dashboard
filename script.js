// ============================================
// CONFIGURATION & STATE
// ============================================

const CONFIG = {
    defaultCity: { lat: 51.5074, lon: -0.1278, name: 'London, United Kingdom' },
    units: 'metric',
    maxHistory: 5
};

let state = {
    isCelsius: true,
    isDark: true,
    searchHistory: JSON.parse(localStorage.getItem('weatherHistory')) || [],
    currentData: null,
    recognition: null
};

// ============================================
// SVG WEATHER ICONS
// ============================================

const SVG_ICONS = {
    sun: `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
        <circle cx="50" cy="50" r="20" fill="url(#sunGradient)" />
        <defs>
            <radialGradient id="sunGradient" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stop-color="#FFD700"/>
                <stop offset="100%" stop-color="#FFA500"/>
            </radialGradient>
        </defs>
        <g stroke="#FFD700" stroke-width="3" stroke-linecap="round">
            <line x1="50" y1="10" x2="50" y2="25" />
            <line x1="50" y1="75" x2="50" y2="90" />
            <line x1="10" y1="50" x2="25" y2="50" />
            <line x1="75" y1="50" x2="90" y2="50" />
            <line x1="22" y1="22" x2="32" y2="32" />
            <line x1="68" y1="68" x2="78" y2="78" />
            <line x1="22" y1="78" x2="32" y2="68" />
            <line x1="68" y1="32" x2="78" y2="22" />
        </g>
    </svg>`,

    cloud: `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
        <defs>
            <linearGradient id="cloudGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stop-color="#E8E8E8"/>
                <stop offset="100%" stop-color="#B0B0B0"/>
            </linearGradient>
        </defs>
        <path d="M25,60 Q25,45 40,45 Q45,30 60,30 Q75,30 80,45 Q90,45 90,55 Q90,65 80,65 L25,65 Q15,65 15,55 Q15,45 25,45" 
        fill="url(#cloudGradient)" />
    </svg>`,

    partlyCloudy: `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
        <defs>
            <radialGradient id="sunPart" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stop-color="#FFD700"/>
                <stop offset="100%" stop-color="#FFA500"/>
            </radialGradient>
            <linearGradient id="cloudPart" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stop-color="#E8E8E8"/>
                <stop offset="100%" stop-color="#B0B0B0"/>
            </linearGradient>
        </defs>
        <circle cx="35" cy="35" r="15" fill="url(#sunPart)" />
        <g stroke="#FFD700" stroke-width="2" stroke-linecap="round">
            <line x1="35" y1="10" x2="35" y2="18" />
            <line x1="35" y1="52" x2="35" y2="60" />
            <line x1="10" y1="35" x2="18" y2="35" />
            <line x1="52" y1="35" x2="60" y2="35" />
        </g>
        <path d="M40,70 Q40,55 55,55 Q60,40 75,40 Q85,40 90,55 Q95,55 95,65 Q95,75 85,75 L40,75 Q30,75 30,65 Q30,55 40,55" 
        fill="url(#cloudPart)" />
    </svg>`,

    rain: `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
        <defs>
            <linearGradient id="rainCloud" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stop-color="#8899AA"/>
                <stop offset="100%" stop-color="#556677"/>
            </linearGradient>
        </defs>
        <path d="M20,50 Q20,35 35,35 Q40,20 55,20 Q70,20 75,35 Q85,35 85,45 Q85,55 75,55 L20,55 Q10,55 10,45 Q10,35 20,35" 
        fill="url(#rainCloud)" />
        <line x1="30" y1="60" x2="25" y2="75" stroke="#4FC3F7" stroke-width="3" stroke-linecap="round" />
        <line x1="45" y1="60" x2="40" y2="75" stroke="#4FC3F7" stroke-width="3" stroke-linecap="round" />
        <line x1="60" y1="60" x2="55" y2="75" stroke="#4FC3F7" stroke-width="3" stroke-linecap="round" />
        <line x1="75" y1="60" x2="70" y2="75" stroke="#4FC3F7" stroke-width="3" stroke-linecap="round" />
    </svg>`,

    snow: `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
        <defs>
            <linearGradient id="snowCloud" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stop-color="#E0E0E0"/>
                <stop offset="100%" stop-color="#B0B0B0"/>
            </linearGradient>
        </defs>
        <path d="M20,50 Q20,35 35,35 Q40,20 55,20 Q70,20 75,35 Q85,35 85,45 Q85,55 75,55 L20,55 Q10,55 10,45 Q10,35 20,35" 
        fill="url(#snowCloud)" />
        <circle cx="30" cy="70" r="3" fill="white" />
        <circle cx="45" cy="75" r="3" fill="white" />
        <circle cx="60" cy="70" r="3" fill="white" />
        <circle cx="75" cy="75" r="3" fill="white" />
        <circle cx="37" cy="82" r="2.5" fill="white" />
        <circle cx="52" cy="85" r="2.5" fill="white" />
        <circle cx="67" cy="82" r="2.5" fill="white" />
    </svg>`,

    thunder: `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
        <defs>
            <linearGradient id="stormCloud" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stop-color="#667788"/>
                <stop offset="100%" stop-color="#445566"/>
            </linearGradient>
        </defs>
        <path d="M20,45 Q20,30 35,30 Q40,15 55,15 Q70,15 75,30 Q85,30 85,40 Q85,50 75,50 L20,50 Q10,50 10,40 Q10,30 20,30" 
        fill="url(#stormCloud)" />
        <polygon points="50,45 40,65 52,65 45,85 60,60 48,60 55,45" fill="#FFD700" stroke="#FFA500" stroke-width="1" />
    </svg>`,

    fog: `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
        <line x1="15" y1="35" x2="85" y2="35" stroke="#B0BEC5" stroke-width="4" stroke-linecap="round" />
        <line x1="20" y1="50" x2="80" y2="50" stroke="#B0BEC5" stroke-width="4" stroke-linecap="round" />
        <line x1="15" y1="65" x2="85" y2="65" stroke="#B0BEC5" stroke-width="4" stroke-linecap="round" />
    </svg>`
};

const WEATHER_MAP = {
    0: SVG_ICONS.sun,        // Clear sky
    1: SVG_ICONS.partlyCloudy, // Mainly clear
    2: SVG_ICONS.partlyCloudy, // Partly cloudy
    3: SVG_ICONS.cloud,      // Overcast
    45: SVG_ICONS.fog,       // Fog
    48: SVG_ICONS.fog,       // Rime fog
    51: SVG_ICONS.rain,      // Drizzle
    53: SVG_ICONS.rain,      // Moderate drizzle
    55: SVG_ICONS.rain,      // Dense drizzle
    61: SVG_ICONS.rain,      // Rain
    63: SVG_ICONS.rain,      // Moderate rain
    65: SVG_ICONS.rain,      // Heavy rain
    71: SVG_ICONS.snow,      // Snow
    73: SVG_ICONS.snow,      // Moderate snow
    75: SVG_ICONS.snow,      // Heavy snow
    95: SVG_ICONS.thunder,   // Thunderstorm
    96: SVG_ICONS.thunder    // Thunderstorm with hail
};

const WEATHER_DESC = {
    0: 'Clear sky', 1: 'Mainly clear', 2: 'Partly cloudy', 3: 'Overcast',
    45: 'Fog', 48: 'Rime fog', 51: 'Light drizzle', 53: 'Moderate drizzle',
    55: 'Dense drizzle', 61: 'Slight rain', 63: 'Moderate rain', 65: 'Heavy rain',
    71: 'Slight snow', 73: 'Moderate snow', 75: 'Heavy snow',
    95: 'Thunderstorm', 96: 'Thunderstorm with hail'
};

const AQI_LABELS = {
    1: { label: 'Good', color: '#10b981', class: 'good' },
    2: { label: 'Moderate', color: '#f59e0b', class: 'moderate' },
    3: { label: 'Unhealthy for Sensitive', color: '#f97316', class: 'unhealthy-sensitive' },
    4: { label: 'Unhealthy', color: '#ef4444', class: 'unhealthy' },
    5: { label: 'Very Unhealthy', color: '#8b5cf6', class: 'very-unhealthy' },
    6: { label: 'Hazardous', color: '#78350f', class: 'hazardous' }
};

// ============================================
// UTILITY FUNCTIONS
// ============================================

function showLoading() {
    document.getElementById('loading').classList.add('show');
    document.getElementById('weatherContent').classList.remove('show');
    hideError();
}

function hideLoading() {
    document.getElementById('loading').classList.remove('show');
}

function showError(message) {
    const toast = document.getElementById('errorMessage');
    toast.textContent = message;
    toast.classList.add('show');
    setTimeout(() => hideError(), 5000);
}

function hideError() {
    document.getElementById('errorMessage').classList.remove('show');
}

function getDayName(dateStr) {
    const date = new Date(dateStr);
    return ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'][date.getDay()];
}

function formatTime(dateStr) {
    return new Date(dateStr).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
}

function celsiusToFahrenheit(c) {
    return Math.round((c * 9/5) + 32);
}

function formatTemp(c) {
    return state.isCelsius ? Math.round(c) : celsiusToFahrenheit(c);
}

function formatSpeed(kmh) {
    return state.isCelsius ? `${kmh} km/h` : `${Math.round(kmh * 0.621)} mph`;
}

// ============================================
// SEARCH HISTORY
// ============================================

function addToHistory(city) {
    state.searchHistory = state.searchHistory.filter(c => c.toLowerCase() !== city.toLowerCase());
    state.searchHistory.unshift(city);
    if (state.searchHistory.length > CONFIG.maxHistory) state.searchHistory.pop();
    localStorage.setItem('weatherHistory', JSON.stringify(state.searchHistory));
    renderHistory();
}

function renderHistory() {
    const container = document.getElementById('searchHistory');
    if (!state.searchHistory.length) {
        container.innerHTML = '';
        return;
    }
    container.innerHTML = state.searchHistory.map(city => 
        `<span class="history-chip" onclick="searchCity('${city.replace(/'/g, "\'")}')">${city}</span>`
    ).join('');
}

// ============================================
// THEME TOGGLE
// ============================================

function toggleTheme() {
    state.isDark = !state.isDark;
    document.documentElement.setAttribute('data-theme', state.isDark ? 'dark' : 'light');
    localStorage.setItem('weatherTheme', state.isDark ? 'dark' : 'light');
}

function loadTheme() {
    const saved = localStorage.getItem('weatherTheme');
    if (saved) {
        state.isDark = saved === 'dark';
        document.documentElement.setAttribute('data-theme', saved);
    }
}

// ============================================
// UNIT TOGGLE
// ============================================

function toggleUnit() {
    state.isCelsius = !state.isCelsius;
    document.getElementById('unitToggle').querySelector('.unit-text').textContent = state.isCelsius ? '°C' : '°F';
    localStorage.setItem('weatherUnit', state.isCelsius ? 'C' : 'F');
    if (state.currentData) {
        updateWeatherUI(state.currentData.weather, state.currentData.aqi, state.currentData.cityName);
    }
}

function loadUnit() {
    const saved = localStorage.getItem('weatherUnit');
    if (saved === 'F') {
        state.isCelsius = false;
        document.getElementById('unitToggle').querySelector('.unit-text').textContent = '°F';
    }
}

// ============================================
// VOICE SEARCH
// ============================================

function initVoiceSearch() {
    if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
        const btn = document.getElementById('voiceBtn');
        btn.style.opacity = '0.3';
        btn.style.cursor = 'not-allowed';
        btn.title = 'Voice search not supported';
        return;
    }

    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    state.recognition = new SpeechRecognition();
    state.recognition.lang = 'en-US';
    state.recognition.continuous = false;
    state.recognition.interimResults = false;

    state.recognition.onstart = () => {
        document.getElementById('voiceBtn').classList.add('listening');
        document.getElementById('cityInput').placeholder = 'Listening...';
    };

    state.recognition.onend = () => {
        document.getElementById('voiceBtn').classList.remove('listening');
        document.getElementById('cityInput').placeholder = 'Search for a city...';
    };

    state.recognition.onresult = (e) => {
        const city = e.results[0][0].transcript.replace(/[.,!?]$/, '').trim();
        document.getElementById('cityInput').value = city;
        searchWeather();
    };

    state.recognition.onerror = (e) => {
        showError('Voice search failed: ' + e.error);
    };
}

function startVoiceSearch() {
    if (state.recognition) state.recognition.start();
}

// ============================================
// MAIN API FUNCTIONS
// ============================================

async function fetchWeatherData(lat, lon, cityName) {
    showLoading();

    try {
        const weatherUrl = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,relative_humidity_2m,apparent_temperature,weather_code,pressure_msl,wind_speed_10m,uv_index&hourly=temperature_2m,weather_code,precipitation_probability&daily=weather_code,temperature_2m_max,temperature_2m_min,sunrise,sunset,uv_index_max&timezone=auto&forecast_days=7`;

        const weatherRes = await fetch(weatherUrl);
        const weatherData = await weatherRes.json();

        let aqiData = null;
        try {
            const aqiUrl = `https://air-quality-api.open-meteo.com/v1/air-quality?latitude=${lat}&longitude=${lon}&current=us_aqi,pm10,pm2_5,nitrogen_dioxide,ozone&timezone=auto`;
            const aqiRes = await fetch(aqiUrl);
            aqiData = await aqiRes.json();
        } catch (e) {
            console.log('AQI unavailable');
        }

        state.currentData = { weather: weatherData, aqi: aqiData, cityName };
        updateWeatherUI(weatherData, aqiData, cityName);
        addToHistory(cityName.split(',')[0]);

        hideLoading();
        document.getElementById('weatherContent').classList.add('show');

    } catch (error) {
        console.error(error);
        showError('Failed to fetch weather data. Please try again.');
    }
}

function updateWeatherUI(weather, aqi, cityName) {
    const current = weather.current;
    const daily = weather.daily;
    const hourly = weather.hourly;

    // Location & Date
    document.getElementById('cityName').textContent = cityName;
    document.getElementById('currentDate').textContent = new Date().toLocaleDateString('en-US', {
        weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit'
    });

    // Main Weather
    const icon = WEATHER_MAP[current.weather_code] || SVG_ICONS.sun;
    document.getElementById('weatherIconContainer').innerHTML = icon;
    document.getElementById('temperature').textContent = formatTemp(current.temperature_2m);
    document.getElementById('weatherDescription').textContent = WEATHER_DESC[current.weather_code] || 'Clear';
    document.getElementById('tempHigh').textContent = formatTemp(daily.temperature_2m_max[0]);
    document.getElementById('tempLow').textContent = formatTemp(daily.temperature_2m_min[0]);

    // Details
    document.getElementById('windSpeed').textContent = formatSpeed(current.wind_speed_10m);
    document.getElementById('humidity').textContent = `${current.relative_humidity_2m}%`;
    document.getElementById('feelsLike').textContent = `${formatTemp(current.apparent_temperature)}°`;
    document.getElementById('pressure').textContent = `${Math.round(current.pressure_msl)} hPa`;
    document.getElementById('uvIndex').textContent = current.uv_index || '--';
    document.getElementById('visibility').textContent = '10 km'; // Approximate

    // Weather Alert
    const alertEl = document.getElementById('weatherAlert');
    if (current.weather_code >= 95) {
        alertEl.className = 'weather-alert danger';
        alertEl.textContent = '⚠️ Thunderstorm warning';
    } else if (current.weather_code >= 71) {
        alertEl.className = 'weather-alert warning';
        alertEl.textContent = '❄️ Snow expected';
    } else if (current.weather_code >= 61) {
        alertEl.className = 'weather-alert warning';
        alertEl.textContent = '🌧️ Rain expected';
    } else {
        alertEl.className = '';
        alertEl.textContent = '';
    }

    // Air Quality
    if (aqi && aqi.current) {
        const aqiVal = aqi.current.us_aqi;
        const aqiIndex = aqiVal <= 50 ? 1 : aqiVal <= 100 ? 2 : aqiVal <= 150 ? 3 : aqiVal <= 200 ? 4 : aqiVal <= 300 ? 5 : 6;
        const aqiInfo = AQI_LABELS[aqiIndex];

        const circle = document.getElementById('aqiCircle');
        circle.style.background = aqiInfo.color;
        document.getElementById('aqiValue').textContent = aqiVal;
        document.getElementById('aqiLabel').textContent = aqiInfo.label;

        document.getElementById('pm25').textContent = `${aqi.current.pm2_5 || '--'} µg/m³`;
        document.getElementById('pm10').textContent = `${aqi.current.pm10 || '--'} µg/m³`;
        document.getElementById('no2').textContent = `${aqi.current.nitrogen_dioxide || '--'} µg/m³`;
        document.getElementById('o3').textContent = `${aqi.current.ozone || '--'} µg/m³`;

        document.getElementById('aqiFill').style.width = `${Math.min((aqiVal / 300) * 100, 100)}%`;
    } else {
        document.getElementById('aqiValue').textContent = '--';
        document.getElementById('aqiLabel').textContent = 'Unavailable';
        document.getElementById('aqiFill').style.width = '0%';
    }

    // Sun Times
    document.getElementById('sunrise').textContent = formatTime(daily.sunrise[0]);
    document.getElementById('sunset').textContent = formatTime(daily.sunset[0]);

    // Hourly Forecast
    const hourlyContainer = document.getElementById('hourlyForecast');
    hourlyContainer.innerHTML = '';
    const currentHour = new Date().getHours();

    for (let i = 0; i < 24; i += 3) {
        const idx = currentHour + i;
        if (idx >= hourly.time.length) break;

        const hourTime = new Date(hourly.time[idx]);
        const hourIcon = WEATHER_MAP[hourly.weather_code[idx]] || SVG_ICONS.sun;
        const pop = hourly.precipitation_probability[idx];

        const div = document.createElement('div');
        div.className = 'hour-item';
        div.innerHTML = `
            <div class="hour-time">${hourTime.getHours()}:00</div>
            <div class="hour-icon">${hourIcon}</div>
            <div class="hour-temp">${formatTemp(hourly.temperature_2m[idx])}°</div>
            ${pop > 0 ? `<div class="hour-pop">${pop}%</div>` : ''}
        `;
        hourlyContainer.appendChild(div);
    }

    // Daily Forecast
    const dailyContainer = document.getElementById('dailyForecast');
    dailyContainer.innerHTML = '';

    for (let i = 0; i < daily.time.length; i++) {
        const dayName = i === 0 ? 'Today' : getDayName(daily.time[i]);
        const dayIcon = WEATHER_MAP[daily.weather_code[i]] || SVG_ICONS.sun;
        const max = daily.temperature_2m_max[i];
        const min = daily.temperature_2m_min[i];
        const range = Math.max(max - min, 1);

        const div = document.createElement('div');
        div.className = 'daily-item';
        div.innerHTML = `
            <span class="daily-day">${dayName}</span>
            <div class="daily-icon">${dayIcon}</div>
            <div class="daily-temps">
                <span class="daily-low">${formatTemp(min)}°</span>
                <div class="daily-bar-bg">
                    <div class="daily-bar-fill" style="width: ${Math.min((range / 20) * 100, 100)}%"></div>
                </div>
                <span class="daily-high">${formatTemp(max)}°</span>
            </div>
        `;
        dailyContainer.appendChild(div);
    }

    // Last Updated
    document.getElementById('lastUpdated').textContent = new Date().toLocaleTimeString();
}

// ============================================
// SEARCH FUNCTIONS
// ============================================

async function searchWeather() {
    const input = document.getElementById('cityInput');
    const city = input.value.trim();
    if (!city) {
        showError('Please enter a city name');
        return;
    }
    await searchCity(city);
    input.value = '';
}

async function searchCity(city) {
    showLoading();

    try {
        const geoUrl = `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(city)}&count=1&language=en&format=json`;
        const res = await fetch(geoUrl);
        const data = await res.json();

        if (!data.results || !data.results.length) {
            showError(`City "${city}" not found`);
            return;
        }

        const result = data.results[0];
        const name = result.name + (result.country ? `, ${result.country}` : '');
        await fetchWeatherData(result.latitude, result.longitude, name);

    } catch (error) {
        showError('Search failed. Please try again.');
    }
}

function getMyLocation() {
    if (!navigator.geolocation) {
        showError('Geolocation not supported');
        return;
    }

    showLoading();
    navigator.geolocation.getCurrentPosition(
        async (pos) => {
            const { latitude, longitude } = pos.coords;
            try {
                const res = await fetch(`https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=en`);
                const data = await res.json();
                const city = data.city || data.locality || 'Your Location';
                await fetchWeatherData(latitude, longitude, city);
            } catch (e) {
                await fetchWeatherData(latitude, longitude, 'Your Location');
            }
        },
        () => {
            showError('Location access denied. Please enable permissions.');
        }
    );
}

// ============================================
// INITIALIZATION
// ============================================

document.addEventListener('DOMContentLoaded', () => {
    loadTheme();
    loadUnit();
    renderHistory();
    initVoiceSearch();

    document.getElementById('cityInput').addEventListener('keypress', (e) => {
        if (e.key === 'Enter') searchWeather();
    });

    document.getElementById('themeToggle').addEventListener('click', toggleTheme);
    document.getElementById('unitToggle').addEventListener('click', toggleUnit);

    // Load default city
    fetchWeatherData(CONFIG.defaultCity.lat, CONFIG.defaultCity.lon, CONFIG.defaultCity.name);
});