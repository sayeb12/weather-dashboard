import React from 'react';
import {
  Card,
  CardContent,
  Typography,
  Box,
  Grid,
  Chip,
  Tab,
  Tabs,
  useTheme,
} from '@mui/material';
import {
  Thermostat as TempIcon,
  Opacity as HumidityIcon,
  Air as WindIcon,
  WbSunny as SunIcon,
  NightsStay as MoonIcon,
  Grain as RainIcon,
} from '@mui/icons-material';
import { WiDaySunny, WiCloudy, WiRain, WiSnow, WiThunderstorm } from 'react-icons/wi';
import { motion } from 'framer-motion';
import { format } from 'date-fns';

const Forecast = ({ forecast }) => {
  const [tabValue, setTabValue] = React.useState(0);
  const theme = useTheme();

  if (!forecast || forecast.length === 0) return null;

  const hourlyForecast = forecast.slice(0, 12); // Next 12 hours
  const dailyForecast = forecast.filter((_, index) => index % 8 === 0).slice(0, 5); // Next 5 days

  const getWeatherIcon = (condition) => {
    const conditionLower = condition.toLowerCase();
    if (conditionLower.includes('sun') || conditionLower.includes('clear')) {
      return <WiDaySunny size={40} color="#FFD700" />;
    } else if (conditionLower.includes('cloud')) {
      return <WiCloudy size={40} color="#A9A9A9" />;
    } else if (conditionLower.includes('rain') || conditionLower.includes('drizzle')) {
      return <WiRain size={40} color="#4682B4" />;
    } else if (conditionLower.includes('snow')) {
      return <WiSnow size={40} color="#E0FFFF" />;
    } else if (conditionLower.includes('storm') || conditionLower.includes('thunder')) {
      return <WiThunderstorm size={40} color="#483D8B" />;
    }
    return <WiDaySunny size={40} color="#FFD700" />;
  };

  const ForecastCard = ({ time, temp, condition, icon, humidity, wind, rainChance, isDaily = false }) => (
    <motion.div
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <Card sx={{
        height: '100%',
        background: 'rgba(255, 255, 255, 0.9)',
        backdropFilter: 'blur(10px)',
        borderRadius: 3,
        transition: 'all 0.3s ease',
        '&:hover': {
          boxShadow: '0 12px 40px rgba(0,0,0,0.15)',
        },
      }}>
        <CardContent sx={{ p: 2, textAlign: 'center' }}>
          <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 1 }}>
            {isDaily ? format(new Date(time), 'EEE') : time}
          </Typography>
          {isDaily && (
            <Typography variant="caption" sx={{ color: 'text.secondary', display: 'block', mb: 1 }}>
              {format(new Date(time), 'MMM d')}
            </Typography>
          )}
          <Box sx={{ my: 2 }}>
            {icon}
          </Box>
          <Typography variant="h5" sx={{ fontWeight: 700, mb: 1 }}>
            {Math.round(temp)}°
          </Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary', mb: 2 }}>
            {condition}
          </Typography>
          
          <Grid container spacing={1} sx={{ mt: 2 }}>
            {humidity && (
              <Grid item xs={6}>
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <HumidityIcon sx={{ fontSize: 16, mr: 0.5, color: theme.palette.primary.main }} />
                  <Typography variant="caption">{humidity}%</Typography>
                </Box>
              </Grid>
            )}
            {wind && (
              <Grid item xs={6}>
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <WindIcon sx={{ fontSize: 16, mr: 0.5, color: theme.palette.secondary.main }} />
                  <Typography variant="caption">{wind} km/h</Typography>
                </Box>
              </Grid>
            )}
            {rainChance !== undefined && (
              <Grid item xs={12}>
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', mt: 1 }}>
                  <RainIcon sx={{ fontSize: 16, mr: 0.5, color: theme.palette.info.main }} />
                  <Typography variant="caption">{rainChance}% rain</Typography>
                </Box>
              </Grid>
            )}
          </Grid>
        </CardContent>
      </Card>
    </motion.div>
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
    >
      <Card className="weather-card" sx={{ mb: 4 }}>
        <CardContent sx={{ p: 3 }}>
          <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 3 }}>
            <Tabs value={tabValue} onChange={(e, newValue) => setTabValue(newValue)}>
              <Tab label="Hourly Forecast" />
              <Tab label="5-Day Forecast" />
              <Tab label="Detailed View" />
            </Tabs>
          </Box>

          {tabValue === 0 && (
            <>
              <Typography variant="h5" sx={{ fontWeight: 600, mb: 3 }}>
                Next 12 Hours
              </Typography>
              <Grid container spacing={2}>
                {hourlyForecast.map((hour, index) => (
                  <Grid item xs={6} sm={4} md={2} key={index}>
                    <ForecastCard
                      time={format(new Date(hour.time), 'ha')}
                      temp={hour.temp}
                      condition={hour.condition}
                      icon={getWeatherIcon(hour.condition)}
                      humidity={hour.humidity}
                      wind={hour.windSpeed}
                      rainChance={hour.rainChance}
                    />
                  </Grid>
                ))}
              </Grid>
            </>
          )}

          {tabValue === 1 && (
            <>
              <Typography variant="h5" sx={{ fontWeight: 600, mb: 3 }}>
                5-Day Forecast
              </Typography>
              <Grid container spacing={2}>
                {dailyForecast.map((day, index) => (
                  <Grid item xs={12} sm={6} md key={index}>
                    <ForecastCard
                      time={day.time}
                      temp={day.temp.day}
                      condition={day.condition}
                      icon={getWeatherIcon(day.condition)}
                      humidity={day.humidity}
                      wind={day.windSpeed}
                      rainChance={day.rainChance}
                      isDaily={true}
                    />
                  </Grid>
                ))}
              </Grid>
            </>
          )}

          {tabValue === 2 && (
            <Box>
              <Typography variant="h5" sx={{ fontWeight: 600, mb: 3 }}>
                Weather Details
              </Typography>
              <Grid container spacing={3}>
                {dailyForecast.map((day, index) => (
                  <Grid item xs={12} key={index}>
                    <Card sx={{ background: 'rgba(0,0,0,0.02)', p: 2 }}>
                      <Grid container alignItems="center" spacing={2}>
                        <Grid item xs={12} md={3}>
                          <Typography variant="h6" sx={{ fontWeight: 600 }}>
                            {format(new Date(day.time), 'EEEE, MMM d')}
                          </Typography>
                        </Grid>
                        <Grid item xs={12} md={9}>
                          <Grid container spacing={2}>
                            <Grid item xs={6} sm={3}>
                              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                <SunIcon sx={{ mr: 1, color: '#FFD700' }} />
                                <Box>
                                  <Typography variant="caption">High</Typography>
                                  <Typography variant="body1" sx={{ fontWeight: 600 }}>
                                    {Math.round(day.temp.max)}°
                                  </Typography>
                                </Box>
                              </Box>
                            </Grid>
                            <Grid item xs={6} sm={3}>
                              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                <MoonIcon sx={{ mr: 1, color: '#4682B4' }} />
                                <Box>
                                  <Typography variant="caption">Low</Typography>
                                  <Typography variant="body1" sx={{ fontWeight: 600 }}>
                                    {Math.round(day.temp.min)}°
                                  </Typography>
                                </Box>
                              </Box>
                            </Grid>
                            <Grid item xs={6} sm={3}>
                              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                <HumidityIcon sx={{ mr: 1, color: theme.palette.primary.main }} />
                                <Box>
                                  <Typography variant="caption">Humidity</Typography>
                                  <Typography variant="body1" sx={{ fontWeight: 600 }}>
                                    {day.humidity}%
                                  </Typography>
                                </Box>
                              </Box>
                            </Grid>
                            <Grid item xs={6} sm={3}>
                              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                <WindIcon sx={{ mr: 1, color: theme.palette.secondary.main }} />
                                <Box>
                                  <Typography variant="caption">Wind</Typography>
                                  <Typography variant="body1" sx={{ fontWeight: 600 }}>
                                    {day.windSpeed} km/h
                                  </Typography>
                                </Box>
                              </Box>
                            </Grid>
                          </Grid>
                          <Box sx={{ mt: 2 }}>
                            <Chip
                              label={day.condition}
                              size="small"
                              sx={{ mr: 1 }}
                            />
                            <Chip
                              label={`Rain: ${day.rainChance}%`}
                              size="small"
                              color="info"
                              variant="outlined"
                            />
                          </Box>
                        </Grid>
                      </Grid>
                    </Card>
                  </Grid>
                ))}
              </Grid>
            </Box>
          )}
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default Forecast;