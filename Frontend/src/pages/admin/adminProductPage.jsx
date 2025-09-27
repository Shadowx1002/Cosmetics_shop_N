import axios from "axios";
import { Sampleproducts } from "../../assets/sampleData";
import { useState } from "react";
import { useEffect } from "react";
import { Link } from "react-router-dom";

export default function AdminProductPage() {
    

  const [products, setProducts] = useState(Sampleproducts);
  useEffect(() => {
    axios
      .get(import.meta.env.VITE_BACKEND_URL + "/api/products/")
      .then((res) => {
        console.log(res.data);
        setProducts(res.data);
      });
  }, []);

  return (
    <div className="w-full h-full  max-h-full overflow-y-scroll relative">
      <Link
        to="/admin/Add-Product"
        className="absolute bottom-20 cursor-pointer right-5 bg-green-500 w-[50px] h-[50px] text-center items-center justify-center flex "
      >
        +
      </Link>

      <table className="w-full text-center">
        <thead>
          <tr>
            <th>ProductID</th>
            <th>ProductName</th>
            <th>ProductImg</th>
            <th>lablePrice</th>
            <th>Price</th>
            <th>QTY</th>
          </tr>
        </thead>
        <tbody>
          {products.map((item, index) => {
            return (
              <tr key={index}>
                <td>{item.productId}</td>
                <td>{item.productName}</td>
                <td>
                  {item.image.length > 0 ? (
                    <img
                      src={item.image[0]}
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
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
