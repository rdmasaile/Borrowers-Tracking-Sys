import React from 'react';
import {Doughnut} from 'react-chartjs-2'
import { Chart as ChartJS  } from 'chart.js/auto';


const DoughnutChart = ({data}) => {
   return (
      <div className={`pie bg-primary rounded-sm p-1 h-full w-full `} >
         <h1 className={`mb-1`}>Expenses By Category</h1>
         <Doughnut data={data} />
      </div>
   )
}

export default DoughnutChart;