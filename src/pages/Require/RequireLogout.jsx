// RequireLogout.jsx
import { Outlet, Navigate } from "react-router-dom";
import useQuestionStore from "../../store/zustand";

function RequireLogout() {
  const { auth } = useQuestionStore();

  return auth?.email ? <Navigate to={"/home"} replace={true} /> : <Outlet />;
}

export default RequireLogout;