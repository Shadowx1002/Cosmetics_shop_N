import Product from "../models/product.js";
import { isAdmin } from "./userController.js";

export async function getProducts(req,res){
    try{
        if(isAdmin(req)){
            const Products =await Product.find()
             res.json(Products)
        }else{
            const Products =await Product.find({isAvailable:true})
            res.json(Products)
        }
    


    }   catch(err){
        res.json(
            {
                message: "err.message"
            }
        )

    } 

}
export function saveProducts(req,res){
    
    if(!isAdmin(req)){
        res.json(
            {
                message: "You need to be admin to add products"
            }
        )
        return

    }
    

    const product=new Product(
        req.body
    );
    product.save().then(
        ()=>{
            res.json({
                message: 'Product added successfully'
            })
        }
    )
}

export async function deleteProducts(req,res){
    if(!isAdmin(req)){
        res.json(
            {
                message: "You need to be admin to delete products"
            }
        )
        return

    }
    try{
            await Product.deleteOne({productId:req.params.productID})
            res.json({
                message: "Product deleted successfully"
            })
    }catch(err){
        res.status(500).json({
            message: err.message
        })

    }
}

export async function updateProduct(req,res){
        if(!isAdmin(req)){
        res.status(403).json(
            {
                message: "You need to be admin to update products"
            }
        )
        return

    }
    //update product code here
    const productID=req.params.productID;
    const updatingData=req.body;                

    try{
            await Product.updateOne(
                {
                    productId:productID
                },
                updatingData
            )
            res.json({
                message: "Product updated successfully"
            })  

    }catch(err){
        res.status(500).json({
            message: err.message
        })

    }

}

export async function getProductbyid(req,res){

    const productId=req.params.productID;
    
    try{
        const product=await Product.findOne({productId:productId});
        if(product==null){
            res.status(404).json({
                message: "Product not found"
            })      
            return
        }
        if(product.isAvailable){
            res.json(product)
        }else{
            if(!isAdmin(req)){
                res.status(404).json({
                message: "Product not found"

            }) 
            
            return
            }else{
                res.json(product)
            }
        }

    }
    catch(err){

    }   
}
export async function SearchProducts(req, res) {
  const searchQuery = req.params.query;

  try {
    const products = await Product.find({
      $or: [
        { productName: { $regex: searchQuery, $options: "i" } },
        { altNames: { $regex: searchQuery, $options: "i" } }
      ],
      isAvailable: true
    });

    res.json(products);
  } catch (err) {
    res.status(500).json({
      message: "Internal Server Error",
      error: err.message
    });
  }
}
