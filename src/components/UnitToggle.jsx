import React from 'react';
import { ToggleButton, ToggleButtonGroup, Typography, Box, Tooltip } from '@mui/material';
import { Thermostat } from '@mui/icons-material';
import { motion } from 'framer-motion';

const UnitToggle = ({ unit, onUnitChange }) => {
  const handleUnitChange = (event, newUnit) => {
    if (newUnit !== null) {
      onUnitChange(newUnit);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, delay: 0.4 }}
    >
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
        <Tooltip title="Temperature Unit">
          <Thermostat sx={{ color: 'white', fontSize: 28 }} />
        </Tooltip>
        
        <ToggleButtonGroup
          value={unit}
          exclusive
          onChange={handleUnitChange}
          sx={{
            background: 'rgba(255, 255, 255, 0.1)',
            backdropFilter: 'blur(10px)',
            borderRadius: 3,
            padding: 0.5,
            border: '1px solid rgba(255, 255, 255, 0.2)',
          }}
        >
          <ToggleButton
            value="C"
            sx={{
              borderRadius: 2,
              color: unit === 'C' ? 'white' : 'rgba(255,255,255,0.7)',
              background: unit === 'C' ? 'rgba(25, 118, 210, 0.8)' : 'transparent',
              '&:hover': {
                background: unit === 'C' ? 'rgba(25, 118, 210, 0.9)' : 'rgba(255,255,255,0.1)',
              },
              minWidth: 60,
              fontWeight: 600,
            }}
          >
            °C
          </ToggleButton>
          
          <ToggleButton
            value="F"
            sx={{
              borderRadius: 2,
              color: unit === 'F' ? 'white' : 'rgba(255,255,255,0.7)',
              background: unit === 'F' ? 'rgba(25, 118, 210, 0.8)' : 'transparent',
              '&:hover': {
                background: unit === 'F' ? 'rgba(25, 118, 210, 0.9)' : 'rgba(255,255,255,0.1)',
              },
              minWidth: 60,
              fontWeight: 600,
            }}
          >
            °F
          </ToggleButton>
        </ToggleButtonGroup>
        
        <Typography
          variant="caption"
          sx={{
            color: 'rgba(255,255,255,0.8)',
            background: 'rgba(0,0,0,0.2)',
            padding: '4px 12px',
            borderRadius: 10,
            fontSize: '0.75rem',
          }}
        >
          {unit === 'C' ? 'Celsius' : 'Fahrenheit'}
        </Typography>
      </Box>
    </motion.div>
  );
};

export default UnitToggle;