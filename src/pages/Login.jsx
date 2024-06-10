import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import { useSnackbar } from 'notistack';
import Spinner from '../components/Spinner';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  const handleLogin = () => {
    setLoading(true);
    axios
      .post('http://localhost:5555/user/login', { username, password })
      .then(response => {
        setLoading(false);
        const { username } = response.data; // Extracting username from response data
        console.log('Username:', username);
        localStorage.setItem('token', response.data.token);
        enqueueSnackbar('Login successful', { variant: 'success' });
        navigate('/home', { state: { username } }); // Navigating to /home with username in state
      })
      .catch(error => {
        setLoading(false);
        enqueueSnackbar('Login failed', { variant: 'error' });
        console.log(error);
      });
  };
  

  return (
    <div className='p-4'>
      <h1 className='text-3xl my-4'>Login</h1>
      {loading ? <Spinner /> : ''}
      <div className='flex flex-col border-2 border-sky-400 rounded-xl w-[600px] p-4 mx-auto'>
        <div className='my-4'>
          <label className='text-xl mr-4 text-gray-500'>Username</label>
          <input
            type='text'
            value={username}
            onChange={e => setUsername(e.target.value)}
            className='border-2 border-gray-500 px-4 py-2 w-full'
          />
        </div>
        <div className='my-4'>
          <label className='text-xl mr-4 text-gray-500'>Password</label>
          <input
            type='password'
            value={password}
            onChange={e => setPassword(e.target.value)}
            className='border-2 border-gray-500 px-4 py-2 w-full'
          />
        </div>
        <button className='p-2 bg-sky-300 m-8' onClick={handleLogin}>
          Login
        </button>
        <div>
          <p className='text-gray-500'>Don't have an account? <Link to='/signup' className='text-sky-400'>Sign Up</Link></p>
        </div>
      </div>
    </div>
  );
};

export default Login;
