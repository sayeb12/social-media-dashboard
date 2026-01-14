import React, { useState } from 'react';
import { Container, Box, Grid, Fab, Drawer, useMediaQuery, useTheme } from '@mui/material';
import {
  Add as AddIcon,
  Chat as ChatIcon,
  Notifications as NotificationsIcon,
  Home as HomeIcon,
  Search as SearchIcon,
  Explore as ExploreIcon,
  VideoLibrary as VideoIcon,
  Menu as MenuIcon,
} from '@mui/icons-material';
import { motion, AnimatePresence } from 'framer-motion';
import { ThemeProvider } from '@mui/material/styles';
import { lightTheme, darkTheme } from './theme';
import { useSocialMedia } from './context/SocialMediaContext';
import Header from './components/Header';
import CreatePost from './components/CreatePost';
import PostCard from './components/PostCard';
import StoryComponent from './components/StoryComponent';
import Sidebar from './components/Sidebar';
import AnalyticsDashboard from './components/AnalyticsDashboard';
import MobileBottomNav from './components/MobileBottomNav';

const App = () => {
  const { posts, isDarkMode, unreadNotifications } = useSocialMedia();
  const [showAnalytics, setShowAnalytics] = useState(false);
  const [mobileDrawerOpen, setMobileDrawerOpen] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const isTablet = useMediaQuery(theme.breakpoints.between('sm', 'lg'));

  const MobileDrawer = () => (
    <Drawer
      anchor="left"
      open={mobileDrawerOpen}
      onClose={() => setMobileDrawerOpen(false)}
      PaperProps={{
        sx: {
          width: 280,
          borderRadius: '0 16px 16px 0',
        },
      }}
    >
      <Sidebar />
    </Drawer>
  );

  return (
    <ThemeProvider theme={isDarkMode ? darkTheme : lightTheme}>
      <Box sx={{ 
        minHeight: '100vh', 
        backgroundColor: 'background.default',
        position: 'relative',
        pb: isMobile ? 7 : 0, // Space for mobile bottom nav
      }}>
        <Header onMenuClick={() => setMobileDrawerOpen(true)} />
        
        <Container 
          maxWidth="xl" 
          sx={{ 
            py: { xs: 2, sm: 3, md: 4 },
            px: { xs: 1, sm: 2, md: 3 },
          }}
        >
          <Grid container spacing={{ xs: 1, sm: 2, md: 3 }}>
            {/* Left Sidebar - Hidden on mobile, visible on tablet and desktop */}
            {!isMobile && (
              <Grid item xs={12} md={3} lg={3}>
                <Box sx={{ position: 'sticky', top: 80 }}>
                  <Sidebar />
                </Box>
              </Grid>
            )}

            {/* Main Content - Full width on mobile, 2/3 on tablet, 1/2 on desktop */}
            <Grid item xs={12} md={showAnalytics ? 12 : (isTablet ? 9 : 6)}>
              {showAnalytics ? (
                <AnalyticsDashboard />
              ) : (
                <Box>
                  <StoryComponent />
                  <CreatePost />
                  
                  {/* Posts Feed */}
                  <AnimatePresence>
                    {posts.map((post) => (
                      <PostCard key={post.id} post={post} />
                    ))}
                    
                    {posts.length === 0 && (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.5 }}
                      >
                        <Box sx={{ 
                          textAlign: 'center', 
                          py: 8,
                          px: 2,
                        }}>
                          <Box
                            sx={{
                              width: 120,
                              height: 120,
                              borderRadius: '50%',
                              backgroundColor: 'grey.100',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              mx: 'auto',
                              mb: 3,
                            }}
                          >
                            <ChatIcon sx={{ fontSize: 48, color: 'grey.400' }} />
                          </Box>
                          <Typography variant="h6" color="text.secondary" gutterBottom>
                            No posts yet
                          </Typography>
                          <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                            Be the first to create a post or follow more people!
                          </Typography>
                          <Button variant="contained">
                            Explore Feed
                          </Button>
                        </Box>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </Box>
              )}
            </Grid>

            {/* Right Sidebar - Hidden on mobile and tablet when showing analytics */}
            {!showAnalytics && !isMobile && !isTablet && (
              <Grid item xs={12} lg={3}>
                <Box sx={{ position: 'sticky', top: 80 }}>
                  {/* Quick Stats */}
                  <motion.div 
                    initial={{ opacity: 0, x: 20 }} 
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 }}
                  >
                    <Box sx={{ 
                      backgroundColor: 'background.paper', 
                      borderRadius: 3, 
                      p: 3, 
                      mb: 3,
                      border: '1px solid',
                      borderColor: 'divider',
                      boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
                    }}>
                      <Typography variant="h6" fontWeight={600} gutterBottom>
                        Your Activity
                      </Typography>
                      <Box sx={{ '& > *': { mb: 1.5 } }}>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                          <Typography variant="body2" color="text.secondary">
                            Posts
                          </Typography>
                          <Typography variant="body2" fontWeight={600}>
                            {posts.length}
                          </Typography>
                        </Box>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                          <Typography variant="body2" color="text.secondary">
                            Likes Received
                          </Typography>
                          <Typography variant="body2" fontWeight={600}>
                            {posts.reduce((sum, post) => sum + post.likes, 0)}
                          </Typography>
                        </Box>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
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
                          sx={{
                            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                          }}
                        >
                          View Analytics
                        </Button>
                      </Box>
                    </Box>
                  </motion.div>

                  {/* Trending Topics */}
                  <motion.div 
                    initial={{ opacity: 0, x: 20 }} 
                    animate={{ opacity: 1, x: 0 }} 
                    transition={{ delay: 0.3 }}
                  >
                    <Box sx={{ 
                      backgroundColor: 'background.paper', 
                      borderRadius: 3, 
                      p: 3,
                      border: '1px solid',
                      borderColor: 'divider',
                      boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
                    }}>
                      <Typography variant="h6" fontWeight={600} gutterBottom>
                        Trending Now
                      </Typography>
                      <Box sx={{ '& > *': { mb: 1.5 } }}>
                        {['#webdesign', '#reactjs', '#photography', '#travel', '#technology'].map((tag, index) => (
                          <Box 
                            key={index} 
                            sx={{ 
                              display: 'flex', 
                              justifyContent: 'space-between', 
                              alignItems: 'center',
                              p: 1,
                              borderRadius: 1,
                              cursor: 'pointer',
                              '&:hover': {
                                backgroundColor: 'action.hover',
                              },
                            }}
                          >
                            <Typography variant="body2">
                              {tag}
                            </Typography>
                            <Typography variant="caption" color="text.secondary">
                              {Math.floor(Math.random() * 1000) + 100} posts
                            </Typography>
                          </Box>
                        ))}
                      </Box>
                      <Button 
                        fullWidth 
                        variant="text" 
                        sx={{ 
                          mt: 1,
                          color: 'primary.main',
                          fontSize: '0.875rem',
                        }}
                      >
                        Show more
                      </Button>
                    </Box>
                  </motion.div>
                </Box>
              </Grid>
            )}
          </Grid>
        </Container>

        {/* Mobile Drawer */}
        <MobileDrawer />

        {/* Mobile Bottom Navigation */}
        {isMobile && (
          <MobileBottomNav 
            showAnalytics={showAnalytics}
            onToggleAnalytics={() => setShowAnalytics(!showAnalytics)}
            unreadNotifications={unreadNotifications}
          />
        )}

        {/* Floating Action Buttons - Desktop Only */}
        {!isMobile && (
          <Box sx={{ 
            position: 'fixed', 
            bottom: 24, 
            right: 24, 
            display: 'flex', 
            flexDirection: 'column', 
            gap: 2,
            zIndex: 1000,
          }}>
            <motion.div 
              whileHover={{ scale: 1.1 }} 
              whileTap={{ scale: 0.9 }}
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 200, damping: 15 }}
            >
              <Fab
                color="primary"
                onClick={() => setShowAnalytics(!showAnalytics)}
                sx={{
                  background: 'linear-gradient(135deg, #3B82F6 0%, #2563EB 100%)',
                  boxShadow: '0 4px 20px rgba(59, 130, 246, 0.3)',
                }}
              >
                {showAnalytics ? <HomeIcon /> : <ExploreIcon />}
              </Fab>
            </motion.div>
            
            <motion.div 
              whileHover={{ scale: 1.1 }} 
              whileTap={{ scale: 0.9 }}
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 200, damping: 15, delay: 0.1 }}
            >
              <Fab
                color="secondary"
                sx={{
                  background: 'linear-gradient(135deg, #8B5CF6 0%, #7C3AED 100%)',
                  boxShadow: '0 4px 20px rgba(139, 92, 246, 0.3)',
                }}
              >
                <ChatIcon />
              </Fab>
            </motion.div>
            
            <motion.div 
              whileHover={{ scale: 1.1 }} 
              whileTap={{ scale: 0.9 }}
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 200, damping: 15, delay: 0.2 }}
            >
              <Fab
                color="warning"
                sx={{
                  position: 'relative',
                  background: 'linear-gradient(135deg, #F59E0B 0%, #D97706 100%)',
                  boxShadow: '0 4px 20px rgba(245, 158, 11, 0.3)',
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
                      border: '2px solid white',
                    }}
                  >
                    {unreadNotifications}
                  </Box>
                )}
              </Fab>
            </motion.div>
          </Box>
        )}

        {/* Create Post FAB - Mobile Only */}
        {isMobile && (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 200, damping: 15 }}
            style={{
              position: 'fixed',
              bottom: 80,
              right: 16,
              zIndex: 1000,
            }}
          >
            <Fab
              color="primary"
              onClick={() => {
                // Scroll to create post component
                document.getElementById('create-post')?.scrollIntoView({ behavior: 'smooth' });
              }}
              sx={{
                background: 'linear-gradient(135deg, #3B82F6 0%, #2563EB 100%)',
                boxShadow: '0 4px 20px rgba(59, 130, 246, 0.4)',
              }}
            >
              <AddIcon />
            </Fab>
          </motion.div>
        )}
      </Box>
    </ThemeProvider>
  );
};

export default App;