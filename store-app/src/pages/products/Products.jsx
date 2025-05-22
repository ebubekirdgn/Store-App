import { useEffect } from "react";
import ProductList from "../../components/products/ProductList";
import Loading from "../../components/Loading";
import { useDispatch, useSelector } from "react-redux";
import { CART_STATUS } from "../../utils/constants";
import { fetchProducts, selectAllProducts } from "../../store/slices/catalogSlice";

export default function ProductsPage() {
  const dispatch = useDispatch();
  const loadedProducts = useSelector(selectAllProducts);
  const { status, isLoaded } = useSelector((state) => state.catalog);

  useEffect(() => {
    if (!isLoaded) dispatch(fetchProducts());
  }, [isLoaded]);

  if (status === CART_STATUS.PENDING_FETCH_PRODUCTS)
    return <Loading message="Yükleniyor..." />;
  return <ProductList products={loadedProducts} />;
}
