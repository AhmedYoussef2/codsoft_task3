import { initializeApp } from 'firebase/app';
import { getFirestore, collection, getDocs } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyCV8aLcPfBnFy5xU964CCoCrnBOnnofrMU",
  authDomain: "blog-platform-fb.firebaseapp.com",
  projectId: "blog-platform-fb",
  storageBucket: "blog-platform-fb.appspot.com",
  messagingSenderId: "91065505160",
  appId: "1:91065505160:web:bd348d8e5312336ad7163d"
};

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
const fireStore = getFirestore(app);

export { auth, fireStore, collection, getDocs };



/*import { auth } from '../firebase';

const handleLogout = () => {
  auth.signOut();
};

// Use this function in your components as needed
 */