import { Link } from "react-router-dom";

function Home() {
  return (
    <section className="home">
      <div className="home-content">
        <h1>Welcome to sarcasticshoppy</h1>
        <p>Explore mobiles, laptops, electronics, fashion and accessories at the best prices.</p>
        <Link to="/products" className="hero-btn">Explore Products</Link>
      </div>
    </section>
  );
}

export default Home;