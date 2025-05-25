import {
  Alert,
  Button,
  Chip,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Stack,
  Dialog,
  DialogTitle,
  DialogContent,
  IconButton,
} from "@mui/material";
import { Visibility, Close } from "@mui/icons-material";
import requests from "../../api/apiClient";
import Loading from "../../components/Loading";
import { currencyTRY } from "../../utils/formats";
import { useEffect, useState, useRef } from "react";

function OrdersPage() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const detayButtonRef = useRef(null);

  useEffect(() => {
    setLoading(true);

    requests.orders
      .getOrders()
      .then((result) => setOrders(result))
      .catch((error) => console.log(error))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <Loading />;

  if (!orders || orders.length === 0) {
    return <Alert severity="warning">Henüz siparişiniz yok</Alert>;
  }

  return (
    <>
      <Paper elevation={3} sx={{ p: 3, borderRadius: 3 }}>
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          mb={2}
        >
          <Typography variant="h5" fontWeight={700}>
            Siparişlerim
          </Typography>
          <Typography color="text.secondary" variant="body2">
            Toplam {orders.length} sipariş
          </Typography>
        </Stack>
        <TableContainer>
          <Table sx={{ minWidth: 650 }}>
            <TableHead>
              <TableRow>
                <TableCell sx={{ fontWeight: 700 }}>Sipariş No</TableCell>
                <TableCell sx={{ fontWeight: 700 }}>Durum</TableCell>
                <TableCell sx={{ fontWeight: 700 }}>Tarih</TableCell>
                <TableCell sx={{ fontWeight: 700 }}>Tutar</TableCell>
                <TableCell />
              </TableRow>
            </TableHead>
            <TableBody>
              {orders?.map((item, idx) => (
                <TableRow
                  key={item.id}
                  sx={{
                    backgroundColor:
                      idx % 2 === 0 ? "background.paper" : "grey.50",
                    "&:last-child td, &:last-child th": { border: 0 },
                  }}
                >
                  <TableCell>{item.id}</TableCell>
                  <TableCell>
                    <Chip
                      label={item.orderStatus}
                      color={
                        item.orderStatus === "Completed"
                          ? "success"
                          : "secondary"
                      }
                      variant="outlined"
                      size="small"
                    />
                  </TableCell>
                  <TableCell>
                    {new Date(item.orderDate).toLocaleDateString("tr-TR", {
                      year: "numeric",
                      month: "2-digit",
                      day: "2-digit",
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </TableCell>
                  <TableCell>
                    <Typography fontWeight={600} color="primary">
                      {currencyTRY.format(item.total)}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Button
                      variant="outlined"
                      color="primary"
                      startIcon={<Visibility />}
                      size="small"
                      onClick={() => setSelectedOrder(item)}
                      ref={idx === 0 ? detayButtonRef : null}
                    >
                      Detay
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
      {/* Modal */}
      <Dialog
        open={!!selectedOrder}
        onClose={() => {
          setSelectedOrder(null);
          setTimeout(() => {
            detayButtonRef.current?.focus();
          }, 0);
        }}
        maxWidth="md"
        fullWidth
        PaperProps={{
          sx: { borderRadius: 4, p: 2, background: "#f8fafc" },
        }}
      >
        <DialogTitle sx={{ pb: 0, fontWeight: 700, fontSize: 22 }}>
          Sipariş Detayı
          <IconButton
            aria-label="close"
            onClick={() => {
              setSelectedOrder(null);
              setTimeout(() => {
                detayButtonRef.current?.focus();
              }, 0);
            }}
            sx={{ position: "absolute", right: 12, top: 12, color: "grey.500" }}
          >
            <Close />
          </IconButton>
        </DialogTitle>
        <DialogContent dividers sx={{ pt: 2 }}>
          {selectedOrder && (
            <Stack spacing={3}>
              <Stack direction="row" spacing={3} alignItems="center">
                <Chip
                  label={selectedOrder.orderStatus}
                  color={
                    selectedOrder.orderStatus === "Completed"
                      ? "success"
                      : "warning"
                  }
                  variant="filled"
                  sx={{ fontWeight: 600, fontSize: 16, px: 2, py: 1 }}
                />
                <Typography color="text.secondary">
                  {new Date(selectedOrder.orderDate).toLocaleString("tr-TR")}
                </Typography>
                <Typography color="primary" fontWeight={700} fontSize={18}>
                  {currencyTRY.format(selectedOrder.total)}
                </Typography>
              </Stack>
              <Stack direction="row" spacing={4}>
                <Typography>
                  <strong>Sipariş No:</strong> {selectedOrder.id}
                </Typography>
                <Typography>
                  <strong>Adres:</strong> {selectedOrder.address || "-"}
                </Typography>
              </Stack>
              {/* Ürünler tablosu */}
              {selectedOrder.items && (
                <TableContainer
                  component={Paper}
                  sx={{ boxShadow: 0, borderRadius: 2 }}
                >
                  <Table size="small">
                    <TableHead>
                      <TableRow>
                        <TableCell sx={{ fontWeight: 700 }}>Ürün</TableCell>
                        <TableCell sx={{ fontWeight: 700 }}>Adet</TableCell>
                        <TableCell sx={{ fontWeight: 700 }}>Fiyat</TableCell>
                        <TableCell sx={{ fontWeight: 700 }}>Toplam</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {selectedOrder.items.map((item) => (
                        <TableRow key={item.productId}>
                          <TableCell>
                            <Stack
                              direction="row"
                              spacing={2}
                              alignItems="center"
                            >
                              {item.image && (
                                <img
                                  src={item.image}
                                  alt={item.title}
                                  width={40}
                                  height={40}
                                  style={{
                                    borderRadius: 8,
                                    objectFit: "cover",
                                  }}
                                />
                              )}
                              <Typography>{item.title}</Typography>
                            </Stack>
                          </TableCell>
                          <TableCell>{item.quantity}</TableCell>
                          <TableCell>
                            {currencyTRY.format(item.price)}
                          </TableCell>
                          <TableCell>
                            {currencyTRY.format(item.price * item.quantity)}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              )}
              {/* Özet */}
              <Stack direction="row" justifyContent="flex-end" spacing={4}>
                <Typography>
                  <strong>Toplam:</strong>{" "}
                  <span style={{ color: "#1976d2", fontWeight: 700 }}>
                    {currencyTRY.format(selectedOrder.total)}
                  </span>
                </Typography>
              </Stack>
            </Stack>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}

export default OrdersPage;
