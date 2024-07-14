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
      title: "Avatar",
    },
    {
      title: "Fullname",
    },
    {
      title: "NIS",
    },
    {
      title: "Email",
    },
    {
      title: "Score",
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

  return (
    <React.Fragment>
      <Breadcrumb pageName={"Leaderboard"} />
      <div className="flex flex-col gap-10">
        <div className="rounded-sm border border-stroke bg-white px-5 pb-2.5 pt-6 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
          <Table
            headers={headers}
            data={data?.data?.data}
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
