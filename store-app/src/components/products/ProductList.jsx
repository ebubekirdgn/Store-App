import {
  Box,
  Typography,
  Container
} from '@mui/material';
import ProductCard from './ProductCard'; // Yolu doğru şekilde ayarlayın

function ProductList({ products }) {
  if (!products || products.length === 0) {
    return (
      <Box display="flex" justifyContent="center" p={4}>
        <Typography variant="body1">Gösterilecek ürün bulunamadı.</Typography>
      </Box>
    );
  }

  return (
    <Container sx={{ py: 4 }}>
      <Box sx={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
        gap: '20px'
      }}>
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </Box>
    </Container>
  );
}

export default ProductList;