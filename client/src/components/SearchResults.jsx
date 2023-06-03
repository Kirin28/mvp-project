import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function SearchResults({results, setResults}) { 

  const [query, setQuery] = useState ("");
  //const [results, setResults] = useState ([]);
  const [error, setError] = useState("");

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
  };



const handleInputChange = (e) => {
const value = e.target.value;
setQuery(value);
  };

return (
  <div className='container pt-4'>
  <div className='row'>
  <div className='col'>
 <h1 className='text-bold'>Search results</h1>
 </div>
 <div className='col pt-2'>
 <div className="input-group mb-3">
<input  
value={query}
onChange={handleInputChange}
type="search" 
className="form-control border border-secondary shadow-none py-2" placeholder="Search..." aria-label="Search..." aria-describedby="button-addon2"/>
<button
onClick={handleSubmit} 
className="button-white btn btn-outline-secondary" type="button" id="button-addon2">
<i className="fas fa-search"></i>
</button>
</div>
 </div>

 </div>

 {error && <p style={{color: "red", fontSize: "80%"}}>{error}</p>}
        <div className='container py-2'>
            <div className='row'>
              {results.length > 0 && results.map((r) => (
                <div key={r.WorkoutID} className='col-md-4'>
                  <div className="card mb-3">
              <div className="card-body">
                <h5 className="card-title t-center">{r.title}</h5>
                <p className='t-center'>{`${r.minutes} minutes`}</p>
                <div className="d-flex justify-content-center">
                <iframe className='vid t-center' title="YouTube video player" src={`https://www.youtube.com/embed/${r.embedID}`} allowFullScreen
          allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" ></iframe>
                </div>
                <p className='t-center pt-2'><a href={r.url} target="_blank">Click here to watch on YouTube!</a></p>
              </div>
            </div>
          </div>
        
              ))}
            </div>
         
            </div>
 </div>

)
}

{/* <ul>
{results.length > 0 && results.map((r) => (
  <li key={r.WorkoutID}>{r.title}</li>
))}
  </ul> */}