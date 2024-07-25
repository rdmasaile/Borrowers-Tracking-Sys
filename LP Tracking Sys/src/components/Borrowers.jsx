import {useEffect, useState} from 'react';
import Modal from "react-bootstrap/Modal";
import Button from './button/Button';
import { trash,plus,edit } from '../assests';
import Image from './image/Image';
import { useScreen } from './ScreenProvider';
import Table, { TBody, Thead } from './Table';
import { Input, Label } from './form/Form';
import Nothing from './Nothing';
import usePrivateAxios from "../hooks/usePrivateAxios";
import { Outlet, useNavigate } from 'react-router-dom';

const Borrowers = () => {
   const [isOwing, setIsOwing] = useState(false);
   const navigate = useNavigate();
   const onClick = ()=>{
      setIsOwing(prev=>!prev);
      navigate(isOwing?'/borrowers':'/borrowers/owing');
   }
   return (
      <div className={`m-auto p-2 oveflow-scroll h-full`} style={{width:'100%'}}>
         <div className={`flex justify-between items-center mb-1`}>
            <h1 className={``}>Borrowers</h1>
            <Button name={isOwing?'All Borrowers':'Owing Borrowers'} onClick={onClick}/>
         </div>
         
         {<Outlet/>}
      </div>
   )
}
const Borrower = ({borrower,index,handleCheckChange,deleteBorrower})=>{
   const {fname,lname,contacts,village} = borrower;
   
   return (
      // <div className={`flex data bg-grey items-center justify-evenly`}>
      <tr className={`${(index%2 !== 1)?'bg-primary':'bg-black'}`}>
         <td><input type="checkbox" onChange={(e)=>handleCheckChange(e,borrower)}/></td>
         <td>{fname}</td>
         <td>{lname}</td>
         <td>{contacts}</td>
         <td>{village}</td>
         <td className={`flex justify-center`}>
            <EditBorrowerModal borrower={borrower}/>
            <Button type={'button'} onClick={()=>deleteBorrower(borrower)} className={`mr-1 bg-inherit rounded-xs`}><Image type={'icon'} src={trash} alt={fname}  /></Button>
         </td>
      </tr>
      // </div>
   )
}
export const EditBorrowerModal = ({borrower,button,modalHeader}) => {
   const [isOpen, setIsOpen] = useState(false);
   const [input, setInput] = useState(borrower);
   const privateAxios = usePrivateAxios();

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
      if(!input.fname||!input.lname){
         alert('Enter all details');
         return;
      }
      try{
         privateAxios.post(`/borrower`,input)
         console.log(input);
         setInput({});
         hideModal();
      }catch(e){
         console.error(e);
      }
   }
  return (
    <div>
      <Button type={'button'} onClick={showModal} className={`bg-inherit rounded-xs`}><Image type={'icon'} src={button||edit} alt={'edit'}  /></Button>

      <Modal show={isOpen} onHide={hideModal} size='sm' centered={true} animation={true} className={`centered`} >
         <Modal.Header>
            {modalHeader||'Edit Borrower'}
         </Modal.Header>
         <Modal.Body>
            <form action="" method='POST' onSubmit={(e)=>handleSubmit(e)}>
               <div className="form-control">
                  <Label name={'First Name'}></Label>
                  <Input prop={{type:'text',name:'fname',value:input.fname}} handleChange={handleChange}></Input>
               </div>
               <div className="form-control">
                  <Label name={'Last Name'}></Label>
                  <Input prop={{type:'text',name:'lname',value:input.lname}} handleChange={handleChange}></Input>
               </div>
               <div className="form-control">
                  <Label name={'Village'}></Label>
                  <Input prop={{type:'text',name:'village',value:input.village}} handleChange={handleChange}></Input>
               </div>
               <div className="form-control">
                  <Label name={'Contacts'}></Label>
                  <Input prop={{type:'tel',name:'contacts',value:input.contacts}} handleChange={handleChange}></Input>
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


export const AllBorrowers = ()=>{
   const [borrowers, setBorrowers] = useState([]);
   const privateAxios = usePrivateAxios();
   // const {screenWidth} = useScreen()
   let checkedBorrowers = [];

   const handleCheckChange = (e,borrower) => {
      if(e.target.checked){
         checkedBorrowers.push(borrower);
         console.log(checkedBorrowers);
      }
   }
   const deleteBorrower = (borrower)=>{
      if(borrower){
         console.log(`Deleted ${borrower.name}`);
      }
      else if(checkedBorrowers[0]){
         checkedBorrowers.forEach((borrower)=>{
            console.log(`Deleted ${borrower.name}`);
         })
      }else{
         console.log('Nothing to delete');
      }
   }
   
   useEffect( ()=>{
      const controller = new AbortController();
      const sendRequest = async ()=>{
         try {      
            const res = await privateAxios.get(`/borrower`,{
               signal:controller.signal
            });
            setBorrowers(res.data.borrowers);
            console.log(res.data);
         } catch (error) {
            console.error(error)   
         }
      }   
      sendRequest();
      return () =>{
         controller.abort();
      }
   },[]);
   return (
      <div className={`flex justify-between`}>
            <div className={`rounded-ss w-full mr-xs overflow-hidden`}>
               <div className={`flex bg-grey items-center justify-evenly`}>
                  <h2>Borrowers</h2>
                  <div className={`w-50`}></div>
                  <div className={`group`}>
                     <EditBorrowerModal button={plus} modalHeader={'Add Borrower'} borrower={''}/>
                     <Button className={`bg-inherit`} onClick={()=>deleteBorrower()}><Image type={'icon'} src={trash} alt={'Trash icon'}/></Button>
                  </div>
               </div>
               {(borrowers.length == 0)?
                  <Nothing value={'Borrowers'} className={'bg-primary'}>
                     <EditBorrowerModal button={plus} modalHeader={'Add Borrower'} borrower={''}/>
                  </Nothing>:(
                     <Table tittle={""} className={`table b-collapse text-align-center w-full bg-grey`} 
                        parent={{className:`w-full overflow-scroll bg-primary mr-xs`}}>
                        <Thead thead={['All','First Name','Last Name','Contacts','Village','Actions']} className={`bg-grey h-3`}/>
                        <TBody>
                           {
                              borrowers.map((borrower,index)=>(
                                 <Borrower key={index} index={index} handleCheckChange={handleCheckChange} deleteBorrower={deleteBorrower} borrower={borrower}/>
                              ))
                           }
                        </TBody>
                     </Table> 
                  )
               }
            </div>
            
            {/* {(screenWidth>650)&&<div className={`flex items-center justify-center bg-primary rounded-sm`} style={{width:'98%'}}>
               <EditBorrowerModal button={plus} modalHeader={'Add Borrower'} borrower={''}/>
            </div>} */}
         </div>
   );
}
export default Borrowers;

