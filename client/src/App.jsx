import { useEffect, useState } from 'react'
import './App.css'
import ListWorkouts from './components/ListWorkouts';
import logo from './assets/logo.png';
import { Navbar, Nav } from 'react-bootstrap';
import Admin from './components/Admin';
import Homepage from './components/Homepage';
import { Routes, Route, Link } from "react-router-dom";
import SearchResults from './components/SearchResults';

function App() {

  
  const [query, setQuery] = useState ("");
  const [results, setResults] = useState ([]);

  const getWorkouts =  async () => { 
    try {
      setError (null);
      const response = await axios.get (`/api/search/?keyword=${query}`);
      setResults(response.data);
    } catch (err) {
      setError (err.message);
    }
  }; 



  const handleSubmit = async event => {
    event.preventDefault();
  if (!query) {
    setError("Please fill out the search field.")
  } else {
    getWorkouts();
    setQuery("");
    setError("");
  }
      
  };



const handleInputChange = (e) => {
const value = e.target.value;

setQuery(value);

  };

  return (
    <>
      <Navbar expand="lg" style={{ backgroundColor: "white" }}>
      <div className='container'>
      <Navbar.Brand href="#">
          <img className="logo img-fluid" src={logo} alt="logo" />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse>
          <Nav className="ms-auto">
          <Link className='link text-bold mx-2 fs-5' to="/">Home</Link>
            <Link className='link text-bold mx-2 fs-5' to="/workouts">Workouts</Link>
            <Link className='link text-bold mx-2 fs-5' href="#">My progress</Link>
            <Link className='link text-bold mx-2 fs-5' to="/admin">Login</Link>
          </Nav>
        </Navbar.Collapse>
        </div>
      </Navbar>
<Routes>
  <Route path="/" element={<Homepage onSubmit={handleSubmit} onChange={handleInputChange}/>} />
  <Route path="/workouts" element={<ListWorkouts/>} />
  <Route path="/admin" element={<Admin/>} />

</Routes>
     

    </>
  )
}

export default App
//aria-current="page"
// <ListWorkouts displayWorkout={workouts}/>