import { useEffect, useState } from 'react'
import homeimage from './assets/Group_1.png';
import gymimage from './assets/Group_2.1.png'
import grainimage from './assets/group_2.2.png'
import gymimage2 from './assets/group_2.3.png'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function Homepage({results, setResults}) {

  const navigate = useNavigate();  
  const [query, setQuery] = useState ("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);


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
    navigate(`/search/${query}`);
  }
  };



const handleInputChange = (e) => {
const value = e.target.value;
setQuery(value);
  };

  return (
    <>
     
    <div className='container pt-4'>
      <div className='row'>
      <div className='col'>
     <h1 className='text-bold'>Homepage</h1>
     </div>
     <div className='col pt-2'>
      <form onSubmit={handleSubmit}>
     <div className="input-group mb-3">
  <input  
  value={query}
  onChange={handleInputChange}
  type="search" 
  className="form-control border border-secondary shadow-none py-2" placeholder="Search..." aria-label="Search..." aria-describedby="button-addon2"/>
  <button 
  className="button-white btn btn-outline-secondary" type="button" id="button-addon2">
  <i className="fas fa-search"></i>
  </button>
</div>
</form>
     </div>
  
     </div>
    
     <img className='img-fluid round py-3 my-3 homeimage' src={homeimage} alt="Homepage" />

<br />
<div className='container'>
<div className='row pt-2'>
  <div className='col-lg-4 py-1'>
  <div className="card h-100">
  <img src={gymimage} className="card-img-top img-fluid" alt="..."/>
  <div className="card-body " style={{height: "200px"}}>
    <p className="card-text fw-semibold">Welcome to Forever Active, your ultimate destination for fitness enthusiasts! Our homepage offers a comprehensive collection Adidas and Nike workout videos right at your fingertips.</p>
  </div>
</div>
  </div>
  

  <div className='col-lg-4 py-1'>
  <div className="card h-100">
  <img src={grainimage} className="card-img-top img-fluid" alt="..."/>
  <div className="card-body">
    <p className="card-text fw-semibold">Once you've found your ideal workout video, you can watch it directly on our website. Alternatively, we provide a convenient redirection to YouTube, allowing you to access the video on their platform if you prefer.</p>
  </div>
</div>
    </div>
    
    <div className='col-lg-4 py-1'>
    <div className="card h-100">
  <img src={gymimage2} className="card-img-top img-fluid" alt="..."/>
  <div className="card-body">
    <p className="card-text fw-semibold">Join our community of fitness enthusiasts and take your workout journey to new heights. Embrace the power of exercise, challenge yourself, and achieve your fitness goals with our comprehensive workout video library!</p>
  </div>
</div>
  </div>

     </div>
     </div>
     <br />
     <p className='fw-semibold text-center my-2 py-2'>All workout videos are a property of Adidas Runtastic and Nike Training Club.</p>
<div className='mb-4'></div>

     </div>
       
    </>
  )
}

