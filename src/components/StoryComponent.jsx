import React, { useState, useEffect } from 'react';
import {
  Card,
  CardContent,
  Avatar,
  Typography,
  Box,
  IconButton,
  Modal,
  Button,
  LinearProgress,
} from '@mui/material';
import {
  Add as AddIcon,
  ChevronLeft as ChevronLeftIcon,
  ChevronRight as ChevronRightIcon,
  Close as CloseIcon,
  PlayArrow as PlayIcon,
  Pause as PauseIcon,
  VolumeOff as VolumeOffIcon,
  VolumeUp as VolumeUpIcon,
  MoreVert as MoreIcon,
} from '@mui/icons-material';
import { motion, AnimatePresence } from 'framer-motion';
import { useSocialMedia } from '../context/SocialMediaContext';

const StoryComponent = () => {
  const [selectedStory, setSelectedStory] = useState(null);
  const [currentStoryIndex, setCurrentStoryIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const [progress, setProgress] = useState(0);
  const { stories, currentUser } = useSocialMedia();

  const userStories = stories.filter(story => story.userId === currentUser?.id);
  const otherStories = stories.filter(story => story.userId !== currentUser?.id);

  useEffect(() => {
    let interval;
    if (selectedStory && isPlaying) {
      interval = setInterval(() => {
        setProgress(prev => {
          if (prev >= 100) {
            handleNext();
            return 0;
          }
          return prev + (100 / 5000); // 5 seconds per story
        });
      }, 10);
    }
    return () => clearInterval(interval);
  }, [selectedStory, isPlaying]);

  const handleStoryClick = (story) => {
    const storyGroup = stories.filter(s => s.userId === story.userId);
    const index = storyGroup.findIndex(s => s.id === story.id);
    setSelectedStory(story);
    setCurrentStoryIndex(index);
    setIsPlaying(true);
    setProgress(0);
  };

  const handleClose = () => {
    setSelectedStory(null);
    setCurrentStoryIndex(0);
    setIsPlaying(false);
    setProgress(0);
  };

  const handleNext = () => {
    if (selectedStory) {
      const storyGroup = stories.filter(s => s.userId === selectedStory.userId);
      if (currentStoryIndex < storyGroup.length - 1) {
        setCurrentStoryIndex(prev => prev + 1);
        setProgress(0);
      } else {
        const currentUserIndex = stories.findIndex(s => s.id === selectedStory.id);
        const nextUserStory = stories.slice(currentUserIndex + 1).find(s => s.userId !== selectedStory.userId);
        if (nextUserStory) {
          handleStoryClick(nextUserStory);
        } else {
          handleClose();
        }
      }
    }
  };

  const handlePrev = () => {
    if (selectedStory) {
      const storyGroup = stories.filter(s => s.userId === selectedStory.userId);
      if (currentStoryIndex > 0) {
        setCurrentStoryIndex(prev => prev - 1);
        setProgress(0);
      } else {
        const currentUserIndex = stories.findIndex(s => s.id === selectedStory.id);
        const prevUserStory = stories.slice(0, currentUserIndex).reverse().find(s => s.userId !== selectedStory.userId);
        if (prevUserStory) {
          const prevUserGroup = stories.filter(s => s.userId === prevUserStory.userId);
          handleStoryClick(prevUserGroup[prevUserGroup.length - 1]);
        }
      }
    }
  };

  const StoryCard = ({ story, isAddStory = false }) => {
    if (isAddStory) {
      return (
        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
        >
          <Box
            sx={{
              width: 80,
              height: 80,
              position: 'relative',
              cursor: 'pointer',
              mx: 0.5,
            }}
            onClick={() => toast.info('Create story feature coming soon!')}
          >
            <Avatar
              src={currentUser?.avatar}
              sx={{
                width: '100%',
                height: '100%',
                border: '2px solid',
                borderColor: 'grey.300',
              }}
            />
            <Box
              sx={{
                position: 'absolute',
                bottom: 0,
                right: 0,
                width: 24,
                height: 24,
                borderRadius: '50%',
                backgroundColor: 'primary.main',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'white',
                border: '2px solid white',
              }}
            >
              <AddIcon sx={{ fontSize: 16 }} />
            </Box>
            <Typography
              variant="caption"
              sx={{
                position: 'absolute',
                bottom: -20,
                left: 0,
                right: 0,
                textAlign: 'center',
                fontSize: '0.7rem',
                color: 'text.secondary',
                fontWeight: 500,
              }}
            >
              Your story
            </Typography>
          </Box>
        </motion.div>
      );
    }

    const storyGroup = stories.filter(s => s.userId === story.userId);
    const hasUnseen = storyGroup.some(s => !s.seen);

    return (
      <motion.div
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
      >
        <Box
          sx={{
            width: 80,
            height: 80,
            position: 'relative',
            cursor: 'pointer',
            mx: 0.5,
          }}
          onClick={() => handleStoryClick(story)}
        >
          <Box
            sx={{
              width: '100%',
              height: '100%',
              borderRadius: '50%',
              padding: '2px',
              background: hasUnseen
                ? 'linear-gradient(45deg, #f09433 0%, #e6683c 25%, #dc2743 50%, #cc2366 75%, #bc1888 100%)'
                : 'linear-gradient(45deg, #9CA3AF 0%, #6B7280 100%)',
            }}
          >
            <Avatar
              src={story.user.avatar}
              sx={{
                width: '100%',
                height: '100%',
                border: '2px solid white',
              }}
            />
          </Box>
          <Typography
            variant="caption"
            sx={{
              position: 'absolute',
              bottom: -20,
              left: 0,
              right: 0,
              textAlign: 'center',
              fontSize: '0.7rem',
              color: 'text.secondary',
              fontWeight: 500,
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
            }}
          >
            {story.user.name.split(' ')[0]}
          </Typography>
        </Box>
      </motion.div>
    );
  };

  const CurrentStory = selectedStory && stories.find(s => s.userId === selectedStory.userId && 
    stories.filter(st => st.userId === selectedStory.userId)[currentStoryIndex]?.id === s.id);

  return (
    <>
      <Box sx={{ mb: 3, px: { xs: 1, sm: 0 } }}>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            mb: 2,
            px: { xs: 1, sm: 0 },
          }}
        >
          <Typography
            variant="h6"
            fontWeight={600}
            sx={{ fontSize: { xs: '1rem', sm: '1.125rem' } }}
          >
            Stories
          </Typography>
          <Button
            size="small"
            endIcon={<ChevronRightIcon />}
            sx={{
              color: 'text.secondary',
              fontSize: '0.875rem',
              display: { xs: 'none', sm: 'flex' },
            }}
          >
            See all
          </Button>
        </Box>
        <Box
          sx={{
            display: 'flex',
            gap: { xs: 0.5, sm: 1 },
            overflowX: 'auto',
            pb: 1,
            px: { xs: 1, sm: 0 },
            '&::-webkit-scrollbar': {
              display: 'none',
            },
            msOverflowStyle: 'none',
            scrollbarWidth: 'none',
          }}
        >
          {/* Create Story Card */}
          <StoryCard isAddStory />

          {/* Other Stories */}
          {otherStories.slice(0, 8).map((story) => (
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
          backdropFilter: 'blur(10px)',
        }}
      >
        <Box
          sx={{
            position: 'relative',
            width: '100%',
            maxWidth: { xs: '100%', sm: 400 },
            height: { xs: '100%', sm: '80vh' },
            backgroundColor: 'black',
          }}
        >
          <AnimatePresence mode="wait">
            {CurrentStory && (
              <motion.div
                key={CurrentStory.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.1 }}
                style={{ height: '100%' }}
              >
                {/* Progress Bars */}
                <Box
                  sx={{
                    position: 'absolute',
                    top: 8,
                    left: 8,
                    right: 8,
                    display: 'flex',
                    gap: 2,
                    zIndex: 10,
                  }}
                >
                  {stories
                    .filter(s => s.userId === CurrentStory.userId)
                    .map((story, index) => (
                      <Box
                        key={story.id}
                        sx={{
                          flex: 1,
                          height: 2,
                          backgroundColor: 'rgba(255,255,255,0.3)',
                          borderRadius: 1,
                          overflow: 'hidden',
                        }}
                      >
                        <Box
                          sx={{
                            width: `${index === currentStoryIndex ? progress : index < currentStoryIndex ? 100 : 0}%`,
                            height: '100%',
                            backgroundColor: 'white',
                            transition: 'width 0.1s linear',
                          }}
                        />
                      </Box>
                    ))}
                </Box>

                {/* Header */}
                <Box
                  sx={{
                    position: 'absolute',
                    top: 24,
                    left: 16,
                    right: 16,
                    display: 'flex',
                    alignItems: 'center',
                    gap: 2,
                    zIndex: 10,
                  }}
                >
                  <Avatar
                    src={CurrentStory.user.avatar}
                    sx={{ width: 32, height: 32 }}
                  />
                  <Box sx={{ flex: 1 }}>
                    <Typography
                      variant="subtitle2"
                      sx={{ color: 'white', fontWeight: 600 }}
                    >
                      {CurrentStory.user.name}
                    </Typography>
                    <Typography
                      variant="caption"
                      sx={{ color: 'rgba(255,255,255,0.8)' }}
                    >
                      {new Date(CurrentStory.timestamp).toLocaleTimeString([], {
                        hour: '2-digit',
                        minute: '2-digit',
                      })}
                    </Typography>
                  </Box>
                  <IconButton
                    onClick={() => setIsPlaying(!isPlaying)}
                    sx={{ color: 'white' }}
                  >
                    {isPlaying ? <PauseIcon /> : <PlayIcon />}
                  </IconButton>
                  <IconButton
                    onClick={() => setIsMuted(!isMuted)}
                    sx={{ color: 'white' }}
                  >
                    {isMuted ? <VolumeOffIcon /> : <VolumeUpIcon />}
                  </IconButton>
                  <IconButton onClick={handleClose} sx={{ color: 'white' }}>
                    <CloseIcon />
                  </IconButton>
                </Box>

                {/* Story Content */}
                <Box
                  sx={{
                    height: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    overflow: 'hidden',
                  }}
                >
                  {CurrentStory.mediaType === 'image' ? (
                    <img
                      src={CurrentStory.media}
                      alt="Story"
                      style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'contain',
                      }}
                    />
                  ) : (
                    <video
                      src={CurrentStory.media}
                      style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'contain',
                      }}
                      autoPlay
                      muted={isMuted}
                      loop={false}
                    />
                  )}
                </Box>

                {/* Bottom Actions */}
                <Box
                  sx={{
                    position: 'absolute',
                    bottom: 16,
                    left: 16,
                    right: 16,
                    display: 'flex',
                    alignItems: 'center',
                    gap: 2,
                    zIndex: 10,
                  }}
                >
                  <Box sx={{ flex: 1 }}>
                    <input
                      placeholder="Send message"
                      style={{
                        width: '100%',
                        backgroundColor: 'rgba(255,255,255,0.1)',
                        border: 'none',
                        borderRadius: 20,
                        padding: '12px 16px',
                        color: 'white',
                        fontSize: '0.875rem',
                        outline: 'none',
                        backdropFilter: 'blur(10px)',
                      }}
                    />
                  </Box>
                  <IconButton sx={{ color: 'white' }}>
                    <MoreIcon />
                  </IconButton>
                </Box>

                {/* Navigation Areas */}
                <Box
                  sx={{
                    position: 'absolute',
                    top: 0,
                    bottom: 0,
                    left: 0,
                    width: '30%',
                    cursor: 'pointer',
                  }}
                  onClick={handlePrev}
                />
                <Box
                  sx={{
                    position: 'absolute',
                    top: 0,
                    bottom: 0,
                    right: 0,
                    width: '30%',
                    cursor: 'pointer',
                  }}
                  onClick={handleNext}
                />
              </motion.div>
            )}
          </AnimatePresence>
        </Box>
      </Modal>
    </>
  );
};

export default StoryComponent;