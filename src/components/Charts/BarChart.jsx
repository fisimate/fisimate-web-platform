import React, { useEffect, useState } from "react";
// import ReactApexChart from "react-apexcharts";
import dynamic from "next/dynamic";

export default function ChartTwo({ articlesPerMonth }) {
  const ReactApexChart = dynamic(() => import("react-apexcharts"), {
    ssr: false,
  });

  const [chartData, setChartData] = useState({
    series: [
      {
        name: "Articles",
        data: Array(12).fill(0), // Initialize data for 12 months
      },
    ],
    categories: [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ], // Months of the year
  });

  useEffect(() => {
    // Create an array of 12 months with initial count 0
    const monthlyData = Array(12).fill(0);

    // Populate monthlyData with article counts
    articlesPerMonth?.forEach((item) => {
      monthlyData[item.month - 1] = item.count; // month - 1 to convert to 0-based index
    });

    setChartData((prevState) => ({
      ...prevState,
      series: [
        {
          name: "Articles",
          data: monthlyData,
        },
      ],
    }));
  }, [articlesPerMonth]);

  const options = {
    colors: ["#7AB2B2"],
    chart: {
      fontFamily: "Satoshi, sans-serif",
      type: "bar",
      height: 335,
      stacked: true,
      toolbar: {
        show: false,
      },
      zoom: {
        enabled: false,
      },
    },
    responsive: [
      {
        breakpoint: 1536,
        options: {
          plotOptions: {
            bar: {
              borderRadius: 0,
              columnWidth: "25%",
            },
          },
        },
      },
    ],
    plotOptions: {
      bar: {
        horizontal: false,
        borderRadius: 0,
        columnWidth: "45%",
        borderRadiusApplication: "end",
        borderRadiusWhenStacked: "last",
      },
    },
    dataLabels: {
      enabled: false,
    },
    xaxis: {
      categories: chartData.categories,
    },
    legend: {
      position: "top",
      horizontalAlign: "left",
      fontFamily: "Satoshi",
      fontWeight: 500,
      fontSize: "14px",

      markers: {
        radius: 99,
      },
    },
    fill: {
      opacity: 1,
    },
  };

  return (
    <div className="col-span-12 rounded-sm border border-stroke bg-white px-5 pb-5 pt-7.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:col-span-8">
      <div className="mb-4 justify-between gap-4 sm:flex">
        <div>
          <h4 className="text-xl font-semibold text-black dark:text-white">
            Published Articles Per Month This Year
          </h4>
        </div>
      </div>

      <div>
        <div id="chartTwo" className="-mb-9 -ml-5">
          <ReactApexChart
            options={options}
            series={chartData.series}
            type="bar"
            height={350}
          />
        </div>
      </div>
    </div>
  );
}
