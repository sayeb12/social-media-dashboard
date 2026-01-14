import React, { useState } from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  IconButton,
  Badge,
  InputBase,
  Avatar,
  Menu,
  MenuItem,
  Button,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
  Switch,
  Chip,
} from '@mui/material';
import {
  Menu as MenuIcon,
  Search as SearchIcon,
  Home as HomeIcon,
  People as PeopleIcon,
  ChatBubble as ChatIcon,
  Notifications as NotificationsIcon,
  DarkMode as DarkModeIcon,
  LightMode as LightModeIcon,
  Person as PersonIcon,
  Settings as SettingsIcon,
  Logout as LogoutIcon,
  TrendingUp as TrendingIcon,
  VideoCameraFront as VideoIcon,
  Store as StoreIcon,
  Groups as GroupsIcon,
  Event as EventIcon,
  Bookmark as BookmarkIcon,
  Add as AddIcon,
} from '@mui/icons-material';
import { motion } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';
import { useSocialMedia } from '../context/SocialMediaContext';

const Header = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [notificationsAnchor, setNotificationsAnchor] = useState(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { user, notifications, toggleTheme, isDarkMode, unreadNotifications } = useSocialMedia();
  const location = useLocation();

  const navItems = [
    { label: 'Home', icon: <HomeIcon />, path: '/' },
    { label: 'Friends', icon: <PeopleIcon />, path: '/friends' },
    { label: 'Groups', icon: <GroupsIcon />, path: '/groups' },
    { label: 'Watch', icon: <VideoIcon />, path: '/watch' },
    { label: 'Marketplace', icon: <StoreIcon />, path: '/marketplace' },
    { label: 'Events', icon: <EventIcon />, path: '/events' },
  ];

  const userMenuItems = [
    { label: 'Profile', icon: <PersonIcon />, path: `/profile/${user?.id}` },
    { label: 'Saved', icon: <BookmarkIcon />, path: '/saved' },
    { label: 'Settings', icon: <SettingsIcon />, path: '/settings' },
    { label: 'Logout', icon: <LogoutIcon />, path: '/logout' },
  ];

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

    return (
    <>
      <AppBar 
        position="sticky" 
        sx={{ 
          background: isDarkMode ? '#1F2937' : 'white',
          boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.1)',
          borderBottom: '1px solid',
          borderColor: 'divider',
        }}
      >
        <Toolbar sx={{ 
          justifyContent: 'space-between', 
          px: { xs: 1, sm: 2, md: 3 },
          minHeight: { xs: 56, sm: 64 },
        }}>
          {/* Left: Logo & Mobile Menu */}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: { xs: 1, sm: 2 } }}>
            <IconButton
              color="inherit"
              onClick={onMenuClick}
              sx={{ display: { md: 'none' } }}
            >
              <MenuIcon />
            </IconButton>

            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <motion.div
                animate={{ rotate: [0, 360] }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              >
                <TrendingIcon sx={{ 
                  fontSize: { xs: 24, sm: 28, md: 32 }, 
                  color: 'primary.main',
                  background: 'linear-gradient(135deg, #3B82F6 0%, #8B5CF6 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                }} />
              </motion.div>
              <Typography
                variant="h6"
                sx={{
                  fontWeight: 800,
                  letterSpacing: '-0.5px',
                  display: { xs: 'none', sm: 'block' },
                  background: 'linear-gradient(135deg, #3B82F6 0%, #8B5CF6 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  fontSize: { sm: '1.1rem', md: '1.25rem' },
                }}
              >
                Social<span style={{ color: isDarkMode ? '#10B981' : '#059669' }}>Hub</span>
              </Typography>
            </Box>

            {/* Desktop Navigation */}
            <Box sx={{ display: { xs: 'none', md: 'flex' }, gap: 1, ml: 3 }}>
              {navItems.map((item) => (
                <Button
                  key={item.label}
                  component={Link}
                  to={item.path}
                  color="inherit"
                  startIcon={item.icon}
                  sx={{
                    borderRadius: 2,
                    px: 2,
                    color: location.pathname === item.path ? 'primary.main' : 'text.secondary',
                    '&:hover': {
                      backgroundColor: 'action.hover',
                    },
                    fontSize: '0.875rem',
                  }}
                >
                  {item.label}
                </Button>
              ))}
            </Box>
          </Box>

          {/* Center: Search Bar */}
          <Box
            sx={{
              display: { xs: 'none', md: 'flex' },
              flex: 1,
              maxWidth: 500,
              mx: 4,
              position: 'relative',
            }}
          >
            <SearchIcon
              sx={{
                position: 'absolute',
                left: 12,
                top: '50%',
                transform: 'translateY(-50%)',
                color: 'text.secondary',
              }}
            />
            <InputBase
              placeholder="Search SocialHub..."
              sx={{
                width: '100%',
                backgroundColor: isDarkMode ? '#374151' : '#F3F4F6',
                borderRadius: 20,
                px: 4,
                py: 0.75,
                fontSize: '0.875rem',
                '&:hover': {
                  backgroundColor: isDarkMode ? '#4B5563' : '#E5E7EB',
                },
                '& .MuiInputBase-input': {
                  color: isDarkMode ? 'white' : 'text.primary',
                  '&::placeholder': {
                    color: 'text.secondary',
                  },
                },
              }}
            />
          </Box>

          {/* Right: Action Icons */}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: { xs: 0.5, sm: 1 } }}>
            {/* Search Mobile */}
            <IconButton 
              color="inherit" 
              sx={{ display: { md: 'none' } }}
              size="small"
            >
              <SearchIcon />
            </IconButton>

            {/* Create Post - Desktop */}
            <Button
              variant="contained"
              startIcon={<AddIcon />}
              sx={{
                borderRadius: 20,
                px: 2,
                display: { xs: 'none', sm: 'flex' },
                fontSize: '0.875rem',
                py: 0.75,
              }}
            >
              Create
            </Button>

            {/* Theme Toggle */}
            <IconButton 
              onClick={toggleTheme} 
              color="inherit"
              size="small"
            >
              {isDarkMode ? <LightModeIcon /> : <DarkModeIcon />}
            </IconButton>

            {/* Messenger */}
            <IconButton 
              color="inherit"
              size="small"
            >
              <Badge badgeContent={3} color="error">
                <ChatIcon />
              </Badge>
            </IconButton>

            {/* Notifications */}
            <IconButton
              color="inherit"
              onClick={(e) => setNotificationsAnchor(e.currentTarget)}
              size="small"
            >
              <Badge badgeContent={unreadNotifications} color="error">
                <NotificationsIcon />
              </Badge>
            </IconButton>

            {/* User Menu */}
            <IconButton 
              onClick={handleMenuOpen} 
              sx={{ ml: { xs: 0, sm: 1 } }}
              size="small"
            >
              <Avatar
                src={user?.avatar}
                sx={{
                  width: { xs: 32, sm: 36 },
                  height: { xs: 32, sm: 36 },
                  border: '2px solid',
                  borderColor: 'primary.main',
                }}
              >
                {user?.name?.charAt(0)}
              </Avatar>
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>

      {/* Mobile Drawer */}
      <Drawer
        anchor="left"
        open={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
        PaperProps={{
          sx: {
            width: 280,
            borderRadius: '0 16px 16px 0',
          },
        }}
      >
        <Box sx={{ p: 2 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 3 }}>
            <TrendingIcon sx={{ fontSize: 32, color: 'primary.main' }} />
            <Typography variant="h6" fontWeight={800}>
              BDSocial
            </Typography>
          </Box>
          <List>
            {navItems.map((item) => (
              <ListItem
                key={item.label}
                button
                component={Link}
                to={item.path}
                onClick={() => setMobileMenuOpen(false)}
                sx={{
                  borderRadius: 2,
                  mb: 1,
                  backgroundColor: location.pathname === item.path ? 'action.selected' : 'transparent',
                  '&:hover': {
                    backgroundColor: 'action.hover',
                  },
                }}
              >
                <ListItemIcon sx={{ minWidth: 40 }}>
                  {item.icon}
                </ListItemIcon>
                <ListItemText primary={item.label} />
              </ListItem>
            ))}
          </List>
          <Divider sx={{ my: 2 }} />
          <Box sx={{ p: 2 }}>
            <Typography variant="subtitle2" color="text.secondary" gutterBottom>
              Quick Links
            </Typography>
            <List>
              <ListItem button>
                <ListItemIcon>
                  <SettingsIcon />
                </ListItemIcon>
                <ListItemText primary="Settings" />
              </ListItem>
              <ListItem button>
                <ListItemIcon>
                  <BookmarkIcon />
                </ListItemIcon>
                <ListItemText primary="Saved Posts" />
              </ListItem>
            </List>
          </Box>
          <Divider sx={{ my: 2 }} />
          <Box sx={{ p: 2 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                {isDarkMode ? <LightModeIcon /> : <DarkModeIcon />}
                <Typography>
                  {isDarkMode ? 'Light Mode' : 'Dark Mode'}
                </Typography>
              </Box>
              <Switch checked={isDarkMode} onChange={toggleTheme} />
            </Box>
          </Box>
        </Box>
      </Drawer>
    </>
  );
};

export default Header;