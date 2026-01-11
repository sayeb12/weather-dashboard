import React from 'react';
import {
  Card,
  CardContent,
  Typography,
  Box,
  Chip,
  Grid,
  Divider,
  IconButton,
  Tooltip,
} from '@mui/material';
import {
  Thermostat as TempIcon,
  Opacity as HumidityIcon,
  Air as WindIcon,
  Visibility as VisibilityIcon,
  Compress as PressureIcon,
  WbSunny as SunriseIcon,
  NightsStay as SunsetIcon,
  Favorite as FavoriteIcon,
  Share as ShareIcon,
} from '@mui/icons-material';
import { WiBarometer, WiHumidity, WiStrongWind } from 'react-icons/wi';
import { motion } from 'framer-motion';
import { format } from 'date-fns';

const CurrentWeather = ({ weather, unit, onToggleFavorite }) => {
  if (!weather) return null;

  const {
    location,
    temperature,
    feelsLike,
    condition,
    icon,
    humidity,
    windSpeed,
    windDirection,
    pressure,
    visibility,
    sunrise,
    sunset,
    isFavorite,
  } = weather;

  const getWeatherGradient = (condition) => {
    switch (condition.toLowerCase()) {
      case 'sunny':
      case 'clear':
        return 'sunny-gradient';
      case 'cloudy':
      case 'partly cloudy':
        return 'cloudy-gradient';
      case 'rainy':
      case 'rain':
      case 'drizzle':
        return 'rainy-gradient';
      case 'snow':
      case 'snowy':
        return 'snowy-gradient';
      case 'storm':
      case 'thunderstorm':
        return 'stormy-gradient';
      default:
        return 'sunny-gradient';
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Card className={`weather-card ${getWeatherGradient(condition)}`}>
        <CardContent sx={{ p: 4 }}>
          {/* Header */}
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 3 }}>
            <Box>
              <Typography variant="h3" sx={{ fontWeight: 700, color: 'white', mb: 1 }}>
                {location.name}
              </Typography>
              <Typography variant="h6" sx={{ color: 'rgba(255,255,255,0.9)' }}>
                {location.country} • {format(new Date(), 'EEEE, MMMM d')}
              </Typography>
              <Typography variant="body1" sx={{ color: 'rgba(255,255,255,0.8)' }}>
                {condition}
              </Typography>
            </Box>

            <Box sx={{ display: 'flex', gap: 1 }}>
              <Tooltip title={isFavorite ? "Remove from favorites" : "Add to favorites"}>
                <IconButton
                  onClick={onToggleFavorite}
                  sx={{
                    background: isFavorite ? 'rgba(255,255,255,0.3)' : 'rgba(255,255,255,0.1)',
                    color: 'white',
                    '&:hover': { background: 'rgba(255,255,255,0.2)' },
                  }}
                >
                  <FavoriteIcon sx={{ color: isFavorite ? '#FF4081' : 'white' }} />
                </IconButton>
              </Tooltip>
              <IconButton
                sx={{
                  background: 'rgba(255,255,255,0.1)',
                  color: 'white',
                  '&:hover': { background: 'rgba(255,255,255,0.2)' },
                }}
              >
                <ShareIcon />
              </IconButton>
            </Box>
          </Box>

          {/* Main Weather Info */}
          <Grid container spacing={4}>
            <Grid item xs={12} md={6}>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                <motion.div
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ duration: 3, repeat: Infinity }}
                  style={{ display: 'flex', alignItems: 'center' }}
                >
                  <Typography variant="h1" sx={{ fontWeight: 800, color: 'white', mr: 2 }}>
                    {Math.round(temperature)}°{unit}
                  </Typography>
                </motion.div>
                <Box sx={{ ml: 2 }}>
                  <Typography variant="h5" sx={{ color: 'rgba(255,255,255,0.9)', mb: 1 }}>
                    Feels like {Math.round(feelsLike)}°{unit}
                  </Typography>
                  <Chip
                    label={condition}
                    sx={{
                      background: 'rgba(255,255,255,0.2)',
                      color: 'white',
                      fontWeight: 600,
                      fontSize: '0.9rem',
                    }}
                  />
                </Box>
              </Box>

              {/* Weather Stats */}
              <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 2 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', color: 'white' }}>
                  <WiHumidity size={24} style={{ marginRight: 8 }} />
                  <Box>
                    <Typography variant="body2" sx={{ opacity: 0.9 }}>
                      Humidity
                    </Typography>
                    <Typography variant="h6" sx={{ fontWeight: 600 }}>
                      {humidity}%
                    </Typography>
                  </Box>
                </Box>

                <Box sx={{ display: 'flex', alignItems: 'center', color: 'white' }}>
                  <WiStrongWind size={24} style={{ marginRight: 8 }} />
                  <Box>
                    <Typography variant="body2" sx={{ opacity: 0.9 }}>
                      Wind
                    </Typography>
                    <Typography variant="h6" sx={{ fontWeight: 600 }}>
                      {windSpeed} {unit === 'C' ? 'km/h' : 'mph'}
                    </Typography>
                  </Box>
                </Box>

                <Box sx={{ display: 'flex', alignItems: 'center', color: 'white' }}>
                  <WiBarometer size={24} style={{ marginRight: 8 }} />
                  <Box>
                    <Typography variant="body2" sx={{ opacity: 0.9 }}>
                      Pressure
                    </Typography>
                    <Typography variant="h6" sx={{ fontWeight: 600 }}>
                      {pressure} hPa
                    </Typography>
                  </Box>
                </Box>

                <Box sx={{ display: 'flex', alignItems: 'center', color: 'white' }}>
                  <VisibilityIcon sx={{ mr: 1 }} />
                  <Box>
                    <Typography variant="body2" sx={{ opacity: 0.9 }}>
                      Visibility
                    </Typography>
                    <Typography variant="h6" sx={{ fontWeight: 600 }}>
                      {visibility} km
                    </Typography>
                  </Box>
                </Box>
              </Box>
            </Grid>

            <Grid item xs={12} md={6}>
              <Box sx={{ background: 'rgba(255,255,255,0.1)', borderRadius: 3, p: 3 }}>
                <Typography variant="h6" sx={{ color: 'white', mb: 2, fontWeight: 600 }}>
                  Sunrise & Sunset
                </Typography>
                <Box sx={{ display: 'flex', justifyContent: 'space-around', mb: 3 }}>
                  <Box sx={{ textAlign: 'center' }}>
                    <SunriseIcon sx={{ fontSize: 40, color: '#FFD700', mb: 1 }} />
                    <Typography variant="h6" sx={{ color: 'white', fontWeight: 600 }}>
                      {sunrise}
                    </Typography>
                    <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.8)' }}>
                      Sunrise
                    </Typography>
                  </Box>
                  <Box sx={{ textAlign: 'center' }}>
                    <SunsetIcon sx={{ fontSize: 40, color: '#FF8C00', mb: 1 }} />
                    <Typography variant="h6" sx={{ color: 'white', fontWeight: 600 }}>
                      {sunset}
                    </Typography>
                    <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.8)' }}>
                      Sunset
                    </Typography>
                  </Box>
                </Box>

                <Divider sx={{ borderColor: 'rgba(255,255,255,0.2)', my: 2 }} />

                <Typography variant="h6" sx={{ color: 'white', mb: 2, fontWeight: 600 }}>
                  Wind Details
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Box sx={{ 
                    width: 100, 
                    height: 100, 
                    borderRadius: '50%', 
                    border: '3px solid rgba(255,255,255,0.3)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    position: 'relative'
                  }}>
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                      style={{ position: 'absolute' }}
                    >
                      <Typography variant="h4" sx={{ color: 'white', fontWeight: 800 }}>
                        {windDirection}°
                      </Typography>
                    </motion.div>
                    <Typography variant="caption" sx={{ color: 'rgba(255,255,255,0.8)', position: 'absolute', bottom: 10 }}>
                      Direction
                    </Typography>
                  </Box>
                </Box>
              </Box>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default CurrentWeather;