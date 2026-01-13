import React, { useState } from 'react';
import { Container, Box, Grid, Fab, Button, Typography } from '@mui/material';
import {
  Add as AddIcon,
  Chat as ChatIcon,
  Notifications as NotificationsIcon,
  Analytics as AnalyticsIcon,
  Feed as FeedIcon,
} from '@mui/icons-material';
import { motion } from 'framer-motion';
import { ThemeProvider } from '@mui/material/styles';
import { lightTheme, darkTheme } from './theme';
import { useSocialMedia } from './context/SocialMediaContext';
import Header from './components/Header';
import CreatePost from './components/CreatePost';
import PostCard from './components/PostCard';
import StoryComponent from './components/StoryComponent';
import Sidebar from './components/Sidebar';
import SimpleAnalytics from './components/SimpleAnalytics';

const App = () => {
  const { posts, isDarkMode, unreadNotifications } = useSocialMedia();
  const [showAnalytics, setShowAnalytics] = useState(false);

  return (
    <ThemeProvider theme={isDarkMode ? darkTheme : lightTheme}>
      <Box sx={{ 
        minHeight: '100vh', 
        backgroundColor: 'background.default',
        position: 'relative',
      }}>
        <Header />
        
        <Container maxWidth="xl" sx={{ py: 4 }}>
          <Grid container spacing={3}>
            {/* Left Sidebar */}
            <Grid item xs={12} lg={3} sx={{ display: { xs: 'none', lg: 'block' } }}>
              <Sidebar />
            </Grid>

            {/* Main Content */}
            <Grid item xs={12} lg={showAnalytics ? 12 : 6}>
              {showAnalytics ? (
                <SimpleAnalytics />
              ) : (
                <Box>
                  <StoryComponent />
                  <CreatePost />
                  
                  {/* Posts Feed */}
                  <Box>
                    {posts.map((post) => (
                      <PostCard key={post.id} post={post} />
                    ))}
                    
                    {posts.length === 0 && (
                      <Box sx={{ textAlign: 'center', py: 8 }}>
                        <Typography variant="h6" color="text.secondary" gutterBottom>
                          No posts yet
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          Be the first to create a post!
                        </Typography>
                      </Box>
                    )}
                  </Box>
                </Box>
              )}
            </Grid>

            {/* Right Sidebar (Hidden on analytics view) */}
            {!showAnalytics && (
              <Grid item xs={12} lg={3} sx={{ display: { xs: 'none', lg: 'block' } }}>
                <Box sx={{ position: 'sticky', top: 80 }}>
                  {/* Quick Stats */}
                  <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
                    <Box sx={{ 
                      backgroundColor: 'primary.50', 
                      borderRadius: 3, 
                      p: 3, 
                      mb: 3,
                      border: '1px solid',
                      borderColor: 'primary.100',
                    }}>
                      <Typography variant="h6" fontWeight={600} gutterBottom>
                        Your Activity
                      </Typography>
                      <Box sx={{ '& > *': { mb: 1.5 } }}>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                          <Typography variant="body2" color="text.secondary">
                            Posts
                          </Typography>
                          <Typography variant="body2" fontWeight={600}>
                            {posts.length}
                          </Typography>
                        </Box>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                          <Typography variant="body2" color="text.secondary">
                            Likes Received
                          </Typography>
                          <Typography variant="body2" fontWeight={600}>
                            {posts.reduce((sum, post) => sum + post.likes, 0)}
                          </Typography>
                        </Box>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                          <Typography variant="body2" color="text.secondary">
                            Comments
                          </Typography>
                          <Typography variant="body2" fontWeight={600}>
                            {posts.reduce((sum, post) => sum + post.comments.length, 0)}
                          </Typography>
                        </Box>
                      </Box>
                      <Box sx={{ mt: 2 }}>
                        <Button 
                          fullWidth 
                          variant="contained"
                          onClick={() => setShowAnalytics(true)}
                          startIcon={<AnalyticsIcon />}
                        >
                          View Analytics
                        </Button>
                      </Box>
                    </Box>
                  </motion.div>

                  {/* Trending Topics */}
                  <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.1 }}>
                    <Box sx={{ 
                      backgroundColor: 'background.paper', 
                      borderRadius: 3, 
                      p: 3,
                      boxShadow: 1,
                    }}>
                      <Typography variant="h6" fontWeight={600} gutterBottom>
                        Trending in Bangladesh
                      </Typography>
                      <Box sx={{ '& > *': { mb: 1.5 } }}>
                        {['#reactjs', '#bangladesh', '#photography', '#webdev', '#tech'].map((tag, index) => (
                          <Box key={index} sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <Typography variant="body2">
                              {tag}
                            </Typography>
                            <Typography variant="caption" color="text.secondary">
                              {Math.floor(Math.random() * 1000) + 100} posts
                            </Typography>
                          </Box>
                        ))}
                      </Box>
                    </Box>
                  </motion.div>
                </Box>
              </Grid>
            )}
          </Grid>
        </Container>

        {/* Floating Action Buttons */}
        <Box sx={{ position: 'fixed', bottom: 24, right: 24, display: 'flex', flexDirection: 'column', gap: 2 }}>
          <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
            <Fab
              color="primary"
              onClick={() => setShowAnalytics(!showAnalytics)}
              sx={{
                background: 'linear-gradient(135deg, #3B82F6 0%, #2563EB 100%)',
              }}
            >
              {showAnalytics ? <FeedIcon /> : <AnalyticsIcon />}
            </Fab>
          </motion.div>
          
          <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
            <Fab
              color="secondary"
              sx={{
                background: 'linear-gradient(135deg, #8B5CF6 0%, #7C3AED 100%)',
              }}
            >
              <ChatIcon />
            </Fab>
          </motion.div>
          
          <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
            <Fab
              color="warning"
              sx={{
                position: 'relative',
                background: 'linear-gradient(135deg, #F59E0B 0%, #D97706 100%)',
              }}
            >
              <NotificationsIcon />
              {unreadNotifications > 0 && (
                <Box
                  sx={{
                    position: 'absolute',
                    top: 0,
                    right: 0,
                    width: 20,
                    height: 20,
                    backgroundColor: 'error.main',
                    color: 'white',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '0.75rem',
                    fontWeight: 600,
                  }}
                >
                  {unreadNotifications}
                </Box>
              )}
            </Fab>
          </motion.div>
        </Box>

        {/* Bottom Navigation for Mobile */}
        <Box
          sx={{
            position: 'fixed',
            bottom: 0,
            left: 0,
            right: 0,
            backgroundColor: 'background.paper',
            borderTop: '1px solid',
            borderColor: 'divider',
            display: { xs: 'flex', lg: 'none' },
            justifyContent: 'space-around',
            py: 1,
            zIndex: 1000,
          }}
        >
          {['Home', 'Friends', 'Watch', 'Notifications', 'Menu'].map((item, index) => (
            <Button
              key={index}
              sx={{
                flexDirection: 'column',
                color: 'text.secondary',
                minWidth: 'auto',
              }}
            >
              <Typography variant="caption">
                {item}
              </Typography>
            </Button>
          ))}
        </Box>
      </Box>
    </ThemeProvider>
  );
};

export default App;