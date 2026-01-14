import React, { createContext, useState, useContext, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import toast from 'react-hot-toast';

const SocialMediaContext = createContext();

export const useSocialMedia = () => {
  const context = useContext(SocialMediaContext);
  if (!context) {
    throw new Error('useSocialMedia must be used within SocialMediaProvider');
  }
  return context;
};

// Mock data with your friends
const mockUsers = [
  {
    id: '1',
    name: 'Md Sayeb',
    username: 'sayeb',
    avatar: '/assets/images/sayeb1.jpeg',
    bio: 'React Developer & Tech Enthusiast 💻',
    isOnline: true,
    isFriend: true,
    mutualFriends: 8,
    followers: 1250,
    following: 850,
  },
  {
    id: '2',
    name: 'Rafael Rafin',
    username: 'rafin',
    avatar: '/assets/images/rafi1.jpeg',
    bio: 'Photographer & Travel Blogger 📷✈️',
    isOnline: true,
    isFriend: true,
    mutualFriends: 12,
    followers: 890,
    following: 420,
  },
  {
    id: '3',
    name: 'Samiya Rahman',
    username: 'samiya',
    avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=400&h=400&fit=crop',
    bio: 'UI/UX Designer & Artist 🎨',
    isOnline: false,
    isFriend: false,
    mutualFriends: 5,
    followers: 2100,
    following: 1500,
  },
  {
    id: '4',
    name: 'Ubaida Ahmed',
    username: 'ubaida',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop',
    bio: 'Full Stack Developer & Mentor 🚀',
    isOnline: false,
    isFriend: true,
    mutualFriends: 15,
    followers: 1800,
    following: 1200,
  },
];

const mockPosts = [
  {
    id: '1',
    author: mockUsers[0],
    content: 'Just launched my new website! Check it out and let me know what you think. #webdesign #portfolio',
    timestamp: new Date(Date.now() - 3600000).toISOString(),
    likes: 245,
    loves: 89,
    hahas: 12,
    wows: 45,
    sads: 3,
    fires: 67,
    comments: [
      {
        id: 'c1',
        author: mockUsers[1],
        content: 'Looks amazing! Great work 👏',
        timestamp: new Date(Date.now() - 1800000).toISOString(),
        likes: 12,
      },
      {
        id: 'c2',
        author: mockUsers[2],
        content: 'The design is really clean and modern. Well done!',
        timestamp: new Date(Date.now() - 1200000).toISOString(),
        likes: 8,
      },
    ],
    shares: 34,
    isLiked: true,
    isBookmarked: false,
    privacy: 'public',
    tags: ['webdesign', 'portfolio', 'launch'],
    media: [
      {
        type: 'image',
        url: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop',
        caption: 'Website design preview',
      },
      {
        type: 'image',
        url: 'https://images.unsplash.com/photo-1551650975-87deedd944c3?w=800&h=600&fit=crop',
        caption: 'Mobile responsive design',
      },
    ],
  },
  {
    id: '2',
    author: mockUsers[1],
    content: 'Morning hike with the best views! Nature always inspires me. #hiking #nature #photography',
    timestamp: new Date(Date.now() - 7200000).toISOString(),
    likes: 189,
    loves: 120,
    hahas: 5,
    wows: 78,
    sads: 2,
    fires: 45,
    comments: [
      {
        id: 'c3',
        author: mockUsers[0],
        content: 'Beautiful shot! Where is this?',
        timestamp: new Date(Date.now() - 6000000).toISOString(),
        likes: 3,
      },
    ],
    shares: 23,
    isLiked: false,
    isBookmarked: true,
    privacy: 'friends',
    tags: ['hiking', 'nature', 'photography'],
    media: [
      {
        type: 'image',
        url: 'https://images.unsplash.com/photo-1501555088652-021faa106b9b?w=800&h=600&fit=crop',
        caption: 'Mountain view from the hike',
      },
    ],
  },
  {
    id: '3',
    author: mockUsers[2],
    content: 'Working on some new React components today. Loving the developer experience! #react #webdev #coding',
    timestamp: new Date(Date.now() - 10800000).toISOString(),
    likes: 312,
    loves: 45,
    hahas: 8,
    wows: 67,
    sads: 1,
    fires: 89,
    comments: [],
    shares: 45,
    isLiked: true,
    isBookmarked: false,
    privacy: 'public',
    tags: ['react', 'webdev', 'coding'],
    media: [
      {
        type: 'image',
        url: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&h=600&fit=crop',
        caption: 'Code editor setup',
      },
      {
        type: 'image',
        url: 'https://images.unsplash.com/photo-1517077304055-6e89abbf09b0?w=800&h=600&fit=crop',
        caption: 'React component architecture',
      },
      {
        type: 'image',
        url: 'https://images.unsplash.com/photo-1551650975-87deedd944c3?w=800&h=600&fit=crop',
        caption: 'Project structure',
      },
    ],
  },
];

const mockStories = [
  {
    id: '1',
    userId: '1',
    user: mockUsers[0],
    media: 'https://images.unsplash.com/photo-1519681393784-d120267933ba?w=400&h=700&fit=crop',
    mediaType: 'image',
    timestamp: new Date(Date.now() - 60000).toISOString(),
    seen: false,
  },
  {
    id: '2',
    userId: '2',
    user: mockUsers[1],
    media: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=400&h=700&fit=crop',
    mediaType: 'image',
    timestamp: new Date(Date.now() - 120000).toISOString(),
    seen: false,
  },
  {
    id: '3',
    userId: '3',
    user: mockUsers[2],
    media: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=700&fit=crop',
    mediaType: 'image',
    timestamp: new Date(Date.now() - 180000).toISOString(),
    seen: true,
  },
  {
    id: '4',
    userId: '1',
    user: mockUsers[0],
    media: 'https://images.unsplash.com/photo-1516937941344-00b4e0337589?w=400&h=700&fit=crop',
    mediaType: 'image',
    timestamp: new Date(Date.now() - 240000).toISOString(),
    seen: false,
  },
];
const mockNotifications = [
  {
    id: '1',
    type: 'like',
    message: 'Rafael Rafin liked your post',
    avatar: mockUsers[1].avatar,
    time: '2 min ago',
    read: false,
  },
  {
    id: '2',
    type: 'comment',
    message: 'Samiya Rahman commented on your photo',
    avatar: mockUsers[2].avatar,
    time: '15 min ago',
    read: false,
  },
  {
    id: '3',
    type: 'friend_request',
    message: 'Ubaida Ahmed sent you a friend request',
    avatar: mockUsers[3].avatar,
    time: '1 hour ago',
    read: true,
  },
  {
    id: '4',
    type: 'like',
    message: 'Ubaida Ahmed liked your React project',
    avatar: mockUsers[3].avatar,
    time: '3 hours ago',
    read: true,
  },
];

const mockEvents = [
  {
    id: '1',
    title: 'React Developer Meetup',
    date: 'Tomorrow, 6:00 PM',
    location: 'Dhaka Tech Hub',
    attendees: 45,
    isGoing: true,
  },
  {
    id: '2',
    title: 'Photography Workshop',
    date: 'Friday, 2:00 PM',
    location: 'Chittagong Art Center',
    attendees: 28,
    isGoing: false,
  },
  {
    id: '3',
    title: 'UI/UX Design Conference',
    date: 'Saturday, 10:00 AM',
    location: 'Online',
    attendees: 120,
    isGoing: true,
  },
];

const mockGroups = [
  {
    id: '1',
    name: 'Bangladesh React Developers',
    members: 1250,
    isJoined: true,
  },
  {
    id: '2',
    name: 'Bangladesh Photography Club',
    members: 890,
    isJoined: false,
  },
  {
    id: '3',
    name: 'Dhaka Design Community',
    members: 650,
    isJoined: true,
  },
  {
    id: '4',
    name: 'Bangladesh Tech Entrepreneurs',
    members: 2100,
    isJoined: true,
  },
];

export const SocialMediaProvider = ({ children }) => {
  // Load from localStorage
  const loadFromStorage = (key, defaultValue) => {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : defaultValue;
    } catch {
      return defaultValue;
    }
  };

  const [currentUser, setCurrentUser] = useState(() => 
    loadFromStorage('social_user', mockUsers[0]) // Md Sayeb as current user
  );
  const [posts, setPosts] = useState(() => 
    loadFromStorage('social_posts', mockPosts)
  );
  const [friends, setFriends] = useState(() => 
    loadFromStorage('social_friends', mockUsers)
  );
  const [notifications, setNotifications] = useState(() => 
    loadFromStorage('social_notifications', mockNotifications)
  );
  const [stories, setStories] = useState(() => 
    loadFromStorage('social_stories', mockStories)
  );
  const [events, setEvents] = useState(() => 
    loadFromStorage('social_events', mockEvents)
  );
  const [groups, setGroups] = useState(() => 
    loadFromStorage('social_groups', mockGroups)
  );
  const [isDarkMode, setIsDarkMode] = useState(() => 
    loadFromStorage('social_darkmode', false)
  );

  // Save to localStorage
  useEffect(() => {
    localStorage.setItem('social_user', JSON.stringify(currentUser));
  }, [currentUser]);

  useEffect(() => {
    localStorage.setItem('social_posts', JSON.stringify(posts));
  }, [posts]);

  useEffect(() => {
    localStorage.setItem('social_friends', JSON.stringify(friends));
  }, [friends]);

  useEffect(() => {
    localStorage.setItem('social_notifications', JSON.stringify(notifications));
  }, [notifications]);

  useEffect(() => {
    localStorage.setItem('social_stories', JSON.stringify(stories));
  }, [stories]);

  useEffect(() => {
    localStorage.setItem('social_events', JSON.stringify(events));
  }, [events]);

  useEffect(() => {
    localStorage.setItem('social_groups', JSON.stringify(groups));
  }, [groups]);

  useEffect(() => {
    localStorage.setItem('social_darkmode', JSON.stringify(isDarkMode));
  }, [isDarkMode]);

  // Post functions
  const createPost = (postData) => {
    const newPost = {
      id: uuidv4(),
      author: currentUser,
      content: postData.content,
      timestamp: new Date().toISOString(),
      likes: 0,
      loves: 0,
      hahas: 0,
      wows: 0,
      sads: 0,
      fires: 0,
      comments: [],
      shares: 0,
      isLiked: false,
      isBookmarked: false,
      privacy: postData.privacy || 'public',
      tags: postData.tags || [],
      media: postData.media || null,
    };
    
    setPosts(prev => [newPost, ...prev]);
    
    // Add notification for friends
    const notification = {
      id: uuidv4(),
      type: 'post',
      message: `${currentUser.name} created a new post`,
      avatar: currentUser.avatar,
      time: 'Just now',
      read: false,
    };
    setNotifications(prev => [notification, ...prev]);
  };

  const likePost = (postId) => {
    setPosts(prev => prev.map(post => {
      if (post.id === postId) {
        const wasLiked = post.isLiked;
        return {
          ...post,
          likes: wasLiked ? post.likes - 1 : post.likes + 1,
          isLiked: !wasLiked,
        };
      }
      return post;
    }));
  };

  const bookmarkPost = (postId) => {
    setPosts(prev => prev.map(post => {
      if (post.id === postId) {
        return {
          ...post,
          isBookmarked: !post.isBookmarked,
        };
      }
      return post;
    }));
  };

  const addComment = (postId, content) => {
    const newComment = {
      id: uuidv4(),
      author: currentUser,
      content,
      timestamp: new Date().toISOString(),
      likes: 0,
    };

    setPosts(prev => prev.map(post => {
      if (post.id === postId) {
        return {
          ...post,
          comments: [newComment, ...post.comments],
        };
      }
      return post;
    }));

    // Add notification
    const notification = {
      id: uuidv4(),
      type: 'comment',
      message: `${currentUser.name} commented on your post`,
      avatar: currentUser.avatar,
      time: 'Just now',
      read: false,
    };
    setNotifications(prev => [notification, ...prev]);
  };

  // Friend functions
  const addFriend = (userId) => {
    setFriends(prev => prev.map(user => {
      if (user.id === userId) {
        return { ...user, isFriend: true };
      }
      return user;
    }));
    toast.success('Friend request sent!');
  };

  // Notification functions
  const markNotificationAsRead = (notificationId) => {
    setNotifications(prev => prev.map(notification => {
      if (notification.id === notificationId) {
        return { ...notification, read: true };
      }
      return notification;
    }));
  };

  const markAllNotificationsAsRead = () => {
    setNotifications(prev => prev.map(notification => ({
      ...notification,
      read: true,
    })));
  };

  // Theme function
  const toggleTheme = () => {
    setIsDarkMode(prev => !prev);
  };

  // Calculations
  const unreadNotifications = notifications.filter(n => !n.read).length;
  const totalPosts = posts.length;
  const totalLikes = posts.reduce((sum, post) => sum + post.likes, 0);
  const totalComments = posts.reduce((sum, post) => sum + post.comments.length, 0);

  const value = {
    // State
    currentUser,
    posts,
    friends,
    notifications,
    stories,
    events,
    groups,
    isDarkMode,
    
    // Stats
    unreadNotifications,
    totalPosts,
    totalLikes,
    totalComments,
    
    // Post functions
    createPost,
    likePost,
    bookmarkPost,
    addComment,
    
    // Friend functions
    addFriend,
    
    // Notification functions
    markNotificationAsRead,
    markAllNotificationsAsRead,
    
    // Theme function
    toggleTheme,
  };

  return (
    <SocialMediaContext.Provider value={value}>
      {children}
    </SocialMediaContext.Provider>
  );
};