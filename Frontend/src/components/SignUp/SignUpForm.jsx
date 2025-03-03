import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Card, CardContent, TextField, Button, Typography, MenuItem, Select, FormControl, InputLabel, Alert } from '@mui/material';

export default function SignupForm() {
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm();

  const [successMessage, setSuccessMessage] = useState('');

  const onSubmit = async (data) => {
    try {
      const response = await fetch('https://jsonplaceholder.typicode.com/posts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error('Sign up failed');
      }

      await response.json();
      setSuccessMessage('Signup successful!');
      reset();
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const password = watch('password');

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <Card sx={{ maxWidth: 700, p: 3 , textAlign: 'center', border: '2px solid #ff7b00'}}>
              <Typography variant="h4" component="h1" gutterBottom>
                Sign Up
              </Typography>
        <CardContent>
          {successMessage && <Alert severity="success">{successMessage}</Alert>}
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
            <TextField
              fullWidth
              label="Full Name"
              {...register('fullName', { required: 'Full name is required' })}
              error={!!errors.fullName}
              helperText={errors.fullName?.message}
              margin="dense"
            />
            <TextField
              fullWidth
              label="Email"
              type="email"
              {...register('email', { required: 'Email is required' })}
              error={!!errors.email}
              helperText={errors.email?.message}
              margin="dense"
            />
            <TextField
              fullWidth
              label="Password"
              type="password"
              {...register('password', {
                required: 'Password is required',
                minLength: { value: 6, message: 'Password must be at least 6 characters' },
              })}
              error={!!errors.password}
              helperText={errors.password?.message}
              margin="dense"
            />
            <TextField
              fullWidth
              label="Retype Password"
              type="password"
              {...register('confirmPassword', {
                required: 'Please confirm your password',
                validate: (value) => value === password || 'Passwords do not match',
              })}
              error={!!errors.confirmPassword}
              helperText={errors.confirmPassword?.message}
              margin="dense"
            />
            <TextField
              fullWidth
              label="Business/Artist Name"
              {...register('businessName', { required: 'Business/Artist name is required' })}
              error={!!errors.businessName}
              helperText={errors.businessName?.message}
              margin="dense"
            />
            <TextField
              fullWidth
              label="Location"
              {...register('location', { required: 'Location is required' })}
              error={!!errors.location}
              helperText={errors.location?.message}
              margin="dense"
            />
            <FormControl fullWidth margin="dense">
              <InputLabel>Role</InputLabel>
              <Select {...register('role', { required: 'Role is required' })} defaultValue="">
                <MenuItem value="venue">Venue</MenuItem>
                <MenuItem value="artist">Artist</MenuItem>
                <MenuItem value="promoter">Promoter</MenuItem>
              </Select>
            </FormControl>
            <Button type="submit" variant="contained" fullWidth sx={{mt:2, backgroundColor: '#ff7b00'}}>
              Sign Up
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
