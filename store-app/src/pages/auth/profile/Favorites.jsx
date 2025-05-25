import { useSelector } from "react-redux";
import ProductCard from "../../../components/products/ProductCard";
import { Grid, Typography } from "@mui/material";

export default function FavoritesPage() {
  // Artık favorites dizisi ürün objeleri içeriyor!
  const favorites = useSelector((state) => state.favorites.favorites || []);

  if (!favorites || favorites.length === 0) {
    return <Typography>Henüz favoriniz yok.</Typography>;
  }

  return (
    <Grid container spacing={2}>
      {favorites.map((product) => (
        <Grid item xs={12} sm={6} md={4} key={product.id}>
          <ProductCard product={product} />
        </Grid>
      ))}
    </Grid>
  );
}