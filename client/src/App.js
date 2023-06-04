import logo from './logo.svg';
import './App.css';
import Call from './Call';
import Room from './Room';
import { useEffect, useState } from "react";
import axios from "axios";

import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { v4 as uuid } from 'uuid';

import Editor from './Components/Editor';
import Login from './pages/Login';
import Signup from './pages/Signup';


function App() {
  const [user, setUser] = useState(null);

	const getUser = async () => {
		try {
			const url = `http://localhost:8080/auth/login/success`;
			const { data } = await axios.get(url, { withCredentials: true });
			setUser(data.user._json);
		} catch (err) {
			console.log(err);
		}
	};

	useEffect(() => {
		getUser();
	}, []);

  return (
    <Router>
      <Routes>
        <Route exact path='/' element={ user ? <Navigate replace to={`/docs/${uuid()}`} /> : <Navigate to="/login" />} />
        <Route path='/docs/:id' element={<Editor />} />
        <Route
					exact
					path="/login"
					element={user ? <Navigate to="/" /> : <Login />}
				/>
				<Route
					path="/signup"
					element={user ? <Navigate to="/" /> : <Signup />}
				/>
        <Route path='/call' element={<Call />} />
        <Route path="/room/:roomID" element={<Room />} />
      </Routes>
    </Router>
  );
}

export default App;