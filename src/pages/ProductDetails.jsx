import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../services/api";

function ProductDetails() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    getProduct();
  }, []);

  async function getProduct() {
    const response = await api.get(`/products/${id}`);
    setProduct(response.data);
  }

  async function addToCart() {
    const user = JSON.parse(localStorage.getItem("user"));

    await api.post("/cart", {
      userId: user.id,
      productId: product.id,
      name: product.name,
      image: product.image,
      price: product.price,
      quantity: 1
    });

    alert("Product added to cart");
  }

  if (!product) {
    return <h2>Loading...</h2>;
  }

  return (
    <div className="details">
      <img src={product.image} alt={product.name} />

      <h1>{product.name}</h1>
      <p>{product.description}</p>

      <h3>Category</h3>
      <p>{product.category}</p>

      <h3>Price</h3>
      <p>₹ {product.price}</p>

      <h3>Rating</h3>
      <p>⭐ {product.rating}</p>

      <button className="submit-btn" onClick={addToCart}>
        Add To Cart
      </button>
    </div>
  );
}

export default ProductDetails;