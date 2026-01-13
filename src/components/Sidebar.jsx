import React, { useState } from 'react';
import {
  Card,
  CardContent,
  Typography,
  Box,
  Avatar,
  Button,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  IconButton,
  Chip,
  Divider,
  TextField,
  InputAdornment,
  Badge,
} from '@mui/material';
import {
  Search as SearchIcon,
  Add as AddIcon,
  VideoCall as VideoCallIcon,
  MoreHoriz as MoreIcon,
  PersonAdd as PersonAddIcon,
  Check as CheckIcon,
  Group as GroupIcon,
  Event as EventIcon,
  ShoppingBag as ShoppingIcon,
  Bookmark as BookmarkIcon,
  Help as HelpIcon,
  Settings as SettingsIcon,
} from '@mui/icons-material';
import { motion } from 'framer-motion';
import { useSocialMedia } from '../context/SocialMediaContext';

const Sidebar = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const { friends, currentUser, events, groups } = useSocialMedia();

  const onlineFriends = friends.filter(friend => friend.isOnline);
  const suggestedFriends = friends.filter(friend => !friend.isFriend).slice(0, 5);
  const upcomingEvents = events.slice(0, 3);
  const joinedGroups = groups.slice(0, 4);

  const shortcuts = [
    { icon: <GroupIcon />, label: 'Groups', count: 12 },
    { icon: <EventIcon />, label: 'Events', count: 5 },
    { icon: <ShoppingIcon />, label: 'Marketplace', count: null },
    { icon: <BookmarkIcon />, label: 'Saved', count: 24 },
    { icon: <HelpIcon />, label: 'Help & Support', count: null },
    { icon: <SettingsIcon />, label: 'Settings', count: null },
  ];

  return (
    <Box sx={{ position: 'sticky', top: 80 }}>
      {/* User Profile Card */}
      <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
        <Card sx={{ mb: 3 }}>
          <CardContent>
            <Box sx={{ position: 'relative', mb: 2 }}>
              <Box
                sx={{
                  height: 80,
                  borderRadius: 2,
                  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                  mb: 4,
                }}
              />
              <Avatar
                src={currentUser?.avatar}
                sx={{
                  width: 64,
                  height: 64,
                  position: 'absolute',
                  bottom: 0,
                  left: '50%',
                  transform: 'translate(-50%, 50%)',
                  border: '4px solid',
                  borderColor: 'background.paper',
                }}
              />
            </Box>
            <Typography variant="h6" align="center" gutterBottom>
              {currentUser?.name}
            </Typography>
            <Typography variant="body2" color="text.secondary" align="center" gutterBottom>
              @{currentUser?.username}
            </Typography>
            <Box sx={{ display: 'flex', justifyContent: 'center', gap: 1, mb: 2 }}>
              <Chip
                label={`${friends.length} friends`}
                size="small"
                variant="outlined"
              />
              <Chip
                label="Premium"
                size="small"
                color="warning"
              />
            </Box>
            <Button
              fullWidth
              variant="contained"
              sx={{ mb: 1 }}
            >
              View Profile
            </Button>
            <Button
              fullWidth
              variant="outlined"
              startIcon={<VideoCallIcon />}
            >
              Create Room
            </Button>
          </CardContent>
        </Card>
      </motion.div>

      {/* Search */}
      <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.1 }}>
        <Card sx={{ mb: 3 }}>
          <CardContent>
            <TextField
              fullWidth
              placeholder="Search SocialHub"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon />
                  </InputAdornment>
                ),
              }}
              sx={{
                '& .MuiOutlinedInput-root': {
                  borderRadius: 2,
                },
              }}
            />
          </CardContent>
        </Card>
      </motion.div>

      {/* Online Friends */}
      <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }}>
        <Card sx={{ mb: 3 }}>
          <CardContent>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
              <Typography variant="subtitle1" fontWeight={600}>
                Online Friends
              </Typography>
              <IconButton size="small">
                <MoreIcon />
              </IconButton>
            </Box>
            <List sx={{ pt: 0 }}>
              {onlineFriends.slice(0, 5).map((friend) => (
                <ListItem
                  key={friend.id}
                  sx={{
                    px: 0,
                    py: 1,
                    '&:hover': {
                      backgroundColor: 'action.hover',
                      borderRadius: 1,
                    },
                  }}
                >
                  <ListItemAvatar>
                    <Badge
                      overlap="circular"
                      anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                      variant="dot"
                      color="success"
                    >
                      <Avatar src={friend.avatar} sx={{ width: 40, height: 40 }} />
                    </Badge>
                  </ListItemAvatar>
                  <ListItemText
                    primary={
                      <Typography variant="subtitle2" fontWeight={600}>
                        {friend.name}
                      </Typography>
                    }
                    secondary={
                      <Typography variant="caption" color="text.secondary">
                        {friend.mutualFriends} mutual friends
                      </Typography>
                    }
                  />
                  <IconButton size="small">
                    <VideoCallIcon />
                  </IconButton>
                </ListItem>
              ))}
            </List>
            <Button fullWidth variant="text" sx={{ mt: 1 }}>
              See All ({onlineFriends.length})
            </Button>
          </CardContent>
        </Card>
      </motion.div>

      {/* Suggested Friends */}
      <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 }}>
        <Card sx={{ mb: 3 }}>
          <CardContent>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
              <Typography variant="subtitle1" fontWeight={600}>
                People You May Know
              </Typography>
              <IconButton size="small">
                <MoreIcon />
              </IconButton>
            </Box>
            <List sx={{ pt: 0 }}>
              {suggestedFriends.map((friend) => (
                <ListItem
                  key={friend.id}
                  sx={{
                    px: 0,
                    py: 1,
                    '&:hover': {
                      backgroundColor: 'action.hover',
                      borderRadius: 1,
                    },
                  }}
                >
                  <ListItemAvatar>
                    <Avatar src={friend.avatar} sx={{ width: 40, height: 40 }} />
                  </ListItemAvatar>
                  <ListItemText
                    primary={
                      <Typography variant="subtitle2" fontWeight={600}>
                        {friend.name}
                      </Typography>
                    }
                    secondary={
                      <Typography variant="caption" color="text.secondary">
                        {friend.mutualFriends} mutual friends
                      </Typography>
                    }
                  />
                  <IconButton size="small" color="primary">
                    <PersonAddIcon />
                  </IconButton>
                </ListItem>
              ))}
            </List>
          </CardContent>
        </Card>
      </motion.div>

      {/* Upcoming Events */}
      <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.4 }}>
        <Card sx={{ mb: 3 }}>
          <CardContent>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
              <Typography variant="subtitle1" fontWeight={600}>
                Upcoming Events
              </Typography>
              <IconButton size="small">
                <AddIcon />
              </IconButton>
            </Box>
            <List sx={{ pt: 0 }}>
              {upcomingEvents.map((event) => (
                <ListItem
                  key={event.id}
                  sx={{
                    px: 0,
                    py: 1,
                    '&:hover': {
                      backgroundColor: 'action.hover',
                      borderRadius: 1,
                    },
                  }}
                >
                  <ListItemAvatar>
                    <Avatar
                      sx={{
                        width: 40,
                        height: 40,
                        backgroundColor: 'primary.50',
                        color: 'primary.main',
                      }}
                    >
                      <EventIcon />
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText
                    primary={
                      <Typography variant="subtitle2" fontWeight={600}>
                        {event.title}
                      </Typography>
                    }
                    secondary={
                      <Typography variant="caption" color="text.secondary">
                        {event.date} · {event.attendees} going
                      </Typography>
                    }
                  />
                  <Chip
                    label="Going"
                    size="small"
                    color="success"
                    icon={<CheckIcon />}
                  />
                </ListItem>
              ))}
            </List>
          </CardContent>
        </Card>
      </motion.div>

      {/* Your Shortcuts */}
      <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.5 }}>
        <Card>
          <CardContent>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
              <Typography variant="subtitle1" fontWeight={600}>
                Your Shortcuts
              </Typography>
              <IconButton size="small">
                <MoreIcon />
              </IconButton>
            </Box>
            <List sx={{ pt: 0 }}>
              {shortcuts.map((shortcut, index) => (
                <ListItem
                  key={index}
                  button
                  sx={{
                    px: 0,
                    py: 1,
                    borderRadius: 1,
                  }}
                >
                  <ListItemAvatar>
                    <Avatar
                      sx={{
                        width: 32,
                        height: 32,
                        backgroundColor: 'action.hover',
                        color: 'text.secondary',
                      }}
                    >
                      {shortcut.icon}
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText
                    primary={shortcut.label}
                  />
                  {shortcut.count !== null && (
                    <Chip
                      label={shortcut.count}
                      size="small"
                      sx={{ height: 20 }}
                    />
                  )}
                </ListItem>
              ))}
            </List>
          </CardContent>
        </Card>
      </motion.div>
    </Box>
  );
};

export default Sidebar;