import axios from "axios";
import { Sampleproducts } from "../../assets/sampleData";
import { useState } from "react";
import { useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FaEdit, FaTrash } from "react-icons/fa";
import toast from "react-hot-toast";

export default function AdminProductPage() {
  const [products, setProducts] = useState(Sampleproducts);
  const navigate = useNavigate();
  const[isLoading,setIsLoading]=useState(true);

  useEffect(() => {
    if(isLoading==true){
      axios
      .get(import.meta.env.VITE_BACKEND_URL + "/api/products/")
      .then((res) => {
        console.log(res.data);
        setProducts(res.data);
        setIsLoading(false);
      });
    }
  }, [isLoading]);
  function deleteProduct(productId) {
    const token = localStorage.getItem("token");
    console.log(token);
    if (token == null) {
      toast.error("Please login first");
      return;
    }
    axios.delete(import.meta.env.VITE_BACKEND_URL + "/api/products/" + productId, {
      headers: {
        "Authorization": "Bearer " + token,
      },
    }).then((res) => {
      toast.success("Product deleted successfully");
      setIsLoading(true);

    }).catch((err) => {
      toast.error("Error deleting product");
    });
  }

  return (
    <div className="w-full h-full  max-h-full overflow-y-scroll relative">
      <Link
        to="/admin/Add-Product"
        className="absolute bottom-20 cursor-pointer right-5 bg-green-500 w-[50px] h-[50px] text-center items-center justify-center flex "
      >
        +
      </Link>
{
  isLoading ?
  <div className="w-full h-full flex justify-center items-center">
    <div className="w-[70px] h-[70px] border-[5px] border-gray-300 border-t-blue-900 rounded-full animate-spin"></div>
  </div>
  :
  <table className="w-full text-center">
        <thead>
          <tr>
            <th>ProductID</th>
            <th>ProductName</th>
            <th>ProductImg</th>
            <th>lablePrice</th>
            <th>Price</th>
            <th>QTY</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {products.map((item, index) => {
            return (
              <tr key={index}>
                <td>{item.productId}</td>
                <td>{item.productName}</td>
                <td>
                  {item.images.length > 0 ? (
                    <img
                      src={item.images[0]}
                      alt=""
                      className="w-[100px] h-[100px]"
                    />
                  ) : (
                    "No image"
                  )}
                </td>
                <td>{item.lablePrice}</td>
                <td>{item.Price}</td>
                <td>{item.stock}</td>
                <td>
                  <div className="flex items-center justify-center w-full ">
                    <FaTrash className="text-md text-red-900 mx-2 cursor-pointer" onClick={()=>{
                      deleteProduct(item.productId);
                    }} />

                    <FaEdit
                      onClick={() => {
                        navigate("/admin/edit-Product", {
                          state: item,
                        });
                      }}
                      className="text-md text-blue-900 mx-2 cursor-pointer"
                    />
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
}

      
    </div>
  );
}
