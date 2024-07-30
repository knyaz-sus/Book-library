import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useAppDispatch, useAppSelector } from "../hooks";
import { useEffect } from "react";
import { clearError } from "../redux/slices/errorSlice";

export default function Error() {
  const error = useAppSelector((state) => state.error);
  const dispatch = useAppDispatch();
  useEffect(() => {
    if (error) {
      toast.warn(error);
      dispatch(clearError());
    }
  }, [error]);
  return <ToastContainer position="top-right" autoClose={2000} />;
}
