import { useSelector } from "react-redux";
import ProductCard from "../../../components/products/ProductCard";
import { Grid, Typography } from "@mui/material";

export default function FavoritesPage() {
  const favorites = useSelector((state) => state.favorites.favorites);
  console.log("Favorites:", favorites);
  // Tüm ürün listesinden favori ürünleri filtreleyip gösterebilirsin

  // Örnek: Eğer ürünler tüm state'de varsa
  // const products = useSelector((state) => state.products.items);
  // const favoriteProducts = products.filter(p => favorites.includes(p.id));

  // Şimdilik sadece id dizisi varsa:
  if (!favorites || favorites.length === 0) {
    return <Typography>Henüz favoriniz yok.</Typography>;
  }

  // Burada favori ürünlerin detaylarını göstermek için ürün bilgisine ihtiyacın var.
  // Sadece id'ler varsa, ürün detaylarını da store'dan çekmelisin.

  return (
   <>
    
    <Grid container spacing={2}>
      {favorites.map((productId) => (
        <Grid item xs={12} sm={6} md={4} key={productId}>
          <ProductCard product={{ id: productId }} />
        </Grid>
      ))}
    </Grid>
     </>
  );
}