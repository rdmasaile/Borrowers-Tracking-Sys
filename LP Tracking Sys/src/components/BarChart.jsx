import React from 'react';
import {Bar} from 'react-chartjs-2'
import { useScreen } from './ScreenProvider';

const BarChart = ({data}) => {
   const {screenWidth} = useScreen();
  return (
    <div className={`bg-primary rounded-sm p-1 ${screenWidth<700?'':'w-70'} h-70`}>
      <h1 className={``}>Expenses By Category</h1>
      <Bar data={data}/>
    </div>
  )
}

export default BarChart;