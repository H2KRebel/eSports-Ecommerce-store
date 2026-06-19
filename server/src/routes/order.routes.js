const express = require('express');
const { body } = require('express-validator');
const {
  createOrder,
  getOrders,
  getOrderById,
  updateOrderStatus,
} = require('../controllers/order.controller');
const { protect, admin } = require('../middleware/auth.middleware');
const validate = require('../middleware/validate.middleware');

const router = express.Router();

const orderRules = [
  body('items').isArray({ min: 1 }).withMessage('Items are required'),
  body('items.*.productId').notEmpty().withMessage('Product ID is required'),
  body('items.*.quantity')
    .isInt({ min: 1 })
    .withMessage('Quantity must be at least 1'),
  body('shippingAddress.street').trim().notEmpty(),
  body('shippingAddress.city').trim().notEmpty(),
  body('shippingAddress.state').trim().notEmpty(),
  body('shippingAddress.zip').trim().notEmpty(),
  body('shippingAddress.country').trim().notEmpty(),
];

router.post('/', protect, orderRules, validate, createOrder);
router.get('/', protect, getOrders);
router.get('/:id', protect, getOrderById);
router.put('/:id/status', protect, admin, updateOrderStatus);

module.exports = router;
