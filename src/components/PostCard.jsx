import React, { useState, useRef, useEffect } from 'react';
import {
  Card,
  CardContent,
  CardHeader,
  CardActions,
  Avatar,
  Typography,
  Box,
  IconButton,
  Button,
  TextField,
  Menu,
  MenuItem,
  Collapse,
  Chip,
  Divider,
  Tooltip,
  Badge,
  Dialog,
  DialogContent,
  DialogActions,
  Slide,
  MobileStepper,
} from '@mui/material';
import {
  Favorite as LikeIcon,
  FavoriteBorder as LikeBorderIcon,
  ChatBubbleOutline as CommentIcon,
  Share as ShareIcon,
  Bookmark as BookmarkIcon,
  BookmarkBorder as BookmarkBorderIcon,
  MoreVert as MoreIcon,
  Send as SendIcon,
  EmojiEmotions as EmojiIcon,
  Image as ImageIcon,
  Videocam as VideoIcon,
  LocationOn as LocationIcon,
  Mood as MoodIcon,
  ThumbUp as ThumbUpIcon,
  Favorite as HeartIcon,
  SentimentVerySatisfied as LaughIcon,
  SentimentVeryDissatisfied as SadIcon,
  Whatshot as FireIcon,
  Close as CloseIcon,
  ChevronLeft as ChevronLeftIcon,
  ChevronRight as ChevronRightIcon,
  PlayArrow as PlayIcon,
  Pause as PauseIcon,
  VolumeOff as VolumeOffIcon,
  VolumeUp as VolumeUpIcon,
  ZoomIn as ZoomIcon,
  Fullscreen as FullscreenIcon,
  Flag as FlagIcon,
  Link as LinkIcon,
  Delete as DeleteIcon,
} from '@mui/icons-material';
import { motion, AnimatePresence } from 'framer-motion';
import { formatDistanceToNow } from 'date-fns';
import toast from 'react-hot-toast';
import { useSocialMedia } from '../context/SocialMediaContext';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const PostCard = ({ post }) => {
  const [isLiked, setIsLiked] = useState(post.isLiked || false);
  const [isBookmarked, setIsBookmarked] = useState(post.isBookmarked || false);
  const [comment, setComment] = useState('');
  const [showComments, setShowComments] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [showReactions, setShowReactions] = useState(false);
  const [selectedReaction, setSelectedReaction] = useState(null);
  const [mediaIndex, setMediaIndex] = useState(0);
  const [openMediaDialog, setOpenMediaDialog] = useState(false);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(false);
  const [showFullCaption, setShowFullCaption] = useState(false);
  const commentInputRef = useRef(null);
  const { currentUser, addComment, likePost, bookmarkPost } = useSocialMedia();

  const reactions = [
    { emoji: '👍', label: 'Like', icon: <ThumbUpIcon />, color: '#3B82F6' },
    { emoji: '❤️', label: 'Love', icon: <HeartIcon />, color: '#EF4444' },
    { emoji: '😂', label: 'Haha', icon: <LaughIcon />, color: '#F59E0B' },
    { emoji: '😮', label: 'Wow', icon: <MoodIcon />, color: '#8B5CF6' },
    { emoji: '😢', label: 'Sad', icon: <SadIcon />, color: '#06B6D4' },
    { emoji: '🔥', label: 'Fire', icon: <FireIcon />, color: '#DC2626' },
  ];

  const handleLike = () => {
    setIsLiked(!isLiked);
    likePost(post.id);
    
    if (!isLiked) {
      toast.success('Post liked! ❤️');
    }
  };

  const handleBookmark = () => {
    setIsBookmarked(!isBookmarked);
    bookmarkPost(post.id);
    
    toast.success(
      !isBookmarked ? 'Post saved! 📌' : 'Post removed from saved'
    );
  };

  const handleComment = () => {
    if (comment.trim()) {
      addComment(post.id, comment);
      setComment('');
      toast.success('Comment added! 💬');
    }
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: `Post by ${post.author.name}`,
          text: post.content.substring(0, 100) + '...',
          url: window.location.href,
        });
      } catch (error) {
        console.log('Error sharing:', error);
      }
    } else {
      navigator.clipboard.writeText(window.location.href);
      toast.success('Link copied to clipboard! 📋');
    }
  };

  const handleNextMedia = () => {
    if (mediaIndex < (post.media?.length || 1) - 1) {
      setMediaIndex(prev => prev + 1);
    }
  };

  const handlePrevMedia = () => {
    if (mediaIndex > 0) {
      setMediaIndex(prev => prev - 1);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleComment();
    }
  };

  const totalReactions = post.likes + post.loves + post.hahas + post.wows + post.sads + post.fires;
  const timeAgo = formatDistanceToNow(new Date(post.timestamp), { addSuffix: true });

  // Instagram-style media grid
  const renderMediaGrid = () => {
    if (!post.media || post.media.length === 0) return null;

    const media = post.media[mediaIndex];

    return (
      <Box
        sx={{
          position: 'relative',
          aspectRatio: post.media.length > 1 ? '1/1' : 'auto',
          maxHeight: 600,
          overflow: 'hidden',
          borderRadius: 2,
          backgroundColor: 'grey.900',
          cursor: 'pointer',
          '&:hover .media-overlay': {
            opacity: 1,
          },
        }}
        onClick={() => setOpenMediaDialog(true)}
      >
        {media.type === 'image' ? (
          <img
            src={media.url}
            alt={media.caption || 'Post media'}
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
            }}
          />
        ) : (
          <Box sx={{ position: 'relative', height: '100%' }}>
            <video
              src={media.url}
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
              }}
              loop
              muted={isMuted}
              autoPlay
            />
            <Box
              sx={{
                position: 'absolute',
                bottom: 16,
                left: 0,
                right: 0,
                display: 'flex',
                justifyContent: 'center',
                gap: 2,
              }}
            >
              <IconButton
                onClick={(e) => {
                  e.stopPropagation();
                  setIsPlaying(!isPlaying);
                }}
                sx={{
                  backgroundColor: 'rgba(0,0,0,0.6)',
                  color: 'white',
                  '&:hover': { backgroundColor: 'rgba(0,0,0,0.8)' },
                }}
              >
                {isPlaying ? <PauseIcon /> : <PlayIcon />}
              </IconButton>
              <IconButton
                onClick={(e) => {
                  e.stopPropagation();
                  setIsMuted(!isMuted);
                }}
                sx={{
                  backgroundColor: 'rgba(0,0,0,0.6)',
                  color: 'white',
                  '&:hover': { backgroundColor: 'rgba(0,0,0,0.8)' },
                }}
              >
                {isMuted ? <VolumeOffIcon /> : <VolumeUpIcon />}
              </IconButton>
            </Box>
          </Box>
        )}

        {/* Multiple media indicator */}
        {post.media.length > 1 && (
          <Box
            sx={{
              position: 'absolute',
              top: 16,
              right: 16,
              backgroundColor: 'rgba(0,0,0,0.6)',
              color: 'white',
              padding: '4px 12px',
              borderRadius: 20,
              fontSize: '0.875rem',
              fontWeight: 600,
            }}
          >
            {mediaIndex + 1}/{post.media.length}
          </Box>
        )}

        {/* Media navigation dots */}
        {post.media.length > 1 && (
          <Box
            sx={{
              position: 'absolute',
              bottom: 16,
              left: 0,
              right: 0,
              display: 'flex',
              justifyContent: 'center',
              gap: 1,
            }}
          >
            {post.media.map((_, index) => (
              <Box
                key={index}
                onClick={(e) => {
                  e.stopPropagation();
                  setMediaIndex(index);
                }}
                sx={{
                  width: 8,
                  height: 8,
                  borderRadius: '50%',
                  backgroundColor: index === mediaIndex ? 'primary.main' : 'rgba(255,255,255,0.5)',
                  cursor: 'pointer',
                  transition: 'all 0.3s',
                  '&:hover': {
                    backgroundColor: index === mediaIndex ? 'primary.dark' : 'rgba(255,255,255,0.8)',
                  },
                }}
              />
            ))}
          </Box>
        )}

        {/* Media overlay */}
        <Box
          className="media-overlay"
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'linear-gradient(to top, rgba(0,0,0,0.8), transparent)',
            opacity: 0,
            transition: 'opacity 0.3s',
            padding: 2,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'flex-end',
          }}
        >
          {media.caption && (
            <Typography
              variant="body2"
              sx={{
                color: 'white',
                fontWeight: 500,
                lineHeight: 1.4,
              }}
            >
              {showFullCaption || media.caption.length < 100
                ? media.caption
                : `${media.caption.substring(0, 100)}...`}
              {media.caption.length > 100 && (
                <Button
                  size="small"
                  onClick={(e) => {
                    e.stopPropagation();
                    setShowFullCaption(!showFullCaption);
                  }}
                  sx={{
                    color: 'white',
                    textTransform: 'none',
                    padding: 0,
                    marginLeft: 0.5,
                    minWidth: 'auto',
                  }}
                >
                  {showFullCaption ? 'Show less' : 'See more'}
                </Button>
              )}
            </Typography>
          )}
        </Box>
      </Box>
    );
  };

  // Media dialog for full-screen view
  const MediaDialog = () => (
    <Dialog
      fullScreen
      open={openMediaDialog}
      onClose={() => setOpenMediaDialog(false)}
      TransitionComponent={Transition}
    >
      <DialogContent
        sx={{
          padding: 0,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: 'black',
        }}
      >
        <Box sx={{ position: 'relative', maxWidth: '100%', maxHeight: '100%' }}>
          {post.media[mediaIndex].type === 'image' ? (
            <img
              src={post.media[mediaIndex].url}
              alt="Full screen"
              style={{
                maxWidth: '100%',
                maxHeight: '90vh',
                objectFit: 'contain',
              }}
            />
          ) : (
            <video
              src={post.media[mediaIndex].url}
              style={{
                maxWidth: '100%',
                maxHeight: '90vh',
                objectFit: 'contain',
              }}
              controls
              autoPlay
            />
          )}

          {/* Navigation buttons */}
          {post.media.length > 1 && (
            <>
              <IconButton
                onClick={handlePrevMedia}
                disabled={mediaIndex === 0}
                sx={{
                  position: 'absolute',
                  left: 16,
                  top: '50%',
                  transform: 'translateY(-50%)',
                  backgroundColor: 'rgba(0,0,0,0.5)',
                  color: 'white',
                  '&:hover': { backgroundColor: 'rgba(0,0,0,0.7)' },
                }}
              >
                <ChevronLeftIcon />
              </IconButton>
              <IconButton
                onClick={handleNextMedia}
                disabled={mediaIndex === post.media.length - 1}
                sx={{
                  position: 'absolute',
                  right: 16,
                  top: '50%',
                  transform: 'translateY(-50%)',
                  backgroundColor: 'rgba(0,0,0,0.5)',
                  color: 'white',
                  '&:hover': { backgroundColor: 'rgba(0,0,0,0.7)' },
                }}
              >
                <ChevronRightIcon />
              </IconButton>
            </>
          )}

          {/* Media counter */}
          {post.media.length > 1 && (
            <Box
              sx={{
                position: 'absolute',
                top: 16,
                right: 16,
                backgroundColor: 'rgba(0,0,0,0.6)',
                color: 'white',
                padding: '4px 12px',
                borderRadius: 20,
                fontSize: '0.875rem',
                fontWeight: 600,
              }}
            >
              {mediaIndex + 1}/{post.media.length}
            </Box>
          )}

          {/* Close button */}
          <IconButton
            onClick={() => setOpenMediaDialog(false)}
            sx={{
              position: 'absolute',
              top: 16,
              left: 16,
              backgroundColor: 'rgba(0,0,0,0.5)',
              color: 'white',
              '&:hover': { backgroundColor: 'rgba(0,0,0,0.7)' },
            }}
          >
            <CloseIcon />
          </IconButton>
        </Box>
      </DialogContent>
    </Dialog>
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      whileHover={{ y: -2 }}
    >
      <Card
        sx={{
          mb: 3,
          overflow: 'visible',
          border: '1px solid',
          borderColor: 'divider',
          borderRadius: { xs: 0, sm: 2 },
          boxShadow: { xs: 'none', sm: '0 1px 2px rgba(0,0,0,0.05)' },
        }}
      >
        {/* Post Header */}
        <CardHeader
          avatar={
            <Box sx={{ position: 'relative' }}>
              <Avatar
                src={post.author.avatar}
                sx={{ width: 40, height: 40 }}
              />
              {post.author.isOnline && (
                <Box
                  sx={{
                    position: 'absolute',
                    bottom: 0,
                    right: 0,
                    width: 12,
                    height: 12,
                    backgroundColor: '#10B981',
                    border: '2px solid white',
                    borderRadius: '50%',
                  }}
                />
              )}
            </Box>
          }
          action={
            <>
              <IconButton onClick={(e) => setAnchorEl(e.currentTarget)}>
                <MoreIcon />
              </IconButton>
              <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={() => setAnchorEl(null)}
                PaperProps={{
                  sx: {
                    width: 200,
                    borderRadius: 2,
                  },
                }}
              >
                <MenuItem onClick={() => setAnchorEl(null)}>
                  <BookmarkBorderIcon sx={{ mr: 2, fontSize: 20 }} />
                  Save post
                </MenuItem>
                <MenuItem onClick={handleShare}>
                  <LinkIcon sx={{ mr: 2, fontSize: 20 }} />
                  Copy link
                </MenuItem>
                <MenuItem onClick={() => setAnchorEl(null)}>
                  <FlagIcon sx={{ mr: 2, fontSize: 20, color: 'error.main' }} />
                  Report post
                </MenuItem>
                {post.author.id === currentUser?.id && (
                  <MenuItem onClick={() => setAnchorEl(null)}>
                    <DeleteIcon sx={{ mr: 2, fontSize: 20, color: 'error.main' }} />
                    Delete post
                  </MenuItem>
                )}
              </Menu>
            </>
          }
          title={
            <Box>
              <Typography
                variant="subtitle1"
                fontWeight={600}
                sx={{ fontSize: '0.95rem' }}
              >
                {post.author.name}
              </Typography>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                <Typography
                  variant="caption"
                  color="text.secondary"
                  sx={{ fontSize: '0.75rem' }}
                >
                  {timeAgo}
                </Typography>
                {post.privacy === 'friends' && (
                  <>
                    <Typography variant="caption" color="text.secondary">
                      ·
                    </Typography>
                    <Typography
                      variant="caption"
                      color="text.secondary"
                      sx={{ fontSize: '0.75rem' }}
                    >
                      Friends
                    </Typography>
                  </>
                )}
              </Box>
            </Box>
          }
          sx={{
            px: { xs: 2, sm: 3 },
            py: 2,
            '& .MuiCardHeader-action': {
              margin: 0,
            },
          }}
        />

        {/* Post Content */}
        <CardContent sx={{ px: { xs: 2, sm: 3 }, pt: 0 }}>
          {post.content && (
            <Typography
              variant="body1"
              sx={{
                mb: post.media ? 2 : 0,
                fontSize: '0.95rem',
                lineHeight: 1.5,
              }}
            >
              {post.content}
            </Typography>
          )}

          {/* Media Grid */}
          {post.media && post.media.length > 0 && renderMediaGrid()}

          {/* Tags */}
          {post.tags && post.tags.length > 0 && (
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5, mt: 2 }}>
              {post.tags.map((tag) => (
                <Chip
                  key={tag}
                  label={`#${tag}`}
                  size="small"
                  sx={{
                    fontSize: '0.75rem',
                    backgroundColor: 'primary.50',
                    color: 'primary.main',
                    height: 24,
                  }}
                />
              ))}
            </Box>
          )}

          {/* Reaction Stats */}
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              mt: 2,
              pt: 1,
              borderTop: '1px solid',
              borderColor: 'divider',
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  backgroundColor: 'grey.100',
                  padding: '2px 8px',
                  borderRadius: 2,
                }}
              >
                {reactions.map((reaction, index) => (
                  <Box
                    key={index}
                    sx={{
                      fontSize: '0.875rem',
                      ml: index > 0 ? -0.5 : 0,
                      zIndex: reactions.length - index,
                    }}
                  >
                    {reaction.emoji}
                  </Box>
                ))}
                <Typography
                  variant="caption"
                  sx={{ ml: 1, fontWeight: 600, fontSize: '0.75rem' }}
                >
                  {totalReactions}
                </Typography>
              </Box>
            </Box>
            <Typography
              variant="caption"
              color="text.secondary"
              sx={{ fontSize: '0.75rem' }}
            >
              {post.comments.length} comments · {post.shares} shares
            </Typography>
          </Box>
        </CardContent>

        {/* Post Actions */}
        <CardActions
          sx={{
            px: { xs: 2, sm: 3 },
            py: 0.5,
            borderTop: '1px solid',
            borderColor: 'divider',
          }}
        >
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              width: '100%',
            }}
          >
            {/* Like/Reaction Button */}
            <Box sx={{ position: 'relative', flex: 1 }}>
              <Button
                fullWidth
                startIcon={
                  selectedReaction ? (
                    <span style={{ fontSize: '1.2rem' }}>
                      {selectedReaction.emoji}
                    </span>
                  ) : isLiked ? (
                    <LikeIcon color="error" />
                  ) : (
                    <LikeBorderIcon />
                  )
                }
                onMouseEnter={() => setShowReactions(true)}
                onMouseLeave={() => setTimeout(() => setShowReactions(false), 500)}
                onClick={handleLike}
                sx={{
                  color: isLiked ? 'error.main' : 'text.secondary',
                  justifyContent: 'flex-start',
                  fontSize: '0.875rem',
                  fontWeight: 500,
                  minHeight: 36,
                }}
              >
                {selectedReaction?.label || (isLiked ? 'Liked' : 'Like')}
              </Button>

              {/* Reaction Popup */}
              <Box
                className={`reaction-popup ${showReactions ? 'show' : ''}`}
                onMouseEnter={() => setShowReactions(true)}
                onMouseLeave={() => setShowReactions(false)}
              >
                {reactions.map((reaction, index) => (
                  <motion.div
                    key={index}
                    whileHover={{ scale: 1.3, y: -5 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <Tooltip title={reaction.label} placement="top">
                      <span
                        onClick={() => {
                          handleReactionSelect(reaction);
                          setSelectedReaction(reaction);
                        }}
                        style={{
                          fontSize: '1.8rem',
                          cursor: 'pointer',
                          display: 'block',
                          transition: 'all 0.2s',
                        }}
                      >
                        {reaction.emoji}
                      </span>
                    </Tooltip>
                  </motion.div>
                ))}
              </Box>
            </Box>

            {/* Comment Button */}
            <Button
              fullWidth
              startIcon={<CommentIcon />}
              onClick={() => {
                setShowComments(!showComments);
                if (!showComments) {
                  setTimeout(() => {
                    commentInputRef.current?.focus();
                  }, 100);
                }
              }}
              sx={{
                color: showComments ? 'primary.main' : 'text.secondary',
                justifyContent: 'flex-start',
                fontSize: '0.875rem',
                fontWeight: 500,
                minHeight: 36,
              }}
            >
              Comment
            </Button>

            {/* Share Button */}
            <Button
              fullWidth
              startIcon={<ShareIcon />}
              onClick={handleShare}
              sx={{
                color: 'text.secondary',
                justifyContent: 'flex-start',
                fontSize: '0.875rem',
                fontWeight: 500,
                minHeight: 36,
              }}
            >
              Share
            </Button>
          </Box>
        </CardActions>

        {/* Comments Section */}
        <Collapse in={showComments}>
          <Box sx={{ px: { xs: 2, sm: 3 }, pt: 2, pb: 1 }}>
            {/* Add Comment */}
            <Box sx={{ display: 'flex', gap: 1, mb: 2 }}>
              <Avatar
                src={currentUser?.avatar}
                sx={{ width: 32, height: 32, flexShrink: 0 }}
              />
              <Box sx={{ flex: 1, position: 'relative' }}>
                <TextField
                  inputRef={commentInputRef}
                  fullWidth
                  placeholder="Write a comment..."
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  onKeyPress={handleKeyPress}
                  multiline
                  maxRows={4}
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      borderRadius: 20,
                      backgroundColor: 'grey.50',
                      fontSize: '0.875rem',
                      paddingRight: 8,
                    },
                  }}
                />
                <IconButton
                  size="small"
                  onClick={handleComment}
                  disabled={!comment.trim()}
                  sx={{
                    position: 'absolute',
                    right: 4,
                    top: '50%',
                    transform: 'translateY(-50%)',
                    color: comment.trim() ? 'primary.main' : 'grey.400',
                  }}
                >
                  <SendIcon fontSize="small" />
                </IconButton>
              </Box>
            </Box>

            {/* Comments List */}
            <AnimatePresence>
              {post.comments.map((comment) => (
                <motion.div
                  key={comment.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  layout
                >
                  <Box sx={{ display: 'flex', gap: 1, mb: 2 }}>
                    <Avatar
                      src={comment.author.avatar}
                      sx={{ width: 32, height: 32, flexShrink: 0 }}
                    />
                    <Box sx={{ flex: 1 }}>
                      <Box
                        sx={{
                          backgroundColor: 'grey.50',
                          padding: 1.5,
                          borderRadius: 2,
                          borderTopLeftRadius: 0,
                        }}
                      >
                        <Box
                          sx={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'flex-start',
                            mb: 0.5,
                          }}
                        >
                          <Typography
                            variant="subtitle2"
                            fontWeight={600}
                            sx={{ fontSize: '0.875rem' }}
                          >
                            {comment.author.name}
                          </Typography>
                          <Typography
                            variant="caption"
                            color="text.secondary"
                            sx={{ fontSize: '0.7rem' }}
                          >
                            {formatDistanceToNow(new Date(comment.timestamp), {
                              addSuffix: true,
                            })}
                          </Typography>
                        </Box>
                        <Typography
                          variant="body2"
                          sx={{ fontSize: '0.875rem', lineHeight: 1.4 }}
                        >
                          {comment.content}
                        </Typography>
                        {comment.likes > 0 && (
                          <Box
                            sx={{
                              display: 'flex',
                              alignItems: 'center',
                              gap: 0.5,
                              mt: 0.5,
                            }}
                          >
                            <LikeIcon
                              sx={{ fontSize: 12, color: 'error.main' }}
                            />
                            <Typography
                              variant="caption"
                              color="text.secondary"
                              sx={{ fontSize: '0.7rem' }}
                            >
                              {comment.likes}
                            </Typography>
                          </Box>
                        )}
                      </Box>
                      <Box
                        sx={{
                          display: 'flex',
                          gap: 1,
                          ml: 1,
                          mt: 0.5,
                        }}
                      >
                        <Button
                          size="small"
                          sx={{
                            minWidth: 'auto',
                            fontSize: '0.75rem',
                            padding: '2px 8px',
                            color: 'text.secondary',
                          }}
                        >
                          Like
                        </Button>
                        <Button
                          size="small"
                          sx={{
                            minWidth: 'auto',
                            fontSize: '0.75rem',
                            padding: '2px 8px',
                            color: 'text.secondary',
                          }}
                        >
                          Reply
                        </Button>
                      </Box>
                    </Box>
                  </Box>
                </motion.div>
              ))}
            </AnimatePresence>

            {post.comments.length === 0 && (
              <Typography
                variant="body2"
                color="text.secondary"
                align="center"
                sx={{ py: 2, fontSize: '0.875rem' }}
              >
                No comments yet. Be the first to comment!
              </Typography>
            )}
          </Box>
        </Collapse>
      </Card>

      {/* Media Dialog */}
      <MediaDialog />
    </motion.div>
  );
};

export default PostCard;