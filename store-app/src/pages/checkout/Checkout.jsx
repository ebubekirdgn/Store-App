import { Container, Grid, Paper, Typography, Stack, Divider, Card, CardContent } from "@mui/material";
import Info from "./Info";
import AddressForm from "./AddressForm";
import PaymentForm from "./PaymentForm";
import Review from "./Review";

function CheckoutPage() {
  return (
    <Container maxWidth="lg" sx={{ py: 5 }}>
      <Typography variant="h4" fontWeight={700} gutterBottom>
        Ödeme Sayfası
      </Typography>
      <Typography variant="subtitle1" color="text.secondary" gutterBottom>
        Siparişinizi tamamlamak için lütfen bilgilerinizi doldurun.
      </Typography>
      <Grid container spacing={4} sx={{ mt: 2 }}>
        <Grid item xs={12} md={4}>
          <Card elevation={3} sx={{ borderRadius: 3 }}>
            <CardContent>
              <Info />
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={8}>
          <Paper elevation={2} sx={{ p: 3, borderRadius: 3 }}>
            <Stack spacing={3}>
              <AddressForm />
              <Divider />
              <PaymentForm />
              <Divider />
              <Review />
            </Stack>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
}

export default CheckoutPage;
