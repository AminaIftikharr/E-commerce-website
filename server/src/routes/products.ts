import { Router } from 'express';
import ProductsController from '../controllers/productsController';
import { validateProduct } from '../validators/productValidator';

const router = Router();
const productsController = new ProductsController();

// Create a new product
router.post('/', validateProduct, productsController.createProduct);

// Get all products
router.get('/', productsController.getAllProducts);

// Get a product by ID
router.get('/:id', productsController.getProductById);

// Update a product by ID
router.put('/:id', validateProduct, productsController.updateProduct);

// Delete a product by ID
router.delete('/:id', productsController.deleteProduct);

export default router;