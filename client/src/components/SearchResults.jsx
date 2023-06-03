import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';


export default function SearchResults({query, results, getWorkouts, handleSubmit, handleInputChange, error, setError}) { 


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