import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

function AddProduct() {
  const navigate = useNavigate();

  const [product, setProduct] = useState({
    name: "",
    category: "",
    price: "",
    rating: "",
    image: "",
    description: ""
  });

  function handleChange(e) {
    setProduct({
      ...product,
      [e.target.name]: e.target.value
    });
  }

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      await api.post("/products", {
        ...product,
        price: Number(product.price),
        rating: Number(product.rating)
      });

      alert("Product Added Successfully");

      navigate("/products");
    } catch (error) {
      console.log(error);
      alert("Failed To Add Product");
    }
  }

  return (
    <div className="form-container">
      <h2>Add Product</h2>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Product Name"
          onChange={handleChange}
          required
        />

        <input
          type="text"
          name="category"
          placeholder="Category"
          onChange={handleChange}
          required
        />

        <input
          type="number"
          name="price"
          placeholder="Price"
          onChange={handleChange}
          required
        />

        <input
          type="number"
          step="0.1"
          name="rating"
          placeholder="Rating"
          onChange={handleChange}
          required
        />

        <input
          type="text"
          name="image"
          placeholder="Image URL"
          onChange={handleChange}
          required
        />

        <textarea
          name="description"
          placeholder="Description"
          onChange={handleChange}
          required
        ></textarea>

        <button className="submit-btn">
          Add Product
        </button>
      </form>
    </div>
  );
}

export default AddProduct;