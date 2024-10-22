"use client";
import { RadialBarChart, RadialBar, Legend, ResponsiveContainer } from 'recharts';
import './chart.module.css';
const data = [
  {
    name: '18-24',
    uv: 31.47,
    pv: 2400,
    fill: '#8884d8',
  },
  {
    name: '25-29',
    uv: 26.69,
    pv: 4567,
    fill: '#83a6ed',
  },
];
/*const style = {
  top: '50%',
  right: 0,
  transform: 'translate(0, -50%)',
  lineHeight: '24px',
};*/
const RoundChart = () => {

    return ( <div className="bg-white rounded-xl w-full h-full p-4">
       {/* TITLE */}
       <div className="flex justify-between items-center">
        <h1 className="text-lg font-semibold">Students</h1>
        </div>
      {/*Chart*/}
      <div className=''>
      {/*<ResponsiveContainer width="100%" height="100%"  >
        <RadialBarChart cx="50%" cy="50%" innerRadius="10%" outerRadius="80%" barSize={10} data={data}>
          <RadialBar
            minAngle={30}
            label={{ position: 'insideStart', fill: '#fff' }}
            background
            clockWise
            dataKey="uv"
          />
          
        </RadialBarChart>
      </ResponsiveContainer>*/}
      
     
      </div>
      {/*Buttom*/}

        <div className='flex justify-center gap-16'>
          <div className='flex flex-col gap-1'>
            <div className='w-5 h-5 bg-lamaSky rounded-full'>
              <h1 className='font-bold'> 1.22</h1>
              <h2 className='text-xs text-gray-300'> boys</h2>
            </div>
            </div> 
        </div>
        </div>
      );
  };
  export default RoundChart;