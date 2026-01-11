import React, { useState } from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  IconButton,
  InputBase,
  Paper,
  Button,
  Badge,
  Menu,
  MenuItem,
  Avatar,
} from '@mui/material';
import {
  Search as SearchIcon,
  LocationOn as LocationIcon,
  Favorite as FavoriteIcon,
  Menu as MenuIcon,
  Notifications as NotificationsIcon,
  WbSunny as SunIcon,
} from '@mui/icons-material';
import { motion } from 'framer-motion';

const Header = ({ onSearch, onLocationClick, favoriteCount }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [anchorEl, setAnchorEl] = useState(null);
  const [notificationsAnchor, setNotificationsAnchor] = useState(null);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      onSearch(searchTerm);
      setSearchTerm('');
    }
  };

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const notifications = [
    'Rain expected in 2 hours',
    'Temperature dropping tonight',
    'UV index is high today',
  ];

  return (
    <AppBar 
      position="sticky" 
      sx={{ 
        background: 'rgba(255, 255, 255, 0.95)',
        backdropFilter: 'blur(10px)',
        boxShadow: '0 4px 30px rgba(0, 0, 0, 0.1)',
        borderBottom: '1px solid rgba(255, 255, 255, 0.3)',
      }}
    >
      <Toolbar>
        {/* Logo */}
        <Box sx={{ display: 'flex', alignItems: 'center', mr: 3 }}>
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          >
            <SunIcon sx={{ fontSize: 32, color: '#FFD700', mr: 1 }} />
          </motion.div>
          <Typography
            variant="h5"
            sx={{
              fontWeight: 800,
              background: 'linear-gradient(45deg, #1976d2, #9c27b0)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              letterSpacing: '-0.5px',
            }}
          >
            WeatherDash
          </Typography>
        </Box>

        {/* Search Bar */}
        <Paper
          component="form"
          onSubmit={handleSearch}
          sx={{
            flex: 1,
            maxWidth: 500,
            display: 'flex',
            alignItems: 'center',
            px: 2,
            py: 0.5,
            borderRadius: 20,
            background: 'rgba(0, 0, 0, 0.05)',
            border: '1px solid rgba(0, 0, 0, 0.1)',
          }}
        >
          <SearchIcon sx={{ color: 'text.secondary', mr: 1 }} />
          <InputBase
            placeholder="Search city or location..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            sx={{ flex: 1 }}
          />
        </Paper>

        {/* Action Buttons */}
        <Box sx={{ display: 'flex', alignItems: 'center', ml: 3, gap: 1 }}>
          <IconButton
            onClick={onLocationClick}
            sx={{
              background: 'linear-gradient(45deg, #2196F3, #21CBF3)',
              color: 'white',
              '&:hover': {
                background: 'linear-gradient(45deg, #1976D2, #1EA6D2)',
              },
            }}
          >
            <LocationIcon />
          </IconButton>

          <IconButton
            sx={{
              background: 'linear-gradient(45deg, #FF4081, #F50057)',
              color: 'white',
              '&:hover': {
                background: 'linear-gradient(45deg, #F50057, #C51162)',
              },
            }}
          >
            <Badge badgeContent={favoriteCount} color="error">
              <FavoriteIcon />
            </Badge>
          </IconButton>

          <IconButton
            onClick={(e) => setNotificationsAnchor(e.currentTarget)}
            sx={{
              background: 'linear-gradient(45deg, #FF9800, #FF5722)',
              color: 'white',
              '&:hover': {
                background: 'linear-gradient(45deg, #F57C00, #E64A19)',
              },
            }}
          >
            <Badge badgeContent={notifications.length} color="error">
              <NotificationsIcon />
            </Badge>
          </IconButton>

          <Menu
            anchorEl={notificationsAnchor}
            open={Boolean(notificationsAnchor)}
            onClose={() => setNotificationsAnchor(null)}
          >
            {notifications.map((note, index) => (
              <MenuItem key={index} sx={{ minWidth: 200 }}>
                {note}
              </MenuItem>
            ))}
          </Menu>

          <IconButton
            onClick={handleMenuOpen}
            sx={{
              ml: 1,
              border: '2px solid',
              borderColor: 'primary.main',
            }}
          >
            <Avatar sx={{ width: 32, height: 32 }}>
              <MenuIcon />
            </Avatar>
          </IconButton>

          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleMenuClose}
          >
            <MenuItem>Profile</MenuItem>
            <MenuItem>Settings</MenuItem>
            <MenuItem>Theme</MenuItem>
            <MenuItem>Logout</MenuItem>
          </Menu>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;