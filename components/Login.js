"use client";
import React, { useState, useEffect } from 'react';
import Button from './Button';
import { Fugaz_One } from "next/font/google";
import { useRouter } from 'next/navigation';

const fugaz = Fugaz_One({ subsets: ["latin"], weight: "400" });

export default function Login() {
  const [isRegister, setIsRegister] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  // Check if user is already logged in
  useEffect(() => {
    const currentUser = localStorage.getItem('currentUser');
    if (currentUser) {
      router.push('/dashboard');
    }
  }, [router]);

  async function handleSubmit(e) {
    e.preventDefault();
    setError('');

    // Basic validation
    if (!email || !password || (isRegister && !username)) {
      setError('Please fill in all fields');
      return;
    }

    if (!email.includes('@')) {
      setError('Please enter a valid email');
      return;
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }

    try {
      if (isRegister) {
        const existingUsers = JSON.parse(localStorage.getItem('users') || '[]');
        
        // Check if user already exists
        if (existingUsers.find(user => user.email === email)) {
          setError('User already exists');
          return;
        }

        // Create new user
        const newUser = {
          email,
          username,
          password,
          id: Date.now(),
          token: Math.random().toString(36).substring(2) + Date.now().toString(36)
        };

        // Save to users list
        existingUsers.push(newUser);
        localStorage.setItem('users', JSON.stringify(existingUsers));

        // Set current user session
        localStorage.setItem('currentUser', JSON.stringify(newUser));

        // Navigate to dashboard
        window.location.href = '/dashboard';
      } else {
        // Handle Login
        const users = JSON.parse(localStorage.getItem('users') || '[]');
        const user = users.find(u => u.email === email && u.password === password);

        if (!user) {
          setError('Invalid credentials');
          return;
        }

        // Update user's token
        user.token = Math.random().toString(36).substring(2) + Date.now().toString(36);
        localStorage.setItem('currentUser', JSON.stringify(user));

        // Update user in users array
        const updatedUsers = users.map(u => u.email === user.email ? user : u);
        localStorage.setItem('users', JSON.stringify(updatedUsers));
        console.log('All Users:', JSON.parse(localStorage.getItem('users')));
        // Navigate to dashboard
        window.location.href = '/dashboard';
      }
    } catch (err) {
      setError('An error occurred. Please try again.');
      console.error(err);
    }
  }

  return (
    <div className='flex flex-col flex-1 justify-center items-center gap-4'>
      <h3 className={'text-4xl sm:text-5xl md:text-6xl ' + fugaz.className}>
        {isRegister ? 'Register' : 'Log In'}
      </h3>
      <p>You&#39;re one step away!</p>
      {error && (
        <p className="text-red-500 text-sm">{error}</p>
      )}
      <form onSubmit={handleSubmit} className="w-full max-w-[400px] mx-auto">
        {isRegister && (
          <input 
            className='w-full px-3 hover:border-indigo-700 focus:border-indigo-700 py-2 sm:py-3 border border-solid border-indigo-400 rounded-full outline-none mb-4'
            placeholder='Username'
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        )}
        <input 
          className='w-full px-3 hover:border-indigo-700 focus:border-indigo-700 py-2 sm:py-3 border border-solid border-indigo-400 rounded-full outline-none mb-4'
          placeholder='Email'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input 
          className='w-full px-3 hover:border-indigo-700 focus:border-indigo-700 py-2 sm:py-3 border border-solid border-indigo-400 rounded-full outline-none mb-4'
          placeholder='Password' 
          type='password'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <div className='max-w-[400px] w-full mx-auto'>
          <Button text={isRegister ? "Register" : "Login"} full />
        </div>
      </form>
      <p className='text-center'>
        {isRegister ? 'Already have an account?' : 'Don\'t have an account? '}
        <button 
          onClick={() => setIsRegister(!isRegister)}
          className='text-indigo-600'>
          {isRegister ? 'Sign in' : 'Sign up'}
        </button>
      </p>
    </div>
  );
}