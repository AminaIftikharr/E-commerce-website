import { body } from 'express-validator';

export const createProductValidator = [
    body('name')
        .notEmpty()
        .withMessage('Product name is required')
        .isString()
        .withMessage('Product name must be a string'),
    body('price')
        .notEmpty()
        .withMessage('Product price is required')
        .isNumeric()
        .withMessage('Product price must be a number'),
    body('description')
        .optional()
        .isString()
        .withMessage('Product description must be a string'),
    body('category')
        .optional()
        .isString()
        .withMessage('Product category must be a string'),
];

export const updateProductValidator = [
    body('name')
        .optional()
        .isString()
        .withMessage('Product name must be a string'),
    body('price')
        .optional()
        .isNumeric()
        .withMessage('Product price must be a number'),
    body('description')
        .optional()
        .isString()
        .withMessage('Product description must be a string'),
    body('category')
        .optional()
        .isString()
        .withMessage('Product category must be a string'),
];