// React
import { useState } from 'react';

// React Router
import { Routes, Route } from 'react-router-dom';

// Providers
import AuthProvider, { AuthRoute } from './components/auth';

// Styles and Assets
import './App.css';
import 'google-fonts';

// Components
import Footer from './components/Footer';
import Menu from './components/Menu';

// Pages
import ListWorkouts from './components/ListWorkouts';
import Admin from './components/Admin';
import ProfilePage from './components/ProfilePage';
import LoginPage from './components/LoginPage';
import LogoutPage from './components/LogoutPage';
import Homepage from './components/Homepage';
import SearchResults from './components/SearchResults';
import SignupPage from './components/SignupPage';

function App() {
  const [results, setResults] = useState([]);

  return (
    <>
      <AuthProvider>
        <Menu />

        <Routes>
          <Route
            path="/"
            element={<Homepage results={results} setResults={setResults} />}
          />
          <Route
            path="/search/:query"
            element={
              <SearchResults results={results} setResults={setResults} />
            }
          />
          <Route
            path="/workouts"
            element={<ListWorkouts workouts={results} setWorkouts={results} />}
          />
          <Route
            path="/admin"
            element={
              <AuthRoute>
                <Admin />
              </AuthRoute>
            }
          />
          <Route
            path="/profile"
            element={
              <AuthRoute>
                <ProfilePage />
              </AuthRoute>
            }
          />

          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />

          <Route
            path="/logout"
            element={
              <AuthRoute>
                <LogoutPage />
              </AuthRoute>
            }
          />
          <Route path="*" element={<p>Not found</p>} />
        </Routes>
      </AuthProvider>

      <div className="myFooter footer-sticky">
        <main></main>
        <Footer />
      </div>
    </>
  );
}

export default App;