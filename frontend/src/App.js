import './App.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import 'bootstrap/dist/css/bootstrap.min.css';
import TopTaitle from './TopTitle/TopTaitle';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Products from "./pages/Products";
import AddProduct from "./pages/AddProduct";
import UpdateProduct from "./pages/UpdateProduct";
import Profile from "./pages/Profile";
import Logout from "./pages/Logout";
import Navbar from './Header/Navbar';



function App() {
  return (
    <>
      <BrowserRouter>
      
        <TopTaitle></TopTaitle>
        <Navbar></Navbar>
        <div className="container">
        <Routes>
          <Route path="/" element={<Products />} />
          <Route path="/products" element={<Products />} />
          <Route path="/add-product" element={<AddProduct />} />
          <Route path="/update-product" element={<UpdateProduct />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/logout" element={<Logout />} />
        </Routes>
      </div>
        
        </BrowserRouter>
    </>
  );
}

export default App;


