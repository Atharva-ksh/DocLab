import logo from './logo.svg';
import './App.css';
import Call from './Call';
import Room from './Room';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { v4 as uuid } from 'uuid';

import Editor from './Components/Editor';

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Navigate replace to={`/docs/${uuid()}`} /> } />
        <Route path='/docs/:id' element={<Editor />} />
        <Route path='/call' element={<Call />} />
        <Route path="/room/:roomID" element={<Room />} />
      </Routes>
    </Router>
  );
}

export default App;