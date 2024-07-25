import React from 'react';
import {Line} from 'react-chartjs-2';
import { useScreen } from './ScreenProvider';
import { Chart as ChartJS  } from 'chart.js/auto';

const LineChart = ({data}) => {
   const {screenWidth} = useScreen();

   return (
      <div className={`line bg-primary rounded-sm p-1 h-full `}>
         <h1 className={``}>Expenses By Category</h1>
         <Line data={data}/>
      </div>
   )
}

export default LineChart;