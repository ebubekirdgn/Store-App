import { useEffect } from "react";
import { useParams } from "react-router";
import ProductItem from "../../components/products/ProductItem";
import Loading from "../../components/Loading";
import { useDispatch, useSelector } from "react-redux";
import { addItemToCart } from "../../pages/cart/cartSlice";
import { fetchProductById, selectProductById } from "../catalog/catalogSlice";
import { CART_STATUS } from "../../utils/constants";

export default function ProductDetailsPage() {
  const { id } = useParams();
  const { cart, status } = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const product = useSelector((state) => selectProductById(state, id));
  const { status: loading } = useSelector((state) => state.catalog);

  const cartItem = cart?.cartItems.find(
    (i) => i.product.productId == product?.id
  );

  function handleAddItem(productId) {
    dispatch(addItemToCart({ productId: productId }));
  }

  useEffect(() => {
    if (!product && id) dispatch(fetchProductById(id));
  }, [id]);

  if (loading === CART_STATUS.PENDING_FETCH_PRODUCTSBYID)
    return <Loading message="Yükleniyor..." />;

  if (!product) return <h1>Ürün bulunamadı.</h1>;

  return (
    <ProductItem
      product={product}
      handleAddItem={handleAddItem}
      cartItem={cartItem}
      isAdding={status === CART_STATUS.PENDING_ADD_ITEM + product.id}
    />
  );
}
