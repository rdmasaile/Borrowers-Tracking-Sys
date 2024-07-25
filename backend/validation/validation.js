const db = require('../config/db');

const exists = async (table,column,value) =>{
   // let sql = `Show tables LIKE '${table}';`;
   let sql = `SELECT * from ${table} where ${column} = '${value}'`
   try {
      const [data,_] = await db.execute(sql);
      if (data[0]) {
         return true;
      }
      return false;
   } catch (error) {
      throw error;
   }
}

module.exports = {exists}