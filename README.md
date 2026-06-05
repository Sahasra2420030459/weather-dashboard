Weather Dashboard
Real-time weather dashboard with interactive forecasts, air quality monitoring, and voice search capabilities for anyone needing accurate weather data.
[Live Demo] | Portfolio
What This Is
A modern, responsive weather dashboard that fetches real-time weather data using free APIs and displays it in an intuitive, visually appealing interface:
Fetches current weather - Temperature, humidity, wind speed, pressure, and "feels like" temperature from Open-Meteo API
Displays hourly forecasts - Next 24 hours in 3-hour intervals with custom SVG weather icons
Shows 7-day forecast - Daily highs/lows with visual temperature indicators
Monitors air quality - PM2.5, PM10, NO₂, O₃ readings with color-coded health levels via Air Quality API
Enables voice search - Hands-free city search using Web Speech API (Chrome/Edge)
Supports geolocation - One-click weather for user's current location using Navigator API
Built as an intermediate-level project to demonstrate API integration skills, async/await patterns, and responsive UI design.
Features
Table
Feature	Status
Real-time Weather Data (Open-Meteo)	Done
Hourly Forecast (24h, 3h intervals)	Done
7-Day Forecast with SVG Icons	Done
Air Quality Index (AQI) with PM2.5/PM10/NO₂/O₃	Done
Custom SVG Weather Icons	Done
Voice Search (Web Speech API)	Done
Geolocation Support	Done
Responsive Design (Mobile/Desktop)	Done
Error Handling & Loading States	Done
Glass-morphism UI Design	Done
Tech Stack
Table
Layer	Technology
Frontend	HTML5, CSS3, JavaScript (ES6+)
Styling	CSS Grid, Flexbox, CSS Animations, Backdrop Filter
Icons	Custom SVG Weather Icons (Sun, Cloud, Rain, Snow, Thunder, Fog)
Weather API	Open-Meteo Weather API (Free, No Key)
Air Quality API	Open-Meteo Air Quality API (Free, No Key)
Geocoding API	Open-Meteo Geocoding API (Free, No Key)
Reverse Geocoding	BigDataCloud API (Free)
Voice Recognition	Web Speech API (SpeechRecognition)
Geolocation	Navigator Geolocation API
Deploy	Netlify / Vercel / GitHub Pages (Static Hosting)
Run Locally
Requirements: Modern web browser (Chrome, Edge, Firefox, Safari)
1. Clone
bash
git clone https://github.com/yourusername/weather-dashboard.git
cd weather-dashboard
2. Open
Simply open index.html in your browser:
bash
# Windows
start index.html

# macOS
open index.html

# Linux
xdg-open index.html
Or double-click index.html in File Explorer.
No server required! This is a static website that runs entirely in the browser.
How to Use
Search by City - Type any city name (e.g., "London", "Tokyo", "New York") and click "Search" or press Enter
Voice Search - Click the 🎤 button and say a city name clearly (Chrome/Edge only)
My Location - Click "📍 My Location" to get weather for your current GPS position
View Details - Scroll down to see:
Current weather with SVG icon
Hourly forecast (next 24 hours)
7-day forecast with highs/lows
Air Quality Index with pollutant breakdown
Browser Permissions:
Microphone - Required for voice search (Chrome/Edge)
Location - Required for "My Location" feature (all browsers)
Repository Structure
plain
weather-dashboard/
├── index.html              # Main HTML structure
├── style.css               # Styling, animations, responsive design, glass-morphism
├── script.js               # JavaScript logic, API calls, UI updates, voice search
├── README.md               # This file
└── .gitignore              # Git ignore rules
Configuration
No configuration files needed! All API calls use free public endpoints:
Table
API	Endpoint	Key Required
Weather Data	https://api.open-meteo.com/v1/forecast	No
Air Quality	https://air-quality-api.open-meteo.com/v1/air-quality	No
Geocoding	https://geocoding-api.open-meteo.com/v1/search	No
Reverse Geocoding	https://api.bigdatacloud.net/data/reverse-geocode-client	No
Deployment
Netlify (Free Tier - Recommended)
Push to GitHub (ensure .env is in .gitignore if you add one later)
Go to netlify.com
Click "Add new site" → "Import an existing project"
Connect your GitHub repository
Deploy settings:
Build command: (leave empty)
Publish directory: /
Click "Deploy site"
Your site will be live at https://your-site-name.netlify.app
Vercel (Free Tier)
Push to GitHub
Go to vercel.com
Click "Add New Project"
Import your GitHub repository
Framework Preset: Other
Click "Deploy"
Your site will be live at https://your-project.vercel.app
GitHub Pages (Free)
Push code to GitHub
Go to repository Settings → Pages
Source: Deploy from a branch
Branch: main / root
Click "Save"
Your site will be live at https://yourusername.github.io/weather-dashboard
Author
Your Name - Aspiring Web Developer / Student
GitHub: yourusername | Email: your.email@example.com
License
MIT
