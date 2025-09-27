import express from 'express';
import { getProducts, saveProducts ,deleteProducts,updateProduct,getProductbyid} from '../controllers/productController.js';

const productRouter=express.Router();

productRouter.get('/',getProducts);
productRouter.post('/',saveProducts);
productRouter.delete('/:productID',deleteProducts);
productRouter.put('/:productID',updateProduct);
productRouter.get('/:productID',getProductbyid)



export default productRouter;