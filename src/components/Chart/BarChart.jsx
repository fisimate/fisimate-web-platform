import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import Chart from "react-apexcharts";

export default function BarChart() {
  const getMonths = () => {
    const months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];

    // Wrap each month in an array
    return months.map((month) => [month]);
  };

  const categories = getMonths();

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
    const newArray = generateRandomArray(12); // Change the length as needed
    setRandomArray(newArray);
  }, []);

  return (
    <React.Fragment>
      <Chart
        type="bar"
        series={[
          {
            data: randomArray,
          },
        ]}
        options={{
          chart: {
            height: 350,
            type: "bar",
            toolbar: false,
            zoom: {
              enabled: false,
            },
          },
          plotOptions: {
            bar: {
              columnWidth: "60%",
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
