import Product from "./pages/Product";
import Cart from "./pages/Cart";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ProductList from "./pages/ProductList"
import Pay from "./pages/Pay"
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import Success from "./pages/Success";
import { useSelector } from "react-redux";

function App() {

  const user = useSelector(state => state.user.currentUser)
  
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />

          <Route path='/product/:id' element={<Product />} />
          <Route path='/products/:category' element={<ProductList />} />
          <Route path='/cart' element={<Cart />} />
          <Route path='/login' element={
            user ? <Navigate to='/' /> : <Login />
          } />
          <Route path='/register' element={
            user ? <Navigate to='/' /> : <Register />
          } />
          <Route path='/pay' element={<Pay />} />
          <Route path='/Success' element={<Success />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
