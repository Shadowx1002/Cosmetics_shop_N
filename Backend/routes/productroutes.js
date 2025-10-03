import express from 'express';
import {
  getProducts,
  saveProducts,
  deleteProducts,
  updateProduct,
  getProductbyid,
  SearchProducts
} from '../controllers/productController.js';

const productRouter = express.Router();


productRouter.get('/search/:query', SearchProducts);

productRouter.get('/', getProducts);
productRouter.post('/', saveProducts);
productRouter.delete('/:productID', deleteProducts);
productRouter.put('/:productID', updateProduct);
productRouter.get('/:productID', getProductbyid);

export default productRouter;
