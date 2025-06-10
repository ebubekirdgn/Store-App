import {
  Box,
  Typography,
  Container,
  Pagination,
  CircularProgress,
} from "@mui/material";
import { useState, useEffect } from "react";
import ProductCard from "./ProductCard";
import requests from "../../api/apiClient";
import { useSearchParams } from "react-router-dom"; // EKLENDİ

const PAGE_SIZE = 20;

function ProductList() {
  const [searchParams, setSearchParams] = useSearchParams();
  const pageParam = parseInt(searchParams.get("page")) || 1;
  const [products, setProducts] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    requests.products.list(pageParam, PAGE_SIZE).then((res) => {
      //console.log("Gelen veri:", res);
      setProducts(res.products); // DÜZELTİLDİ
      setTotalPages(res.totalPages);
      setLoading(false);
    });
  }, [pageParam]);

  const handleChange = (event, value) => {
    setSearchParams({ page: value }); // URL'yi günceller
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" p={4}>
        <CircularProgress />
      </Box>
    );
  }

  if (!products || products.length === 0) {
    return (
      <Box display="flex" justifyContent="center" p={4}>
        <Typography variant="body1">Gösterilecek ürün bulunamadı.</Typography>
      </Box>
    );
  }

  return (
    <Container sx={{ py: 4 }}>
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
          gap: "20px",
        }}
      >
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </Box>
      <Box display="flex" justifyContent="center" mt={4}>
        <Pagination
          count={totalPages}
          page={pageParam}
          onChange={handleChange}
          color="primary"
        />
      </Box>
    </Container>
  );
}

export default ProductList;
