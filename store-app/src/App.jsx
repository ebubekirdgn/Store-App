import { createBrowserRouter, RouterProvider } from "react-router";
import { useEffect, Suspense, lazy } from "react";
import { useDispatch } from "react-redux";
import { getUser } from "./store/slices/accountSlice";
import { getCart } from "./store/slices/cartSlice";
import MainLayout from "./layouts/Main";
import Loading from "./components/Loading";

// Lazy load page components
const HomePage = lazy(() => import("./pages/home/Home"));
const ProductsPage = lazy(() => import("./pages/products/Products"));
const CartPage = lazy(() => import("./pages/cart/Cart"));
const LoginPage = lazy(() => import("./pages/auth/Login"));
const RegisterPage = lazy(() => import("./pages/auth/Register"));
const ProductDetailsPage = lazy(() => import("./pages/products/ProductDetails"));
const ErrorPage = lazy(() => import("./pages/errors/Error"));
const ServerErrorPage = lazy(() => import("./pages/errors/Server"));
const NotFoundPage = lazy(() => import("./pages/errors/NotFound"));
const CheckoutPage = lazy(() => import("./pages/checkout/Checkout"));
const AuthGuard = lazy(() => import("./pages/auth/AuthGuard"));
const OrdersPage = lazy(() => import("./pages/orders/Orders"));
const FavoritesPage = lazy(() => import("./pages/auth/profile/Favorites"));
const AccountPage = lazy(() => import("./pages/auth/profile/Account"));

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
        element: <AuthGuard />,
        children: [
          { path: "checkout", element: <CheckoutPage /> },
          { path: "orders", element: <OrdersPage /> },
          { path: "favorites", element: <FavoritesPage /> },
          { path: "account", element: <AccountPage /> },
        ],
      },
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

  const initApp = async () => {
    // API çağrılarını birbirini beklemeden, paralel olarak çalıştır
    await Promise.all([dispatch(getUser()), dispatch(getCart())]);
  };

  useEffect(() => {
    initApp();
  }, [dispatch]);

  // Uygulama genelindeki loading state'i kaldırıldı.
  // Artık uygulama anında render edilecek, veriler geldikçe bileşenler güncellenecek.
  // Bu, FCP ve LCP metriklerini dramatik olarak iyileştirecektir.

  return (
    <Suspense fallback={<Loading message="Sayfa yükleniyor..." />}>
      <RouterProvider router={router} />
    </Suspense>
  );
}

export default App;
