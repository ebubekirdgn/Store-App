import {
  AppBar,
  Badge,
  Box,
  IconButton,
  Menu,
  MenuItem,
  Toolbar,
  Avatar,
  Tooltip,
  Button,
} from "@mui/material";
import StorefrontIcon from "@mui/icons-material/Storefront";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { Link, NavLink } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import { logout } from "../store/slices/accountSlice";
import { useNavigate } from "react-router";

const links = [
  { title: "Home", to: "/" },
  { title: "Products", to: "/products" },
];

const authLinks = [
  { title: "Login", to: "/login" },
  { title: "Register", to: "/register" },
];

export default function Navbar() {
  const { cart } = useSelector((state) => state.cart);
  const { user } = useSelector((state) => state.account);
  const dispatch = useDispatch();

  // const itemCount = cart?.cartItems.reduce(
  //   (total, item) => total + item.product.quantity,
  //   0
  // );

  const itemCount = cart?.cartItems.length || 0;

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleMenuOpen = (event) => setAnchorEl(event.currentTarget);
  const handleMenuClose = () => setAnchorEl(null);
  const navigate = useNavigate();

  const handleLogout = () => {
    handleMenuClose();
    dispatch(logout());
    navigate("/");
  };

  return (
    <AppBar
      position="static"
      elevation={0}
      sx={{
        backgroundColor: "#ffffff",
        color: "#333",
        borderBottom: "1px solid #e0e0e0",
      }}
    >
      <Toolbar sx={{ justifyContent: "space-between" }}>
        {/* Left - Logo & Links */}
        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          <IconButton component={NavLink} to="/" color="inherit">
            <StorefrontIcon fontSize="large" />
          </IconButton>
          {links.map((link) => (
            <Button
              key={link.to}
              component={NavLink}
              to={link.to}
              sx={{
                textTransform: "none",
                fontWeight: 500,
                fontSize: 16,
                color: "#555",
                "&.active": { color: "#1976d2" },
              }}
            >
              {link.title}
            </Button>
          ))}
        </Box>

        {/* Right - Cart & Auth */}
        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          <IconButton
            color="inherit"
            component={Link}
            to="/cart"
            sx={{ position: "relative" }}
          >
            <Badge badgeContent={itemCount} color="primary">
              <ShoppingCartIcon fontSize="medium" />
            </Badge>
          </IconButton>

          {user ? (
            <>
              <Tooltip title="Hesap ayarları">
                <IconButton onClick={handleMenuOpen} sx={{ p: 0 }}>
                  <Avatar sx={{ bgcolor: "#1976d2", width: 36, height: 36 }}>
                    {user.username?.[0]?.toUpperCase() || "U"}
                  </Avatar>
                </IconButton>
              </Tooltip>
              <Menu
                anchorEl={anchorEl}
                open={open}
                onClose={handleMenuClose}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "right",
                }}
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                PaperProps={{
                  elevation: 3,
                  sx: {
                    mt: 1,
                    minWidth: 160,
                    borderRadius: 2,
                  },
                }}
              >
                <MenuItem
                  component={NavLink}
                  to="/account"
                  onClick={handleMenuClose}
                >
                  My Account
                </MenuItem>
                <MenuItem component={Link} to="/orders">
                  Orders
                </MenuItem>
                <MenuItem component={Link} to="/favorites">
                  My Favorites
                </MenuItem>
                <MenuItem onClick={handleLogout}>Logout</MenuItem>
              </Menu>
            </>
          ) : (
            authLinks.map((link) => (
              <Button
                key={link.to}
                component={NavLink}
                to={link.to}
                sx={{
                  textTransform: "none",
                  fontWeight: 500,
                  fontSize: 16,
                  color: "#555",
                  "&.active": { color: "#1976d2" },
                }}
              >
                {link.title}
              </Button>
            ))
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
}
