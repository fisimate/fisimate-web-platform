"use client";
import Breadcrumb from "@/components/Breadcrumb";
import Table from "@/components/Table";
import TableAction from "@/components/Table/TableAction";
import { useGetLeaderboard } from "@/hooks/useDashboard";
import { useGetToken } from "@/hooks/useToken";
import { useRouter } from "next/navigation";
import React from "react";
import { FiEye } from "react-icons/fi";

export default function Leaderboard() {
  const { push } = useRouter();
  const token = useGetToken();

  const { data, isLoading, isRefetching } = useGetLeaderboard({
    token,
  });

  const fields = [
    "user.profilePicture",
    "user.fullname",
    "user.nis",
    "user.email",
    "_sum.score",
  ];

  const headers = [
    {
      Header: "Foto Profil",
      accessor: "avatar",
    },
    {
      Header: "Nama Lengkap",
      accessor: "fullname",
    },
    {
      Header: "NIS",
      accessor: "nis",
    },
    {
      Header: "Email",
      accessor: "email",
    },
    {
      Header: "Total Skor",
      accessor: "score",
    },
  ];

  const actions = (actionData) => (
    <>
      <TableAction
        icon={<FiEye />}
        action={() => push(`/students/${actionData.userId}/histories`)}
      />
    </>
  );

  const formattedData = data?.data?.data.map((item) => ({
    ...item,
    _sum: {
      score: item._sum.score.toString(),
    },
  }));

  return (
    <React.Fragment>
      <Breadcrumb pageName={"Papan Peringkat"} />
      <div className="flex flex-col gap-10">
        <div className="rounded-sm border border-stroke bg-white px-5 pb-2.5 pt-6 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
          <Table
            headers={headers}
            data={formattedData}
            action={actions}
            fields={fields}
            isLoading={isLoading}
            isRefetching={isRefetching}
          />
        </div>
      </div>
    </React.Fragment>
  );
}
