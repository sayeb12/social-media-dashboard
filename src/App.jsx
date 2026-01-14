// src/App.jsx
import React, { useState } from 'react';
import { Container, Box, Grid, Fab, Drawer } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import AddIcon from '@mui/icons-material/Add';
import { AnimatePresence, motion } from 'framer-motion';

import Header from './components/Header';
import Sidebar from './components/Sidebar';
import MobileBottomNav from './components/MobileBottomNav';
import CreatePost from './components/CreatePost';
import PostCard from './components/PostCard';
import AnalyticsDashboard from './components/AnalyticsDashboard';
import SimpleAnalytics from './components/SimpleAnalytics';
import { useSocialMedia } from './context/SocialMediaContext';
import { lightTheme, darkTheme } from './theme';

const App = () => {
  const { posts, isDarkMode } = useSocialMedia();
  const [showAnalytics, setShowAnalytics] = useState(false);
  const [mobileDrawerOpen, setMobileDrawerOpen] = useState(false);

  return (
    <ThemeProvider theme={isDarkMode ? darkTheme : lightTheme}>
      <Box sx={{ minHeight: '100vh', bgcolor: 'background.default' }}>
        <Header onMenuClick={() => setMobileDrawerOpen(true)} />

        <Drawer
          open={mobileDrawerOpen}
          onClose={() => setMobileDrawerOpen(false)}
        >
          <Sidebar />
        </Drawer>

        <Container maxWidth="xl" sx={{ mt: 4 }}>
          <Grid container spacing={3}>
            <Grid xs={12} md={3}>
              <Sidebar />
            </Grid>

            <Grid xs={12} md={6}>
              <CreatePost />
              {posts.map((post) => (
                <PostCard key={post.id} post={post} />
              ))}
            </Grid>

            <Grid xs={12} md={3}>
              {showAnalytics ? (
                <AnalyticsDashboard posts={posts} />
              ) : (
                <SimpleAnalytics posts={posts} />
              )}
            </Grid>
          </Grid>
        </Container>

        <MobileBottomNav />

        <AnimatePresence>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            style={{ position: 'fixed', bottom: 24, right: 24 }}
          >
            <Fab color="primary" onClick={() => setShowAnalytics(!showAnalytics)}>
              <AddIcon />
            </Fab>
          </motion.div>
        </AnimatePresence>
      </Box>
    </ThemeProvider>
  );
};

export default App;
