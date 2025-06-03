import { useEffect, useState } from "react";
import requests from "../../../api/apiClient";
import {
  Container,
  Box,
  Typography,
  TextField,
  Button,
  Alert,
  CircularProgress,
  Paper,
} from "@mui/material";
import { useDispatch } from "react-redux";
import { update } from "../../../store/slices/accountSlice";

function AccountPage() {
  const [formUser, setFormUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");
  const dispatch = useDispatch();

  useEffect(() => {
    requests.account
      .getUser()
      .then((data) => {
        setFormUser(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const handleChange = (e) => {
    setFormUser({ ...formUser, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    console.log("Gönderilen veri:", formUser);
    await dispatch(update(formUser));
    setLoading(false);
    setMessage("Bilgiler güncellendi!");
  };

  if (loading || !formUser)
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="60vh"
      >
        <CircularProgress />
      </Box>
    );

  return (
    <Container maxWidth="sm">
      <Paper elevation={3} sx={{ p: 4, mt: 6 }}>
        <Typography variant="h5" gutterBottom>
          Hesap Bilgilerim
        </Typography>
        {message && (
          <Alert severity="success" sx={{ mb: 2 }}>
            {message}
          </Alert>
        )}
        <form onSubmit={handleSubmit}>
          <TextField
            label="Kullanıcı Adı"
            name="username"
            value={formUser.username || ""}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />

          {/* Diğer alanlar eklenebilir */}
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            sx={{ mt: 2 }}
          >
            Güncelle
          </Button>
        </form>
      </Paper>
    </Container>
  );
}

export default AccountPage;
