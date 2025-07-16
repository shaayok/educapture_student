import Dashboard from './components/Dashboard/Dashboard';
import ProtectedRoute from './components/ProtectedRoute';
import { AuthProvider } from './context/AuthContext';
import Login from './pages/Auth/Login';
import { Route,Routes, BrowserRouter as Router, Navigate } from 'react-router-dom';
import "../src/styles/global.css";
function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />s
        <Route path="/login" element={<Login />} />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
    </AuthProvider >
  );
}

export default App;
