import { useEffect, useState } from 'react';


export default function ListWorkouts({ VideoID }) {
  const [workouts, setWorkouts] = useState([]);

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

const getWorkoutById = async id => {
    try {
      const response = await fetch(`/api/workouts/${id}`, {
        method: "GET"
      });
      const data = await response.json();
      setWorkouts(data); 
    } catch (error) {
      console.error(error);
    }
  }; 

      return (
        <div>
          <div className='container py-2'>
    
           <h1 className='text-bold'>All Workouts</h1>
           <div className='container py-2'>
            <div className='row'>
              {workouts.map((workout) => (
                <div key={workout.id} className='col-md-4'>
                  <div className="card mb-3">
              <div className="card-body">
                <h5 className="card-title t-center">{workout.title}</h5>
                <p className='t-center'>{`${workout.minutes} minutes`}</p>
                <div className="d-flex justify-content-center">
                <iframe className='vid t-center' title="YouTube video player" src={`https://www.youtube.com/embed/${workout.embedID}`} allowFullScreen ></iframe>
                </div>
                <p className='t-center pt-2'><a href={workout.url}>Click here to watch on YouTube!</a></p>
              </div>
            </div>
          </div>
        
              ))}
            </div>
         
            </div>
            </div>
        </div>
      
)}


