import { Router } from 'express';
import { OrdersController } from '../controllers/ordersController';

const router = Router();
const ordersController = new OrdersController();

// Route to create a new order
router.post('/', ordersController.createOrder);

// Route to retrieve all orders
router.get('/', ordersController.getAllOrders);

// Route to retrieve a specific order by ID
router.get('/:id', ordersController.getOrderById);

export default router;