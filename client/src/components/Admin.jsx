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

      const handleInputChange = event => {
        const value = event.target.value;
        const name = event.target.name;
        setPosts((prevState) => ({ ...prevState, [name]: value }));
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
        <h1 className='text-bold'>Admin View</h1>
        </div>


        <form className="container-md py-2" onSubmit={e => handleSubmit(e)}>
        
              <div className="form-floating">
                <input
                  id="floatingInput"
                  className="form-control my-1"
                  value={posts.title}
                  name="title"
                  onChange={e => handleInputChange(e)}
                  type="text"
                />
                <label htmlFor="floatingInput">Workout Title</label>
              </div>
           
            
              <div className="form-floating">
                <input
                  id="floatingName"
                  value={posts.url}
                  className="form-control my-1"
                  name="url"
                  onChange={e => handleInputChange(e)}
                  type="text"
                />
                <label htmlFor="floatingName">URL</label>
              </div>
       
        
          <div style={{ textAlign: "center" }}>
            <button className="btn btn-primary my-2 px-3">Add</button>
          </div>

          <p style={{ textAlign: "center", fontSize: "80%", color: "red" }}>
            {errorMessage}
          </p>
        </form>
        </>
      )
}