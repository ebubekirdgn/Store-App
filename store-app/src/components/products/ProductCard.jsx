import {
  Box,
  Button,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  Chip,
  IconButton,
  Rating,
  Typography,
  useTheme,
  CircularProgress,
 
} from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { Link } from "react-router-dom";
import { currencyTRY } from "../../utils/formats";
import { useState } from "react";
import requests from "../../api/apiClient";
import { useCartContext } from "../../context/cart/Cart";

export default function ProductCard({ product }) {
  const [isFavorite, setIsFavorite] = useState(false);
  const [loading, setLoading] = useState(false);
  const theme = useTheme();
  const { setCart } = useCartContext();

  const handleFavoriteClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsFavorite(!isFavorite);
  };

   function handleAddItem(productId) {
    setLoading(true);
    requests.cart
      .addItem(productId)
      .then((cart) => setCart(cart))
      .catch((error) => console.log(error))
      .finally(() => setLoading(false));
  }
  return (
    <Card
      sx={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        transition: "transform 0.3s, box-shadow 0.3s",
        "&:hover": {
          transform: "translateY(-4px)",
          boxShadow: theme.shadows[6],
        },
      }}
    >
      <CardActionArea
        component={Link}
        to={`/products/${product.id}`}
        sx={{ flex: 1 }}
      >
        {/* Üst kısım (resim ve favori butonu) */}
        <Box sx={{ position: "relative" }}>
          <CardMedia
            sx={{
              backgroundSize: "contain",
              pt: "100%", // Responsive aspect ratio
            }}
            image={`http://localhost:5000/images/${product.image}`}
          />
          <IconButton
            aria-label="add to favorites"
            onClick={handleFavoriteClick}
            sx={{
              position: "absolute",
              top: 8,
              right: 8,
              backgroundColor: "rgba(255,255,255,0.8)",
              "&:hover": {
                backgroundColor: "rgba(255,255,255,0.9)",
              },
            }}
          >
            {isFavorite ? (
              <FavoriteIcon color="error" />
            ) : (
              <FavoriteBorderIcon />
            )}
          </IconButton>

          {/* İndirim etiketi */}
          {product.discount && (
            <Chip
              label={`%${product.discount}`}
              color="error"
              size="small"
              sx={{
                position: "absolute",
                top: 8,
                left: 8,
                fontWeight: "bold",
              }}
            />
          )}
        </Box>

        {/* Ürün bilgileri */}
        <CardContent sx={{ flexGrow: 1 }}>
          <Typography
            gutterBottom
            variant="subtitle1"
            component="h3"
            fontWeight="bold"
            sx={{
              display: "-webkit-box",
              WebkitLineClamp: 2,
              WebkitBoxOrient: "vertical",
              overflow: "hidden",
              minHeight: "3em",
            }}
          >
            {product.title}
          </Typography>

          <Rating
            value={product.rating || 4.5}
            precision={0.5}
            readOnly
            size="small"
            sx={{ mb: 1 }}
          />

          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            {product.originalPrice && (
              <Typography
                variant="body2"
                color="text.secondary"
                sx={{ textDecoration: "line-through" }}
              >
                {currencyTRY.format(product.originalPrice)}
              </Typography>
            )}

            <Typography variant="h6" color="primary" fontWeight="bold">
              {currencyTRY.format(product.price)}
            </Typography>
          </Box>

          {product.freeShipping && (
            <Chip
              label="Ücretsiz Kargo"
              size="small"
              sx={{ mt: 1, backgroundColor: theme.palette.success.light }}
            />
          )}
        </CardContent>
      </CardActionArea>

      {/* Sepete ekle butonu */}
      <CardActions sx={{ p: 2 }}>
        <Button onClick={() => handleAddItem(product.id)} variant="contained" color="primary" fullWidth size="medium" startIcon={<ShoppingCartIcon />}sx={{ py: 1, fontWeight: "bold", "&:hover": { backgroundColor: theme.palette.primary.dark, color: theme.palette.common.white, } }}>
          {loading ? <CircularProgress size="20px" /> : "Sepete Ekle"}
        </Button>
      </CardActions>
    </Card>
  );
}
