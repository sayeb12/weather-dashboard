// Mock weather data for development
export const mockCurrentWeather = {
  location: {
    name: "New York",
    country: "United States",
    lat: 40.7128,
    lon: -74.0060,
  },
  temperature: 22,
  feelsLike: 24,
  condition: "Sunny",
  icon: "☀️",
  humidity: 65,
  windSpeed: 12,
  windDirection: 180,
  pressure: 1013,
  visibility: 10,
  sunrise: "06:30 AM",
  sunset: "07:45 PM",
  isFavorite: false,
  lastUpdated: new Date().toISOString(),
};

export const mockForecast = Array.from({ length: 40 }, (_, i) => {
  const date = new Date();
  date.setHours(date.getHours() + i * 3);
  
  const conditions = ["Sunny", "Cloudy", "Rainy", "Partly Cloudy", "Stormy"];
  const condition = conditions[Math.floor(Math.random() * conditions.length)];
  
  return {
    time: date.toISOString(),
    temp: 15 + Math.random() * 15,
    condition: condition,
    humidity: 40 + Math.random() * 40,
    windSpeed: 5 + Math.random() * 20,
    rainChance: condition === "Rainy" || condition === "Stormy" ? Math.floor(Math.random() * 100) : Math.floor(Math.random() * 30),
    temp: {
      day: 20 + Math.random() * 10,
      night: 10 + Math.random() * 5,
      min: 10 + Math.random() * 5,
      max: 25 + Math.random() * 5,
    },
  };
});

// Weather condition mappings
export const getWeatherIcon = (condition) => {
  const conditionLower = condition.toLowerCase();
  if (conditionLower.includes('sun') || conditionLower.includes('clear')) {
    return '☀️';
  } else if (conditionLower.includes('cloud')) {
    return '☁️';
  } else if (conditionLower.includes('rain') || conditionLower.includes('drizzle')) {
    return '🌧️';
  } else if (conditionLower.includes('snow')) {
    return '❄️';
  } else if (conditionLower.includes('storm') || conditionLower.includes('thunder')) {
    return '⛈️';
  } else if (conditionLower.includes('fog') || conditionLower.includes('mist')) {
    return '🌫️';
  }
  return '☀️';
};

// Convert temperature between C and F
export const convertTemperature = (temp, fromUnit, toUnit) => {
  if (fromUnit === toUnit) return temp;
  if (fromUnit === 'C' && toUnit === 'F') {
    return (temp * 9/5) + 32;
  }
  if (fromUnit === 'F' && toUnit === 'C') {
    return (temp - 32) * 5/9;
  }
  return temp;
};

// Format wind direction
export const getWindDirection = (degrees) => {
  const directions = ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW'];
  const index = Math.round((degrees % 360) / 45) % 8;
  return directions[index];
};

// Get weather advice based on conditions
export const getWeatherAdvice = (weather) => {
  const condition = weather.condition.toLowerCase();
  const temp = weather.temperature;
  
  if (condition.includes('storm') || condition.includes('thunder')) {
    return "⚡ Stay indoors and avoid electrical equipment";
  } else if (condition.includes('rain')) {
    return "☔ Don't forget your umbrella!";
  } else if (condition.includes('snow')) {
    return "🧤 Bundle up and drive carefully";
  } else if (condition.includes('fog') || condition.includes('mist')) {
    return "🚗 Drive carefully, low visibility";
  } else if (temp > 30) {
    return "🥵 Stay hydrated and avoid sun exposure";
  } else if (temp < 5) {
    return "🥶 Dress warmly and watch for ice";
  } else if (weather.uvIndex > 7) {
    return "🧴 High UV index, wear sunscreen";
  }
  
  return "😊 Perfect weather for outdoor activities!";
};

// Calculate feels like temperature
export const calculateFeelsLike = (temp, humidity, windSpeed) => {
  // Simplified heat index calculation
  if (temp >= 27) {
    const heatIndex = -8.78469475556 +
      1.61139411 * temp +
      2.33854883889 * humidity +
      -0.14611605 * temp * humidity +
      -0.012308094 * Math.pow(temp, 2) +
      -0.0164248277778 * Math.pow(humidity, 2) +
      0.002211732 * Math.pow(temp, 2) * humidity +
      0.00072546 * temp * Math.pow(humidity, 2) +
      -0.000003582 * Math.pow(temp, 2) * Math.pow(humidity, 2);
    return Math.round(heatIndex);
  }
  
  // Wind chill calculation for cold temperatures
  if (temp <= 10 && windSpeed > 4.8) {
    const windChill = 13.12 + 0.6215 * temp - 11.37 * Math.pow(windSpeed, 0.16) + 0.3965 * temp * Math.pow(windSpeed, 0.16);
    return Math.round(windChill);
  }
  
  return temp;
};