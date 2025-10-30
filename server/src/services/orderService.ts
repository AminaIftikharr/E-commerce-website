import { Order } from '../models/order';
import { User } from '../models/user';
import { Product } from '../models/product';

export const createOrder = async (userId: string, productId: string, quantity: number) => {
    const order = new Order({
        user: userId,
        product: productId,
        quantity,
        status: 'pending',
    });

    await order.save();
    return order;
};

export const getOrderById = async (orderId: string) => {
    const order = await Order.findById(orderId).populate('user').populate('product');
    return order;
};

export const getOrdersByUserId = async (userId: string) => {
    const orders = await Order.find({ user: userId }).populate('product');
    return orders;
};

export const updateOrderStatus = async (orderId: string, status: string) => {
    const order = await Order.findByIdAndUpdate(orderId, { status }, { new: true });
    return order;
};