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
    Fade,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
} from '@mui/material';
import {
    Visibility,
    VisibilityOff,
} from '@mui/icons-material';
import { registerAdmin, clearError } from '../store/slices/authSlice';

export default function RegisterPage({ onSwitchToLogin }) {
    const dispatch = useDispatch();
    const { loading, error } = useSelector(state => state.auth);

    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        password: '',
        confirmPassword: '',
        role: 'vendor', // Default to vendor, but allow admin selection
    });
    const [localError, setLocalError] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

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
        setLocalError('');
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setLocalError('');

        if (!formData.fullName.trim()) {
            setLocalError('Please enter your full name.');
            return;
        }
        if (formData.password.length < 6) {
            setLocalError('Password must be at least 6 characters.');
            return;
        }
        if (formData.password !== formData.confirmPassword) {
            setLocalError('Passwords do not match.');
            return;
        }

        dispatch(registerAdmin({
            email: formData.email,
            password: formData.password,
            fullName: formData.fullName.trim(),
            role: formData.role,
        }));
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
                        src="/arena-pro-logo.png"
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
                            textAlign: 'center',
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
                <Fade in={true} timeout={800}>
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
                            Sign Up
                        </Typography>
                        <Typography
                            variant="body2"
                            sx={{
                                color: '#6b7280',
                                mb: 4,
                            }}
                        >
                            Join the Arena Pro network today
                        </Typography>

                        {(error || localError) && (
                            <Alert
                                severity="error"
                                sx={{
                                    mb: 3,
                                    borderRadius: 2,
                                    '& .MuiAlert-icon': { color: '#d32f2f' }
                                }}
                            >
                                {localError || error}
                            </Alert>
                        )}

                        <Box component="form" onSubmit={handleSubmit}>
                            <Typography
                                sx={{
                                    fontWeight: 600,
                                    fontSize: '0.875rem',
                                    color: '#1a1a1a',
                                    mb: 1,
                                }}
                            >
                                Full Name
                            </Typography>
                            <TextField
                                fullWidth
                                name="fullName"
                                value={formData.fullName}
                                onChange={handleChange}
                                required
                                placeholder="Enter your full name"
                                sx={{
                                    mb: 2.5,
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
                                name="email"
                                type="email"
                                value={formData.email}
                                onChange={handleChange}
                                required
                                placeholder="Enter your email"
                                sx={{
                                    mb: 2.5,
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
                                sx={{
                                    fontWeight: 600,
                                    fontSize: '0.875rem',
                                    color: '#1a1a1a',
                                    mb: 1,
                                }}
                            >
                                Account Type
                            </Typography>
                            <FormControl 
                                fullWidth
                                sx={{
                                    mb: 2.5,
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
                                }}
                            >
                                <InputLabel>Select Role</InputLabel>
                                <Select
                                    name="role"
                                    value={formData.role}
                                    onChange={handleChange}
                                    label="Select Role"
                                    required
                                >
                                    <MenuItem value="vendor">Vendor</MenuItem>
                                    <MenuItem value="admin">Admin</MenuItem>
                                </Select>
                            </FormControl>

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
                                name="password"
                                type={showPassword ? 'text' : 'password'}
                                value={formData.password}
                                onChange={handleChange}
                                required
                                placeholder="At least 6 characters"
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
                                    mb: 2.5,
                                }}
                            >
                                Use 8 or more characters with a mix of letters, numbers & symbols.
                            </Typography>

                            <Typography
                                sx={{
                                    fontWeight: 600,
                                    fontSize: '0.875rem',
                                    color: '#1a1a1a',
                                    mb: 1,
                                }}
                            >
                                Repeat Password
                            </Typography>
                            <TextField
                                fullWidth
                                name="confirmPassword"
                                type={showConfirmPassword ? 'text' : 'password'}
                                value={formData.confirmPassword}
                                onChange={handleChange}
                                required
                                placeholder="Repeat your password"
                                InputProps={{
                                    endAdornment: (
                                        <InputAdornment position="end">
                                            <IconButton
                                                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                                edge="end"
                                                sx={{ color: '#6b7280' }}
                                            >
                                                {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                                            </IconButton>
                                        </InputAdornment>
                                    ),
                                }}
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
                                    '&.Mui-disabled': {
                                        background: '#e5e7eb',
                                        color: '#9ca3af',
                                    },
                                }}
                            >
                                {loading ? (
                                    <CircularProgress size={24} sx={{ color: '#ffffff' }} />
                                ) : (
                                    'Sign Up'
                                )}
                            </Button>
                        </Box>

                        <Box sx={{ textAlign: 'center', mt: 3 }}>
                            <Typography variant="body2" sx={{ color: '#6b7280' }}>
                                Already have an account?{' '}
                                <Box
                                    component="span"
                                    onClick={onSwitchToLogin}
                                    sx={{
                                        color: '#004d43',
                                        fontWeight: 700,
                                        cursor: 'pointer',
                                        textDecoration: 'none',
                                        '&:hover': {
                                            opacity: 0.8,
                                            textDecoration: 'underline',
                                        },
                                    }}
                                >
                                    Sign In
                                </Box>
                            </Typography>
                        </Box>
                    </Box>
                </Fade>
            </Box>
        </Box>
    );
}
