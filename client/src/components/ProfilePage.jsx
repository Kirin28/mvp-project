import React, { useEffect, useState } from 'react';
import { useAuth } from './auth';
import { Pagination } from './Pagination';

export default function ProfilePage() {
  const auth = useAuth();

  const [workouts, setWorkouts] = useState(auth.user.favoriteWorkouts);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(9);

  useEffect(() => {
    getFavoriteWorkouts();
  }, []);

  const getFavoriteWorkouts = async () => {
    const favoriteWorkoutsIds = auth.user.favoriteWorkouts;
    try {
      const response = await fetch('/api/workouts', {
        method: 'GET',
      });
      const data = await response.json();
      const favoriteWorkouts = data.filter((workout) =>
        favoriteWorkoutsIds.includes(workout.id)
      );
      setWorkouts(favoriteWorkouts);
      setLoading(false);
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };

  const lastItemIndex = currentPage * itemsPerPage;
  const firstItemIndex = lastItemIndex - itemsPerPage;
  const favoriteWorkouts = workouts.filter((workout) =>
    auth.user.favoriteWorkouts.includes(workout.id)
  );
  const currentItems = favoriteWorkouts.slice(firstItemIndex, lastItemIndex);

  const addToFavorites = (workoutId) => {
    const userId = auth.user.id;
    auth.addFavoriteWorkout(userId, workoutId);
  };

  const removeFromFavorites = (workoutId) => {
    const userId = auth.user.id;
    auth.removeFavoriteWorkout(userId, workoutId);

    setWorkouts((prevWorkouts) =>
      prevWorkouts.filter((workout) => workout.id !== workoutId)
    );
  };

  return (
    <>
      <div className='container pt-4'>
        <h1 className='text-bold'>Profile</h1>
        <p className='txt-big'>Welcome, {auth.user.username}!</p>
      </div>

      <div>
        <div className="container pt-4">
          <h1 className="text-bold">Favorite Workouts</h1>
          <br />

          <div className="container py-2">
            {loading ? (
              <p className="text-bold">Loading...</p>
            ) : (
              <div className="row">
                {currentItems.map((workout) => (
                  <div key={workout.id} className="col-md-4">
                    <div className="card mb-3">
                      <div className="card-body">
                        <h5 className="card-title t-center">{workout.title}</h5>
                        <p className="t-center">{`${workout.minutes} minutes`}</p>
                        <div className="d-flex justify-content-center">
                          <iframe
                            className="vid t-center"
                            title="YouTube video player"
                            src={`https://www.youtube.com/embed/${workout.embedID}`}
                            allowFullScreen
                            frameBorder="0"
                            allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                          ></iframe>
                        </div>
                        <p className="t-center pt-2">
                          <a
                            href={workout.url}
                            target="_blank"
                            rel="noreferrer"
                          >
                            Click here to watch on YouTube!
                          </a>
                        </p>
                      </div>

                      {auth.user && (
                        <div className='text-center'>
                          {auth.user.favoriteWorkouts.includes(workout.id) ? (
                            <button
                              type="button"
                              className="btn btn-primary"
                              onClick={() => removeFromFavorites(workout.id)}
                            >
                               <i className="fa-solid fa-trash-can"></i>
                            </button>
                          ) : (
                            <button
                              type="button"
                              className="btn btn-danger"
                              onClick={() => addToFavorites(workout.id)}
                            >
                               <i className="fa-solid fa-heart"></i>
                            </button>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
        <Pagination
          totalPosts={favoriteWorkouts.length}
          itemsPerPage={itemsPerPage}
          setCurrentPage={setCurrentPage}
          currentPage={currentPage}
        />
      </div>
    </>
  );
}