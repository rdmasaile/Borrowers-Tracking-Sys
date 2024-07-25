const Model = require("./Model");
const {format} = require('date-fns');
const db = require('../config/db');

class Category extends Model{
   constructor(){
      super();
      this.tableName = 'categories';
      this.fields = ["user_id",'name','default_category'];
   }

   async save({name,userId}){
      const default_category = 0;
      await this.checkCategoryName({name,userId});
      await super.save([userId,name,default_category]);
   }

   async checkCategoryName({name,userId}){
      let sql = `SELECT name FROM ${this.tableName} WHERE user_id = ${userId} OR default_category = 1;`;
      const [categories,_] = await db.execute(sql);
      
      if(categories.find((category)=>category.name.toLowerCase() === name.toLowerCase())){
         throw new Error("Category Already Exists. Create the category with different name.");
      }
      return;
   }
   async findAllByUserId(userId){
      let sql = `SELECT * FROM ${this.tableName} WHERE user_id = ${userId} OR default_category = ${1};`;
      
      let [data,_] = await db.execute(sql);
      return data;
   }

   async update({id,userId,name}){
      const category = await this.findById(id,userId);
      await this.checkCategoryName({name,userId});
      if(category){
         const updated_at = format(new Date(),'yyyy-MM-dd HH:mm:ss');
      
         let sql = `UPDATE ${this.tableName} SET name = '${name}', 
                     updated_at = '${updated_at}' WHERE id=${id} and user_id = ${userId} and default_category = ${0};`;
         
         let data = await db.execute(sql);
         return data;
      }
   }
   async delete({id,userId}){
      const category = await this.findById(id,userId);
      if(category){
         let sql = `DELETE FROM ${this.tableName} WHERE id = ${id} and user_id = ${userId} and default_category = ${0};`;
         let [data,_] = await db.execute(sql);
         return data;
      }
   }

}

module.exports = new Category();