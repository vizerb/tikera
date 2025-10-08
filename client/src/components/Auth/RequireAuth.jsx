import { useSelector } from "react-redux";
import { Navigate } from "react-router";
import { selectUser } from "../../state/authSlice";

const RequireAuth = ({ children }) => {
  const user = useSelector(selectUser);

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default RequireAuth;
