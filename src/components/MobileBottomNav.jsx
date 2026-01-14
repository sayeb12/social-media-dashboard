import React, { useState } from 'react';
import { 
  BottomNavigation, 
  BottomNavigationAction, 
  Badge, 
  Box, 
  Paper,
  Fab 
} from '@mui/material';
import {
  Home as HomeIcon,
  Search as SearchIcon,
  AddBox as AddIcon,
  Favorite as FavoriteIcon,
  Person as PersonIcon,
  Notifications as NotificationsIcon,
  Explore as ExploreIcon,
} from '@mui/icons-material';
import { motion } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';

const MobileBottomNav = ({ showAnalytics, onToggleAnalytics, unreadNotifications }) => {
  const [value, setValue] = useState(0);
  const location = useLocation();

  const navItems = [
    { label: 'Home', icon: <HomeIcon />, path: '/' },
    { label: 'Explore', icon: <ExploreIcon />, path: '/explore' },
    { label: 'Create', icon: null, path: '/create' }, // Custom FAB will handle this
    { label: 'Notifications', icon: (
      <Badge badgeContent={unreadNotifications} color="error" max={9}>
        <NotificationsIcon />
      </Badge>
    ), path: '/notifications' },
    { label: 'Profile', icon: <PersonIcon />, path: '/profile' },
  ];

  const handleCreateClick = () => {
    // Scroll to create post component
    const createPostElement = document.getElementById('create-post');
    if (createPostElement) {
      createPostElement.scrollIntoView({ behavior: 'smooth' });
      // Focus on the text field
      const textField = createPostElement.querySelector('textarea');
      if (textField) {
        setTimeout(() => textField.focus(), 300);
      }
    }
  };

  return (
    <Paper 
      sx={{ 
        position: 'fixed', 
        bottom: 0, 
        left: 0, 
        right: 0, 
        zIndex: 1100,
        borderTop: '1px solid',
        borderColor: 'divider',
        borderRadius: '16px 16px 0 0',
        boxShadow: '0 -2px 20px rgba(0,0,0,0.1)',
      }} 
      elevation={3}
    >
      <Box sx={{ position: 'relative', height: 56 }}>
        <BottomNavigation
          showLabels
          value={value}
          onChange={(event, newValue) => {
            setValue(newValue);
            if (navItems[newValue].label === 'Create') {
              handleCreateClick();
            }
          }}
          sx={{
            backgroundColor: 'background.paper',
            height: '100%',
            '& .MuiBottomNavigationAction-root': {
              minWidth: 'auto',
              padding: '8px 12px',
              '&.Mui-selected': {
                color: 'primary.main',
                '& .MuiSvgIcon-root': {
                  transform: 'scale(1.1)',
                },
              },
            },
          }}
        >
          {navItems.map((item, index) => {
            if (item.label === 'Create') {
              return (
                <BottomNavigationAction
                  key={index}
                  icon={
                    <motion.div
                      whileTap={{ scale: 0.9 }}
                      style={{ position: 'relative', top: -30 }}
                    >
                      <Fab
                        color="primary"
                        size="medium"
                        sx={{
                          background: 'linear-gradient(135deg, #3B82F6 0%, #2563EB 100%)',
                          boxShadow: '0 4px 20px rgba(59, 130, 246, 0.4)',
                        }}
                      >
                        <AddIcon />
                      </Fab>
                    </motion.div>
                  }
                  sx={{
                    opacity: 0,
                    pointerEvents: 'none',
                  }}
                />
              );
            }

            return (
              <BottomNavigationAction
                key={index}
                component={Link}
                to={item.path}
                label={item.label}
                icon={item.icon}
                sx={{
                  fontSize: '0.75rem',
                  '& .MuiBottomNavigationAction-label': {
                    fontSize: '0.7rem',
                    opacity: 0.8,
                    mt: 0.5,
                  },
                  '&.Mui-selected .MuiBottomNavigationAction-label': {
                    fontSize: '0.7rem',
                    fontWeight: 600,
                    opacity: 1,
                  },
                }}
              />
            );
          })}
        </BottomNavigation>

        {/* Analytics Toggle Button */}
        <Box
          sx={{
            position: 'absolute',
            top: -40,
            right: 16,
          }}
        >
          <motion.div
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <Fab
              size="small"
              onClick={onToggleAnalytics}
              sx={{
                background: showAnalytics 
                  ? 'linear-gradient(135deg, #10B981 0%, #059669 100%)'
                  : 'linear-gradient(135deg, #8B5CF6 0%, #7C3AED 100%)',
                color: 'white',
                boxShadow: '0 4px 15px rgba(0,0,0,0.2)',
              }}
            >
              {showAnalytics ? <HomeIcon /> : <ExploreIcon />}
            </Fab>
          </motion.div>
        </Box>
      </Box>
    </Paper>
  );
};

export default MobileBottomNav;