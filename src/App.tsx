import './App.css'
import Navbar from './components/Navbar';
import { BrowserRouter, Routes, Route } from "react-router";
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import { useSelector } from 'react-redux';
import type { RootState } from './Redux/store';
import ProtectedRoute from './components/ProtectedRoute';
function App() {
  const isLogged = useSelector((state: RootState) => state.isLoggedIn);


  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route element={<ProtectedRoute isLogged={isLogged} />}>
          <Route path="/" element={<Dashboard />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
