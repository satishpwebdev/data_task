import React from "react";
import { WineData } from "./data";

//calculating the mean of values

function GammaMean(values) {
   const sum = values.reduce((acc, value) => acc + parseFloat(value), 0);
   return sum / values.length;
}

function GammaMedian(values) {
   values.sort((a, b) => a - b);
   const middle = Math.floor(values.length / 2);
   if (values.length % 2 === 0) {
      return (values[middle - 1] + values[middle]) / 2;
   } else {
      return values[middle];
   }
}

function GammaMode(values) {
   const valueCount = {};
   values.forEach((value) => {
      if (valueCount[value]) {
         valueCount[value]++;
      } else {
         valueCount[value] = 1;
      }
   });

   let mode = null;
   let maxCount = 0;

   for (const value in valueCount) {
      if (valueCount[value] > maxCount) {
         mode = parseFloat(value);
         maxCount = valueCount[value];
      }
   }

   return mode !== null ? mode.toFixed(3) : null;
}

const Gamma = () => {

   //created an array for unique alcohol values from WineData
   const uniqueAlcohols = [...new Set(WineData.map((item) => item["Alcohol"]))];
  
   const statistics = {};

   uniqueAlcohols.forEach((alcohol) => {

      //filtering the WineData for the current alcohol class such as 'Alcohol:1'
      const alcoholData = WineData.filter((item) => item["Alcohol"] === alcohol);

      //calculating the gamma values for the current alcohol class.
      const GammaValues = alcoholData.map((item) => {
         return (item.Ash * item.Hue) / item.Magnesium;
      });

      // console.log("Gamma", GammaValues);


      statistics[`Alcohol ${alcohol}`] = {
         "Gamma Mean": GammaMean(GammaValues).toFixed(3),
         "Gamma Median": GammaMedian(GammaValues).toFixed(3),
         "Gamma Mode": GammaMode(GammaValues),
      };
   });

   return (
      <>
         <div>
            <h1 className="headingText">Data Visualization</h1>
            <table border={2}>
               <thead>
                  <tr>
                     <th>Measure</th>
                     {uniqueAlcohols.map((alcohol) => (
                        <th key={alcohol}>Class {alcohol}</th>
                     ))}
                  </tr>
               </thead>
               <tbody>
                  {["Gamma Mean", "Gamma Median", "Gamma Mode"].map((measure) => (
                     <tr key={measure}>
                        <td>{measure}</td>
                        {uniqueAlcohols.map((alcohol) => (
                           <td key={alcohol}>{statistics[`Alcohol ${alcohol}`][measure]}</td>
                        ))}
                     </tr>
                  ))}
               </tbody>
            </table>
         </div>
      </>
   );
};

export default Gamma;
