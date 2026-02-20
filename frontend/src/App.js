import './App.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Products from "./pages/Products";
import AddProduct from "./pages/AddProduct";
import Profile from "./pages/Profile";
import Logout from "./pages/Logout";
import Navbar from './Header/Navbar';
import Footer from './Footer/Footer';
import SignUp from './pages/SignUp';
import Login from './pages/Login';
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useState } from "react";




function App() {
  const [user, setUser] = useState(() => {
  const token = localStorage.getItem("token");
  if (!token) return null;
  try {
    const payload = JSON.parse(atob(token.split('.')[1]));
    return payload;
  } catch (err) {
    console.error("Invalid token", err);
    localStorage.removeItem("token");
    return null;
  }
});

  return (
   <div className="d-flex flex-column min-vh-100">
      <BrowserRouter>
        <Navbar user={user} setUser={setUser} />
        <div className="container flex-grow-1">
          <Routes>
            <Route path="/" element={<Products />} />
            <Route path="/products" element={<Products user={user} setUser={setUser} />} />

            <Route path="/add-product" element={<AddProduct />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/regester" element={<SignUp setUser={setUser} />} />
            <Route path="/logout" element={<Logout setUser={setUser} />} />
            <Route path="/login" element={<Login setUser={setUser} />} />

          </Routes>
        </div>
        <Footer />
      </BrowserRouter>
      <ToastContainer position="top-right" autoClose={2000} />

    </div>
  );
}

export default App;


