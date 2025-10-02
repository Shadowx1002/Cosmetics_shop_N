import { Link, Routes, Route, useLocation } from "react-router-dom";
import AdminProductPage from "./admin/adminProductPage";
import AddProductPage from "./admin/addProductPage";
import EditProductPage from "./admin/productsEdits";
import AdminOrdersPage from "./admin/adminOrdersPage";
import UsersPage from "./admin/userSPage";
import ReviewPage from "./admin/ReviewPage";

export default function AdminPage() {
  const location=useLocation();
  const path=location.pathname;
  function getClass(name){
      if(path.includes(name)){
        return "bg-accent text-white p-4 "
      }
      return "text-accent p-4"
  }
  return (
    <div className="w-full h-screen  flex bg-accent ">
      <div className="w-[200px] h-full bg-new2 flex flex-col font-bold  gap-6 text-xl">
        <Link className={getClass("Products")}  to="/admin/Products">Products</Link>
        <Link className={getClass("Users")}to="/admin/Users">Users</Link>
        <Link className={getClass("Orders")}to="/admin/Orders">Orders</Link>
        <Link className={getClass("Reviews")}to="/admin/Reviews">Reviews</Link>
      </div>
      <div className=" h-full w-[calc(100%-200px)]  border-1 bg-new2 ">
        <Routes path="/*">
          <Route path="/reviews" element={<ReviewPage/>}></Route>
          <Route path="/Products" element={<AdminProductPage />}></Route>
          <Route path="/Orders" element={<AdminOrdersPage />}></Route>
          <Route path="/Users" element={<UsersPage/>}></Route>
          <Route path="/Add-Product" element={<AddProductPage />} />
          <Route path="/edit-Product" element={<EditProductPage />} />
        </Routes>
      </div>
    </div>
  );
}
