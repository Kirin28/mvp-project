import { useEffect, useState } from 'react';
import axios from 'axios';

export default function SearchResults() { //props from the app?

    const [query, setQuery] = useState ("");
    const [results, setResults] = useState ([]); 
    const [error, setError] = useState("");
    const [posts, setPosts] = useState({
        title: "",
        url: "",
        embedID: "",
        minutes: null,
        calories: null,
    });
    const getWorkouts =  async () => { //debounce removed
      try {
        setError (null);
        const response = await axios.get (`/api/search/?keyword=${query}`);
        setResults(response.data);
      } catch (err) {
        setError (err.message);
      }
    }; // delay the execution?
  
  
  
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
  <div className='container'>
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
     <ul>
      {results.length > 0 && results.map((r) => (
        <li key={r.WorkoutID}>{r.title}</li>
      ))}
        </ul>
 </div>

)
}