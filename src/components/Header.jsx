// src/components/Header.jsx
import React from 'react';
import PropTypes from 'prop-types';
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  InputBase,
  Box,
  Badge,
  Avatar,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import { styled, alpha } from '@mui/material/styles';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import NotificationsIcon from '@mui/icons-material/Notifications';
import ChatIcon from '@mui/icons-material/Chat';
import MoreVertIcon from '@mui/icons-material/MoreVert';

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.06),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.09),
  },
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(1),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 1),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInput = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  paddingLeft: `calc(1em + ${theme.spacing(4)})`,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    width: '24ch',
  },
}));

const Header = ({ onMenuClick = () => {} }) => {
  const theme = useTheme();
  const isSmall = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <AppBar position="sticky" color="transparent" elevation={0} sx={{ backdropFilter: 'blur(6px)' }}>
      <Toolbar sx={{ gap: 2 }}>
        {/* Menu button (mobile) */}
        <IconButton
          edge="start"
          color="inherit"
          aria-label="open menu"
          onClick={() => {
            // defensively call the prop if present
            try {
              onMenuClick?.();
            } catch (err) {
              // swallow any error to avoid breaking render
              // useful during development if onMenuClick isn't a function
              // eslint-disable-next-line no-console
              console.warn('onMenuClick handler threw:', err);
            }
          }}
          sx={{ mr: 1, display: { xs: 'inline-flex', md: 'none' } }}
        >
          <MenuIcon />
        </IconButton>

        {/* Brand / Title */}
        <Typography variant="h6" component="div" sx={{ fontWeight: 700 }}>
          SayebSocial
        </Typography>

        {/* Search */}
        <Box sx={{ flexGrow: 1, display: 'flex', alignItems: 'center' }}>
          <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInput placeholder="Search…" inputProps={{ 'aria-label': 'search' }} />
          </Search>
        </Box>

        {/* Icons */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <IconButton aria-label="notifications" color="inherit">
            <Badge badgeContent={3} color="error">
              <NotificationsIcon />
            </Badge>
          </IconButton>

          <IconButton aria-label="messages" color="inherit">
            <Badge badgeContent={2} color="error">
              <ChatIcon />
            </Badge>
          </IconButton>

          {/* Profile Avatar or more icon on very small screens */}
          {isSmall ? (
            <IconButton color="inherit" aria-label="more">
              <MoreVertIcon />
            </IconButton>
          ) : (
            <IconButton color="inherit" aria-label="profile">
              <Avatar sx={{ width: 32, height: 32 }}>U</Avatar>
            </IconButton>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
};

Header.propTypes = {
  // onMenuClick should be a function; if not provided we default to a noop
  onMenuClick: PropTypes.func,
};

export default Header;
