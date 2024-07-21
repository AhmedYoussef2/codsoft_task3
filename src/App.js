import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import CreatePostPage from './pages/CreatePostPage';
import EditPostPage from './pages/EditPostPage';
import DeletePostPage from './pages/DeletePostPage';
import SignUpPage from './pages/SignUpPage';
import LogInPage from './pages/LogInPage';



function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path='/' element={<HomePage />} />
          <Route path='/signup' element={<SignUpPage />} />
          <Route path='/login' element={<LogInPage />} />
          <Route path='/create/post' element={<CreatePostPage />} />
          <Route path='/edit/post/:id' element={<EditPostPage />} />
          <Route path='/delete/post/:id' element={<DeletePostPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
