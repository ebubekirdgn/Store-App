import { createBrowserRouter, RouterProvider } from "react-router";
import HomePage from "./pages/home/Home";
import ProductsPage from "./pages/products/Products";
import CartPage from "./pages/cart/Cart";
import LoginPage from "./pages/auth/Login";
import RegisterPage from "./pages/auth/Register";
import ProductDetailsPage from "./pages/products/ProductDetails";
import ErrorPage from "./pages/errors/Error";
import ServerErrorPage from "./pages/errors/Server";
import NotFoundPage from "./pages/errors/NotFound";
import { useEffect } from "react";
import requests from "./api/apiClient";
import { setCart } from "./store/slices/cartSlice";
import { useDispatch } from "react-redux";
import { logout, setUser } from "./store/slices/accountSlice";
import MainLayout from "./layouts/Main";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      { index: true, element: <HomePage /> },
      { path: "home", element: <HomePage /> },
      {
        path: "products",
        children: [
          { index: true, element: <ProductsPage /> },
          { path: ":id", element: <ProductDetailsPage /> },
        ],
      },
      { path: "cart", element: <CartPage /> },
      { path: "login", element: <LoginPage /> },
      { path: "register", element: <RegisterPage /> },
      {
        path: "errors",
        children: [
          { index: true, element: <ErrorPage /> },
          { path: "server-error", element: <ServerErrorPage /> },
          { path: "not-found", element: <NotFoundPage /> },
        ],
      },
      { path: "*", element: <NotFoundPage /> },
    ],
  },
]);

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setUser(JSON.parse(localStorage.getItem("user"))));

    requests.account
      .getUser()
      .then((user) => {
        setUser(user);
        localStorage.setItem("user", JSON.stringify(user));
      })
      .catch((error) => {
        console.log(error);
        dispatch(logout());
      });

    requests.cart
      .get()
      .then((cart) => dispatch(setCart(cart)))
      .catch((error) => console.log(error));
  }, []);

  return <RouterProvider router={router} />;
}

export default App;
