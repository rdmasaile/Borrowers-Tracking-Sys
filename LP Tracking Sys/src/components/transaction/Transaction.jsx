import React from 'react';
import './transaction.css';
import Modal from "react-bootstrap/Modal";
import Button from '../button/Button';
import Image from '../image/Image';
import { trash,plus,edit } from '../../assests';
// import { transactions } from '../../constants/Transaction';
import { useEffect, useState } from 'react';
import Table, { TBody, Thead } from '../Table';
import { Input, Label } from '../form/Form';
// import { borrowers } from '../../constants';
import Nothing from '../Nothing';
import {privateAxios} from '../../api/axios';
import { useNavigate } from 'react-router-dom';

let borrowers = [];

const Transactions = () => {
   const [transactions, setTransactions] = useState([]);
   // const [borrowers, setBorrowers] = useState([]);
   
   useEffect(()=>{
      const controller = new AbortController();
      const sendRequest = async ()=>{
         try {      
            const res = await privateAxios.get(`/borrower`,{
               // signal:controller.signal
            });
            // setBorrowers(res.data.borrowers);
            console.log("fheoaioeio");
            console.log(res.data);
         } catch (error) {
            console.error(error);   
         }
      }   
      sendRequest();
      return () =>{
         controller.abort();
      }
      // const getBorrowers = async ()=>{
      //    try{
      //       const res = await privateAxios.get(`/borrower`,{
      //          signal:controller.signal,
      //       });
      //       console.log(res.data.borrowers);
      //       // borrowers = res.data.borrowers;
      //    }catch(e){
      //       console.error(e);
      //    }
      // }
      // getTransactions();
      // getBorrowers();

      // return ()=>{
      //    // controller.abort();
      // }
   },[])
   let checkedTransactions = [];
   const handleCheckChange = (e,transaction) => {
      if(e.target.checked){
         checkedTransactions.push(transaction);
         console.log(checkedTransactions);
      }
   }
   const deleteTransaction = (transaction)=>{
      if(transaction){
         deleteTrans(transaction.id);
         console.log(`Deleted ${transaction.tname}`);
      }
      else if(checkedTransactions[0]){
         checkedTransactions.forEach((transaction)=>{
            deleteTrans(transaction.id);
            console.log(`Deleted ${transaction.tname}`);
         })
      }else{
         console.log('Nothing to delete');
      }
   }
   const deleteTrans = (transactionId)=>{
      setTransactions(transactions.filter((trans)=> trans.id !== transactionId));
   }
  return (
    <div className={`p-1 m-auto `} style={{width:'98%',height:'100%'}}>
      <div className={`rounded-ss overflow-hidden`}>
         <div className={`flex bg-grey items-center justify-evenly`}>
            <h2>Transactions</h2>
            <div className={`w-50`}></div>
            <div className={`group`}>
               <EditTransactionModal button={plus} modalHeader={'Add Transaction'} transaction={''}/>
               <Button className={`bg-inherit`} onClick={()=>deleteTransaction()}><Image type={'icon'} src={trash} alt={'Trash icon'}/></Button>
            </div>
         </div>
         {(!transactions[0])?
            <Nothing value={'Transactions'} className={'bg-primary'}>
               {/* <EditTransactionModal button={plus} modalHeader={'Add Transaction'} transaction={''}/> */}
            </Nothing>:(
               <Table tittle={''} className={`table b-collapse text-align-center w-full bg-grey`} parent={{className:`overflow-y-scroll`,style:{maxHeight:'20rem'}}} >
                  <Thead thead={['All','First Name','Last Name','Amount','Status','Description','Date','Actions']} className={`bg-grey h-3`}/>
                  <TBody>
                     {
                        transactions.map((trans,index)=>(
                           <Transaction key={index} handleCheckChange={handleCheckChange} deleteTransaction={deleteTransaction} transaction={trans}/>
                        ))
                     }
                  </TBody>
               </Table>
            )
         }
      </div>
    </div>
  )
}

const Transaction = ({transaction,rows,handleCheckChange,deleteTransaction})=>{
   const {fname,lname,amount,status,description,updated_at} = transaction;
   
   return (
      // <div className={`flex data bg-grey items-center justify-evenly`}>
      <tr className={`${(rows%2 !== 1)?'bg-primary':'bg-black'}`}>
         <td><input type="checkbox" onChange={(e)=>handleCheckChange(e,transaction)}/></td>

         <td>{`${fname}`}</td>
         <td>{`${lname}`}</td>
         <td>M{amount}</td>
         <td>{status}</td>
         <td>{description}</td>
         <td>{updated_at.split('T')[0]}</td>

         <td className={`flex justify-center`}>
            <EditTransactionModal transaction={transaction}/>
            <Button type={'button'} onClick={()=>deleteTransaction(transaction)} className={`mr-1 bg-inherit rounded-xs`}><Image type={'icon'} src={trash} alt={'delete'}  /></Button>
         </td>
      </tr>
      // </div>
   )
}
export default Transactions;

export const EditTransactionModal = ({transaction,button,modalHeader}) => {
   const [isOpen, setIsOpen] = useState(false);
   const navigate = useNavigate();
   const showModal = ()=>{
      setIsOpen(true);
   }
   const hideModal = ()=>{
      setIsOpen(false);
   }
   const [input, setInput] = useState(transaction);

   const handleChange = (target) =>{
      const {name,value} = target;
      setInput({...input,[name]:value})
   }
   const handleCheck = (e) =>{
      if(e.target.checked){
         switch(e.target.id){
            case 'income':
               setInput({...input,is_payment:1});
               break;
            case 'expense':
               setInput({...input,is_payment:0});
               break;
            default:
               console.log('invalid');
         }
      }
   }
   const handleSubmit = async (e)=>{
      e.preventDefault();
      // console.log(input.keys);
      if(!input.tname||!input.amount||!input.borrower_id||!input.is_is===0){
         alert('Enter all details');
         return;
      }
      setInput({...input,user_id:1})
      const res = await privateAxios.post(`/transaction`,input)
      if(res.status === 200){

      }
      console.log(res.data);
      console.log(input);
      setInput({});
      hideModal();
   }
  return (
    <div>
      <Button type={'button'} onClick={showModal} className={`bg-inherit rounded-xs`}><Image type={'icon'} src={button||edit} alt={'edit'}/></Button>

      <Modal show={isOpen} onHide={hideModal} size='sm' centered={true} animation={true} className={`centered`} >
         <Modal.Header>
            {modalHeader||'Edit Transaction'}
         </Modal.Header>
         <Modal.Body>
            <form action="" method='POST' onSubmit={(e)=>handleSubmit(e)}>
               <div className="form-control">
                  <label htmlFor="borrower">Borrower:</label>
                  <select name="borrower_id" className={`h-3 p-xs`} value={input?.borrower_id} onChange={(e)=>handleChange(e.target)}>
                     {borrowers.map((borrower,index)=><option key={index} name={borrower.fname} value={borrower.id}>{borrower.id}</option>)}
                  </select>
               </div>
               <div className="form-control p-xs" >
                  <span className='cursor-pointer text-blue' onClick={()=>{navigate(`/addBorrower`)}}>
                     Add Borrower...
                  </span>
               </div>
               
               <div className="form-control">
                  <Label name={'Amount'}></Label>
                  <Input prop={{type:'number',name:'amount',value:input.amount}} handleChange={handleChange}></Input>
               </div>
               <div className="form-control flex justify-center">
                  <div className={`flex`} >
                     <Label name={'Payment'} className={`mr-xs`}></Label>
                     <input type="radio" name='transactionType' id={`income`} value={''} onChange={(e)=>{handleCheck(e)}}/>
                  </div>
                  <div className={`flex`}>
                     <Label name={'Owe'} className={`mr-xs`}></Label>
                     <input type="radio" name='transactionType' id={`expense`} value={''} onChange={(e)=>{handleCheck(e)}}/>
                  </div>
               </div>
               <div className="form-control">
                  <legend>Discription</legend>
                  <textarea style={{height:'5rem',outline:'none',padding:'.5rem'}} name={`description`} onChange={(e)=>handleChange(e.target)}>
                  

                  </textarea>
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