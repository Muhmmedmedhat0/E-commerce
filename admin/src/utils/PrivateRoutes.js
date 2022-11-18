import { useSelector } from "react-redux";
import { Outlet, Navigate } from "react-router-dom";

const PrivateRoutes = () => {
  const { userInfo } = useSelector((state) => state.user);
  console.log({userInfo});
  return userInfo.isAdmin ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoutes;
