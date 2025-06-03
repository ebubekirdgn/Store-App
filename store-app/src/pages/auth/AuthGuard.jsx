import { useSelector } from "react-redux";
import { Navigate, Outlet, useLocation } from "react-router";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

export default function AuthGuard() {
  const { user } = useSelector((state) => state.account);
  const [redirect, setRedirect] = useState(false);
  const location = useLocation();

  useEffect(() => {
    if (!user) {
      toast.info("Lütfen giriş yapınız.");
      setRedirect(true);
    }
  }, [user]);

  if (redirect) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return <Outlet />;
}
