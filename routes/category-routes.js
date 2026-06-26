const express = require('express');
const router = express.Router();
const categoryController = require('../controllers/category-controller');
const { verifyToken } = require('../middleware/auth-middleware');

router.get('/categories', verifyToken, categoryController.getCategories);
router.post('/categories', verifyToken, categoryController.addCategory);
router.put('/categories/:id', verifyToken, categoryController.updateCategory);
router.delete('/categories/:id', verifyToken, categoryController.deleteCategory);

module.exports = router;