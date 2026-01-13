import React, { useState } from 'react';
import {
  Card,
  CardContent,
  Typography,
  Box,
  Grid,
  ToggleButton,
  ToggleButtonGroup,
  Chip,
  IconButton,
  LinearProgress,
} from '@mui/material';
import {
  TrendingUp,
  People,
  Visibility,
  ThumbUp,
  ChatBubble,
  Share,
  Schedule,
  MoreVert,
  Instagram,
  Facebook,
  Twitter,
  YouTube,
} from '@mui/icons-material';
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Area,
  AreaChart,
} from 'recharts';
import { motion } from 'framer-motion';

const AnalyticsDashboard = () => {
  const [timeRange, setTimeRange] = useState('week');
  const [chartType, setChartType] = useState('line');

  // Mock data for engagement metrics
  const engagementData = [
    { day: 'Mon', likes: 320, comments: 45, shares: 12, views: 1200 },
    { day: 'Tue', likes: 380, comments: 52, shares: 18, views: 1500 },
    { day: 'Wed', likes: 420, comments: 68, shares: 24, views: 1800 },
    { day: 'Thu', likes: 390, comments: 58, shares: 20, views: 1600 },
    { day: 'Fri', likes: 520, comments: 85, shares: 32, views: 2200 },
    { day: 'Sat', likes: 480, comments: 72, shares: 28, views: 2000 },
    { day: 'Sun', likes: 560, comments: 92, shares: 36, views: 2400 },
  ];

  // Platform distribution data
  const platformData = [
    { name: 'Facebook', value: 35, color: '#1877F2' },
    { name: 'Instagram', value: 28, color: '#E4405F' },
    { name: 'Twitter', value: 20, color: '#1DA1F2' },
    { name: 'YouTube', value: 12, color: '#FF0000' },
    { name: 'LinkedIn', value: 5, color: '#0A66C2' },
  ];

  // Audience demographics
  const audienceData = [
    { age: '18-24', male: 30, female: 35 },
    { age: '25-34', male: 45, female: 40 },
    { age: '35-44', male: 25, female: 30 },
    { age: '45-54', male: 15, female: 20 },
    { age: '55+', male: 10, female: 15 },
  ];

  // Top performing posts
  const topPosts = [
    {
      id: 1,
      title: 'Sunset at the beach 🏖️',
      engagement: 95,
      reach: 12500,
      likes: 850,
      comments: 120,
    },
    {
      id: 2,
      title: 'Tech conference highlights 📱',
      engagement: 87,
      reach: 9800,
      likes: 720,
      comments: 95,
    },
    {
      id: 3,
      title: 'Morning workout routine 💪',
      engagement: 82,
      reach: 8700,
      likes: 650,
      comments: 78,
    },
  ];

  // Stats cards data
  const statsCards = [
    {
      title: 'Total Followers',
      value: '12.5K',
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
      value: '45.2K',
      change: '+18.7%',
      icon: <Visibility />,
      color: '#8B5CF6',
      progress: 65,
    },
    {
      title: 'Avg. Likes',
      value: '425',
      change: '+5.2%',
      icon: <ThumbUp />,
      color: '#EF4444',
      progress: 85,
    },
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
      {/* Header */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Box>
          <Typography variant="h5" fontWeight={700}>
            Analytics Dashboard
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Track your social media performance
          </Typography>
        </Box>
        <Box sx={{ display: 'flex', gap: 2 }}>
          <ToggleButtonGroup
            value={timeRange}
            exclusive
            onChange={(e, value) => value && setTimeRange(value)}
            size="small"
          >
            <ToggleButton value="day">Day</ToggleButton>
            <ToggleButton value="week">Week</ToggleButton>
            <ToggleButton value="month">Month</ToggleButton>
          </ToggleButtonGroup>
          <ToggleButtonGroup
            value={chartType}
            exclusive
            onChange={(e, value) => value && setChartType(value)}
            size="small"
          >
            <ToggleButton value="line">Line</ToggleButton>
            <ToggleButton value="bar">Bar</ToggleButton>
            <ToggleButton value="area">Area</ToggleButton>
          </ToggleButtonGroup>
        </Box>
      </Box>

      {/* Stats Overview */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        {statsCards.map((stat, index) => (
          <Grid item xs={12} sm={6} lg={3} key={index}>
            <StatsCard {...stat} />
          </Grid>
        ))}
      </Grid>

      {/* Engagement Chart */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} lg={8}>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <Card>
              <CardContent>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                  <Typography variant="h6" fontWeight={600}>
                    Engagement Overview
                  </Typography>
                  <IconButton>
                    <MoreVert />
                  </IconButton>
                </Box>
                <Box sx={{ height: 300 }}>
                  <ResponsiveContainer width="100%" height="100%">
                    {chartType === 'line' ? (
                      <LineChart data={engagementData}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                        <XAxis dataKey="day" stroke="#6B7280" />
                        <YAxis stroke="#6B7280" />
                        <Tooltip />
                        <Legend />
                        <Line
                          type="monotone"
                          dataKey="likes"
                          stroke="#3B82F6"
                          strokeWidth={2}
                          dot={{ r: 4 }}
                          activeDot={{ r: 6 }}
                        />
                        <Line
                          type="monotone"
                          dataKey="comments"
                          stroke="#10B981"
                          strokeWidth={2}
                          dot={{ r: 4 }}
                          activeDot={{ r: 6 }}
                        />
                        <Line
                          type="monotone"
                          dataKey="shares"
                          stroke="#8B5CF6"
                          strokeWidth={2}
                          dot={{ r: 4 }}
                          activeDot={{ r: 6 }}
                        />
                      </LineChart>
                    ) : chartType === 'bar' ? (
                      <BarChart data={engagementData}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                        <XAxis dataKey="day" stroke="#6B7280" />
                        <YAxis stroke="#6B7280" />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="likes" fill="#3B82F6" radius={[4, 4, 0, 0]} />
                        <Bar dataKey="comments" fill="#10B981" radius={[4, 4, 0, 0]} />
                        <Bar dataKey="shares" fill="#8B5CF6" radius={[4, 4, 0, 0]} />
                      </BarChart>
                    ) : (
                      <AreaChart data={engagementData}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                        <XAxis dataKey="day" stroke="#6B7280" />
                        <YAxis stroke="#6B7280" />
                        <Tooltip />
                        <Legend />
                        <Area
                          type="monotone"
                          dataKey="likes"
                          stackId="1"
                          stroke="#3B82F6"
                          fill="#3B82F6"
                          fillOpacity={0.3}
                        />
                        <Area
                          type="monotone"
                          dataKey="comments"
                          stackId="1"
                          stroke="#10B981"
                          fill="#10B981"
                          fillOpacity={0.3}
                        />
                        <Area
                          type="monotone"
                          dataKey="shares"
                          stackId="1"
                          stroke="#8B5CF6"
                          fill="#8B5CF6"
                          fillOpacity={0.3}
                        />
                      </AreaChart>
                    )}
                  </ResponsiveContainer>
                </Box>
              </CardContent>
            </Card>
          </motion.div>
        </Grid>

        {/* Platform Distribution */}
        <Grid item xs={12} lg={4}>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
            <Card sx={{ height: '100%' }}>
              <CardContent>
                <Typography variant="h6" fontWeight={600} gutterBottom>
                  Platform Distribution
                </Typography>
                <Box sx={{ height: 250, mt: 2 }}>
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={platformData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={(entry) => `${entry.name}: ${entry.value}%`}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                      >
                        {platformData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2, mt: 2 }}>
                  {platformData.map((platform) => (
                    <Chip
                      key={platform.name}
                      label={platform.name}
                      size="small"
                      sx={{
                        backgroundColor: `${platform.color}20`,
                        color: platform.color,
                        fontWeight: 600,
                      }}
                    />
                  ))}
                </Box>
              </CardContent>
            </Card>
          </motion.div>
        </Grid>
      </Grid>

      {/* Audience Demographics & Top Posts */}
      <Grid container spacing={3}>
        <Grid item xs={12} lg={6}>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
            <Card>
              <CardContent>
                <Typography variant="h6" fontWeight={600} gutterBottom>
                  Audience Demographics
                </Typography>
                <Box sx={{ height: 250, mt: 2 }}>
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={audienceData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                      <XAxis dataKey="age" stroke="#6B7280" />
                      <YAxis stroke="#6B7280" />
                      <Tooltip />
                      <Legend />
                      <Bar dataKey="male" fill="#3B82F6" radius={[4, 4, 0, 0]} name="Male" />
                      <Bar dataKey="female" fill="#EC4899" radius={[4, 4, 0, 0]} name="Female" />
                    </BarChart>
                  </ResponsiveContainer>
                </Box>
              </CardContent>
            </Card>
          </motion.div>
        </Grid>

        <Grid item xs={12} lg={6}>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
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
                        <Typography variant="caption" color="text.secondary">
                          <Share sx={{ fontSize: 12, verticalAlign: 'middle', mr: 0.5 }} />
                          {post.shares}
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
                      <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mt: 0.5 }}>
                        Reach: {post.reach.toLocaleString()}
                      </Typography>
                    </Box>
                  </Box>
                ))}
              </CardContent>
            </Card>
          </motion.div>
        </Grid>
      </Grid>
    </Box>
  );
};

export default AnalyticsDashboard;