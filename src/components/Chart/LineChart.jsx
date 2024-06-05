import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import Chart from "react-apexcharts";

export default function LineChart() {
  const categories = Array.from({ length: 31 }, (_, index) => [index + 1]);

  const [randomArray, setRandomArray] = useState([]);

  // Function to generate an array with random values between 1 and 20
  const generateRandomArray = (length) => {
    const array = [];
    for (let i = 0; i < length; i++) {
      array.push(Math.floor(Math.random() * 20) + 1);
    }
    return array;
  };

  // useEffect to set the random array on component mount
  useEffect(() => {
    const newArray = generateRandomArray(31); // Change the length as needed
    setRandomArray(newArray);
  }, []);

  return (
    <React.Fragment>
      <Chart
        type="line"
        series={[
          {
            data: randomArray,
          },
        ]}
        options={{
          chart: {
            height: 350,
            type: "line",
            toolbar: false,
            zoom: {
              enabled: false,
            },
          },
          plotOptions: {
            bar: {
              columnWidth: "60%",
              distributed: true,
            },
          },
          dataLabels: {
            enabled: false,
          },
          colors: ["#1D83E2"],
          xaxis: {
            categories,
            labels: {
              style: {
                fontSize: "12px",
              },
            },
          },
          yaxis: {
            axisBorder: {
              show: true,
            },
          },
          legend: {
            show: false,
          },
          tooltip: {
            enabled: false,
          },
        }}
        height={350}
      />
    </React.Fragment>
  );
}
