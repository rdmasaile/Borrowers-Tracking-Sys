import axios from 'axios';
import React, { useEffect, useState } from 'react'
import Amount from './Amount'
import { useScreen } from './ScreenProvider';
import { transactions as Trans } from '../constants/Transaction';

const Billing = () => {
   const [state, setState] = useState('idle');
   const {screenWidth,setWidth} = useScreen();
   const [transactions,setTransactions] = useState([]);
   const [transactionTotals, setTransactionTotals] = useState({totalExpenses:0,totalIncomes:0,balance:0});
   const {totalExpenses,totalIncomes,balance} = transactionTotals;
   const sendRequest = async ()=>{
      const res = await axios.get(`http://191.168.43.108:40000/transaction`,{
         withCredentials:true
      });
      setState('loaded')
      return res.data;
   }

   useEffect(()=>{
      setTransactions(Trans);
      if(transactions[0]){
         if(state === 'idle'){
            transactions.forEach((trans)=>{
               if(trans.is_income){
                  transactionTotals.totalIncomes += trans.amount;
               }else{
                  transactionTotals.totalExpenses += trans.amount;
               }
            })
            transactionTotals.balance = transactionTotals.totalIncomes - transactionTotals.totalExpenses;
            console.log(transactionTotals.balance);
            setState('loaded');
         }
      }

      //sendRequest((data)=>setTransactions(data.transactions)).catch(err=>{console.log(err);});
   },[state,transactions])

   

   return (
      <div className={`billing flex m-auto p-1 justify-center items-center`} style={setWidth('98%')}>
         <Amount currency={'M'} tittle={`${screenWidth<600 ? '':'Total'} Income`} component={`income`} amount={totalIncomes}/>
         <Amount currency={'M'} tittle={`${screenWidth<600 ? '':'Total'} Expenses`} component={`expense`} amount={totalExpenses}/>
         <Amount currency={'M'} tittle={`Balance`} component={`balance`} amount={balance}/>
      </div>
   )
}

export default Billing