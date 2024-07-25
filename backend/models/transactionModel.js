const Model = require("./Model");
const {format} = require('date-fns');
const db = require('../config/db');

class Transaction extends Model{
   constructor(){
      super();
      this.tableName = 'transactions';
      this.fields = ["user_id",'borrower_id','amount','status','description'];
      this.primaryKey = ['id','borrower_id',"user_id"];
   }

   async save({userId,borrower_id,amount,status,description}){
      await super.save([userId,borrower_id,amount,status,description])
   }

   async findAllByUserId(userId){
      console.log("helllllllllll");

      let sql = `SELECT t.id,t.user_id,t.borrower_id,fname,lname,amount,description,t.updated_at, ts.name as status
                  FROM ${this.tableName} as t 
                  JOIN borrowers as b 
                     ON t.borrower_id = b.id 
                  JOIN transaction_statuses ts 
                     ON t.status = ts.id
                  WHERE t.user_id = ${userId};`;
      
      let [data,_] = await db.execute(sql);
      console.log(data);
      return data;
   }

   async update({id,userId,borrower_id,amount,status,description}){
      const trans = await this.findByPrimaryKey([id,borrower_id,userId]);

      if(trans){
         const updated_at = format(new Date(),'yyyy-MM-dd HH:mm:ss');
      
         let sql = `UPDATE ${this.tableName} SET borrower_id = '${borrower_id}', amount = '${amount}',status = '${status}', 
                     description = '${description}',updated_at = '${updated_at}' WHERE id='${id}' AND user_id = '${userId}';`;
         
         const [data,_] = await db.execute(sql);
         return data;
      }
   }
   async delete({id,userId,borrower_id}){
      return await super.delete([id,borrower_id,userId]);
   }

}

module.exports = new Transaction();