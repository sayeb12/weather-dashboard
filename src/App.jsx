import React from 'react';
import {
  Container,
  Box,
  Grid,
  CircularProgress,
  Alert,
  Paper,
  Typography,
  Button,
} from '@mui/material';
import { motion, AnimatePresence } from 'framer-motion';
import { WeatherProvider, useWeather } from './context/WeatherContext';
import Header from './components/Header';
import CurrentWeather from './components/CurrentWeather';
import Forecast from './components/Forecast';
import UnitToggle from './components/UnitToggle';
import { WbSunny, ErrorOutline } from '@mui/icons-material';

// Main App Component
const WeatherAppContent = () => {
  const {
    weatherData,
    toggleFavorite,
    toggleUnit,
    searchLocation,
    getCurrentLocation,
  } = useWeather();

  const { current, forecast, unit, isLoading, error } = weatherData;

  return (
    <Box
      sx={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Animated Background Elements */}
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          overflow: 'hidden',
          zIndex: 0,
        }}
      >
        <motion.div
          animate={{
            x: [0, 100, 0],
            y: [0, 50, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear",
          }}
          style={{
            position: 'absolute',
            width: 300,
            height: 300,
            background: 'radial-gradient(circle, rgba(255,255,255,0.1) 0%, transparent 70%)',
            borderRadius: '50%',
            top: '10%',
            left: '10%',
          }}
        />
        <motion.div
          animate={{
            x: [0, -100, 0],
            y: [0, -50, 0],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "linear",
          }}
          style={{
            position: 'absolute',
            width: 400,
            height: 400,
            background: 'radial-gradient(circle, rgba(255,255,255,0.05) 0%, transparent 70%)',
            borderRadius: '50%',
            bottom: '20%',
            right: '10%',
          }}
        />
      </Box>

      {/* Content */}
      <Box sx={{ position: 'relative', zIndex: 1 }}>
        <Header
          onSearch={searchLocation}
          onLocationClick={getCurrentLocation}
          favoriteCount={weatherData.favorites.length}
        />

        <Container maxWidth="xl" sx={{ py: 4 }}>
          <AnimatePresence>
            {error && (
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
              >
                <Alert
                  severity="error"
                  sx={{ mb: 3, borderRadius: 3 }}
                  action={
                    <Button color="inherit" size="small" onClick={() => window.location.reload()}>
                      Retry
                    </Button>
                  }
                >
                  {error}
                </Alert>
              </motion.div>
            )}
          </AnimatePresence>

          {isLoading ? (
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                minHeight: '70vh',
              }}
            >
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
              >
                <CircularProgress size={80} thickness={4} sx={{ color: 'white', mb: 3 }} />
              </motion.div>
              <Typography variant="h5" sx={{ color: 'white', fontWeight: 600 }}>
                Loading weather data...
              </Typography>
              <Typography variant="body1" sx={{ color: 'rgba(255,255,255,0.8)', mt: 1 }}>
                Fetching the latest forecast for you
              </Typography>
            </Box>
          ) : (
            <>
              {/* Unit Toggle */}
              <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 3 }}>
                <UnitToggle unit={unit} onUnitChange={toggleUnit} />
              </Box>

              {/* Main Content */}
              <Grid container spacing={3}>
                <Grid item xs={12} lg={8}>
                  <CurrentWeather
                    weather={current}
                    unit={unit}
                    onToggleFavorite={() => toggleFavorite(current.location)}
                  />
                  <Forecast forecast={forecast} />
                </Grid>

                <Grid item xs={12} lg={4}>
                  {/* Sidebar */}
                  <Box sx={{ position: 'sticky', top: 100 }}>
                    {/* Favorites */}
                    <motion.div
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5, delay: 0.3 }}
                    >
                      <Paper
                        className="glass-effect"
                        sx={{ p: 3, mb: 3, borderRadius: 3 }}
                      >
                        <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
                          🌟 Favorite Locations
                        </Typography>
                        {weatherData.favorites.length === 0 ? (
                          <Typography variant="body2" sx={{ color: 'text.secondary', textAlign: 'center', py: 2 }}>
                            No favorites yet. Click the heart icon to add!
                          </Typography>
                        ) : (
                          <Box sx={{ maxHeight: 300, overflowY: 'auto' }}>
                            {weatherData.favorites.map((fav, index) => (
                              <Paper
                                key={index}
                                sx={{
                                  p: 2,
                                  mb: 1,
                                  background: 'rgba(0,0,0,0.05)',
                                  cursor: 'pointer',
                                  transition: 'all 0.3s ease',
                                  '&:hover': {
                                    background: 'rgba(0,0,0,0.1)',
                                    transform: 'translateX(5px)',
                                  },
                                }}
                                onClick={() => searchLocation(`${fav.name}, ${fav.country}`)}
                              >
                                <Typography variant="body1" sx={{ fontWeight: 500 }}>
                                  {fav.name}
                                </Typography>
                                <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                                  {fav.country}
                                </Typography>
                              </Paper>
                            ))}
                          </Box>
                        )}
                      </Paper>
                    </motion.div>

                    {/* Recent Searches */}
                    <motion.div
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5, delay: 0.4 }}
                    >
                      <Paper
                        className="glass-effect"
                        sx={{ p: 3, borderRadius: 3 }}
                      >
                        <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
                          🔍 Recent Searches
                        </Typography>
                        {weatherData.recentSearches.length === 0 ? (
                          <Typography variant="body2" sx={{ color: 'text.secondary', textAlign: 'center', py: 2 }}>
                            No recent searches
                          </Typography>
                        ) : (
                          <Box sx={{ maxHeight: 200, overflowY: 'auto' }}>
                            {weatherData.recentSearches.map((search, index) => (
                              <Paper
                                key={index}
                                sx={{
                                  p: 1.5,
                                  mb: 1,
                                  background: 'rgba(0,0,0,0.05)',
                                  cursor: 'pointer',
                                  transition: 'all 0.3s ease',
                                  '&:hover': {
                                    background: 'rgba(0,0,0,0.1)',
                                  },
                                }}
                                onClick={() => searchLocation(search.query)}
                              >
                                <Typography variant="body2">
                                  {search.query}
                                </Typography>
                                <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                                  {new Date(search.timestamp).toLocaleTimeString([], { 
                                    hour: '2-digit', 
                                    minute: '2-digit' 
                                  })}
                                </Typography>
                              </Paper>
                            ))}
                          </Box>
                        )}
                      </Paper>
                    </motion.div>

                    {/* Weather Tips */}
                    <motion.div
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5, delay: 0.5 }}
                    >
                      <Paper
                        className="glass-effect"
                        sx={{ p: 3, mt: 3, borderRadius: 3 }}
                      >
                        <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
                          💡 Weather Tips
                        </Typography>
                        <Box sx={{ '& > *': { mb: 2 } }}>
                          <Paper sx={{ p: 2, background: 'rgba(255,215,0,0.1)' }}>
                            <Typography variant="body2" sx={{ fontWeight: 500 }}>
                              ☀️ Sunny Day
                            </Typography>
                            <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                              Wear sunscreen and stay hydrated
                            </Typography>
                          </Paper>
                          <Paper sx={{ p: 2, background: 'rgba(70,130,180,0.1)' }}>
                            <Typography variant="body2" sx={{ fontWeight: 500 }}>
                              🌧️ Rainy Day
                            </Typography>
                            <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                              Carry an umbrella and wear waterproof shoes
                            </Typography>
                          </Paper>
                          <Paper sx={{ p: 2, background: 'rgba(169,169,169,0.1)' }}>
                            <Typography variant="body2" sx={{ fontWeight: 500 }}>
                              ☁️ Cloudy Day
                            </Typography>
                            <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                              Perfect for outdoor activities without the sun
                            </Typography>
                          </Paper>
                        </Box>
                      </Paper>
                    </motion.div>
                  </Box>
                </Grid>
              </Grid>

              {/* Footer */}
              <Box
                component="footer"
                sx={{
                  mt: 6,
                  pt: 3,
                  borderTop: '1px solid rgba(255,255,255,0.1)',
                  textAlign: 'center',
                }}
              >
                <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.7)' }}>
                  <WbSunny sx={{ fontSize: 16, verticalAlign: 'middle', mr: 1 }} />
                  Weather Dashboard • Built with React & Material-UI • Data updates every 15 minutes
                </Typography>
                <Typography variant="caption" sx={{ color: 'rgba(255,255,255,0.5)', mt: 1, display: 'block' }}>
                  Note: This app uses mock data. Connect to a real weather API for live data.
                </Typography>
              </Box>
            </>
          )}
        </Container>
      </Box>
    </Box>
  );
};

// Main App Component with Provider
const App = () => {
  return (
    <WeatherProvider>
      <WeatherAppContent />
    </WeatherProvider>
  );
};

export default App;