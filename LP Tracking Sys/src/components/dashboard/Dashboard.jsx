import React from 'react';
import './dashboard.css';
// import DoughnutChart from '../DoughnutChart';
// import { borrowers } from '../../constants';
import { useState } from 'react';
// import BarChart from '../BarChart';
import { useScreen } from '../ScreenProvider';
// import LineChart from '../Graph';
import { transactions } from '../../constants/Transaction';
import Table, { TBody, Thead, TRow } from '../Table';
import Widgets from '../Widgets';

const Dashboard = () => {
   const {screenWidth} = useScreen();
   const [borrowers, setBorrowers] = useState([]);
   const [data, setData] = useState({
      labels: borrowers.map((category)=>category.name),
      datasets : [
         {
            label: "Borrowers",
            data: borrowers.map((category)=>category.total),
            backgroundColor: borrowers.map((category)=>category.color),
            borderColor: "grey",
            borderWidth: 1,
            lineTension:0.5,
         },
         
      ]
   });
   const transaction = transactions.map((trans)=>[trans.tname,"Khotso",trans.amount,"50.00","20.00",trans.date.getMonth()]);
  return (
    <div className={`dashboard p-1 justify-center items-center m-auto`} style={{height:'100%'}}>
      <section className={`w-full ${screenWidth<700?'flex-col':'flex'}`}
         style={{width:'100%'}}>
         <div className={`${screenWidth<700?'mt-xs':'mr-xs'}`} style={{width:screenWidth<700?'98%':'48%'}}>
            {/* <DoughnutChart data = {data}/> */}
         </div>
         <div className={`${screenWidth<700?'mt-xs':''}`} style={{width:screenWidth<700?'98%':'48%'}}>
            {/* <LineChart data = {data}/> */}
         </div>
      </section>
      <section className={`w-full mt-xs ${screenWidth<700? 'flex-col':'flex'}`}
         style={{width:'100%'}}>
         <div className={`rounded-sm ${screenWidth<700?'mt-xs':'mr-xs'}`} style={{width:screenWidth<700?'98%':'48%'}}>
            <Table tittle={"Recent Borrowers"} parent={{style:{height:'15rem'}}} className={`bg-primary w-full text-align-center b-collapse`} >
               <Thead thead={['First Name','Last Name','Amount Borowered','Amount Paid','Amount Owing','Date']} className={`bg-grey`}/>
               <TBody>
                  {
                     transaction.map((trans,index)=>(
                        <TRow key={index} tRow={trans} className={`h-3`}/>
                     ))
                  }
               </TBody>
            </Table>
         </div>
         <div className={` p-1 bg-primary rounded-sm ${screenWidth<700?'mt-xs':''}`} style={{width:screenWidth<700?'98%':'48%'}}>
            <Widgets/>
         </div>
      </section>
    </div>
  )
}

export default Dashboard;
