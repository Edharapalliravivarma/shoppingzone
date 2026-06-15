import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../services/api";

function EditProduct() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState({
    name: "",
    category: "",
    price: "",
    rating: "",
    image: "",
    description: ""
  });

  useEffect(() => {
    getProduct();
  }, []);

  async function getProduct() {
    try {
      const response = await api.get(
        `/products/${id}`
      );

      setProduct(response.data);
    } catch (error) {
      console.log(error);
    }
  }

  function handleChange(e) {
    setProduct({
      ...product,
      [e.target.name]: e.target.value
    });
  }

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      await api.put(
        `/products/${id}`,
        {
          ...product,
          price: Number(product.price),
          rating: Number(product.rating)
        }
      );

      alert("Product Updated Successfully");
      navigate("/products");
    } catch (error) {
      console.log(error);
      alert("Update Failed");
    }
  }

  return (
    <div className="form-container">
      <h2>Edit Product</h2>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Product Name"
          value={product.name}
          onChange={handleChange}
          required
        />

        <input
          type="text"
          name="category"
          placeholder="Category"
          value={product.category}
          onChange={handleChange}
          required
        />

        <input
          type="number"
          name="price"
          placeholder="Price"
          value={product.price}
          onChange={handleChange}
          required
        />

        <input
          type="number"
          step="0.1"
          name="rating"
          placeholder="Rating"
          value={product.rating}
          onChange={handleChange}
          required
        />

        <input
          type="text"
          name="image"
          placeholder="Image URL"
          value={product.image}
          onChange={handleChange}
          required
        />

        <textarea
          name="description"
          placeholder="Description"
          value={product.description}
          onChange={handleChange}
          required
        ></textarea>

        <button className="submit-btn">
          Update Product
        </button>
      </form>
    </div>
  );
}

export default EditProduct;