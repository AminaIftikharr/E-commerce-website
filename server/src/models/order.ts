import mongoose, { Document, Schema } from 'mongoose';

export interface IOrder extends Document {
    user: mongoose.Types.ObjectId;
    products: {
        product: mongoose.Types.ObjectId;
        quantity: number;
    }[];
    totalAmount: number;
    status: string;
    createdAt: Date;
    updatedAt: Date;
}

const OrderSchema: Schema = new Schema({
    user: { type: mongoose.Types.ObjectId, ref: 'User', required: true },
    products: [
        {
            product: { type: mongoose.Types.ObjectId, ref: 'Product', required: true },
            quantity: { type: Number, required: true },
        },
    ],
    totalAmount: { type: Number, required: true },
    status: { type: String, enum: ['pending', 'completed', 'canceled'], default: 'pending' },
}, {
    timestamps: true,
});

const Order = mongoose.model<IOrder>('Order', OrderSchema);

export default Order;