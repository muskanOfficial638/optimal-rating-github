import React,{forwardRef,useImperativeHandle, useEffect} from 'react';
import { PieChart, Pie, ResponsiveContainer, Tooltip, Legend, Cell, Label } from 'recharts';
import { useCurrentPng } from "recharts-to-png";
import { postData } from '../../store/requests/global';
import {ApiUrl} from '../../config';
import domtoimage from 'dom-to-image';

const RADIAN = Math.PI / 180;
const renderCustomizedLabel = ({
  cx,
  cy,
  midAngle,
  innerRadius,
  outerRadius,
  percent, 
  name,
}) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return name+` (${parseFloat(percent).toFixed(2)}%)`;

  /*return (
    <text
      x={x}
      y={y}
      fill="white"
      textAnchor={x > cx ? "start" : "end"}
      dominantBaseline="left"
    >
      {`${parseFloat(percent).toFixed(2)}%`}
    </text>
  );*/
};

const PieCharts= forwardRef(({ data, chartImageName}, ref) =>{
const [getPiePng, { ref: pieRef }] = useCurrentPng();

useEffect(()=>{
   setTimeout(()=>{
      handlePieDownload()
   },8000)
},[handlePieDownload])

// eslint-disable-next-line react-hooks/exhaustive-deps
 async function handlePieDownload() {
    /*const png = await getPiePng();
    if (png) {
       postData({ url:  `${ApiUrl}survey-image-upload`, data: {
         base64_image:png,name:chartImageName
       } });
    }*/
    if(chartImageName){
      domtoimage.toPng(document.getElementById("pieChartId"))
        .then(function (png) {
          if(window !== "undefined" && window.innerWidth > 600 && png){
            postData({ url:  `${ApiUrl}survey-image-upload`, data: { base64_image:png,name:chartImageName} });
          }
        }).catch(function (){});
    }
  }
 /*useImperativeHandle(ref, () => ({
   async handlePieDownload() {
    const png = await getPiePng();
    if (png) {
       postData({ url:  `${ApiUrl}survey-image-upload`, data: {
         base64_image:png,name:chartImageName
       } });
    }
  }
  }));*/
  
  
  return (
    <div style={{ width: '100%', height: 360 }} id="pieChartId">
      <ResponsiveContainer>
        <PieChart ref={pieRef} >
          <Pie
           height={360}
           labelLine={false}
           label={renderCustomizedLabel}
           dataKey="percent" nameKey="choice_title" data={data.map(x => ({ ...x, percent: parseFloat(x.percent) }))} fill="#8884d8" >
            {data.map((item, i) => (
              <Cell key={`cell-${i}`} fill={item.color} />
            ))}
          </Pie>
          <Tooltip formatter={(v) => `${v}%`} />
          <Label/>
          {/*<Legend />*/}
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
});

PieCharts.displayName = "PieCharts"
export default  PieCharts
