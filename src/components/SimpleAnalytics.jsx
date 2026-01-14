// src/components/SimpleAnalytics.jsx
import React from 'react';
import {
  Box,
  Typography,
  Paper,
  Stack,
  Avatar, // ✅ FIX: missing import
  LinearProgress,
} from '@mui/material';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';

const SimpleAnalytics = ({ posts = [] }) => {
  const totalLikes = posts.reduce((sum, p) => sum + (p.likes || 0), 0);
  const totalComments = posts.reduce((sum, p) => sum + (p.comments?.length || 0), 0);

  return (
    <Paper sx={{ p: 2 }}>
      <Typography variant="h6" fontWeight={600} gutterBottom>
        Analytics Overview
      </Typography>

      <Stack spacing={2}>
        <Box>
          <Typography variant="body2" color="text.secondary">
            Total Likes
          </Typography>
          <Typography variant="h5">{totalLikes}</Typography>
        </Box>

        <Box>
          <Typography variant="body2" color="text.secondary">
            Total Comments
          </Typography>
          <Typography variant="h5">{totalComments}</Typography>
        </Box>

        <Box>
          <Typography variant="body2" gutterBottom>
            Engagement Rate
          </Typography>
          <LinearProgress variant="determinate" value={65} />
        </Box>

        <Stack direction="row" spacing={1} alignItems="center">
          <Avatar sx={{ bgcolor: 'primary.main', width: 32, height: 32 }}>
            <TrendingUpIcon fontSize="small" />
          </Avatar>
          <Typography variant="body2">
            Engagement is increasing
          </Typography>
        </Stack>
      </Stack>
    </Paper>
  );
};

export default SimpleAnalytics;
