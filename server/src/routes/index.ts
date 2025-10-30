import { Router } from 'express';
import authRoutes from './auth';
import productRoutes from './products';
import orderRoutes from './orders';

const router = Router();

// Combine all routes
router.use('/auth', authRoutes);
router.use('/products', productRoutes);
router.use('/orders', orderRoutes);

export default router;