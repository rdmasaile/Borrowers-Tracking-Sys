const { object } = require('joi');
const db = require('../config/db')

class Model{
   fields = [];
   tableName = "";
   hiddenFields = [];
   primaryKey = [];

   async save(values){
      const sql = `INSERT INTO ${this.tableName}(${this.createFields()}) VALUES("${values.join('", "')}");`;
      
      const data = await db.execute(sql);  
   }

   createFields(){
      return this.fields.join(',');
   }
   createFields(fields){
      if(fields)
         return fields.join(',');

      return this.fields.join(',');
   }
   async findAll(){
      const sql = `SELECT ${(!this.hiddenFields[0])?'*':await this.getFieldsToBeDisplayed()} FROM ${this.tableName};`;
      const [data,_] = await db.execute(sql)
      
      return data;
   }

   async getFieldsToBeDisplayed(){
      const sql = `show columns from ${this.tableName}`
      let [columns,_] = await db.execute(sql)

      let filteredColumns = []

      columns.forEach(col => {
         if(!this.hiddenFields.find(hf => col.Field == hf))
            filteredColumns.push(col.Field)
      });

      return this.createFields(filteredColumns);
   }
   
   async findById(id,userId){
      const sql = (!userId)? `SELECT ${await this.getFieldsToBeDisplayed()} FROM ${this.tableName} where id = ${id};`:      
          `SELECT ${await this.getFieldsToBeDisplayed()} FROM ${this.tableName} where id = ${id} AND user_id = ${userId};`;
      
      const [data,_] = await db.execute(sql);
      
      if(!data[0]){
         throw new Error(`Not found`)
      }
      return data;
   }

   /**
    * Generates the sub end of the sql query based on the order of primary key 
    * @example const primaryKey = ['id','user_id'];
    * const sql = getPrimaryKeyQuery([id,user_id]);

    * @param {[]} keys 
    * @returns string
    */
   getPrimaryKeyQuery(keys){
      let index = 0;
      let sql = '';
      if(this.primaryKey != null){
         if(this.primaryKey[0]){
            this.primaryKey.forEach((key)=>{
               sql += ` ${key} = '${keys[index]}' ${(index === keys.length - 1)?';':'and'}`;
               ++index;
            });
         }
      }
      return sql;
   }
   /**
    * 
    * @param {[*]} keys 
    * @returns 
    */
   async findByPrimaryKey(keys){
      let sql = `SELECT * FROM ${this.tableName} where ${this.getPrimaryKeyQuery(keys)}`
      
      const [data,_] = await db.execute(sql);
      
      if(!data[0]){
         throw new Error(`Not found`)
      }
      return data;
   }

   async delete(keys){
      const data = await this.findByPrimaryKey(keys);
      
      if(data){
         let sql = `DELETE FROM ${this.tableName} WHERE ${this.getPrimaryKeyQuery(keys)}`;

         let data = await db.execute(sql);
         return data; 
      }
   }
}

module.exports = Model