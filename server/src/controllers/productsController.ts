import { Request, Response } from 'express';
import { ProductService } from '../services/productService';

export class ProductsController {
    private productService: ProductService;

    constructor() {
        this.productService = new ProductService();
    }

    public async createProduct(req: Request, res: Response): Promise<void> {
        try {
            const productData = req.body;
            const newProduct = await this.productService.createProduct(productData);
            res.status(201).json(newProduct);
        } catch (error) {
            res.status(500).json({ message: 'Error creating product', error });
        }
    }

    public async getProducts(req: Request, res: Response): Promise<void> {
        try {
            const products = await this.productService.getProducts();
            res.status(200).json(products);
        } catch (error) {
            res.status(500).json({ message: 'Error fetching products', error });
        }
    }

    public async updateProduct(req: Request, res: Response): Promise<void> {
        try {
            const productId = req.params.id;
            const productData = req.body;
            const updatedProduct = await this.productService.updateProduct(productId, productData);
            res.status(200).json(updatedProduct);
        } catch (error) {
            res.status(500).json({ message: 'Error updating product', error });
        }
    }

    public async deleteProduct(req: Request, res: Response): Promise<void> {
        try {
            const productId = req.params.id;
            await this.productService.deleteProduct(productId);
            res.status(204).send();
        } catch (error) {
            res.status(500).json({ message: 'Error deleting product', error });
        }
    }
}