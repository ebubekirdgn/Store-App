import React from 'react';
import {
  Box,
  Grid,
  Card,
  CardMedia,
  CardContent,
  Typography,
  useTheme,
  Container
} from '@mui/material';

function ProductList({ products }) {
  const theme = useTheme();

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
        <Card
          key={product.id}
          sx={{
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            transition: 'transform 0.3s ease, box-shadow 0.3s ease',
            '&:hover': {
              transform: 'translateY(-5px)',
              boxShadow: theme.shadows[6]
            }
          }}
        >
          <CardMedia
            component="img"
            image={`http://localhost:5000/images/${product.image}`}
            alt={product.title}
            sx={{
              height: 180,
              objectFit: 'cover'
            }}
          />
          <CardContent sx={{ flexGrow: 1 }}>
            <Typography gutterBottom variant="h6" component="h2" noWrap>
              {product.title}
            </Typography>
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{ 
                mb: 2,
                display: '-webkit-box',
                WebkitLineClamp: 2,
                WebkitBoxOrient: 'vertical',
                overflow: 'hidden'
              }}
            >
              {product.description}
            </Typography>
            <Typography variant="subtitle1" color="primary" fontWeight="bold">
              {product.price} TL
            </Typography>
          </CardContent>
        </Card>
      ))}
    </Box>
    </Container>
  );
}

export default ProductList;