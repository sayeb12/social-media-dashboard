import React, { useState } from 'react';
import {
  Card,
  CardContent,
  Avatar,
  Typography,
  Box,
  IconButton,
  Modal,
  Button,
  TextField,
} from '@mui/material';
import {
  Add as AddIcon,
  ChevronLeft as ChevronLeftIcon,
  ChevronRight as ChevronRightIcon,
  Close as CloseIcon,
  PlayArrow as PlayIcon,
  Pause as PauseIcon,
} from '@mui/icons-material';
import { motion, AnimatePresence } from 'framer-motion';
import { useSocialMedia } from '../context/SocialMediaContext';

const StoryComponent = () => {
  const [selectedStory, setSelectedStory] = useState(null);
  const [currentStoryIndex, setCurrentStoryIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const { stories, currentUser } = useSocialMedia();

  const userStories = stories.filter(story => story.userId === currentUser?.id);
  const otherStories = stories.filter(story => story.userId !== currentUser?.id);

  const handleStoryClick = (story, index) => {
    setSelectedStory(story);
    setCurrentStoryIndex(index);
    setIsPlaying(true);
  };

  const handleClose = () => {
    setSelectedStory(null);
    setCurrentStoryIndex(0);
    setIsPlaying(false);
  };

  const handleNext = () => {
    if (selectedStory) {
      const storyGroup = stories.filter(s => s.userId === selectedStory.userId);
      if (currentStoryIndex < storyGroup.length - 1) {
        setCurrentStoryIndex(currentStoryIndex + 1);
      } else {
        const currentUserIndex = stories.findIndex(s => s.userId === selectedStory.userId);
        const nextUser = stories.find((s, i) => i > currentUserIndex && s.userId !== selectedStory.userId);
        if (nextUser) {
          setSelectedStory(nextUser);
          setCurrentStoryIndex(0);
        } else {
          handleClose();
        }
      }
    }
  };

  const handlePrev = () => {
    if (selectedStory) {
      if (currentStoryIndex > 0) {
        setCurrentStoryIndex(currentStoryIndex - 1);
      } else {
        const currentUserIndex = stories.findIndex(s => s.userId === selectedStory.userId);
        const prevUser = stories.find((s, i) => i < currentUserIndex && s.userId !== selectedStory.userId);
        if (prevUser) {
          setSelectedStory(prevUser);
          const prevUserStories = stories.filter(s => s.userId === prevUser.userId);
          setCurrentStoryIndex(prevUserStories.length - 1);
        }
      }
    }
  };

  const StoryCard = ({ story, isAddStory = false }) => {
    if (isAddStory) {
      return (
        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
          <Card
            sx={{
              width: 100,
              height: 180,
              borderRadius: 2,
              cursor: 'pointer',
              position: 'relative',
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            }}
          >
            <CardContent sx={{ height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
              <Avatar
                src={currentUser?.avatar}
                sx={{
                  width: 56,
                  height: 56,
                  border: '3px solid white',
                  mb: 1,
                }}
              />
              <Box
                sx={{
                  position: 'absolute',
                  bottom: 40,
                  width: 32,
                  height: 32,
                  borderRadius: '50%',
                  backgroundColor: 'primary.main',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'white',
                  border: '3px solid white',
                }}
              >
                <AddIcon />
              </Box>
              <Typography variant="caption" sx={{ color: 'white', mt: 5, fontWeight: 600 }}>
                Create Story
              </Typography>
            </CardContent>
          </Card>
        </motion.div>
      );
    }

    const storyGroup = stories.filter(s => s.userId === story.userId);
    const progress = ((currentStoryIndex + 1) / storyGroup.length) * 100;

    return (
      <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
        <Card
          onClick={() => handleStoryClick(story, 0)}
          sx={{
            width: 100,
            height: 180,
            borderRadius: 2,
            cursor: 'pointer',
            position: 'relative',
            overflow: 'hidden',
            backgroundImage: `url(${story.media})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        >
          <Box
            sx={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: 'linear-gradient(to bottom, transparent, rgba(0,0,0,0.7))',
            }}
          />
          <Avatar
            src={story.user.avatar}
            sx={{
              position: 'absolute',
              top: 8,
              left: 8,
              width: 40,
              height: 40,
              border: '3px solid',
              borderColor: 'primary.main',
            }}
          />
          <Typography
            variant="caption"
            sx={{
              position: 'absolute',
              bottom: 8,
              left: 8,
              right: 8,
              color: 'white',
              fontWeight: 600,
              textAlign: 'center',
            }}
          >
            {story.user.name}
          </Typography>
        </Card>
      </motion.div>
    );
  };

  return (
    <>
      <Box sx={{ mb: 3 }}>
        <Typography variant="h6" fontWeight={600} sx={{ mb: 2 }}>
          Stories
        </Typography>
        <Box sx={{ display: 'flex', gap: 2, overflowX: 'auto', pb: 1 }}>
          {/* Create Story Card */}
          <StoryCard isAddStory />

          {/* Other Stories */}
          {otherStories.slice(0, 6).map((story) => (
            <StoryCard key={story.id} story={story} />
          ))}
        </Box>
      </Box>

      {/* Story Viewer Modal */}
      <Modal
        open={!!selectedStory}
        onClose={handleClose}
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Box sx={{ position: 'relative', width: '100%', maxWidth: 400, height: '80vh' }}>
          <AnimatePresence mode="wait">
            {selectedStory && (
              <motion.div
                key={selectedStory.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.1 }}
                style={{ height: '100%' }}
              >
                <Box
                  sx={{
                    height: '100%',
                    borderRadius: 3,
                    overflow: 'hidden',
                    position: 'relative',
                    backgroundImage: `url(${selectedStory.media})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                  }}
                >
                  {/* Progress Bars */}
                  <Box sx={{ position: 'absolute', top: 16, left: 16, right: 16, display: 'flex', gap: 1 }}>
                    {Array.from({ length: stories.filter(s => s.userId === selectedStory.userId).length }).map((_, i) => (
                      <Box
                        key={i}
                        sx={{
                          flex: 1,
                          height: 3,
                          backgroundColor: 'rgba(255,255,255,0.3)',
                          borderRadius: 3,
                          overflow: 'hidden',
                        }}
                      >
                        <Box
                          sx={{
                            width: `${i <= currentStoryIndex ? '100%' : '0%'}`,
                            height: '100%',
                            backgroundColor: 'white',
                            transition: isPlaying ? 'width 5s linear' : 'none',
                          }}
                        />
                      </Box>
                    ))}
                  </Box>

                  {/* Header */}
                  <Box sx={{ position: 'absolute', top: 40, left: 16, right: 16, display: 'flex', alignItems: 'center', gap: 2 }}>
                    <Avatar src={selectedStory.user.avatar} sx={{ width: 40, height: 40 }} />
                    <Box sx={{ flex: 1 }}>
                      <Typography variant="subtitle2" sx={{ color: 'white', fontWeight: 600 }}>
                        {selectedStory.user.name}
                      </Typography>
                      <Typography variant="caption" sx={{ color: 'rgba(255,255,255,0.8)' }}>
                        {new Date(selectedStory.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </Typography>
                    </Box>
                    <IconButton onClick={handleClose} sx={{ color: 'white' }}>
                      <CloseIcon />
                    </IconButton>
                  </Box>

                  {/* Navigation Buttons */}
                  <Box
                    sx={{
                      position: 'absolute',
                      top: 0,
                      bottom: 0,
                      left: 0,
                      width: '30%',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'flex-start',
                      paddingLeft: 2,
                    }}
                    onClick={handlePrev}
                  >
                    <ChevronLeftIcon sx={{ color: 'white', fontSize: 40 }} />
                  </Box>
                  <Box
                    sx={{
                      position: 'absolute',
                      top: 0,
                      bottom: 0,
                      right: 0,
                      width: '30%',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'flex-end',
                      paddingRight: 2,
                    }}
                    onClick={handleNext}
                  >
                    <ChevronRightIcon sx={{ color: 'white', fontSize: 40 }} />
                  </Box>

                  {/* Bottom Controls */}
                  <Box sx={{ position: 'absolute', bottom: 16, left: 16, right: 16 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
                      <TextField
                        placeholder="Send message..."
                        variant="outlined"
                        size="small"
                        fullWidth
                        sx={{
                          backgroundColor: 'rgba(255,255,255,0.1)',
                          backdropFilter: 'blur(10px)',
                          borderRadius: 20,
                          '& .MuiOutlinedInput-root': {
                            color: 'white',
                            '& fieldset': {
                              borderColor: 'rgba(255,255,255,0.2)',
                            },
                            '&:hover fieldset': {
                              borderColor: 'rgba(255,255,255,0.3)',
                            },
                          },
                          '& .MuiInputBase-input::placeholder': {
                            color: 'rgba(255,255,255,0.7)',
                          },
                        }}
                      />
                      <IconButton
                        onClick={() => setIsPlaying(!isPlaying)}
                        sx={{ color: 'white', backgroundColor: 'rgba(255,255,255,0.1)' }}
                      >
                        {isPlaying ? <PauseIcon /> : <PlayIcon />}
                      </IconButton>
                    </Box>
                  </Box>
                </Box>
              </motion.div>
            )}
          </AnimatePresence>
        </Box>
      </Modal>
    </>
  );
};

export default StoryComponent;