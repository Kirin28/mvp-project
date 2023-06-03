import { useEffect, useState } from 'react'
import './App.css'
import ListWorkouts from './components/ListWorkouts';
import logo from './assets/logo.png';
import { Navbar, Nav, Container, Row } from 'react-bootstrap';
import Admin from './components/Admin';
import Homepage from './components/Homepage';
import { Routes, Route, Link, useParams } from "react-router-dom";
import SearchResults from './components/SearchResults';

function App() {

  //let { keyword } = useParams()

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
  <Route path='/search/' element={<SearchResults/>}/>
  <Route path="/workouts" element={<ListWorkouts/>} />
  <Route path="/admin" element={<Admin/>} />
</Routes>
  

    </>
  )
}

export default App
