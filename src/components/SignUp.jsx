import React, { useState } from 'react';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import { getFirestore, doc, setDoc, getDocs,serverTimestamp, collection } from 'firebase/firestore';

const SignUp = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignUp = async (e) => {
    e.preventDefault();
    const auth = getAuth();
    const fireStore = getFirestore();
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      const snapshot = await getDocs(collection(fireStore, 'users'));
      const len=snapshot.size;
      // Add user data to FireStore
      await setDoc(doc(fireStore, 'users', user.uid), {
        email: user.email,
        createdAt: serverTimestamp(),
        userId:len+1
      });

      console.log('User signed up and data saved to FireStore');
    } catch (error) {
      console.error("Error signing up with email and password", error);
    }
  };

  return (
    <form onSubmit={handleSignUp} className="space-y-4 max-w-2xl mx-auto p-4">
      <div className="mb-4">
        <label className="block font-bold mb-2">Email</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email"
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      <div className="mb-4">
        <label className="block font-bold mb-2">Password</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Enter your password"
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      <button
        type="submit"
        className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        Sign Up
      </button>
    </form>
  );
};

export default SignUp;
