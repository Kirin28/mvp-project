import { useEffect, useState } from 'react'
import './App.css'
import ListWorkouts from './components/ListWorkouts';
import logo from './assets/logo.png';
import { Navbar, Nav, Container, Row } from 'react-bootstrap';
import Admin from './components/Admin';
import Homepage from './components/Homepage';
import { Routes, Route, Link, useParams } from "react-router-dom";
import SearchResults from './components/SearchResults';
import { useNavigate } from 'react-router-dom';

function App() {

  const [query, setQuery] = useState ("");
  const [results, setResults] = useState ([]);
  const [error, setError] = useState("");

  const { key } = useParams();

  const navigate = useNavigate();

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
  navigate(`/search/${query}`);
  };


  const handleInputChange = (e) => {
  const value = e.target.value;
  setQuery(value);
    };

  return (
    <>
      <Navbar expand="lg" className='bg-white'>
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
            <Link className='link text-bold mx-2 fs-5' to="/admin">Admin</Link>
          </Nav>
        </Navbar.Collapse>
        </div>
      </Navbar>

      <footer>
      <div className="text-center py-2 mt-4 fixed-bottom" style={{backgroundColor: "white"}}>
      &copy; {new Date().getFullYear()} Forever Active
</div>
      </footer>
<Routes>
  <Route path="/" element={<Homepage/>} />
  <Route path='/search/:query' element={<SearchResults query={query} results={results} handleSubmit={handleSubmit} handleInputChange={handleInputChange} error={error} setError={setError} navigate={navigate} getWorkouts={getWorkouts}/>}/>
  <Route path="/workouts" element={<ListWorkouts/>} />
  <Route path="/admin" element={<Admin/>} />
</Routes>
  

    </>
  )
}

export default App
//point of no return