const categoryService = require('../services/category.service');

const getCategories = async (req, res) => {
    try {
        const userId = req.user.userId;
        const categoryType = req.query.categoryType;
        const categories = await categoryService.getCategories(
            userId,
            categoryType
        );
        res.status(200).json(categories);
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: 'Failed to fetch categories'
        });
    }
};
const addCategory = async (req, res) => {
    try {
        const userId = req.user.userId;
        const {categoryName,categoryType} = req.body;
        const category = await categoryService.addCategory(categoryName,categoryType, userId);
        res.status(201).json(category);
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: 'Failed to add category'
        });
    }
};

module.exports = {
    getCategories,addCategory
};