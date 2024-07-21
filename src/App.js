import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import CreatePostPage from './pages/CreatePostPage';
import EditPostPage from './pages/EditPostPage';
import PostPage from './pages/PostPage';



function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path='/' element={<HomePage />} />
          <Route path='/create-post' element={<CreatePostPage />} />
          <Route path='/edit-post' element={<EditPostPage />} />
          <Route path='/post' element={<PostPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
