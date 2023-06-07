import { useEffect, useState } from 'react'
import './App.css'
import ListWorkouts from './components/ListWorkouts';
import logo from './assets/logo.png';
import { Navbar, Nav, Container, Row } from 'react-bootstrap';
import Admin from './components/Admin';
import Homepage from './components/Homepage';
import { Routes, Route, Link } from "react-router-dom";
import SearchResults from './components/SearchResults';
import Footer from './components/Footer';
import 'google-fonts';

function App() {

  const [results, setResults] = useState ([]);



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
<Routes>
  <Route path="/" element={<Homepage results={results} setResults={setResults}/>} />
  <Route path='/search/:query' element={<SearchResults results={results} setResults={setResults}/>}/>
  <Route path="/workouts" element={<ListWorkouts workouts={results} setWorkouts={results}/>} />
  <Route path="/admin" element={<Admin/>} />
</Routes>
  
<div className="myFooter footer-sticky">
        <main></main>
      <Footer />
      </div>
    </>
  )
}

export default App

