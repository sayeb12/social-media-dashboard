import React, { useState } from 'react';
import { Box, CircularProgress, Fade } from '@mui/material';
import { motion } from 'framer-motion';

const ResponsiveImage = ({ 
  src, 
  alt, 
  width = '100%', 
  height = 'auto', 
  aspectRatio,
  objectFit = 'cover',
  borderRadius = 0,
  className = '',
  onClick,
  priority = false,
}) => {
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(false);

  return (
    <Box
      sx={{
        position: 'relative',
        width,
        height,
        aspectRatio,
        borderRadius,
        overflow: 'hidden',
        backgroundColor: 'grey.100',
        cursor: onClick ? 'pointer' : 'default',
      }}
      className={className}
      onClick={onClick}
    >
      {/* Loading skeleton */}
      {!loaded && !error && (
        <Box
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: 'grey.100',
          }}
        >
          <CircularProgress size={24} />
        </Box>
      )}

      {/* Error fallback */}
      {error && (
        <Box
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: 'grey.200',
            color: 'grey.500',
          }}
        >
          <span role="img" aria-label="error">
            📷
          </span>
        </Box>
      )}

      {/* Image */}
      <motion.img
        src={src}
        alt={alt}
        style={{
          width: '100%',
          height: '100%',
          objectFit,
          opacity: loaded ? 1 : 0,
        }}
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ 
          opacity: loaded ? 1 : 0, 
          scale: loaded ? 1 : 0.95 
        }}
        transition={{ duration: 0.3 }}
        loading={priority ? 'eager' : 'lazy'}
        decoding="async"
        onLoad={() => setLoaded(true)}
        onError={() => setError(true)}
      />

      {/* Image overlay for better text readability */}
      {loaded && (
        <Box
          sx={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            height: '30%',
            background: 'linear-gradient(to top, rgba(0,0,0,0.3), transparent)',
            opacity: 0,
            transition: 'opacity 0.3s',
            '&:hover': {
              opacity: 1,
            },
          }}
        />
      )}
    </Box>
  );
};

export default ResponsiveImage;