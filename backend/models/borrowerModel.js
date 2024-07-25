const Model = require("./Model");
const {format} = require('date-fns');
const db = require('../config/db');

class Borrower extends Model{
   constructor(){
      super();
      this.tableName = 'borrowers';
      this.fields = ["user_id",'fname','lname','village','contacts'];
      this.primaryKey = ['id','user_id'];
   }

   async save({userId,fname,lname,village,contacts}){
      await super.save([userId,fname,lname,village,contacts]);
   }

   async findAllById(userId){
      let sql = `SELECT id,fname,lname,contacts,village 
                  FROM borrowers
                  WHERE user_id = ${userId};`;
      
      let [borrowers,_] = await db.execute(sql);
      return borrowers;
   }

   async findOwingBorrowers(userId){

      const sql = `SELECT t.user_id,t.borrower_id,b.fname,b.lname,
                     SUM(CASE WHEN status = 1 THEN amount ELSE 0 END) as amount_borrowed,
                     SUM(CASE WHEN status = 2 THEN amount ELSE 0 END) as amount_paid
                  FROM transactions t 
                  JOIN borrowers b
                  ON borrower_id = b.id
                  WHERE t.user_id = ${userId}
                  GROUP BY t.user_id,borrower_id;`;
      let [data,_] = await db.execute(sql);
      return data;
   }

   async update({id,userId,fname,lname,village,contacts}){
      const borrower = await this.findById(id,userId);
      // await this.checkborrowerName({name,userId});
      if(borrower){
         const updated_at = format(new Date(),'yyyy-MM-dd HH:mm:ss');
      
         let sql = `UPDATE ${this.tableName} SET fname = '${fname}',lname = '${lname}',village = '${village}',contacts = '${contacts}', 
                     updated_at = '${updated_at}' WHERE id=${id} and user_id = ${userId};`;
         
         let data = await db.execute(sql);
         return data;
      }
   }

   async delete({id,userId}){
      return await super.delete([id,userId]);
   }

}

module.exports = new Borrower();