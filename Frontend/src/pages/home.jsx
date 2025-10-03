import { Route, Routes } from "react-router-dom";
import ProductPage from "./client/productPage";
import ProductOverviewPage from "./client/productOverviewPage";
import CartPage from "./client/cart";
import CheckOutPage from "./client/checkOut";
import HomePagec from "./homePage";
import AboutUs from "../components/AboutUs";
import ContactUsPage from "./contactUs";
import NotFoundPage from "./noFounfPage";

export default function HomePage(){
    return(
         
          <div className="w-full h-[calc(100vh-80px)] flex flex-col items-center">
            <Routes path="/*">
              <Route path="/" element={<HomePagec/> }/>
              
              <Route path="/Product" element={<ProductPage/>}/>
              <Route path="/OverView/:id" element={<ProductOverviewPage/>}/>
              <Route path="/Cart" element={<CartPage/>}/>
              <Route path="checkOut" element={<CheckOutPage/>}/>
              <Route path="/About" element={<AboutUs/>}/>
              <Route path="/Contact" element={<ContactUsPage/>}/>
              <Route path="/*" element={<NotFoundPage/>}/>
            </Routes>
          </div>
   
    )
}