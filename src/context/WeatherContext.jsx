import React, { createContext, useState, useContext, useEffect } from 'react';
import { mockCurrentWeather, mockForecast } from '../utils/weatherUtils';

const WeatherContext = createContext();

export const useWeather = () => {
  const context = useContext(WeatherContext);
  if (!context) {
    throw new Error('useWeather must be used within a WeatherProvider');
  }
  return context;
};

export const WeatherProvider = ({ children }) => {
  const [weatherData, setWeatherData] = useState({
    current: mockCurrentWeather,
    forecast: mockForecast,
    unit: 'C',
    favorites: JSON.parse(localStorage.getItem('weatherFavorites')) || [],
    recentSearches: JSON.parse(localStorage.getItem('recentSearches')) || [],
    isLoading: false,
    error: null,
  });

  useEffect(() => {
    localStorage.setItem('weatherFavorites', JSON.stringify(weatherData.favorites));
  }, [weatherData.favorites]);

  useEffect(() => {
    localStorage.setItem('recentSearches', JSON.stringify(weatherData.recentSearches));
  }, [weatherData.recentSearches]);

  const toggleFavorite = (location) => {
    setWeatherData(prev => {
      const isFavorite = prev.favorites.some(fav => 
        fav.name === location.name && fav.country === location.country
      );
      
      let newFavorites;
      if (isFavorite) {
        newFavorites = prev.favorites.filter(fav => 
          !(fav.name === location.name && fav.country === location.country)
        );
      } else {
        newFavorites = [...prev.favorites, {
          name: location.name,
          country: location.country,
          lat: location.lat,
          lon: location.lon,
          addedAt: new Date().toISOString(),
        }];
      }
      
      return {
        ...prev,
        favorites: newFavorites,
        current: {
          ...prev.current,
          isFavorite: !isFavorite,
        },
      };
    });
  };

  const toggleUnit = () => {
    setWeatherData(prev => ({
      ...prev,
      unit: prev.unit === 'C' ? 'F' : 'C',
    }));
  };

  const searchLocation = async (query) => {
    setWeatherData(prev => ({ ...prev, isLoading: true, error: null }));
    
    try {
      // In a real app, this would be an API call
      // For now, we'll simulate with mock data
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const newCurrent = {
        ...mockCurrentWeather,
        location: {
          name: query.split(',')[0].trim() || "Unknown",
          country: query.split(',')[1]?.trim() || "Unknown",
          lat: 40 + Math.random() * 10,
          lon: -70 + Math.random() * 10,
        },
        temperature: 15 + Math.random() * 20,
        condition: ['Sunny', 'Cloudy', 'Rainy', 'Partly Cloudy'][Math.floor(Math.random() * 4)],
        isFavorite: weatherData.favorites.some(fav => 
          fav.name.toLowerCase() === query.toLowerCase()
        ),
      };
      
      setWeatherData(prev => ({
        ...prev,
        current: newCurrent,
        isLoading: false,
        recentSearches: [
          { query, timestamp: new Date().toISOString() },
          ...prev.recentSearches.slice(0, 9),
        ],
      }));
      
    } catch (error) {
      setWeatherData(prev => ({
        ...prev,
        isLoading: false,
        error: 'Failed to fetch weather data',
      }));
    }
  };

  const getCurrentLocation = () => {
    setWeatherData(prev => ({ ...prev, isLoading: true }));
    
    // Simulate geolocation
    setTimeout(() => {
      setWeatherData(prev => ({
        ...prev,
        current: {
          ...prev.current,
          location: {
            name: "Current Location",
            country: "Based on your location",
            lat: 40.7128,
            lon: -74.0060,
          },
        },
        isLoading: false,
      }));
    }, 1500);
  };

  const value = {
    weatherData,
    toggleFavorite,
    toggleUnit,
    searchLocation,
    getCurrentLocation,
  };

  return (
    <WeatherContext.Provider value={value}>
      {children}
    </WeatherContext.Provider>
  );
};