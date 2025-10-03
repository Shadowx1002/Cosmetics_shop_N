import { Link, Routes, Route, useLocation } from "react-router-dom";
import AdminProductPage from "./admin/adminProductPage";
import AddProductPage from "./admin/addProductPage";
import EditProductPage from "./admin/productsEdits";
import AdminOrdersPage from "./admin/adminOrdersPage";
import UsersPage from "./admin/userSPage";
import ReviewPage from "./admin/ReviewPage";
import { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { VscLoading } from "react-icons/vsc";
import LoadingAnimation from "../components/loadingAnimation";

export default function AdminPage() {
  const location = useLocation();
  const path = location.pathname;
  const [status, setStatus] = useState("loading");

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      setStatus("unauthenticated");
      window.location.href = "/login";
    } else {
      axios
        .get(import.meta.env.VITE_BACKEND_URL + "/api/users", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          if (response.data.role != "admin") {
            setStatus("unauthorized");
            toast.error("You are not authorized to access this page")
            window.location.href = "/login";
            return
          } else {
            setStatus("authenticated");
          }
        })
        .catch((error) => {
          console.log(error);
          setStatus("unauthentiated");
          toast.error("You are not authorized to access this page")
          window.location.href = "/login";
        });
    }
  }, [status]);

  function getClass(name) {
    if (path.includes(name)) {
      return "bg-accent text-white p-4 ";
    }
    return "text-accent p-4";
  }
  return (
    <div className="w-full h-screen  flex bg-accent ">
     {status=="loading"||status=="unauthenticated"?
     <LoadingAnimation/>:
      <>
      <div className="w-[200px] h-full bg-new2 flex flex-col font-bold  gap-6 text-xl">
        <Link className={getClass("Products")} to="/admin/Products">
          Products
        </Link>
        <Link className={getClass("Users")} to="/admin/Users">
          Users
        </Link>
        <Link className={getClass("Orders")} to="/admin/Orders">
          Orders
        </Link>
        <Link className={getClass("Reviews")} to="/admin/Reviews">
          Reviews
        </Link>
      </div>
      <div className=" h-full w-[calc(100%-200px)]  border-1 bg-new2 ">
        <Routes path="/*">
          <Route path="/reviews" element={<ReviewPage />}></Route>
          <Route path="/Products" element={<AdminProductPage />}></Route>
          <Route path="/Orders" element={<AdminOrdersPage />}></Route>
          <Route path="/Users" element={<UsersPage />}></Route>
          <Route path="/Add-Product" element={<AddProductPage />} />
          <Route path="/edit-Product" element={<EditProductPage />} />
        </Routes>
      </div>
      </>}
    </div>
  );
}
