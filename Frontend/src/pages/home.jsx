import { Route, Routes } from "react-router-dom";
import ProductPage from "./client/productPage";

export default function HomePage(){
    return(
         <div className="min-h-screen flex flex-col items-center justify-center bg-slate-100">
          <div className="w-full h-[calc(100vh-80px)] flex flex-col items-center">
            <Routes path="/*">
              <Route path="/" element={<div>Home Page</div> }/>
              <Route path="/Product" element={<ProductPage/>}/>
              <Route path="/About" element={<div>About Page</div>}/>
              <Route path="/Contact" element={<div>Contact Page</div>}/>
              <Route path="/*" element={<div className="text-3xl font-bold">404 Not Found</div>}/>
            </Routes>
          </div>
    </div>
    )
}