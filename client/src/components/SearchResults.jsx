import { useEffect, useState } from 'react';

export default function SearchResults() { //props from the app?

    const [workouts, setWorkouts] = useState([]); 
    const [posts, setPosts] = useState({
        title: "",
        url: "",
        embedID: "",
        minutes: null,
        calories: null,
    });

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


      const getQueryResults = async keyword => {
        try {
          const response = await fetch(`/api/search/?keyword=${keyword}`, {
            method: "GET"
          });
          const data = await response.json();
          setPosts(data); 
        } catch (error) {
          console.error(error);
        }
      };

}