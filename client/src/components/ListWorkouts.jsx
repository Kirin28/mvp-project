import React, { useState } from "react";
export default function ListWorkouts({displayWorkout}) {
    const [selectedWorkout, setSelectedWorkout] = useState({
    title: "",
    url: "",
    minutes: null,
    calories: null
      });








      return (
        <div>
            <ul>
                {displayWorkout.map(workout => (
                    <div key={workout.workout_id}>
                    <li>{`${workout.title}`}</li>
                    </div>
                ))}
            </ul>
        </div>
      
)}


/* const getStudentById = async id => {
    try {
      const response = await fetch(`/api/students/${id}`, {
        method: "GET"
      });
      const data = await response.json();
      setSelectedStudent(data); //can't pass setInfo because it's responsible for the input. Then the inputs changes when I click. I set selectedstudent equal to that one student with the requested id.
    } catch (error) {
      console.error(error);
    }
  }; */
