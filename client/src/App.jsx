import { useEffect, useState } from 'react'
import './App.css'
import ListWorkouts from './components/ListWorkouts';
import logo from './assets/logo.png';
import homeimage from './assets/Group_1.png';
import { Navbar, Nav } from 'react-bootstrap';
import Admin from './components/Admin';

function App() {

  const [keywords, setKeywords] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [workouts, setWorkouts] = useState([]);
  const [keys, setKeys] = useState([]);


  useEffect(() => {
    getWorkouts();
  }, []);

  const getWorkouts = () => {
    fetch("/api/workouts")
      .then(response => response.json())
      .then(workouts => {
        setWorkouts(workouts);
      })
      .catch(error => {
        console.log(error);
      });
  };

  useEffect(() => {
    getKeys();
  }, []);

  const getKeys = () => {
    fetch("/api/keywords")
      .then(response => response.json())
      .then(keys => {
        setKeys(keys);
      })
      .catch(error => {
        console.log(error);
      });
  };



    const handleSearch = event => {
    const value = event.target.value;
    setKeywords({ ...keywords, value });
  };

  const getQueryResults = async keyword => {
    try {
      const response = await fetch(`/api/search/?keyword=${keyword}`, {
        method: "GET"
      });
      const data = await response.json();
      setWorkouts(data); 
    } catch (error) {
      console.error(error);
    }
  };

  const handleSubmit = async event => {
    event.preventDefault();
    if (!keywords.keyword) {
      setErrorMessage("Please fill out the fields");
    } else {
      await getQueryResults();
      setKeywords("");
      setErrorMessage("");
    }
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
            <Nav.Link className='text-bold mx-2 fs-5' href="#">Home</Nav.Link>
            <Nav.Link className='text-bold mx-2 fs-5' href="#">Workouts</Nav.Link>
            <Nav.Link className='text-bold mx-2 fs-5' href="#">My progress</Nav.Link>
            <Nav.Link className='text-bold mx-2 fs-5' href="#">Admin</Nav.Link>
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
     <div className="input-group mb-3">
  <input  
  value={keywords.keyword}
  onChange={e => handleSearch(e)}
  type="text" 
  className="form-control border border-secondary" placeholder="e.g. yoga" aria-label="e.g. yoga" aria-describedby="button-addon2"/>
  <button
  onSubmit={e => handleSubmit(e)} 
  className="button-white btn btn-outline-secondary" type="button" id="button-addon2">
  <i className="fas fa-search"></i>
  </button>
</div>
     </div>
    <img className='img-fluid round py-3 my-3' src={homeimage} alt="Homepage" />
     </div>
     </div>

     <div>
      {workouts.map((workout) => (
        <div key={workout.id}>{workout.title}</div>
      ))}
    </div>

<ListWorkouts />
<Admin />
    </>
  )
}

export default App
//aria-current="page"
// <ListWorkouts displayWorkout={workouts}/>