import { createBrowserRouter, RouterProvider } from "react-router"
import MainLayout from "./layouts/Main"
import HomePage from "./pages/home/Home"
import ProductsPage from "./pages/products/Products"
import ProductDetailsPage from "./pages/products/ProductDetails"
import CartPage from "./pages/cart/Cart"
import LoginPage from "./pages/auth/Login"
import RegisterPage from "./pages/auth/Register"
import ErrorPage from "./pages/error/Error"


const router = createBrowserRouter([
  {
    path: "/", element: <MainLayout />,
    children: [
      { index: true, element: <HomePage /> },
      { path: "home", element: <HomePage /> },

      {
        path: "products",
        children: [
          { index: true, element: <ProductsPage /> },
          { path: ":id", element: <ProductDetailsPage /> },
        ]
      },



      { path: "cart", element: <CartPage /> },
      { path: "login", element: <LoginPage /> },
      { path: "register", element: <RegisterPage /> },
      { path: "error", element: <ErrorPage /> },
    ]
  },
])
function App() {
  return <RouterProvider router={router} />

}

export default App
