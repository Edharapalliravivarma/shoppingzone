import { useDispatch, useSelector } from "react-redux";
import { removeFavorite } from "../features/favoriteSlice";

function Favorites() {
  const dispatch = useDispatch();
  const favorites = useSelector((state) => state.favorites);

  return (
    <div>
      <h1>Favorite Products</h1>

      {favorites.length === 0 ? (
        <div className="empty-box">
          <h2>No Favorite Products</h2>
          <p>Add products from the products page.</p>
        </div>
      ) : (
        <div className="products">
          {favorites.map((product) => (
            <div className="card" key={product.id}>
              <img src={product.image} alt={product.name} />

              <div className="card-body">
                <h3>{product.name}</h3>
                <p>{product.category}</p>
                <p>⭐ {product.rating}</p>
                <p className="price">₹ {product.price}</p>

                <button
                  className="delete-btn full-btn"
                  onClick={() => dispatch(removeFavorite(product.id))}
                >
                  Remove Favorite
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Favorites;