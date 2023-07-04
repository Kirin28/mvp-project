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
  
    const handleUsernameChange = (e) => {
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
    };
  
    return (
      <>
        {!isPasswordForgotten && (
          <div>
            <h1>Login</h1>
            <form onSubmit={login}>
              <label>Username</label>
              <input value={username} onChange={handleUsernameChange} />
              <label>Password</label>
              <input
                value={password}
                onChange={handlePasswordChange}
                type="password"
              />
              <button type="submit">Login</button>
            </form>
            <button onClick={() => setIsPasswordForgotten(true)}>
              Forgot your password?
            </button>
          </div>
        )}
        {isPasswordForgotten && (
          <div>
            <form onSubmit={resetPassword}>
              <label>Username</label>
              <input value={username} onChange={handleUsernameChange} />
              <label>Type New Password</label>
              <input
                value={newPassword}
                onChange={handleNewPasswordChange}
                type="password"
              />
              <button type="submit">Reset Password</button>
            </form>
          </div>
        )}
      </>
    );
}
