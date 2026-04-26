import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Box,
  TextField,
  Button,
  Typography,
  Alert,
  InputAdornment,
  IconButton,
  CircularProgress,
  Divider,
} from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { loginAdmin, clearError } from '../store/slices/authSlice';

export default function LoginPage({ onSwitchToRegister }) {
  const dispatch = useDispatch();
  const { loading, error } = useSelector(state => state.auth);
  const [showPassword, setShowPassword] = useState(false);

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => {
        dispatch(clearError());
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [error, dispatch]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(loginAdmin(formData));
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: { xs: 'column', md: 'row' },
        overflow: 'hidden',
      }}
    >
      {/* Left Side - Branding */}
      <Box
        sx={{
          flex: { xs: '0 0 auto', md: 1 },
          background: 'linear-gradient(135deg, #004d43 0%, #003830 50%, #002b26 100%)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: { xs: 4, md: 6 },
          position: 'relative',
          minHeight: { xs: '200px', md: '100vh' },
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'radial-gradient(circle at 30% 50%, rgba(232, 238, 38, 0.1) 0%, transparent 50%)',
            pointerEvents: 'none',
          }
        }}
      >
        <Box sx={{ position: 'relative', zIndex: 1, textAlign: 'center' }}>
          <img
            src="/logo.png"
            alt="Arena Pro"
            style={{
              width: 180,
              height: 180,
              objectFit: 'contain',
              marginBottom: 24,
            }}
          />
          <Typography
            variant="h3"
            sx={{
              fontWeight: 800,
              color: '#ffffff',
              mb: 2,
              fontSize: { xs: '2rem', md: '2.5rem' },
              letterSpacing: '-0.5px',
            }}
          >
            Fast, Efficient and Productive
          </Typography>
          <Typography
            variant="body1"
            sx={{
              color: 'rgba(255,255,255,0.8)',
              maxWidth: 400,
              lineHeight: 1.7,
              fontSize: '1rem',
            }}
          >
            Manage your sports venues with ease. Arena Pro admin panel helps you streamline bookings and operations.
          </Typography>
        </Box>
      </Box>

      {/* Right Side - Form */}
      <Box
        sx={{
          flex: { xs: '1', md: 1 },
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: { xs: 3, sm: 4, md: 6 },
          background: 'linear-gradient(to bottom, #f8f9fa 0%, #ffffff 100%)',
        }}
      >
        <Box
          sx={{
            width: '100%',
            maxWidth: 480,
            background: '#ffffff',
            borderRadius: 4,
            padding: { xs: 3, sm: 5 },
            boxShadow: '0 10px 40px rgba(0, 0, 0, 0.08)',
          }}
        >
          <Typography
            variant="h4"
            sx={{
              fontWeight: 700,
              color: '#1a1a1a',
              mb: 1,
              fontSize: { xs: '1.75rem', sm: '2rem' },
            }}
          >
            Sign In
          </Typography>
          <Typography
            variant="body2"
            sx={{
              color: '#6b7280',
              mb: 4,
            }}
          >
            Welcome back to Arena Pro Admin
          </Typography>

          {error && (
            <Alert
              severity="error"
              sx={{
                mb: 3,
                borderRadius: 2,
                '& .MuiAlert-icon': { color: '#d32f2f' },
              }}
            >
              {error}
            </Alert>
          )}

          <Box component="form" onSubmit={handleSubmit}>
            {/* Email Field */}
            <Typography
              sx={{
                fontWeight: 600,
                fontSize: '0.875rem',
                color: '#1a1a1a',
                mb: 1,
              }}
            >
              Email
            </Typography>
            <TextField
              fullWidth
              placeholder="Enter your email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              required
              autoComplete="email"
              autoFocus
              sx={{
                mb: 3,
                '& .MuiOutlinedInput-root': {
                  borderRadius: 2,
                  backgroundColor: '#f9fafb',
                  '& fieldset': {
                    borderColor: '#e5e7eb',
                  },
                  '&:hover fieldset': {
                    borderColor: '#004d43',
                  },
                  '&.Mui-focused fieldset': {
                    borderColor: '#004d43',
                    borderWidth: 2,
                  },
                },
                '& .MuiInputBase-input': {
                  px: 2,
                  py: 1.5,
                  fontSize: '0.95rem',
                  color: '#1a1a1a',
                  '&::placeholder': {
                    color: '#9ca3af',
                    opacity: 1,
                  }
                },
              }}
            />

            {/* Password Field */}
            <Typography
              sx={{
                fontWeight: 600,
                fontSize: '0.875rem',
                color: '#1a1a1a',
                mb: 1,
              }}
            >
              Password
            </Typography>
            <TextField
              fullWidth
              placeholder="Enter your password"
              name="password"
              type={showPassword ? 'text' : 'password'}
              value={formData.password}
              onChange={handleChange}
              required
              autoComplete="current-password"
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() => setShowPassword(!showPassword)}
                      edge="end"
                      sx={{ color: '#6b7280' }}
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              sx={{
                mb: 1,
                '& .MuiOutlinedInput-root': {
                  borderRadius: 2,
                  backgroundColor: '#f9fafb',
                  '& fieldset': {
                    borderColor: '#e5e7eb',
                  },
                  '&:hover fieldset': {
                    borderColor: '#004d43',
                  },
                  '&.Mui-focused fieldset': {
                    borderColor: '#004d43',
                    borderWidth: 2,
                  },
                },
                '& .MuiInputBase-input': {
                  px: 2,
                  py: 1.5,
                  fontSize: '0.95rem',
                  color: '#1a1a1a',
                  '&::placeholder': {
                    color: '#9ca3af',
                    opacity: 1,
                  }
                },
              }}
            />

            <Typography
              variant="caption"
              sx={{
                color: '#6b7280',
                display: 'block',
                mb: 4,
              }}
            >
              Use 8 or more characters with a mix of letters, numbers & symbols.
            </Typography>

            {/* Sign In Button */}
            <Button
              type="submit"
              fullWidth
              variant="contained"
              disabled={loading}
              sx={{
                borderRadius: 2,
                py: 1.5,
                fontSize: '1rem',
                fontWeight: 700,
                textTransform: 'none',
                background: '#004d43',
                color: '#ffffff',
                boxShadow: '0 4px 12px rgba(0, 77, 67, 0.2)',
                transition: 'all 0.3s ease',
                '&:hover': {
                  background: '#003830',
                  boxShadow: '0 6px 16px rgba(0, 77, 67, 0.3)',
                  transform: 'translateY(-1px)',
                },
                '&:active': {
                  transform: 'translateY(0)',
                },
                '&.Mui-disabled': {
                  background: '#e5e7eb',
                  color: '#9ca3af',
                },
              }}
            >
              {loading ? (
                <CircularProgress size={24} sx={{ color: '#ffffff' }} />
              ) : (
                'Sign In'
              )}
            </Button>

            {/* Create Account Link */}
            <Box sx={{ textAlign: 'center', mt: 3 }}>
              <Typography
                variant="body2"
                sx={{ color: '#6b7280' }}
              >
                Already have an account?{' '}
                <Box
                  component="span"
                  onClick={onSwitchToRegister}
                  sx={{
                    color: '#004d43',
                    fontWeight: 700,
                    cursor: 'pointer',
                    textDecoration: 'none',
                    transition: 'opacity 0.2s',
                    '&:hover': {
                      opacity: 0.7,
                      textDecoration: 'underline',
                    },
                  }}
                >
                  Sign Up
                </Box>
              </Typography>
            </Box>

            <Divider sx={{ my: 3, borderColor: '#e5e7eb' }} />

            <Button
              variant="outlined"
              onClick={() => window.open('https://arenapro.pk/ArenaPro.apk', '_blank')}
              sx={{
                width: '100%',
                borderRadius: 2,
                py: 1.2,
                color: '#004d43',
                borderColor: '#004d43',
                borderWidth: 2,
                textTransform: 'none',
                fontWeight: 600,
                '&:hover': {
                  borderColor: '#003830',
                  bgcolor: 'rgba(0, 77, 67, 0.04)',
                  borderWidth: 2,
                }
              }}
            >
              Download Android App (APK)
            </Button>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}