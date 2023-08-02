import React, { createContext, useContext, useState } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';

// React Router
import { useNavigate, Navigate } from 'react-router-dom';

const AuthContext = React.createContext(); //AuthContext is created using createContext function from React. This will be the context for authentication related data and functions

function AuthProvider({ children }) { //is a wrapper component that provides auth-related functionality to its child components. Need to wrap the app.jsx return statement in it
  const navigate = useNavigate();

  const [user, setUser] = useState(null);
  const [data, setData] = useState(null);
  const [signupResponse, setSignupResponse] = useState({ //the signup didn't work because I removed the response object in the POST req
    status: null,
    message: null,
  });
  const [loginResponse, setLoginResponse] = useState({ //to mirror the object structure from the server?
    status: null,
    message: null,
    isUsernameCorrect: null,
    isPasswordCorrect: null,
  });

  const [resetPasswordResponse, setResetPasswordResponse] = useState({
    status: null,
    message: null,
  });

  const [addFavoriteWorkoutResponse, setAddFavoriteWorkoutResponse] = useState({
    status: null,
    message: null,
  });

  const [removeFavoriteWorkoutResponse, setRemoveFavoriteWorkoutResponse] =
    useState({
      status: null,
      message: null,
    });

  const signup = async (username, password) => {
    try {
      const response = await axios.post(
        'api/users/register',
        { username: username, password: password },
        { method: 'POST' }
      );
      setSignupResponse({
        status: response.data.status,
        message: response.data.message,
      });
      navigate('/login');
      alert('Your registration was successful.');
    } catch (error) {
      setSignupResponse({
        status: error.response.status,
        message: error.response.data.message,
      });
    }
  };

  const login = async (username, password) => {
    try {
      const response = await axios.post('/api/users/login', {
        username: username,
        password: password,
      });

      // Store the token locally
      localStorage.setItem('token', response.data.token);
      const requestedData = await requestData();
      setUser(requestedData); // Update the user state
      setLoginResponse({
        status: response.data.status,
        message: response.data.message,
      });
      navigate('/profile');
    } catch (error) {
      setLoginResponse({
        status: error.response.status,
        message: error.response.data.message,
        isUsernameCorrect: error.response.data.isCorrectUsername,
        isPasswordCorrect: error.response.data.isCorrectPassword,
      });
    }
  };

  const requestData = async () => { //makes HTTP request to retrieve user profile data frpm the server. Same as "VerifyUser" I did earlier
    try {
      const { data } = await axios('/api/users/profile', {
        headers: {
          authorization: 'Bearer ' + localStorage.getItem('token'),
        },
      });
      // console.log(data);
      setData(data);
      return data; //need to return data because I am calling in in another function
    } catch (error) {
      // console.log(error.message);
      setData(error.message);

      return null; // Return null or handle the error appropriately
    }
  };

  const resetPassword = async (username, newPassword) => {
    // console.log(username, newPassword);
    try {
      const response = await axios.patch(
        'api/users/reset-password',
        { username: username, password: newPassword },
        { method: 'PATCH' }
      );
      setResetPasswordResponse({
        status: response.data.status,
        message: response.data.message,
      });
      alert('Password change succesful');
    } catch (error) {
      setResetPasswordResponse({
        status: error.response.status,
        message: error.response.data.message,
      });
      alert('User not found');
      navigate('/signup');
      setResetPasswordResponse({
        status: null,
        message: null,
      });
    }
  };

  const addFavoriteWorkout = async (id, workout) => {
    try {
      const response = await axios.patch('/api/users/add-favorite-workout', {
        id,
        favoriteWorkouts: [workout],
      });
      setAddFavoriteWorkoutResponse({
        status: response.status,
        message: response.data.message,
      });
      setUser((prevUser) => ({
        ...prevUser,
        favoriteWorkouts: response.data.favoriteWorkouts,
      }));
    } catch (error) {
      setAddFavoriteWorkoutResponse({
        status: error.status,
        message: error.message,
      });
    }
  };

  const removeFavoriteWorkout = async (id, workout) => {
    try {
      const response = await axios.patch('/api/users/remove-favorite-workout', {
        id,
        favoriteWorkouts: [workout],
      });
      setRemoveFavoriteWorkoutResponse({
        status: response.status,
        message: response.data.message,
      });
      setUser((prevUser) => ({
        ...prevUser,
        favoriteWorkouts: response.data.favoriteWorkouts,
      }));
    } catch (error) {
      setRemoveFavoriteWorkoutResponse({
        status: error.response.status,
        message: error.response.data.message,
      });
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    setData(null);
    setUser(null);
    setSignupResponse({
      status: null,
      message: null,
    });
    setSignupResponse({
      status: null,
      message: null,
      isUsernameCorrect: null,
      isPasswordCorrect: null,
    });
    navigate('/');
  };

  const auth = {
    user,
    login,
    loginResponse,
    signup, // Function
    signupResponse, // State
    resetPassword,
    resetPasswordResponse,
    addFavoriteWorkout,
    addFavoriteWorkoutResponse,
    removeFavoriteWorkout,
    removeFavoriteWorkoutResponse,
    logout,
  };

  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
}

function useAuth() { //useAuth hook allows the components to access the authentication-related states and functions from AuthContext
  const auth = useContext(AuthContext); //uses useContext to consume AuthContext and return auth object (line 195)
  return auth;
}

function AuthRoute(props) { //a helper component that can be used to protect routes that require authentication
  const auth = useAuth(); //uses useAuth hook to access auth-related states and functions

  if (!auth.user) {
    return <Navigate to="/login" />;
  }

  return props.children; //if user is authenticated it renders its child components
}

export default AuthProvider;
export { useAuth, AuthRoute };