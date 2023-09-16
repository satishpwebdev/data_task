import React from "react";
import { WineData } from "./data";

function FlavanoidsMean(values) {
   const sum = values.reduce((acc, value) => acc + parseFloat(value), 0);
   return sum / values.length;
}

function FlavanoidsMedian(values) {
   values.sort((a, b) => a - b);
   const middle = Math.floor(values.length / 2);
   if (values.length % 2 === 0) {
      return (values[middle - 1] + values[middle]) / 2;
   } else {
      return values[middle];
   }
}

function FlavanoidsMode(values) {
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

const Flavanoids = () => {
   const uniqueAlcohols = [...new Set(WineData.map((item) => item["Alcohol"]))];

   const statistics = {};

   uniqueAlcohols.forEach((alcohol) => {
      const alcoholData = WineData.filter((item) => item["Alcohol"] === alcohol);
      const flavanoidsValues = alcoholData.map((item) => item["Flavanoids"]);

      statistics[`Alcohol ${alcohol}`] = {
         "Flavanoids Mean": FlavanoidsMean(flavanoidsValues).toFixed(3),
         "Flavanoids Median": FlavanoidsMedian(flavanoidsValues).toFixed(3),
         "Flavanoids Mode": FlavanoidsMode(flavanoidsValues),
      };
   });

   return (
      <>
         <div>
            <h1 className="headingText">Data Visualization</h1>
            <table className="table" border={2}>
               <thead>
                  <tr>
                     <th>Measure</th>
                     {uniqueAlcohols.map((alcohol) => (
                        <th key={alcohol}>Class {alcohol}</th>
                     ))}
                  </tr>
               </thead>
               <tbody>
                  {["Flavanoids Mean", "Flavanoids Median", "Flavanoids Mode"].map((measure) => (
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

export default Flavanoids;
