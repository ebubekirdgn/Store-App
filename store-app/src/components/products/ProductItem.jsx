import { 
  Box, 
  Container, 
  Paper, 
  Typography, 
  Grid, 
  Divider, 
  Button, 
  Chip,
  Rating,
  Stack
} from "@mui/material";
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ShareIcon from '@mui/icons-material/Share';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';

function ProductItem({ product }) {
 return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Grid container spacing={4}>
        {/* Image Gallery Section */}
        <Grid item xs={12} md={6}>
          <Paper variant="outlined" sx={{ p: 2, textAlign: 'center' }}>
            <img
              src={`http://localhost:5000/images/${product.image}`}
              style={{ 
                width: '100%', 
                maxHeight: '500px', 
                objectFit: 'contain' 
              }}
              alt={product.title}
            />
            
            {/* Thumbnail Gallery (would be dynamic in real app) */}
            <Box sx={{ display: 'flex', gap: 2, mt: 2, overflowX: 'auto' }}>
              {[1, 2, 3].map((item) => (
                <Paper key={item} variant="outlined" sx={{ p: 1, minWidth: 80 }}>
                  <img
                    src={`http://localhost:5000/images/${product.image}`}
                    style={{ 
                      width: '100%', 
                      height: '80px', 
                      objectFit: 'contain',
                      cursor: 'pointer'
                    }}
                    alt={`Thumbnail ${item}`}
                  />
                </Paper>
              ))}
            </Box>
          </Paper>
        </Grid>
        
        {/* Product Details Section */}
        <Grid item xs={12} md={6}>
          <Box sx={{ mb: 2 }}>
            <Typography component="h1" variant="h4" fontWeight="bold">
              {product.title}
            </Typography>
            
            <Box sx={{ display: 'flex', alignItems: 'center', my: 1 }}>
              <Rating 
                value={4.5} 
                precision={0.5} 
                readOnly 
                sx={{ mr: 1 }} 
              />
              <Typography variant="body2" color="text.secondary">
                (24 reviews)
              </Typography>
            </Box>
            
            {product.discountPrice ? (
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <Typography variant="h4" color="error">
                  ${product.discountPrice}
                </Typography>
                <Typography variant="body1" sx={{ textDecoration: 'line-through' }}>
                  ${product.price}
                </Typography>
                <Chip 
                  label={`${Math.round((1 - product.discountPrice/product.price) * 100)}% OFF`} 
                  color="error" 
                  size="small" 
                />
              </Box>
            ) : (
              <Typography variant="h4">
                ${product.price}
              </Typography>
            )}
          </Box>
          
          <Divider sx={{ my: 3 }} />
          
          <Box sx={{ mb: 3 }}>
            <Typography variant="body1" paragraph>
              {product.description}
            </Typography>
            
            <Typography variant="subtitle2" gutterBottom>
              <CheckCircleIcon color="success" sx={{ mr: 1, fontSize: '1rem' }} />
              In Stock (12 available)
            </Typography>
            
            <Typography variant="subtitle2">
              <LocalShippingIcon color="info" sx={{ mr: 1, fontSize: '1rem' }} />
              Free shipping on orders over $50
            </Typography>
          </Box>
          
          {/* Product Options (size, color etc.) would go here */}
          
          <Box sx={{ display: 'flex', gap: 2, mb: 4 }}>
            <Button 
              variant="contained" 
              size="large" 
              color="primary"
              sx={{ flex: 1, py: 1.5 }}
            >
              Add to Cart
            </Button>
            <Button 
              variant="outlined" 
              size="large" 
              color="primary"
              sx={{ py: 1.5 }}
            >
              Buy Now
            </Button>
          </Box>
          
          <Stack direction="row" spacing={2}>
            <Button 
              variant="text" 
              startIcon={<FavoriteBorderIcon />}
              size="small"
            >
              Save
            </Button>
            <Button 
              variant="text" 
              startIcon={<ShareIcon />}
              size="small"
            >
              Share
            </Button>
          </Stack>
          
          <Divider sx={{ my: 3 }} />
          
          {/* Additional product info */}
          <Box>
            <Typography variant="subtitle2" gutterBottom>
              SKU: {product.sku || 'N/A'}
            </Typography>
            <Typography variant="subtitle2">
              Category: {product.category || 'N/A'}
            </Typography>
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
}

export default ProductItem