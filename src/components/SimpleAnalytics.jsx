import React from 'react';
import {
  Card,
  CardContent,
  Typography,
  Box,
  Grid,
  LinearProgress,
  Chip,
  IconButton,
} from '@mui/material';
import {
  TrendingUp,
  People,
  Visibility,
  ThumbUp,
  ChatBubble,
  MoreVert,
} from '@mui/icons-material';
import { motion } from 'framer-motion';

const SimpleAnalytics = () => {
  const statsCards = [
    {
      title: 'Total Friends',
      value: '48',
      change: '+12.5%',
      icon: <People />,
      color: '#3B82F6',
      progress: 75,
    },
    {
      title: 'Engagement Rate',
      value: '4.8%',
      change: '+2.3%',
      icon: <TrendingUp />,
      color: '#10B981',
      progress: 48,
    },
    {
      title: 'Post Reach',
      value: '1.2K',
      change: '+18.7%',
      icon: <Visibility />,
      color: '#8B5CF6',
      progress: 65,
    },
    {
      title: 'Avg. Likes',
      value: '125',
      change: '+5.2%',
      icon: <ThumbUp />,
      color: '#EF4444',
      progress: 85,
    },
  ];

  const engagementData = [
    { day: 'Mon', value: 85 },
    { day: 'Tue', value: 120 },
    { day: 'Wed', value: 95 },
    { day: 'Thu', value: 150 },
    { day: 'Fri', value: 180 },
    { day: 'Sat', value: 210 },
    { day: 'Sun', value: 190 },
  ];

  const topPosts = [
    {
      id: 1,
      title: 'React Project Completion',
      engagement: 95,
      likes: 125,
      comments: 24,
    },
    {
      id: 2,
      title: 'Weekend at Cox\'s Bazar',
      engagement: 87,
      likes: 89,
      comments: 18,
    },
    {
      id: 3,
      title: 'UI Design Showcase',
      engagement: 82,
      likes: 76,
      comments: 15,
    },
  ];

  const topFriends = [
    { name: 'Rafael Rafin', interactions: 245, avatar: '/assets/images/rafi1.jpeg' },
    { name: 'Samiya Rahman', interactions: 189, avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=400&h=400&fit=crop' },
    { name: 'Ubaida Ahmed', interactions: 167, avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop' },
  ];

  const StatsCard = ({ title, value, change, icon, color, progress }) => (
    <motion.div whileHover={{ scale: 1.02 }}>
      <Card sx={{ height: '100%' }}>
        <CardContent>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
            <Box>
              <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                {title}
              </Typography>
              <Typography variant="h4" sx={{ fontWeight: 700 }}>
                {value}
              </Typography>
            </Box>
            <Box
              sx={{
                backgroundColor: `${color}20`,
                borderRadius: 2,
                padding: 1,
                color: color,
              }}
            >
              {icon}
            </Box>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
            <Chip
              label={change}
              size="small"
              sx={{
                backgroundColor: change.includes('+') ? '#10B98120' : '#EF444420',
                color: change.includes('+') ? '#10B981' : '#EF4444',
                fontWeight: 600,
              }}
            />
            <Typography variant="caption" color="text.secondary">
              from last week
            </Typography>
          </Box>
          <Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
              <Typography variant="caption" color="text.secondary">
                Progress
              </Typography>
              <Typography variant="caption" fontWeight={600}>
                {progress}%
              </Typography>
            </Box>
            <LinearProgress
              variant="determinate"
              value={progress}
              sx={{
                height: 6,
                borderRadius: 3,
                backgroundColor: `${color}20`,
                '& .MuiLinearProgress-bar': {
                  backgroundColor: color,
                  borderRadius: 3,
                },
              }}
            />
          </Box>
        </CardContent>
      </Card>
    </motion.div>
  );

  return (
    <Box>
      <Box sx={{ mb: 3 }}>
        <Typography variant="h5" fontWeight={700}>
          Your Social Analytics
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Track your social media performance and connections
        </Typography>
      </Box>

      <Grid container spacing={3} sx={{ mb: 4 }}>
        {statsCards.map((stat, index) => (
          <Grid item xs={12} sm={6} lg={3} key={index}>
            <StatsCard {...stat} />
          </Grid>
        ))}
      </Grid>

      {/* Engagement Chart - Simple Version */}
      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
            <Typography variant="h6" fontWeight={600}>
              Weekly Engagement
            </Typography>
            <IconButton>
              <MoreVert />
            </IconButton>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'flex-end', height: 200, gap: 2 }}>
            {engagementData.map((item, index) => (
              <Box key={index} sx={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <Typography variant="caption" color="text.secondary" sx={{ mb: 1 }}>
                  {item.day}
                </Typography>
                <Box
                  sx={{
                    width: '80%',
                    height: `${(item.value / 250) * 100}%`,
                    backgroundColor: 'primary.main',
                    borderRadius: '4px 4px 0 0',
                    minHeight: 10,
                  }}
                />
                <Typography variant="caption" sx={{ mt: 1 }}>
                  {item.value}
                </Typography>
              </Box>
            ))}
          </Box>
        </CardContent>
      </Card>

      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          {/* Top Posts */}
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                <Typography variant="h6" fontWeight={600}>
                  Top Performing Posts
                </Typography>
                <IconButton>
                  <MoreVert />
                </IconButton>
              </Box>
              {topPosts.map((post) => (
                <Box
                  key={post.id}
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    p: 2,
                    mb: 1,
                    borderRadius: 2,
                    backgroundColor: 'action.hover',
                    '&:hover': {
                      backgroundColor: 'action.selected',
                    },
                  }}
                >
                  <Box>
                    <Typography variant="subtitle2" fontWeight={600} gutterBottom>
                      {post.title}
                    </Typography>
                    <Box sx={{ display: 'flex', gap: 2 }}>
                      <Typography variant="caption" color="text.secondary">
                        <ThumbUp sx={{ fontSize: 12, verticalAlign: 'middle', mr: 0.5 }} />
                        {post.likes}
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        <ChatBubble sx={{ fontSize: 12, verticalAlign: 'middle', mr: 0.5 }} />
                        {post.comments}
                      </Typography>
                    </Box>
                  </Box>
                  <Box sx={{ textAlign: 'right' }}>
                    <Chip
                      label={`${post.engagement}%`}
                      size="small"
                      color="success"
                      sx={{ fontWeight: 600 }}
                    />
                  </Box>
                </Box>
              ))}
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={6}>
          {/* Top Friends */}
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                <Typography variant="h6" fontWeight={600}>
                  Most Interactive Friends
                </Typography>
                <IconButton>
                  <MoreVert />
                </IconButton>
              </Box>
              {topFriends.map((friend, index) => (
                <Box
                  key={index}
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    p: 2,
                    mb: 1,
                    borderRadius: 2,
                    backgroundColor: 'action.hover',
                    '&:hover': {
                      backgroundColor: 'action.selected',
                    },
                  }}
                >
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    <Avatar src={friend.avatar} sx={{ width: 40, height: 40 }} />
                    <Box>
                      <Typography variant="subtitle2" fontWeight={600}>
                        {friend.name}
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        {friend.interactions} interactions
                      </Typography>
                    </Box>
                  </Box>
                  <Chip
                    label={`#${index + 1}`}
                    size="small"
                    color={index === 0 ? 'warning' : 'default'}
                  />
                </Box>
              ))}
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default SimpleAnalytics;