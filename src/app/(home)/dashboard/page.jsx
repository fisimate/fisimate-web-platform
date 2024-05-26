"use client";
import CardStat from "@/components/CardStat";
import BarChart from "@/components/Chart/BarChart";
import { Flex, Select } from "@chakra-ui/react";
import { FiBook, FiDatabase, FiMonitor, FiUsers } from "react-icons/fi";

export default function Dashboard() {
  return (
    <div className="">
      <Flex direction={"row"} justify={"space-between"} gap={8} mt={6}>
        <CardStat label={"Total Students"} value={12} icon={<FiUsers />} />
        <CardStat label={"Banks"} value={24} icon={<FiDatabase />} />
        <CardStat label={"Materials"} value={42} icon={<FiBook />} />
        <CardStat label={"Simulations"} value={90} icon={<FiMonitor />} />
      </Flex>
      <div className="mt-6 flex justify-between gap-8">
        <div className="bg-white p-8 w-3/5 rounded-xl">
          <div className="flex justify-between">
            <h2 className="font-semibold">Total Student Taking the Quiz</h2>
            <Select w={"fit-content"}>
              <option value="">Per Month</option>
              <option value="">Per Day</option>
            </Select>
          </div>
          <div className="w-full h-full flex items-center">
            <div className="w-full">
              <BarChart />
            </div>
          </div>
        </div>
        <div className="bg-white p-8 w-2/5 rounded-xl">
          <h2 className="font-semibold">Top Student</h2>
          <div className="flex flex-col p-2 mt-5 gap-6">
            <div className="bg-blue-500 p-4 rounded-full flex flex-row justify-between items-center">
              <div className="flex flex-row gap-5 items-center">
                <div className="bg-white h-16 w-16 rounded-full"></div>
                <p className="text-white font-medium text-lg">Tsaqif Akrom</p>
              </div>
              <div className="bg-gray-300 px-4 py-2 rounded-full">
                <p className="font-extrabold">400</p>
              </div>
            </div>
            <div className="bg-blue-500 p-4 rounded-full flex flex-row justify-between items-center">
              <div className="flex flex-row gap-5 items-center">
                <div className="bg-white h-16 w-16 rounded-full"></div>
                <p className="text-white font-medium text-lg">Tsaqif Akrom</p>
              </div>
              <div className="bg-gray-300 px-4 py-2 rounded-full">
                <p className="font-extrabold">400</p>
              </div>
            </div>
            <div className="bg-blue-500 p-4 rounded-full flex flex-row justify-between items-center">
              <div className="flex flex-row gap-5 items-center">
                <div className="bg-white h-16 w-16 rounded-full"></div>
                <p className="text-white font-medium text-lg">Tsaqif Akrom</p>
              </div>
              <div className="bg-gray-300 px-4 py-2 rounded-full">
                <p className="font-extrabold">400</p>
              </div>
            </div>
            <div className="bg-blue-500 p-4 rounded-full flex flex-row justify-between items-center">
              <div className="flex flex-row gap-5 items-center">
                <div className="bg-white h-16 w-16 rounded-full"></div>
                <p className="text-white font-medium text-lg">Tsaqif Akrom</p>
              </div>
              <div className="bg-gray-300 px-4 py-2 rounded-full">
                <p className="font-extrabold">400</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
