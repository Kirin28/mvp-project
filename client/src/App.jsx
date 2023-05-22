import { useEffect, useState } from 'react'
import './App.css'
import ListWorkouts from './components/ListWorkouts';
import logo from './assets/logo.png';
import homeimage from './assets/Group_1.png';
import { Navbar, Nav } from 'react-bootstrap';

function App() {
  const [workouts, setWorkouts] = useState([]);
  const [post, setPost] = useState({
    title: "",
    url: "",
    minutes: null,
    calories: null
  });
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    getWorkouts();
  }, []);

  const getWorkouts = () => {
    fetch("/api")
      .then(response => response.json())
      .then(workouts => {
        setWorkouts(workouts);
      })
      .catch(error => {
        console.log(error);
      });
  };

  return (
    <>
      <Navbar expand="lg" style={{ backgroundColor: "white" }}>
      <div className='container-fluid'>
      <Navbar.Brand href="#">
          <img className="logo" src={logo} alt="logo" />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse>
          <Nav className="ms-auto">
            <Nav.Link className='text-bold mx-2' href="#">Home</Nav.Link>
            <Nav.Link className='text-bold mx-2' href="#">Workouts</Nav.Link>
            <Nav.Link className='text-bold mx-2' href="#">My progress</Nav.Link>
            <Nav.Link className='text-bold mx-2' href="#">Admin</Nav.Link>
          </Nav>
        </Navbar.Collapse>
        </div>
      </Navbar>

    <div className='container pt-4'>
      <div className='row'>
      <div className='col'>
     <h1 className='text-bold'>Homepage</h1>
     </div>
     <div className='col pt-2'>
     <div class="input-group mb-3">
  <input type="text" className="form-control border border-secondary" placeholder="e.g. yoga" aria-label="e.g. yoga" aria-describedby="button-addon2"/>
  <button className="button-white btn btn-outline-secondary" type="button" id="button-addon2">
  <i className="fas fa-search"></i>
  </button>
</div>
     </div>
    <img className='img-fluid round py-3 my-3' src={homeimage} alt="Homepage" />
     </div>
     </div>


    </>
  )
}

export default App
//aria-current="page"
// <ListWorkouts displayWorkout={workouts}/>