import React, { useState, useRef } from 'react';
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
} from '@mui/icons-material';
import { motion, AnimatePresence } from 'framer-motion';
import { formatDistanceToNow } from 'date-fns';
import toast from 'react-hot-toast';
import { useSocialMedia } from '../context/SocialMediaContext';

const PostCard = ({ post }) => {
  const [isLiked, setIsLiked] = useState(post.isLiked || false);
  const [isBookmarked, setIsBookmarked] = useState(post.isBookmarked || false);
  const [comment, setComment] = useState('');
  const [showComments, setShowComments] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [showReactions, setShowReactions] = useState(false);
  const [selectedReaction, setSelectedReaction] = useState(null);
  const commentInputRef = useRef(null);
  const { currentUser, addComment, likePost, bookmarkPost } = useSocialMedia();

  const reactions = [
    { emoji: '👍', label: 'Like', icon: <ThumbUpIcon /> },
    { emoji: '❤️', label: 'Love', icon: <HeartIcon /> },
    { emoji: '😂', label: 'Haha', icon: <LaughIcon /> },
    { emoji: '😮', label: 'Wow', icon: <MoodIcon /> },
    { emoji: '😢', label: 'Sad', icon: <SadIcon /> },
    { emoji: '🔥', label: 'Fire', icon: <FireIcon /> },
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
      !isBookmarked ? 'Post bookmarked! 📌' : 'Post removed from bookmarks'
    );
  };

  const handleComment = () => {
    if (comment.trim()) {
      addComment(post.id, comment);
      setComment('');
      toast.success('Comment added! 💬');
    }
  };

  const handleShare = () => {
    toast.success('Post shared! 📤');
  };

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleReactionSelect = (reaction) => {
    setSelectedReaction(reaction);
    setShowReactions(false);
    setIsLiked(true);
    toast.success(`Reacted with ${reaction.emoji}`);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleComment();
    }
  };

  const totalReactions = post.likes + post.loves + post.hahas + post.wows + post.sads + post.fires;
  const timeAgo = formatDistanceToNow(new Date(post.timestamp), { addSuffix: true });

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      whileHover={{ y: -4 }}
    >
      <Card sx={{ mb: 3, overflow: 'visible' }}>
        {/* Post Header */}
        <CardHeader
          avatar={
            <Box sx={{ position: 'relative' }}>
              <Avatar
                src={post.author.avatar}
                sx={{ width: 48, height: 48 }}
              />
              {post.author.isOnline && (
                <Box className="online-status" />
              )}
            </Box>
          }
          action={
            <>
              <IconButton onClick={handleMenuOpen}>
                <MoreIcon />
              </IconButton>
              <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleMenuClose}
              >
                <MenuItem onClick={handleMenuClose}>Save Post</MenuItem>
                <MenuItem onClick={handleMenuClose}>Copy Link</MenuItem>
                <MenuItem onClick={handleMenuClose}>Report</MenuItem>
                <MenuItem onClick={handleMenuClose}>Turn on notifications</MenuItem>
              </Menu>
            </>
          }
          title={
            <Box>
              <Typography variant="subtitle1" fontWeight={600}>
                {post.author.name}
              </Typography>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Typography variant="caption" color="text.secondary">
                  {timeAgo}
                </Typography>
                {post.isEdited && (
                  <Chip label="Edited" size="small" variant="outlined" />
                )}
                {post.privacy === 'friends' && (
                  <Typography variant="caption" color="text.secondary">
                    · Friends
                  </Typography>
                )}
              </Box>
            </Box>
          }
          sx={{ pb: 1 }}
        />

        {/* Post Content */}
        <CardContent sx={{ pt: 0 }}>
          <Typography variant="body1" paragraph>
            {post.content}
          </Typography>

          {/* Post Media */}
          {post.media && (
            <Box
              sx={{
                mt: 2,
                borderRadius: 2,
                overflow: 'hidden',
                position: 'relative',
              }}
            >
              {post.media.type === 'image' ? (
                <Box
                  component="img"
                  src={post.media.url}
                  alt="Post"
                  sx={{
                    width: '100%',
                    maxHeight: 400,
                    objectFit: 'cover',
                    borderRadius: 2,
                  }}
                />
              ) : (
                <Box
                  sx={{
                    position: 'relative',
                    paddingTop: '56.25%', // 16:9 aspect ratio
                    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                  }}
                >
                  <VideoIcon
                    sx={{
                      position: 'absolute',
                      top: '50%',
                      left: '50%',
                      transform: 'translate(-50%, -50%)',
                      fontSize: 48,
                      color: 'white',
                    }}
                  />
                </Box>
              )}
              {post.media.caption && (
                <Typography
                  variant="caption"
                  sx={{
                    position: 'absolute',
                    bottom: 8,
                    left: 8,
                    color: 'white',
                    backgroundColor: 'rgba(0,0,0,0.5)',
                    padding: '2px 8px',
                    borderRadius: 1,
                  }}
                >
                  {post.media.caption}
                </Typography>
              )}
            </Box>
          )}

          {/* Tags */}
          {post.tags && post.tags.length > 0 && (
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mt: 2 }}>
              {post.tags.map((tag) => (
                <Chip
                  key={tag}
                  label={`#${tag}`}
                  size="small"
                  sx={{
                    backgroundColor: 'primary.50',
                    color: 'primary.main',
                  }}
                />
              ))}
            </Box>
          )}

          {/* Reaction Stats */}
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 2 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  backgroundColor: 'primary.50',
                  padding: '4px 8px',
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
                <Typography variant="caption" sx={{ ml: 1, fontWeight: 600 }}>
                  {totalReactions}
                </Typography>
              </Box>
            </Box>
            <Typography variant="caption" color="text.secondary">
              {post.comments.length} comments · {post.shares} shares
            </Typography>
          </Box>
        </CardContent>

        <Divider />

        {/* Post Actions */}
        <CardActions sx={{ px: 2, py: 1 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-around', width: '100%' }}>
            {/* Like/Reaction Button */}
            <Box sx={{ position: 'relative' }}>
              <Tooltip title="Like">
                <Button
                  startIcon={
                    selectedReaction ? (
                      <span style={{ fontSize: '1.2rem' }}>{selectedReaction.emoji}</span>
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
                    minWidth: 'auto',
                    px: 2,
                  }}
                >
                  {selectedReaction?.label || (isLiked ? 'Liked' : 'Like')}
                </Button>
              </Tooltip>

              {/* Reaction Popup */}
              <Box
                className={`reaction-popup ${showReactions ? 'show' : ''}`}
                onMouseEnter={() => setShowReactions(true)}
                onMouseLeave={() => setShowReactions(false)}
              >
                {reactions.map((reaction, index) => (
                  <Tooltip key={index} title={reaction.label}>
                    <span
                      onClick={() => handleReactionSelect(reaction)}
                      style={{ fontSize: '1.5rem' }}
                    >
                      {reaction.emoji}
                    </span>
                  </Tooltip>
                ))}
              </Box>
            </Box>

            {/* Comment Button */}
            <Button
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
                minWidth: 'auto',
                px: 2,
              }}
            >
              Comment
            </Button>

            {/* Share Button */}
            <Button
              startIcon={<ShareIcon />}
              onClick={handleShare}
              sx={{
                color: 'text.secondary',
                minWidth: 'auto',
                px: 2,
              }}
            >
              Share
            </Button>

            {/* Bookmark Button */}
            <IconButton
              onClick={handleBookmark}
              sx={{
                color: isBookmarked ? 'warning.main' : 'text.secondary',
              }}
            >
              {isBookmarked ? <BookmarkIcon /> : <BookmarkBorderIcon />}
            </IconButton>
          </Box>
        </CardActions>

        <Divider />

        {/* Comments Section */}
        <Collapse in={showComments}>
          <Box sx={{ p: 2 }}>
            {/* Add Comment */}
            <Box sx={{ display: 'flex', gap: 1, mb: 3 }}>
              <Avatar
                src={currentUser?.avatar}
                sx={{ width: 32, height: 32 }}
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
                      backgroundColor: 'action.hover',
                    },
                  }}
                />
                <Box
                  sx={{
                    position: 'absolute',
                    right: 8,
                    bottom: 8,
                    display: 'flex',
                    gap: 0.5,
                  }}
                >
                  <IconButton size="small">
                    <EmojiIcon fontSize="small" />
                  </IconButton>
                  <IconButton size="small">
                    <ImageIcon fontSize="small" />
                  </IconButton>
                  <IconButton size="small" onClick={handleComment} disabled={!comment.trim()}>
                    <SendIcon fontSize="small" />
                  </IconButton>
                </Box>
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
                >
                  <Box sx={{ display: 'flex', gap: 1, mb: 2 }}>
                    <Avatar
                      src={comment.author.avatar}
                      sx={{ width: 32, height: 32 }}
                    />
                    <Box sx={{ flex: 1 }}>
                      <Box
                        sx={{
                          backgroundColor: 'action.hover',
                          padding: 2,
                          borderRadius: 2,
                          borderTopLeftRadius: 0,
                        }}
                      >
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
                          <Typography variant="subtitle2" fontWeight={600}>
                            {comment.author.name}
                          </Typography>
                          <Typography variant="caption" color="text.secondary">
                            {formatDistanceToNow(new Date(comment.timestamp), { addSuffix: true })}
                          </Typography>
                        </Box>
                        <Typography variant="body2">
                          {comment.content}
                        </Typography>
                        {comment.likes > 0 && (
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, mt: 1 }}>
                            <LikeIcon sx={{ fontSize: 14, color: 'error.main' }} />
                            <Typography variant="caption" color="text.secondary">
                              {comment.likes}
                            </Typography>
                          </Box>
                        )}
                      </Box>
                      <Box sx={{ display: 'flex', gap: 1, mt: 0.5, ml: 2 }}>
                        <Button size="small" sx={{ minWidth: 'auto', fontSize: '0.75rem' }}>
                          Like
                        </Button>
                        <Button size="small" sx={{ minWidth: 'auto', fontSize: '0.75rem' }}>
                          Reply
                        </Button>
                      </Box>
                    </Box>
                  </Box>
                </motion.div>
              ))}
            </AnimatePresence>
          </Box>
        </Collapse>
      </Card>
    </motion.div>
  );
};

export default PostCard;