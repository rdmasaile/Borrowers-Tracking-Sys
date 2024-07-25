import {useState} from 'react';
import Modal from "react-bootstrap/Modal";
import { categories } from '../constants';
import Button from './button/Button';
import { trash,plus,edit } from '../assests';
import Image from './image/Image';
import { useScreen } from './ScreenProvider';
import Table, { TBody, Thead } from './Table';
import { Input, Label } from './form/Form';
import Nothing from './Nothing';

const Categories = () => {
   // let rows = 0;
   const {screenWidth} = useScreen()
   let checkedCategories = [];
   const handleCheckChange = (e,category) => {
      if(e.target.checked){
         checkedCategories.push(category);
         console.log(checkedCategories);
      }
   }
   const deleteCategory = (category)=>{
      if(category){
         console.log(`Deleted ${category.name}`);
      }
      else if(checkedCategories[0]){
         checkedCategories.forEach((category)=>{
            console.log(`Deleted ${category.name}`);
         })
      }else{
         console.log('Nothing to delete');
      }
   }
   return (
      <div className={`m-auto p-1 oveflow-scroll h-full`} style={{width:'100%'}}>
         <h1 className={`mb-1`}>Categories</h1>
         
         <div className={`flex justify-between`}>
            <div className={`rounded-ss w-full mr-xs overflow-hidden`}>
               <div className={`flex bg-grey items-center justify-evenly`}>
                  <h2>Categories</h2>
                  <div className={`w-50`}></div>
                  <div className={`group`}>
                     <EditCategoryModal button={plus} modalHeader={'Add Category'} category={''}/>
                     <Button className={`bg-inherit`} onClick={()=>deleteCategory()}><Image type={'icon'} src={trash} alt={'Trash icon'}/></Button>
                  </div>
               </div>
               {(!categories[0])?
                  <Nothing value={'Categories'} className={'bg-primary'}>
                     <EditCategoryModal button={plus} modalHeader={'Add Transaction'} category={''}/>
                  </Nothing>:(
                     <Table tittle={""} className={`table b-collapse text-align-center w-full bg-grey`} 
                        parent={{className:`w-full overflow-scroll bg-primary mr-xs`}}>
                        <Thead thead={['All','Name','Total','Actions']} className={`bg-grey h-3`}/>
                        <TBody>
                           {
                              categories.map((cat,index)=>(
                                 <Category key={index} handleCheckChange={handleCheckChange} deleteCategory={deleteCategory} category={cat}/>
                              ))
                           }
                        </TBody>
                     </Table> 
                  )
               }
            </div>
            
            {(screenWidth>650)&&<div className={`flex items-center justify-center bg-primary rounded-sm`} style={{width:'98%'}}>
               <EditCategoryModal button={plus} modalHeader={'Add Transaction'} category={''}/>
            </div>}
         </div>
      </div>
   )
}
const Category = ({category,rows,handleCheckChange,deleteCategory})=>{
   const {name,total} = category;
   
   return (
      // <div className={`flex data bg-grey items-center justify-evenly`}>
      <tr className={`${(rows%2 !== 1)?'bg-primary':'bg-black'}`}>
         <td><input type="checkbox" onChange={(e)=>handleCheckChange(e,category)}/></td>
         <td><p className={`w-60`}>{name}</p></td>
         <td><p className={`w-60`}>{total}</p></td>
         <td className={`flex justify-center`}>
            <EditCategoryModal category={category}/>
            <Button type={'button'} onClick={()=>deleteCategory(category)} className={`mr-1 bg-inherit rounded-xs`}><Image type={'icon'} src={trash} alt={name}  /></Button>
         </td>
      </tr>
      // </div>
   )
}
export const EditCategoryModal = ({category,button,modalHeader}) => {
   const [isOpen, setIsOpen] = useState(false);
   const [input, setInput] = useState(category);

   const showModal = ()=>{
      setIsOpen(true);
   }
   const hideModal = ()=>{
      setIsOpen(false);
   }

   const handleChange = (target) =>{
      const {name,value} = target;
      setInput({...input,[name]:value})
   }
   const handleSubmit = (e) =>{
      e.preventDefault();
      if(!input.name){
         alert('Enter all details');
         return;
      }
      console.log(input);
      setInput({});
      hideModal();
   }
  return (
    <div>
      <Button type={'button'} onClick={showModal} className={`bg-inherit rounded-xs`}><Image type={'icon'} src={button||edit} alt={'edit'}  /></Button>

      <Modal show={isOpen} onHide={hideModal} size='sm' centered={true} animation={true} className={`centered`} >
         <Modal.Header>
            {modalHeader||'Edit Category'}
         </Modal.Header>
         <Modal.Body>
            <form action="" method='POST' onSubmit={(e)=>handleSubmit(e)}>
               <div className="form-control">
                  <Label name={'Name'}></Label>
                  <Input prop={{type:'text',name:'name',value:input.name}} handleChange={handleChange}></Input>
               </div>
               <Modal.Footer>
                  <Button type={'submit'} onClick={(e)=>{}} name={'Save'}/>
                  <Button type={'button'} onClick={hideModal} name={'cancel'}/>
               </Modal.Footer>
            </form>
         </Modal.Body>
      </Modal>
    </div>
  )
}
export default Categories;