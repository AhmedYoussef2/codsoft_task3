import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { auth, signInWithEmailAndPassword } from '../firebase';

const LogIn = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const [error, setError] = useState(null);


  const handleLogIn = async (e) => {
    e.preventDefault();
    setError(null);
    try {
      await signInWithEmailAndPassword(auth, email, password);
      console.log("User logged in successfully")
      navigate("/home/page");
    } catch (error) {
      console.error("Error signing in with email or password");
      setError('Email or password is incorrect');
    }
  };

  return (
    <form onSubmit={handleLogIn} className="space-y-4 max-w-2xl mx-auto p-4">
      <div className="mb-4">
        <label className="block font-bold mb-2">Email</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email"
          className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      <div className="mb-4">
        <label className="block font-bold mb-2">Password</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Enter your password"
          className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      <button
        type="submit"
        className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 no-cursor">
        Log In
      </button>
      {error && (
        <div className="text-red-500 text-bold mt-4">
          <p>{error}</p>
        </div>
      )}
      <Link to='/login' className='text-blue-500 hover:text-blue-700 '>
        <p className='my-4 md-0 underline'>or sign up instead</p>
      </Link>
    </form>
  );
};

export default LogIn;
