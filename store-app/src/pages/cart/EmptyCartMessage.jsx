import { Box, Paper, Typography } from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";

function EmptyCartMessage() {
   return (
    <Box display="flex" justifyContent="center" alignItems="center" height="60vh">
      <Paper elevation={3} sx={{ p: 4, textAlign: "center", maxWidth: 400, borderRadius: 4 }}>
        <ShoppingCartIcon sx={{ fontSize: 60, color: "grey.500", mb: 2 }} />
        <Typography variant="h5" gutterBottom>Sepetiniz boş</Typography>
        <Typography variant="body1" color="text.secondary">
          Alışverişe başlamak için ürünleri inceleyin.
        </Typography>
      </Paper>
    </Box>
  );
}

export default EmptyCartMessage