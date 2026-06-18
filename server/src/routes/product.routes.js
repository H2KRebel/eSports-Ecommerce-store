const express = require('express');
const { body } = require('express-validator');
const {
  getProducts,
  getProductBySlug,
  createProduct,
  updateProduct,
  deleteProduct,
} = require('../controllers/product.controller');
const { protect, admin } = require('../middleware/auth.middleware');
const validate = require('../middleware/validate.middleware');

const router = express.Router();

const productRules = [
  body('name').trim().notEmpty().withMessage('Name is required'),
  body('slug').trim().notEmpty().withMessage('Slug is required'),
  body('description').trim().notEmpty().withMessage('Description is required'),
  body('price').isFloat({ min: 0 }).withMessage('Valid price is required'),
  body('category')
    .isIn(['mouse', 'keyboard', 'headset', 'jersey', 'collectible'])
    .withMessage('Invalid category'),
  body('brand').trim().notEmpty().withMessage('Brand is required'),
  body('stock').isInt({ min: 0 }).withMessage('Stock must be 0 or greater'),
];

router.get('/', getProducts);
router.get('/:slug', getProductBySlug);

router.post('/', protect, admin, productRules, validate, createProduct);
router.put('/:id', protect, admin, validate, updateProduct);
router.delete('/:id', protect, admin, deleteProduct);

module.exports = router;
