import { useEffect, useState } from 'react';
import { Pagination } from './Pagination';


export default function ListWorkouts() {
  const [workouts, setWorkouts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsperPage] = useState(9);


  useEffect(() => {
    getWorkouts();
  }, []);

  const getWorkouts = () => {
    setLoading(true);

    fetch("/api/workouts")
      .then(response => response.json())
      .then(workouts => {
        setWorkouts(workouts);
        setLoading(false);
      })
      .catch(error => {
        console.log(error);
        setLoading(false);
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

  const lastItemIndex  = currentPage * itemsPerPage;
  const firstItemIndex = lastItemIndex - itemsPerPage;
  const currentItems = workouts.slice(firstItemIndex, lastItemIndex)

      return (
        <div>
          <div className='container pt-4'>
    
           <h1 className='text-bold'>All Workouts</h1>
           <br />

           <div className='container py-2'>
            {loading ? <p className='text-bold'>Loading...</p> : (
      <div className='row'>
     {currentItems.map((workout) => (
     <div key={workout.id} className='col-md-4'>
      <div className="card mb-3">
      <div className="card-body">
    <h5 className="card-title t-center">{workout.title}</h5>
    <p className='t-center'>{`${workout.minutes} minutes`}</p>
    <div className="d-flex justify-content-center">
    <iframe className='vid t-center' title="YouTube video player" src={`https://www.youtube.com/embed/${workout.embedID}`} allowFullScreen frameBorder="0"
      allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" ></iframe>
    </div>
    <p className='t-center pt-2'><a href={workout.url} target="_blank">Click here to watch on YouTube!</a></p>
  </div>
</div>
</div>
  ))}
</div>
            )}
            </div>
            </div>
            <Pagination totalPosts={workouts.length} itemsPerPage={itemsPerPage} setCurrentPage={setCurrentPage} currentPage={currentPage}/>

        </div>
      
)}


