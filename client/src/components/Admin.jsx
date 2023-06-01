import { useEffect, useState } from 'react'

export default function Admin() {
    const [workouts, setWorkouts] = useState([]);
    const [posts, setPosts] = useState({
        title: "",
        url: "",
        embedID: "",
        minutes: null,
        calories: null,
    });
    const [errorMessage, setErrorMessage] = useState("");


    
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
        getWorkouts();
      }, []);
     
      const handleInputChange = (event) => {
        const { name, value } = event.target;
        setPosts((prevValues) => ({ ...prevValues, [name]: value }));
      };

      const handleSubmit = async event => {
        event.preventDefault();
        if (! posts.title && !posts.url && !posts.embedID && !posts.minutes && !posts.calories) {
          setErrorMessage("Please fill out the fields");
        } else {
          await addWorkout();
          setPosts({
            title: "",
            url: "",
            embedID: "",
            minutes: null,
            calories: null,
          });
          setErrorMessage("");
        }
      };

      const addWorkout = async () => {
        try {
          const response = await fetch("/api/workouts", {
            method: "POST",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify({
              title: posts.title,
              url: posts.url,
              embedID: posts.embedID,
              minutes: posts.minutes,
              calories: posts.calories
            })
          });
          const data = await response.json();
          setWorkouts(data);
        } catch (error) {
          console.error(error);
        }
      };
    


      return (
        <>
        <div className='container py-2'>
        <h1 className='text-bold mt-2'>Admin Page</h1>
       
<h4 className='text-bold py-2'>Instructions</h4>
<div className='row'>
  <div className='col-sm-8'>
<ol>
  <li className='fw-normal'>Provide a descriptive title for the workout video.</li>
  <li>Copy the URL of the video you want to add and paste it to the input.</li>
  <li>Extract the Video ID from the URL using the following steps:</li>
  <ol type="a">
    <li>Open the video URL in your browser.</li>
    <li>Look for the section of the URL that contains a series of characters after "embed/" or "v=". For example, if the URL is "https://www.example.com/abcdefg," or "https://www.example.com/watch?v=abcdefg" the Video ID is "abcdefg".</li>
    <li>Copy the Video ID for later use.</li>
  </ol>
  <li>Indicate the duration of the workout video in minutes.</li>
  <li>Mention the estimated number of calories burned during the workout.</li>
</ol>
</div>
</div>
        <form className="container-md py-2" onSubmit={e => handleSubmit(e)}>
          
        
              <div className="mb-3">
              <label htmlFor="title" className='form-label'>1. Workout Title</label>
                <input
                  id="title"
                  className="form-control"
                  value={posts.title}
                  name="title"
                  onChange={e => handleInputChange(e)}
                  type="text"
                />
              </div>
           
            
              <div className="mb-3">
              <label htmlFor="url" className='form-label'>2. URL</label>
                <input
                id="url"
                  value={posts.url}
                  className="form-control"
                  name="url"
                  onChange={e => handleInputChange(e)}
                  type="text"
                />
              </div>


              <div className="mb-3">
              <label htmlFor="embedID" className='form-label'>3. Video ID</label>
                <input
                id="embedID"
                  value={posts.embedID}
                  className="form-control"
                  name="embedID"
                  onChange={e => handleInputChange(e)}
                  type="text"
                />
              </div>

              <div className="mb-3">
              <label htmlFor="minutes" className='form-label'>4. Minutes</label>
                <input
                id="minutes"
                  value={posts.minutes || ''}
                  className="form-control"
                  name="minutes"
                  onChange={e => handleInputChange(e)}
                  type="number"
                />
              </div>

              <div className="mb-3">
              <label htmlFor="calories" className='form-label'>5. Calories</label>
                <input
                id="calories"
                  value={posts.calories || ''}
                  className="form-control"
                  name="calories"
                  onChange={e => handleInputChange(e)}
                  type="number"
                />
              </div>
          <div>
            <button className="btn btn-danger my-2 px-3">Add</button>
          </div>
         

          <p style={{ textAlign: "center", fontSize: "80%", color: "red" }}>
            {errorMessage}
          </p>
        </form>
        </div>
        </>
      )
}