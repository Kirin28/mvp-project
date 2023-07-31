import React, { useState, useEffect } from 'react';
import { useAuth } from './auth';
import { Navigate } from 'react-router-dom';

export default function LoginPage() {

/*     const [credentials, setCredentials] = useState({
        username: "",
        password: "",
      });
    const [errorMessage, setErrorMessage] = useState("");
    const navigate = useNavigate();  
    const [data, setData] = useState([]);

    const { username, password } = credentials;


    const handleUserChange = (e) => {
        setCredentials({ ...credentials, username: e.target.value })
    }

    const handlePassChange = (e) => {
      setCredentials({ ...credentials, password: e.target.value })
  }

    const handleLogin = async (e) => {
      e.preventDefault();
        if (!username || !password) {
            setErrorMessage("Please provide a username and a password to sign in.")
        } else {
          try {
            await login();
            setCredentials({ username: "", password: "" });
            setErrorMessage("");
            navigate("/admin");
          } catch (error) {
            if (error) {
              setErrorMessage(error.response.data.message);
            } else {
              setErrorMessage("An error occurred");
            }
          }
        }   
    }

    const login = async () => {
        try {
            const {data} = await axios("api/auth/login", {
            method: "POST",
            data: credentials,
            });

        localStorage.setItem("token", data.token);
        setData(data.message);
        console.log(data.message);
        } catch (error) {
            throw error;
        }
    } */
    const auth = useAuth();
    const [username, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const [isPasswordForgotten, setIsPasswordForgotten] = useState(null);
    const [newPassword, setNewPassword] = useState('');
  
    const login = (e) => {
      e.preventDefault();
      auth.login(username, password);
    };
  
    const resetPassword = (e) => {
      e.preventDefault();
      auth.resetPassword(username, newPassword);
    };
  
    useEffect(() => {
      if (auth.resetPasswordResponse.status === 200) {
        setIsPasswordForgotten(false);
      }
    }, [auth.resetPasswordResponse]);
  
    useEffect(() => {
      if (auth.loginResponse.isPasswordCorrect === false) {
        alert(auth.loginResponse.message);
      }
    }, [auth.loginResponse]);
  
    if (auth.user) {
      return <Navigate to="/profile" />;
    }
  
 /*    const handleUsernameChange = (e) => {
      const formattedUsername = e.target.value.trim().toLowerCase();
      setUserName(formattedUsername);
    };
  
    const handlePasswordChange = (e) => {
      const formattedPassword = e.target.value.replace(/\s/g, '');
      setPassword(formattedPassword);
    };
  
    const handleNewPasswordChange = (e) => {
      const formattedNewPassword = e.target.value.replace(/\s/g, '');
      setNewPassword(formattedNewPassword);
    }; */
    const handleUsernameChange = (e) => {
      const formattedUsername = e.target.value.trim().toLowerCase();
      setUserName(formattedUsername);
    };
  
    const handlePasswordChange = (e) => {
      const formattedPassword = e.target.value;
      setPassword(formattedPassword);
    };
  
    const handleNewPasswordChange = (e) => {
      const formattedNewPassword = e.target.value;
      setNewPassword(formattedNewPassword);
    };
  
    return (
      <>
      <div className='container pt-4'>
        {!isPasswordForgotten && (
          <div>
            <h1 className='text-bold my-2'>Sign in</h1>
            <div className="row">
            <form 
            className='container-md py-2'
            onSubmit={login}>

              <div className="col-sm-4 offset-sm-4 mt-2 mb-4">
              <label>Username</label>
              <input className="form-control" value={username} onChange={handleUsernameChange} />
              </div>

              <div className="col-sm-4 offset-sm-4 mt-2 mb-4">
              <label>Password</label>
              <input
                className="form-control"
                value={password}
                onChange={handlePasswordChange}
                type="password"
              />
              </div>
              <div className='text-center'>
              <button 
              className="btn btn-danger"
              type="submit">Sign in</button>
              </div>
            </form>
            </div>
            <div className='text-center pt-3'>
            <button 
              className="btn btn-outline-danger"
              onClick={() => setIsPasswordForgotten(true)}>
              Forgot your password?
            </button>
          </div>
          </div>
        )}
        {isPasswordForgotten && (
          <div className='row'>
            <form 
             className='container-md py-2'
             onSubmit={resetPassword}>
              <div className="col-sm-4 offset-sm-4 mt-2 mb-4">
              <label>Username</label>
              <input 
              className='form-control'
              value={username} onChange={handleUsernameChange} />
              </div>

              <div className="col-sm-4 offset-sm-4 mt-2 mb-4">
              <label>Type New Password</label>
              <input
                className='form-control'
                value={newPassword}
                onChange={handleNewPasswordChange}
                type="password"
              />
              </div>
              <div className='text-center'>
              <button 
              className="btn btn-danger"
              type="submit">Reset Password</button>
              </div>
            </form>
          </div>
        )}
        </div>
        <br />
      </>
    );
}
