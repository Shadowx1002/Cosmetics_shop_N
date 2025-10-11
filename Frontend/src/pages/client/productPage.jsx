import axios from "axios"
import { useEffect, useState } from "react"
import ProductCard from "../../components/productCard"
import Header from "../../components/header"

export default function ProductPage(){




    const [products,setProducts]=useState([])
    const [isLoading,setIsLoading]=useState(true)

    useEffect(
        ()=>{
            if(isLoading){
                axios.get(import.meta.env.VITE_BACKEND_URL+"/api/products").then(
                    (res)=>{
                        setProducts(res.data)
                        setIsLoading(false)

                    }
                )
            }
        },[isLoading]
    )

    return(
        
        <div className="w-full h-full flex flex-wrap justify-center items- ">
            <div className="w-full h-max  ">
                  <Header/>
                  
                  
                 </div>



                 
            
           {
            products.map((product)=>{
                return(
                    <ProductCard key={product.productId} product={product}/>
                    
                )
            })
           }
           
        </div>
    )
}