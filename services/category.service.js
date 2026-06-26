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

const addCategory = async (categoryName, categoryType,userId) => {

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

module.exports = {
    getCategories,addCategory
};