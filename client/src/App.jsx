import { useEffect, useState } from 'react'
import './App.css'
import ListWorkouts from './components/ListWorkouts';

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
    <nav
        className="navbar navbar-expand-lg navbar-light"
        style={{ backgroundColor: "white" }}
      >
        <a className="navbar-brand ps-3" href="#">
          Welcome
        </a>
        <div className="container-fluid mb-4 pb-3"></div>
      </nav>
    <div className='pt-3'>
     <h1>Homepage</h1>
     <ListWorkouts displayWorkout={workouts}/>
     </div>
    </>
  )
}

export default App
