const express = require('express');
const router = express.Router();
const categoryController = require('../controllers/category-controller');
const { verifyToken } = require('../middleware/auth-middleware');

router.get('/categories',verifyToken,categoryController.getCategories);
router.post('/categories',verifyToken,categoryController.addCategory);

module.exports = router;