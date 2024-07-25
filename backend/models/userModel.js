const db = require('../config/db')
const Model = require('./Model')
const {format} = require("date-fns");
const { date } = require('joi');


class User extends Model{

   constructor(){
      super();
      this.tableName = 'users';
      this.fields = ["fname",'lname','email','password'];
      this.hiddenFields = ["password"]
      this.primaryKey = ['id'];
   }
   async save({fname,lname,email,password}){
      await super.save([fname,lname,email,password])
   }
   
   async update({id,fname,lname,email,password}){
   
      const user = await this.findById(id);
      if(user){
         const updated_at = format(new Date(),'yyyy-MM-dd HH:mm:ss');
      
         let sql = `UPDATE ${this.tableName} SET fname = '${fname}', lname = '${lname}', email = '${email}', password = '${password}', updated_at = '${updated_at}' where id=${id};`;
         
         let data = await db.execute(sql);
         return data;
      }
   }
   async delete(id){
      return await super.delete([id]);
   }

   async login(email){
      const sql = `SELECT * FROM users WHERE email = '${email}';`;
      const [user,_] = await db.execute(sql);
      return user[0];
   }

}

module.exports = new User();