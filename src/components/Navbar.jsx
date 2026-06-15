import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

function Navbar() {
  const user = JSON.parse(localStorage.getItem("user"));
  const favorites = useSelector((state) => state.favorites);

  return (
    <nav>
      <h2>🛒 ShoppingZone</h2>

      <div className="nav-links">
        <Link to="/">Home</Link>
        <Link to="/products">Products</Link>
        <Link to="/favorites">Favorites ({favorites.length})</Link>

        {user && (
          <>
    
            <Link to="/cart">Cart</Link>
            <Link to="/orders">My Orders</Link>
            <Link to="/logout">Logout</Link>
          </>
        )}

        {!user && (
          <>
            <Link to="/register">Register</Link>
            <Link to="/login">Login</Link>
          </>
        )}
      </div>
    </nav>
  );
}

export default Navbar;