const { sql, config } = require('../config/db.config');

exports.getAllIncomes = async (userId) => {
    try {
        const pool = await sql.connect(config);
        const request = pool.request();
        request.input('userId', sql.Int, userId);
        const result = await request.query(`
             SELECT i.*, c.categoryName FROM Income i LEFT JOIN Categories c
            ON i.categoryId = c.categoryId
            WHERE i.userId = @userId ORDER BY i.createdAt DESC
        `);
        return result.recordset;
    } catch (err) {
        console.error('Error fetching income:', err);
        throw err;
    }
};

exports.addIncome = async (incomeData) => {
    try {
        const pool = await sql.connect(config);
        const request = pool.request();
        const { title, amount, incomeDate,categoryId,userId } = incomeData;
        request.input('title',sql.VarChar, title);
        request.input ('amount', sql.Int, amount);
        request.input('incomeDate', sql.Date, incomeDate);
        request.input('categoryId',sql.Int,categoryId)
        request.input('userId', sql.Int, userId);
        await request.query(`
            INSERT INTO Income (title, amount, incomeDate,categoryId,userId)
            VALUES (@title, @amount, @incomeDate,@categoryId, @userId)
        `);
    } catch (err) {
        console.error('Error adding income:', err);
        throw err;
    }
};

exports.updateIncome = async (id,userId, incomeData)=>{
    try{
        const pool = await sql.connect(config);
        const request = pool.request();
        const {title,amount,incomeDate,categoryId}=incomeData;
        request.input('title',sql.VarChar, title);
        request.input('amount',sql.Int, amount);
        request.input('incomeDate', sql.Date, incomeDate);
        request.input('categoryId', sql.Int, categoryId);
        request.input('id',sql.Int,id);
        request.input('userId',sql.Int,userId);
        await request.query(
            `UPDATE Income SET
            title=@title,
            amount=@amount,
            incomeDate=@incomeDate,
            categoryId = @categoryId
            WHERE id =@id
            AND userId = @userId
            `)
    }catch(err){
        console.log('Error updating the income', err)
        throw err;
    }
}

exports.deleteIncome=async (id, userId)=>{
    try{
        
        const pool = await sql.connect(config);
        const request = pool.request();
        request.input('id',sql.Int, id);
        request.input('userId', sql.Int, userId);
        await request.query(`
            DELETE FROM Income WHERE id= @id AND userId = @userId
            `)
    }catch(err){
        console.log('Error deleting Income',err)
        throw(err);
    }
}