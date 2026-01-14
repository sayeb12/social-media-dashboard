import React, { useState, useRef } from 'react';
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
  Typography,
  Tooltip,
  Badge,
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
  EmojiEmotions as EmojiIcon,
  GifBox as GifIcon,
  Poll as PollIcon,
  MoreHoriz as MoreIcon,
} from '@mui/icons-material';
import { motion, AnimatePresence } from 'framer-motion';
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
  const [showMoreOptions, setShowMoreOptions] = useState(false);
  const { currentUser, createPost } = useSocialMedia();
  const fileInputRef = useRef(null);

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

  const additionalOptions = [
    { icon: <GifIcon />, label: 'GIF', color: '#8B5CF6' },
    { icon: <PollIcon />, label: 'Poll', color: '#10B981' },
    { icon: <EventIcon />, label: 'Event', color: '#EF4444' },
    { icon: <ArticleIcon />, label: 'Write article', color: '#F59E0B' },
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
    const newMedia = files.slice(0, 10).map(file => ({
      url: URL.createObjectURL(file),
      type: file.type.startsWith('image') ? 'image' : 'video',
      file,
      caption: '',
    }));
    setMedia([...media, ...newMedia]);
  };

  const removeMedia = (index) => {
    setMedia(media.filter((_, i) => i !== index));
  };

  const updateMediaCaption = (index, caption) => {
    setMedia(media.map((item, i) => 
      i === index ? { ...item, caption } : item
    ));
  };

  const handleFeelingSelect = (feelingText) => {
    setFeeling(feelingText);
    setAnchorEl(null);
  };

  const handleTagUser = () => {
    const user = { id: '1', name: 'John Doe', username: 'johndoe' };
    if (!taggedUsers.find(u => u.id === user.id)) {
      setTaggedUsers([...taggedUsers, user]);
    }
  };

  const renderMediaPreview = () => {
    if (media.length === 0) return null;

    return (
      <Box sx={{ mt: 2 }}>
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: media.length === 1 ? '1fr' : 'repeat(2, 1fr)',
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
                gridColumn: media.length === 3 && index === 0 ? 'span 2' : 'auto',
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
              <TextField
                placeholder="Add caption..."
                value={item.caption}
                onChange={(e) => updateMediaCaption(index, e.target.value)}
                size="small"
                sx={{
                  position: 'absolute',
                  bottom: 0,
                  left: 0,
                  right: 0,
                  backgroundColor: 'rgba(0,0,0,0.7)',
                  '& .MuiInputBase-root': {
                    color: 'white',
                    '&::placeholder': {
                      color: 'rgba(255,255,255,0.7)',
                    },
                  },
                  '& .MuiOutlinedInput-notchedOutline': {
                    border: 'none',
                  },
                }}
                InputProps={{
                  sx: { fontSize: '0.75rem', padding: 0.5 },
                }}
              />
            </Box>
          ))}
        </Box>
        <Typography variant="caption" color="text.secondary" sx={{ mt: 0.5 }}>
          {media.length} file{media.length !== 1 ? 's' : ''} selected
        </Typography>
      </Box>
    );
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Card
        sx={{
          mb: 3,
          border: '1px solid',
          borderColor: 'divider',
          borderRadius: { xs: 0, sm: 2 },
          boxShadow: { xs: 'none', sm: '0 1px 2px rgba(0,0,0,0.05)' },
        }}
      >
        <CardContent sx={{ p: { xs: 2, sm: 3 } }}>
          {/* Header */}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
            <Avatar
              src={currentUser?.avatar}
              sx={{ width: 40, height: 40 }}
            />
            <Box sx={{ flex: 1 }}>
              <Typography variant="subtitle1" fontWeight={600}>
                {currentUser?.name}
              </Typography>
              <ToggleButtonGroup
                value={privacy}
                exclusive
                onChange={(e, value) => value && setPrivacy(value)}
                size="small"
                sx={{ mt: 0.5 }}
              >
                {privacyOptions.map((option) => (
                  <Tooltip key={option.value} title={option.label}>
                    <ToggleButton value={option.value} size="small">
                      {option.icon}
                    </ToggleButton>
                  </Tooltip>
                ))}
              </ToggleButtonGroup>
            </Box>
          </Box>

          {/* Content Input */}
          <TextField
            fullWidth
            placeholder={`What's on your mind, ${currentUser?.name?.split(' ')[0]}?`}
            value={content}
            onChange={(e) => setContent(e.target.value)}
            multiline
            rows={3}
            sx={{
              mb: 2,
              '& .MuiOutlinedInput-root': {
                borderRadius: 2,
                border: 'none',
                backgroundColor: 'transparent',
                fontSize: '0.95rem',
                '& fieldset': {
                  border: 'none',
                },
              },
            }}
          />

          {/* Feeling & Location */}
          <AnimatePresence>
            {(feeling || location || taggedUsers.length > 0) && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
              >
                <Box
                  sx={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    gap: 1,
                    mb: 2,
                    p: 1,
                    backgroundColor: 'grey.50',
                    borderRadius: 1,
                  }}
                >
                  {feeling && (
                    <Chip
                      label={feeling}
                      onDelete={() => setFeeling(null)}
                      icon={<MoodIcon />}
                      size="small"
                      sx={{ height: 24 }}
                    />
                  )}
                  {location && (
                    <Chip
                      label={location}
                      onDelete={() => setLocation('')}
                      icon={<LocationIcon />}
                      size="small"
                      sx={{ height: 24 }}
                    />
                  )}
                  {taggedUsers.map((user) => (
                    <Chip
                      key={user.id}
                      label={user.name}
                      onDelete={() =>
                        setTaggedUsers(taggedUsers.filter((u) => u.id !== user.id))
                      }
                      size="small"
                      sx={{ height: 24 }}
                    />
                  ))}
                </Box>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Media Preview */}
          {renderMediaPreview()}

          <Divider sx={{ my: 2 }} />

          {/* Action Buttons */}
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Box sx={{ display: 'flex', gap: 0.5 }}>
              {/* Media Upload */}
              <input
                accept="image/*,video/*"
                style={{ display: 'none' }}
                id="media-upload"
                type="file"
                multiple
                onChange={handleMediaUpload}
                ref={fileInputRef}
              />
              <Tooltip title="Photo/Video">
                <label htmlFor="media-upload">
                  <IconButton
                    component="span"
                    sx={{
                      color: media.length > 0 ? 'primary.main' : 'text.secondary',
                    }}
                  >
                    <Badge badgeContent={media.length} color="primary" max={9}>
                      <ImageIcon />
                    </Badge>
                  </IconButton>
                </label>
              </Tooltip>

              {/* Feeling */}
              <Tooltip title="Feeling/Activity">
                <IconButton
                  color={feeling ? 'primary' : 'default'}
                  onClick={(e) => setAnchorEl(e.currentTarget)}
                >
                  <MoodIcon />
                </IconButton>
              </Tooltip>
              <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={() => setAnchorEl(null)}
                PaperProps={{
                  sx: {
                    maxHeight: 300,
                    width: 200,
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
              <Tooltip title="Tag people">
                <IconButton
                  onClick={handleTagUser}
                  color={taggedUsers.length > 0 ? 'primary' : 'default'}
                >
                  <TagIcon />
                </IconButton>
              </Tooltip>

              {/* Location */}
              <Tooltip title="Check in">
                <IconButton
                  onClick={() => setLocation('New York, USA')}
                  color={location ? 'primary' : 'default'}
                >
                  <LocationIcon />
                </IconButton>
              </Tooltip>

              {/* More Options */}
              <Tooltip title="More options">
                <IconButton onClick={() => setShowMoreOptions(!showMoreOptions)}>
                  <MoreIcon />
                </IconButton>
              </Tooltip>
            </Box>

            <Button
              variant="contained"
              onClick={handleSubmit}
              disabled={!content.trim() && media.length === 0}
              sx={{
                borderRadius: 20,
                px: 3,
                fontWeight: 600,
                fontSize: '0.875rem',
              }}
            >
              Post
            </Button>
          </Box>

          {/* More Options Grid */}
          <AnimatePresence>
            {showMoreOptions && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
              >
                <Box
                  sx={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(2, 1fr)',
                    gap: 1,
                    mt: 2,
                    pt: 2,
                    borderTop: '1px solid',
                    borderColor: 'divider',
                  }}
                >
                  {additionalOptions.map((option, index) => (
                    <Button
                      key={index}
                      startIcon={option.icon}
                      sx={{
                        justifyContent: 'flex-start',
                        color: 'text.secondary',
                        border: '1px solid',
                        borderColor: 'divider',
                        borderRadius: 1,
                        textTransform: 'none',
                        fontSize: '0.875rem',
                        '&:hover': {
                          borderColor: option.color,
                          color: option.color,
                          backgroundColor: `${option.color}10`,
                        },
                      }}
                    >
                      {option.label}
                    </Button>
                  ))}
                </Box>
              </motion.div>
            )}
          </AnimatePresence>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default CreatePost;