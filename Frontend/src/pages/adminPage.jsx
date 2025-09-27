import { Link, Routes, Route } from "react-router-dom";
import AdminProductPage from "./admin/adminProductPage";
import AddProductPage from "./admin/addProductPage";
import EditProductPage from "./admin/productsEdits";

export default function AdminPage() {
  return (
    <div className="w-full h-screen  flex ">
      <div className="w-[200px] h-full bg-blue-900 flex flex-col">
        <Link to="/admin/reviews">
          <button className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 bg-black-">
            Reviews
          </button>
        </Link>
        <Link to="/admin/Products">
          <button className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700">
            Products
          </button>
        </Link>
        <Link to="/admin/Users">
          <button className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700">
            Users
          </button>
        </Link>
      </div>
      <div className=" h-full w-[calc(100%-200px)] ">
        <Routes path="/*">
          <Route path="/reviews" element={<h1>reviews</h1>}></Route>
          <Route path="/Products" element={<AdminProductPage />}></Route>
          <Route path="/Users" element={<h1>Users</h1>}></Route>
          <Route path="/Add-Product" element={<AddProductPage/>}/>
          <Route path="/edit-Product" element={<EditProductPage/>}/>

        </Routes>
      </div>
    </div>
  );
}
