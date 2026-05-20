import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";

import "./styles/theme.css";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Books from "./pages/Books";
import Cart from "./pages/Cart";
import Orders from "./pages/Orders";
import Admin from "./pages/Admin";

import AdminBooks from "./pages/AdminBooks";
import AdminOrders from "./pages/AdminOrders";
import AdminAnalytics from "./pages/AdminAnalytics";

import Navbar from "./components/Navbar";

function App() {

  return (

    <BrowserRouter>

      <Navbar />

      <Routes>

        {/* USER */}

        <Route
          path="/"
          element={<Books />}
        />

        <Route
          path="/login"
          element={<Login />}
        />

        <Route
          path="/register"
          element={<Register />}
        />

        <Route
          path="/cart"
          element={<Cart />}
        />

        <Route
          path="/orders"
          element={<Orders />}
        />

        {/* ADMIN */}

        <Route
          path="/admin"
          element={<Admin />}
        />

        <Route
          path="/admin/books"
          element={<AdminBooks />}
        />

        <Route
          path="/admin/orders"
          element={<AdminOrders />}
        />
        <Route
          path="/admin/analytics"
          element={<AdminAnalytics />}
        />

      </Routes>

    </BrowserRouter>
  );
}

export default App;