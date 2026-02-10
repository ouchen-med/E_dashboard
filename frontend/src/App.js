import './App.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Products from "./pages/Products";
import AddProduct from "./pages/AddProduct";
import UpdateProduct from "./pages/UpdateProduct";
import Profile from "./pages/Profile";
import Logout from "./pages/Logout";
import Navbar from './Header/Navbar';
import Footer from './Footer/Footer';
import SignUp from './pages/SignUp';



function App() {
  return (
   <div className="d-flex flex-column min-vh-100">
      <BrowserRouter>
        <Navbar />
        <div className="container flex-grow-1">
          <Routes>
            <Route path="/" element={<Products />} />
            <Route path="/products" element={<Products />} />
            <Route path="/add-product" element={<AddProduct />} />
            <Route path="/update-product" element={<UpdateProduct />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/regester" element={<SignUp />} />
            <Route path="/logout" element={<Logout />} />
          </Routes>
        </div>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;


