const sql = require('mssql');
const { config } = require('../config/db.config');

const getCategories = async (userId, categoryType) => {
    const pool = await sql.connect(config);
    const result = await pool.request()
        .input('userId', sql.Int, userId)
        .input('categoryType', sql.NVarChar, categoryType)
        .query(`
            SELECT categoryId, categoryName, userId, categoryType FROM Categories
            WHERE categoryType = @categoryType AND (userId IS NULL OR userId = @userId)
            ORDER BY categoryName
        `);
    return result.recordset;
};

const addCategory = async (categoryName, categoryType, userId) => {
    const pool = await sql.connect(config);
    const result = await pool.request()
        .input('categoryName', sql.NVarChar, categoryName)
        .input('categoryType', sql.NVarChar, categoryType)
        .input('userId', sql.Int, userId)
        .query(`
            INSERT INTO Categories
            ( categoryName, categoryType, userId ) VALUES (@categoryName, @categoryType,@userId);
            SELECT SCOPE_IDENTITY() AS categoryId;
        `);
    return result.recordset[0];
};

const updateCategory = async (categoryId, categoryName, userId) => {
    const pool = await sql.connect(config);
    await pool.request()
        .input('categoryId', sql.Int, categoryId)
        .input('categoryName', sql.NVarChar, categoryName)
        .input('userId', sql.Int, userId)
        .query(`
            UPDATE Categories
            SET categoryName = @categoryName
            WHERE categoryId = @categoryId
            AND userId = @userId
        `);
    return { message: 'Category updated successfully' };
};

const deleteCategory = async (categoryId, userId) => {
    const pool = await sql.connect(config);
    const income = await pool.request()
        .input('categoryId', sql.Int, categoryId)
        .query(`SELECT 1 FROM Income WHERE categoryId = @categoryId`)
    if (income.recordset.length > 0) {
        throw new Error('This category is already used in transactions and cannot be deleted.');
    }
    const expenses = await pool.request()
        .input('categoryId', sql.Int, categoryId)
        .query('SELECT 1 FROM Expenses WHERE categoryId = @categoryId');
    if (expenses.recordset.length > 0) {
        throw new Error('This category is already used in transactions and cannot be deleted.');
    }
    const savings = await pool.request()
        .input('categoryId', sql.Int, categoryId)
        .query('SELECT 1 FROM Savings WHERE categoryId = @categoryId');
    if (savings.recordset.length > 0) {
        throw new Error('This category is already used in transactions and cannot be deleted.');
    }
    await pool.request()
        .input('categoryId', sql.Int, categoryId)
        .input('userId', sql.Int, userId)
        .query(`
    DELETE FROM Categories
    WHERE categoryId = @categoryId
    AND userId = @userId
`);
    return {
        message: 'Category deleted successfully'
    };
}

module.exports = {
    getCategories, addCategory, updateCategory, deleteCategory
};