import React from 'react';
import {Pie} from 'react-chartjs-2'
import { useScreen } from './ScreenProvider';
import { Chart as ChartJS, plugins  } from 'chart.js/auto';

const options = {
   responsive:true,
   plugins:{
      tittle:{

      }
   }
}
const Piechart = ({data}) => {
   const {screenWidth} = useScreen()
   return (
      <div className={`pie bg-primary rounded-sm p-1  `}>
         <h1 className={`mb-1`}>Expenses By Category</h1>
         <Pie data={data} options={options}/>
      </div>
   )
}

export default Piechart