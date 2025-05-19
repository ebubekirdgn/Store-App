import {
  Button,
  CircularProgress,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";

import { currencyTRY } from "../../utils/formats";
import { Delete } from "@mui/icons-material";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import { useState } from "react";
import requests from "../../api/apiClient";
import EmptyCartMessage from "../cart/EmptyCartMessage";
import { useDispatch, useSelector } from "react-redux";
import { setCart } from "../../pages/cart/cartSlice";

function CartPage() {
  const [status, setStatus] = useState({ loading: false, id: "" });
  const { cart } = useSelector((state) => state.cart);
  const dispacth = useDispatch();


  const subTotal = cart?.cartItems?.reduce((acc, item) => {
    return acc + item.product.price * item.product.quantity;
  }, 0) || 0;
  const tax = subTotal * 0.18;
  const total = subTotal + tax;

  if (!cart?.cartItems?.length) return <EmptyCartMessage />;

  function handleAddItem(productId, id) {
    setStatus({ loading: true, id: id });
    requests.cart
      .addItem(productId)
      .then((cart) => dispacth(setCart(cart)))
      .catch((error) => console.log(error))
      .finally(() => setStatus({ loading: false, id: "" }));
  }

  function handleRemoveItem(productId, id, quantity = 1) {
    setStatus({ loading: true, id: id });
    requests.cart
      .deleteItem(productId, quantity)
      .then((cart) => dispacth(setCart(cart)))
      .catch((error) => console.log(error))
      .finally(() => setStatus({ loading: false, id: "" }));
  }

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }}>
        <TableHead>
          <TableRow>
            <TableCell sx={{ width: 100 }}></TableCell>
            <TableCell>Ürün</TableCell>
            <TableCell sx={{ width: 120 }}>Fiyat</TableCell>
            <TableCell sx={{ width: 170 }}>Adet</TableCell>
            <TableCell sx={{ width: 120 }}>Toplam</TableCell>
            <TableCell sx={{ width: 50 }}></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {cart.cartItems.map((item) => (
            <TableRow key={item.id}>
              <TableCell>
                <img
                  src={`http://localhost:5000/images/${item.product.image}`}
                  style={{ width: "100%" }}
                />
              </TableCell>
              <TableCell>{item.product.title}</TableCell>
              <TableCell>{currencyTRY.format(item.product.price)}</TableCell>
              <TableCell>
                <Button
                  onClick={() =>
                    handleAddItem(
                      item.product.productId,
                      "add" + item.product.productId
                    )
                  }
                >
                  {status.loading &&
                  status.id === "add" + item.product.productId ? (
                    <CircularProgress size="20px" />
                  ) : (
                    <AddCircleOutlineIcon />
                  )}
                </Button>

                {item.product.quantity}
                <Button
                  onClick={() =>
                    handleRemoveItem(
                      item.product.productId,
                      "remove" + item.product.productId
                    )
                  }
                >
                  {status.loading &&
                  status.id === "remove" + item.product.productId ? (
                    <CircularProgress size="20px" />
                  ) : (
                    <RemoveCircleOutlineIcon />
                  )}
                </Button>
              </TableCell>
              <TableCell>
                {currencyTRY.format(item.product.price * item.product.quantity)}
              </TableCell>
              <TableCell>
                <Button
                  onClick={() =>
                    handleRemoveItem(
                      item.product.productId,
                      "remove_all" + item.product.productId,
                      item.product.quantity
                    )
                  }
                  color="error"
                >
                  {status.loading &&
                  status.id === "remove_all" + item.product.productId ? (
                    <CircularProgress size="20px" />
                  ) : (
                    <Delete />
                  )}
                </Button>
              </TableCell>
            </TableRow>
          ))}
          <TableRow>
            <TableCell colSpan={5} align="right">
              <strong>Toplam :</strong>
            </TableCell>
            <TableCell>
              <strong>{currencyTRY.format(subTotal)}</strong>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell colSpan={5} align="right">
              <strong>KDV %18:</strong>
            </TableCell>
            <TableCell>
              <strong>{currencyTRY.format(tax)}</strong>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell colSpan={5} align="right">
              <strong>Genel Toplam (KDV Dahil):</strong>
            </TableCell>
            <TableCell>
              <strong>{currencyTRY.format(total)}</strong>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell colSpan={7} align="right">
              <Button variant="contained" color="primary">
                Ödeme Yap
              </Button>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default CartPage;
