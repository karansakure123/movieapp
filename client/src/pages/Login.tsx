import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useAuth } from '@/contexts/AuthContext';

interface LoginFormData {
  email: string;
  password: string;
}

const Login: React.FC = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { login, register } = useAuth();
  const navigate = useNavigate();

  const {
    register: registerField,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<any>();

  const onSubmit = async (data: LoginFormData | any) => {
    setIsLoading(true);
    setError('');

    try {
      if (isLogin) {
        await login(data.email, data.password);
        toast.success('Login successful! Welcome back.');
      } else {
        await register(data.firstName, data.lastName, data.email, data.password, data.confirmPassword);
        toast.success('Registration successful! Welcome to MovieManager.');
      }
      navigate('/');
    } catch (err: any) {
      const errorMessage = err?.response?.data?.message || err?.message || (isLogin ? 'Login failed' : 'Registration failed');
      setError(errorMessage);
      toast.error(errorMessage);
      console.error('Auth error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center p-4">
      <div className="w-full max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center min-h-screen py-8">
          {/* Left Side - Welcome Content */}
          <div className="hidden lg:flex flex-col justify-center items-center text-center p-8">
            <div className="mb-8">
              <div className="inline-flex items-center justify-center w-24 h-24 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full shadow-2xl mb-6">
                <span className="text-4xl text-white">🎬</span>
              </div>
              <h1 className="text-4xl font-bold text-red-500 mb-4 hover:text-red-700">
                MovieManager
              </h1>

            <p className="text-xl text-gray-600 mb-6">
              Your personal movie and TV show collection
            </p>
            <div className="grid grid-cols-2 gap-4 text-sm text-gray-500">
              <div className="flex items-center justify-center p-4 bg-white rounded-lg shadow-sm">
                <span className="mr-2">🎭</span>
                <span>Organize your favorites</span>
              </div>
              <div className="flex items-center justify-center p-4 bg-white rounded-lg shadow-sm">
                <span className="mr-2">⭐</span>
                <span>Rate and review</span>
              </div>
              <div className="flex items-center justify-center p-4 bg-white rounded-lg shadow-sm">
                <span className="mr-2">📱</span>
                <span>Access anywhere</span>
              </div>
              <div className="flex items-center justify-center p-4 bg-white rounded-lg shadow-sm">
                <span className="mr-2">🔒</span>
                <span>Secure & private</span>
              </div>
            </div>
          </div>
        </div>

          {/* Right Side - Login Form */}
          <div className="w-full max-w-md mx-auto lg:mx-0">
          <div className="bg-white shadow-2xl rounded-2xl p-8 border border-gray-100">
            {/* Mobile Header */}
            <div className="lg:hidden text-center mb-6">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full shadow-lg mb-4">
                <span className="text-2xl text-white">🎬</span>
              </div>
              <h1 className="text-2xl font-bold text-red-500 mb-2">MovieManager</h1>
            </div>

            {/* Form Header */}
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-2">
                {isLogin ? 'Welcome Back!' : 'Join MovieManager'}
              </h2>
              <p className="text-gray-600">
                {isLogin ? 'Sign in to your account' : 'Create your account'}
              </p>
            </div>

            {/* Form */}
            <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
              <div className="space-y-5">
                {isLogin ? (
                  <>
                    {/* Email Field */}
                    <div className="space-y-2">
                      <Label htmlFor="email" className="text-sm font-semibold text-gray-700 flex items-center">
                        <span className="mr-2">📧</span>
                        Email Address
                      </Label>
                      <Input
                        id="email"
                        type="email"
                        autoComplete="email"
                        required
                        className="w-full h-12 px-4 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all duration-200 bg-gray-50 hover:bg-white text-gray-900 placeholder-gray-500"
                        placeholder="Enter your email address"
                        {...registerField('email', { required: 'Email is required' })}
                      />
                      {errors.email && (
                        <div className="flex items-center text-red-600 text-sm bg-red-50 px-3 py-2 rounded-lg border border-red-200">
                          <span className="mr-2">⚠️</span>
                          <span>{String(errors.email.message)}</span>
                        </div>
                      )}
                    </div>

                    {/* Password Field */}
                    <div className="space-y-2">
                      <Label htmlFor="password" className="text-sm font-semibold text-gray-700 flex items-center">
                        <span className="mr-2">🔒</span>
                        Password
                      </Label>
                      <Input
                        id="password"
                        type="password"
                        autoComplete="current-password"
                        required
                        className="w-full h-12 px-4 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all duration-200 bg-gray-50 hover:bg-white text-gray-900 placeholder-gray-500"
                        placeholder="Enter your password"
                        {...registerField('password', { required: 'Password is required' })}
                      />
                      {errors.password && (
                        <div className="flex items-center text-red-600 text-sm bg-red-50 px-3 py-2 rounded-lg border border-red-200">
                          <span className="mr-2">⚠️</span>
                          <span>{String(errors.password.message)}</span>
                        </div>
                      )}
                    </div>
                  </>
                ) : (
                  <>
                    {/* First Name Field */}
                    <div className="space-y-2">
                      <Label htmlFor="firstName" className="text-sm font-semibold text-gray-700 flex items-center">
                        <span className="mr-2">👤</span>
                        First Name
                      </Label>
                      <Input
                        id="firstName"
                        type="text"
                        autoComplete="given-name"
                        required
                        className="w-full h-12 px-4 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all duration-200 bg-gray-50 hover:bg-white text-gray-900 placeholder-gray-500"
                        placeholder="Enter your first name"
                        {...registerField('firstName', { required: 'First name is required' })}
                      />
                      {errors.firstName && (
                        <div className="flex items-center text-red-600 text-sm bg-red-50 px-3 py-2 rounded-lg border border-red-200">
                          <span className="mr-2">⚠️</span>
                          <span>{String(errors.firstName.message)}</span>
                        </div>
                      )}
                    </div>

                    {/* Last Name Field */}
                    <div className="space-y-2">
                      <Label htmlFor="lastName" className="text-sm font-semibold text-gray-700 flex items-center">
                        <span className="mr-2">👤</span>
                        Last Name
                      </Label>
                      <Input
                        id="lastName"
                        type="text"
                        autoComplete="family-name"
                        required
                        className="w-full h-12 px-4 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all duration-200 bg-gray-50 hover:bg-white text-gray-900 placeholder-gray-500"
                        placeholder="Enter your last name"
                        {...registerField('lastName', { required: 'Last name is required' })}
                      />
                      {errors.lastName && (
                        <div className="flex items-center text-red-600 text-sm bg-red-50 px-3 py-2 rounded-lg border border-red-200">
                          <span className="mr-2">⚠️</span>
                          <span>{String(errors.lastName.message)}</span>
                        </div>
                      )}
                    </div>

                    {/* Email Field */}
                    <div className="space-y-2">
                      <Label htmlFor="email" className="text-sm font-semibold text-gray-700 flex items-center">
                        <span className="mr-2">📧</span>
                        Email Address
                      </Label>
                      <Input
                        id="email"
                        type="email"
                        autoComplete="email"
                        required
                        className="w-full h-12 px-4 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all duration-200 bg-gray-50 hover:bg-white text-gray-900 placeholder-gray-500"
                        placeholder="Enter your email address"
                        {...registerField('email', { required: 'Email is required' })}
                      />
                      {errors.email && (
                        <div className="flex items-center text-red-600 text-sm bg-red-50 px-3 py-2 rounded-lg border border-red-200">
                          <span className="mr-2">⚠️</span>
                          <span>{String(errors.email.message)}</span>
                        </div>
                      )}
                    </div>

                    {/* Password Field */}
                    <div className="space-y-2">
                      <Label htmlFor="password" className="text-sm font-semibold text-gray-700 flex items-center">
                        <span className="mr-2">🔒</span>
                        Password
                      </Label>
                      <Input
                        id="password"
                        type="password"
                        autoComplete="new-password"
                        required
                        className="w-full h-12 px-4 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all duration-200 bg-gray-50 hover:bg-white text-gray-900 placeholder-gray-500"
                        placeholder="Enter your password"
                        {...registerField('password', {
                          required: 'Password is required',
                          minLength: { value: 6, message: 'Password must be at least 6 characters' }
                        })}
                      />
                      {errors.password && (
                        <div className="flex items-center text-red-600 text-sm bg-red-50 px-3 py-2 rounded-lg border border-red-200">
                          <span className="mr-2">⚠️</span>
                          <span>{String(errors.password.message)}</span>
                        </div>
                      )}
                    </div>

                    {/* Confirm Password Field */}
                    <div className="space-y-2">
                      <Label htmlFor="confirmPassword" className="text-sm font-semibold text-gray-700 flex items-center">
                        <span className="mr-2">🔒</span>
                        Confirm Password
                      </Label>
                      <Input
                        id="confirmPassword"
                        type="password"
                        autoComplete="new-password"
                        required
                        className="w-full h-12 px-4 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all duration-200 bg-gray-50 hover:bg-white text-gray-900 placeholder-gray-500"
                        placeholder="Confirm your password"
                        {...registerField('confirmPassword', {
                          required: 'Please confirm your password',
                          validate: (value) => value === watch('password') || 'Passwords do not match'
                        })}
                      />
                      {errors.confirmPassword && (
                        <div className="flex items-center text-red-600 text-sm bg-red-50 px-3 py-2 rounded-lg border border-red-200">
                          <span className="mr-2">⚠️</span>
                          <span>{String(errors.confirmPassword.message)}</span>
                        </div>
                      )}
                    </div>
                  </>
                )}
              </div>

              {/* Error Message */}
              {error && (
                <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl shadow-sm">
                  <div className="flex items-center">
                    <span className="text-red-500 mr-2 text-lg">❌</span>
                    <div>
                      <p className="font-semibold">Error</p>
                      <p className="text-sm">{error}</p>
                    </div>
                  </div>
                </div>
              )}

              {/* Submit Button */}
              <Button
                type="submit"
                disabled={isLoading}
                className="w-full h-12 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:shadow-lg"
              >
                {isLoading ? (
                  <div className="flex items-center justify-center">
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-3"></div>
                    <span className="text-lg">Processing...</span>
                  </div>
                ) : (
                  <div className="flex items-center justify-center">
                    <span className="text-lg mr-2">{isLogin ? '🚀' : '✨'}</span>
                    <span className="text-lg font-semibold">{isLogin ? 'Sign In' : 'Create Account'}</span>
                  </div>
                )}
              </Button>

              {/* Toggle Auth Mode */}
              <div className="text-center pt-4 border-t border-gray-100">
                <button
                  type="button"
                  onClick={() => setIsLogin(!isLogin)}
                  className="text-blue-600 hover:text-purple-600 font-semibold transition-colors duration-200 hover:underline"
                >
                  {isLogin ? 'New here? Create an account ✨' : 'Already have an account? Sign in 🚀'}
                </button>
              </div>
            </form>
          </div>

            {/* Footer */}
            <div className="text-center mt-6 text-gray-500 text-sm">
              <p>Manage your favorite movies and TV shows with ease</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;