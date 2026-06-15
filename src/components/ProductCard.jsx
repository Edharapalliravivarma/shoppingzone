import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addFavorite } from "../features/favoriteSlice";
import api from "../services/api";

function ProductCard({ product, getProducts }) {
  const dispatch = useDispatch();

  async function deleteProduct(id) {
    const confirmDelete = window.confirm("Are you sure you want to delete this product?");

    if (confirmDelete) {
      await api.delete(`/products/${id}`);
      alert("Product deleted");
      getProducts();
    }
  }

  return (
    <div className="card">
      <img src={product.image} alt={product.name} />

      <div className="card-body">
        <h3>{product.name}</h3>
        <p>{product.category}</p>
        <p>⭐ {product.rating}</p>
        <p className="price">₹ {product.price}</p>

        <div className="card-actions">
          <Link className="view-btn" to={`/products/${product.id}`}>
            View
          </Link>

          <Link className="edit-btn" to={`/edit-product/${product.id}`}>
            Edit
          </Link>

          <button className="delete-btn" onClick={() => deleteProduct(product.id)}>
            Delete
          </button>
        </div>

        <button className="fav-btn" onClick={() => dispatch(addFavorite(product))}>
          ❤ Add Favorite
        </button>
      </div>
    </div>
  );
}

export default ProductCard;