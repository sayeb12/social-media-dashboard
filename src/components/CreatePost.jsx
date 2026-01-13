import React, { useState } from 'react';
import {
  Card,
  CardContent,
  Box,
  Avatar,
  TextField,
  IconButton,
  Button,
  ToggleButton,
  ToggleButtonGroup,
  Divider,
  Menu,
  MenuItem,
  Chip,
  Tooltip,
  Typography
} from '@mui/material';
import {
  Image as ImageIcon,
  Videocam as VideoIcon,
  Event as EventIcon,
  Article as ArticleIcon,
  Mood as MoodIcon,
  Public as PublicIcon,
  People as PeopleIcon,
  Lock as LockIcon,
  Close as CloseIcon,
  AddPhotoAlternate as AddPhotoIcon,
  Tag as TagIcon,
  LocationOn as LocationIcon,
} from '@mui/icons-material';
import { motion } from 'framer-motion';
import { useSocialMedia } from '../context/SocialMediaContext';
import toast from 'react-hot-toast';

const CreatePost = () => {
  const [content, setContent] = useState('');
  const [privacy, setPrivacy] = useState('public');
  const [media, setMedia] = useState([]);
  const [feeling, setFeeling] = useState(null);
  const [location, setLocation] = useState('');
  const [taggedUsers, setTaggedUsers] = useState([]);
  const [anchorEl, setAnchorEl] = useState(null);
  const { currentUser, createPost } = useSocialMedia();

  const privacyOptions = [
    { value: 'public', label: 'Public', icon: <PublicIcon /> },
    { value: 'friends', label: 'Friends', icon: <PeopleIcon /> },
    { value: 'private', label: 'Only me', icon: <LockIcon /> },
  ];

  const feelings = [
    '😊 Feeling happy',
    '😢 Feeling sad',
    '🤔 Feeling thoughtful',
    '🎉 Celebrating',
    '😴 Feeling tired',
    '🤩 Feeling excited',
    '❤️ Feeling loved',
    '🏆 Feeling accomplished',
  ];

  const handleSubmit = () => {
    if (!content.trim() && media.length === 0) {
      toast.error('Please write something or add media');
      return;
    }

    const newPost = {
      content,
      privacy,
      media,
      feeling,
      location,
      taggedUsers,
      timestamp: new Date().toISOString(),
    };

    createPost(newPost);
    
    // Reset form
    setContent('');
    setMedia([]);
    setFeeling(null);
    setLocation('');
    setTaggedUsers([]);
    
    toast.success('Post created successfully! 🎉');
  };

  const handleMediaUpload = (event) => {
    const files = Array.from(event.target.files);
    const newMedia = files.map(file => ({
      url: URL.createObjectURL(file),
      type: file.type.startsWith('image') ? 'image' : 'video',
      file,
    }));
    setMedia([...media, ...newMedia].slice(0, 4)); // Limit to 4 media items
  };

  const removeMedia = (index) => {
    setMedia(media.filter((_, i) => i !== index));
  };

  const handleFeelingSelect = (feelingText) => {
    setFeeling(feelingText);
    setAnchorEl(null);
  };

  const handleTagUser = () => {
    // In a real app, this would open a user search modal
    const user = { id: '1', name: 'Md Sayeb', username: 'Sayeb' };
    if (!taggedUsers.find(u => u.id === user.id)) {
      setTaggedUsers([...taggedUsers, user]);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Card sx={{ mb: 3 }}>
        <CardContent>
          {/* Header */}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
            <Avatar
              src={currentUser?.avatar}
              sx={{ width: 48, height: 48 }}
            />
            <Box sx={{ flex: 1 }}>
              <TextField
                fullWidth
                placeholder={`What's on your mind, ${currentUser?.name?.split(' ')[0]}?`}
                value={content}
                onChange={(e) => setContent(e.target.value)}
                multiline
                rows={3}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    borderRadius: 2,
                    backgroundColor: 'action.hover',
                  },
                }}
              />
            </Box>
          </Box>

          {/* Feeling & Location */}
          {(feeling || location) && (
            <Box sx={{ display: 'flex', gap: 2, mb: 2, flexWrap: 'wrap' }}>
              {feeling && (
                <Chip
                  label={feeling}
                  onDelete={() => setFeeling(null)}
                  icon={<MoodIcon />}
                  color="primary"
                  variant="outlined"
                />
              )}
              {location && (
                <Chip
                  label={location}
                  onDelete={() => setLocation('')}
                  icon={<LocationIcon />}
                  color="secondary"
                  variant="outlined"
                />
              )}
            </Box>
          )}

          {/* Tagged Users */}
          {taggedUsers.length > 0 && (
            <Box sx={{ mb: 2 }}>
              <Typography variant="caption" color="text.secondary" gutterBottom>
                Tagged:
              </Typography>
              <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap', mt: 0.5 }}>
                {taggedUsers.map((user) => (
                  <Chip
                    key={user.id}
                    label={user.name}
                    onDelete={() => setTaggedUsers(taggedUsers.filter(u => u.id !== user.id))}
                    size="small"
                  />
                ))}
              </Box>
            </Box>
          )}

          {/* Media Preview */}
          {media.length > 0 && (
            <Box sx={{ mb: 2 }}>
              <Box
                sx={{
                  display: 'grid',
                  gridTemplateColumns: media.length === 1 ? '1fr' : '1fr 1fr',
                  gap: 1,
                  borderRadius: 2,
                  overflow: 'hidden',
                }}
              >
                {media.map((item, index) => (
                  <Box
                    key={index}
                    sx={{
                      position: 'relative',
                      aspectRatio: '1',
                      borderRadius: 1,
                      overflow: 'hidden',
                    }}
                  >
                    {item.type === 'image' ? (
                      <img
                        src={item.url}
                        alt={`Media ${index + 1}`}
                        style={{
                          width: '100%',
                          height: '100%',
                          objectFit: 'cover',
                        }}
                      />
                    ) : (
                      <video
                        src={item.url}
                        style={{
                          width: '100%',
                          height: '100%',
                          objectFit: 'cover',
                        }}
                      />
                    )}
                    <IconButton
                      size="small"
                      onClick={() => removeMedia(index)}
                      sx={{
                        position: 'absolute',
                        top: 4,
                        right: 4,
                        backgroundColor: 'rgba(0,0,0,0.5)',
                        color: 'white',
                        '&:hover': {
                          backgroundColor: 'rgba(0,0,0,0.7)',
                        },
                      }}
                    >
                      <CloseIcon fontSize="small" />
                    </IconButton>
                  </Box>
                ))}
              </Box>
            </Box>
          )}

          <Divider sx={{ my: 2 }} />

          {/* Action Buttons */}
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Box sx={{ display: 'flex', gap: 1 }}>
              {/* Media Upload */}
              <input
                accept="image/*,video/*"
                style={{ display: 'none' }}
                id="media-upload"
                type="file"
                multiple
                onChange={handleMediaUpload}
              />
              <label htmlFor="media-upload">
                <IconButton component="span" color="primary">
                  <ImageIcon />
                </IconButton>
              </label>

              {/* Feeling */}
              <IconButton
                color={feeling ? 'primary' : 'default'}
                onClick={(e) => setAnchorEl(e.currentTarget)}
              >
                <MoodIcon />
              </IconButton>
              <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={() => setAnchorEl(null)}
                PaperProps={{
                  sx: {
                    maxHeight: 200,
                  },
                }}
              >
                {feelings.map((feelingOption, index) => (
                  <MenuItem
                    key={index}
                    onClick={() => handleFeelingSelect(feelingOption)}
                  >
                    {feelingOption}
                  </MenuItem>
                ))}
              </Menu>

              {/* Tag People */}
              <IconButton onClick={handleTagUser} color={taggedUsers.length > 0 ? 'primary' : 'default'}>
                <TagIcon />
              </IconButton>

              {/* Location */}
              <IconButton onClick={() => setLocation('New York, USA')} color={location ? 'primary' : 'default'}>
                <LocationIcon />
              </IconButton>
            </Box>

            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              {/* Privacy Selector */}
              <ToggleButtonGroup
                value={privacy}
                exclusive
                onChange={(e, value) => value && setPrivacy(value)}
                size="small"
              >
                {privacyOptions.map((option) => (
                  <Tooltip key={option.value} title={option.label}>
                    <ToggleButton value={option.value}>
                      {option.icon}
                    </ToggleButton>
                  </Tooltip>
                ))}
              </ToggleButtonGroup>

              {/* Post Button */}
              <Button
                variant="contained"
                onClick={handleSubmit}
                disabled={!content.trim() && media.length === 0}
                sx={{ borderRadius: 20 }}
              >
                Post
              </Button>
            </Box>
          </Box>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default CreatePost;