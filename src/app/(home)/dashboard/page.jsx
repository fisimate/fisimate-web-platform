"use client";

import CardStat from "@/components/CardStat";
import BarChart from "@/components/Charts/BarChart";
import Leaderboard from "@/components/Leaderboard";
import Spinner from "@/components/Spinner";
import { useGetDashboard } from "@/hooks/useDashboard";
import { useGetToken } from "@/hooks/useToken";
import React from "react";
import { PiBook, PiBookOpenText, PiStudent } from "react-icons/pi";
import { RiFormula } from "react-icons/ri";

export default function Dashboard() {
  const token = useGetToken();

  const { data, isLoading } = useGetDashboard(token);

  const stats = [
    {
      label: "Total Siswa",
      value: data?.data?.data?.totalStudents,
      icon: <PiStudent />,
    },
    {
      label: "Total Materi",
      value: data?.data?.data?.totalMaterials,
      icon: <PiBook />,
    },
    {
      label: "Total Kuis",
      value: data?.data?.data?.totalExams,
      icon: <PiBookOpenText />,
    },
    {
      label: "Total Rumus",
      value: data?.data?.data?.totalFormulas,
      icon: <RiFormula />,
    },
  ];

  return (
    <React.Fragment>
      <div className="mb-5 flex items-center justify-between">
        <div>
          <p className="font-medium">Welcome, Admin!</p>
          <h2 className="mb-1.5 text-title-md2 font-bold text-black dark:text-white">
            Dashboard
          </h2>
        </div>
      </div>
      {isLoading ? (
        <div className="flex justify-center w-full">
          <Spinner />
        </div>
      ) : (
        <React.Fragment>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 xl:grid-cols-4 2xl:gap-7.5">
            {stats.map((item, i) => (
              <CardStat
                title={item.label}
                total={item.value}
                icon={item.icon}
                key={i}
              />
            ))}
          </div>
          <div className="mt-4 grid grid-cols-12 gap-4 md:mt-6 md:gap-6 2xl:mt-7.5 2xl:gap-7.5">
            <BarChart data={data?.data?.data?.attemptsPerMonthChart} />
            <Leaderboard data={data?.data?.data?.leaderboard} />
          </div>
        </React.Fragment>
      )}
    </React.Fragment>
  );
}
