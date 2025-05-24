import {
  Avatar,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Typography,
  Card,
  CardContent,
  Divider,
  Box,
  Stack,
} from "@mui/material";
import { useSelector } from "react-redux";
import { currencyTRY } from "../../utils/formats";

export default function Info() {
  const { cart } = useSelector((state) => state.cart);

  const subTotal = cart?.cartItems.reduce(
    (toplam, item) => toplam + item.product.price * item.product.quantity,
    0
  );

  const tax = subTotal * 0.2;
  const total = subTotal + tax;

  return (
    <Card elevation={3} sx={{ borderRadius: 3 }}>
      <CardContent>
        <Typography variant="h6" fontWeight={700} gutterBottom>
          Sipariş Özeti
        </Typography>
        <Divider sx={{ mb: 2 }} />
        <List disablePadding>
          {cart?.cartItems.map((item) => (
            <ListItem
              key={item.product.productId}
              sx={{
                py: 1,
                px: 0,
                display: "flex",
                alignItems: "center",
                gap: 1,
              }}
              secondaryAction={
                <Typography variant="body1" fontWeight={600}>
                  {currencyTRY.format(item.product.price * item.product.quantity)}
                </Typography>
              }
            >
              <ListItemAvatar>
                <Avatar
                  variant="rounded"
                  src={`http://localhost:5000/images/${item.product.image}`}
                  sx={{ width: 48, height: 48, mr: 1 }}
                />
              </ListItemAvatar>
              <ListItemText
                primary={
                  <Typography variant="subtitle1" fontWeight={500}>
                    {item.product.title}
                  </Typography>
                }
                secondary={
                  <Typography variant="body2" color="text.secondary">
                    x{item.product.quantity}
                  </Typography>
                }
              />
            </ListItem>
          ))}
        </List>
        <Divider sx={{ my: 2 }} />
        <Stack spacing={1}>
          <Box display="flex" justifyContent="space-between">
            <Typography color="text.secondary">Ara Toplam</Typography>
            <Typography>{currencyTRY.format(subTotal)}</Typography>
          </Box>
          <Box display="flex" justifyContent="space-between">
            <Typography color="text.secondary">Vergi (20%)</Typography>
            <Typography>{currencyTRY.format(tax)}</Typography>
          </Box>
          <Divider />
          <Box display="flex" justifyContent="space-between">
            <Typography fontWeight={700}>Toplam</Typography>
            <Typography fontWeight={700} color="primary">
              {currencyTRY.format(total)}
            </Typography>
          </Box>
        </Stack>
      </CardContent>
    </Card>
  );
}
