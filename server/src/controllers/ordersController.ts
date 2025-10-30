import { Request, Response } from 'express';
import { OrderService } from '../services/orderService';

export class OrdersController {
    private orderService: OrderService;

    constructor() {
        this.orderService = new OrderService();
    }

    public createOrder = async (req: Request, res: Response): Promise<void> => {
        try {
            const orderData = req.body;
            const newOrder = await this.orderService.createOrder(orderData);
            res.status(201).json(newOrder);
        } catch (error) {
            res.status(500).json({ message: 'Error creating order', error });
        }
    };

    public getOrder = async (req: Request, res: Response): Promise<void> => {
        try {
            const orderId = req.params.id;
            const order = await this.orderService.getOrderById(orderId);
            if (!order) {
                res.status(404).json({ message: 'Order not found' });
                return;
            }
            res.status(200).json(order);
        } catch (error) {
            res.status(500).json({ message: 'Error retrieving order', error });
        }
    };

    public getAllOrders = async (req: Request, res: Response): Promise<void> => {
        try {
            const orders = await this.orderService.getAllOrders();
            res.status(200).json(orders);
        } catch (error) {
            res.status(500).json({ message: 'Error retrieving orders', error });
        }
    };
}