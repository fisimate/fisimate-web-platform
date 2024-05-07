"use client";
import CustomCard from "@/components/Card";
import { useAuthStore } from "@/stores/app-store";
import { Flex } from "@chakra-ui/react";
import {
  FiBook,
  FiDatabase,
  FiFileText,
  FiMonitor,
  FiUsers,
} from "react-icons/fi";

export default function Dashboard() {
  const { user } = useAuthStore();

  return (
    <div className="">
      <Flex direction={"row"} justify={"space-between"} gap={8}>
        <CustomCard label={"Students"} value={12} icon={<FiUsers />} />
        <CustomCard label={"Banks"} value={12} icon={<FiDatabase />} />
        <CustomCard label={"Materials"} value={12} icon={<FiBook />} />
        <CustomCard label={"Simulations"} value={12} icon={<FiMonitor />} />
        <CustomCard label={"Exams"} value={12} icon={<FiFileText />} />
      </Flex>
      <h1>{JSON.stringify(user)}</h1>
    </div>
  );
}
