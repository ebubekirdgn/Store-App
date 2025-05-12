import { useEffect, useState } from "react";
import ProductList from "../../components/products/ProductList";

export default function ProductsPage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null); // Yeni: Hata durumu için state

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("http://localhost:5000/products/");
        
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        setProducts(data);
      } catch (err) {
        console.error("Failed to fetch products:", err);
        setError("Ürünler yüklenirken bir hata oluştu.");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) return <h1>Yükleniyor...</h1>;
  if (error) return <h1>{error}</h1>;
  if (products.length === 0) return <h2>Ürün bulunamadı.</h2>;

  return <ProductList products={products} />;
}
