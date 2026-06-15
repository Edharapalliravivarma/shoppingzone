import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../services/api";
import ProductCard from "../components/ProductCard";

function Products() {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [sort, setSort] = useState("");

  useEffect(() => {
    getProducts();
  }, []);

  async function getProducts() {
    try {
      const response = await api.get("/products");
      setProducts(response.data);
    } catch (error) {
      console.log(error);
    }
  }

  const filteredProducts = products.filter((product) => {
    const searchMatch = product.name
      .toLowerCase()
      .includes(search.toLowerCase());

    const categoryMatch =
      category === "All" ||
      product.category === category;

    return searchMatch && categoryMatch;
  });

  let finalProducts = [...filteredProducts];

  if (sort === "high") {
    finalProducts.sort(
      (a, b) => b.rating - a.rating
    );
  }

  if (sort === "low") {
    finalProducts.sort(
      (a, b) => a.rating - b.rating
    );
  }

  return (
    <>
      <div className="products-header">
        <h1>All Products</h1>

        <Link
          to="/add-product"
          className="add-product-btn"
        >
          ➕ Add New Product
        </Link>
      </div>

      <div className="filters">
        <input
          type="text"
          placeholder="Search Product"
          value={search}
          onChange={(e) =>
            setSearch(e.target.value)
          }
        />

        <select
          value={category}
          onChange={(e) =>
            setCategory(e.target.value)
          }
        >
          <option>All</option>
          <option>Mobile</option>
          <option>Laptop</option>
          <option>Electronics</option>
          <option>Wearables</option>
          <option>Camera</option>
          <option>Fashion</option>
          <option>Accessories</option>
        </select>

        <select
          value={sort}
          onChange={(e) =>
            setSort(e.target.value)
          }
        >
          <option value="">
            Sort Rating
          </option>

          <option value="high">
            High To Low
          </option>

          <option value="low">
            Low To High
          </option>
        </select>
      </div>

      <div className="products">
        {finalProducts.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            getProducts={getProducts}
          />
        ))}
      </div>
    </>
  );
}

export default Products;