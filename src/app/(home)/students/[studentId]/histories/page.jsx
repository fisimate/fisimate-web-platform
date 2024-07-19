"use client";
import Breadcrumb from "@/components/Breadcrumb";
import Button from "@/components/Button";
import ErrorPage from "@/components/ErrorPage";
import Table from "@/components/Table";
import { useGetQuizHistories } from "@/hooks/useQuiz";
import { useGetToken } from "@/hooks/useToken";
import convertDate from "@/utils/convertDate";
import Link from "next/link";
import React from "react";

export default function StudentHistories({ params }) {
  const { studentId } = params;

  const token = useGetToken();

  const { data, isLoading, isRefetching, isLoadingError } = useGetQuizHistories(
    {
      token,
      studentId,
    }
  );

  const fields = ["simulation.title", "score", "attemptAt"];

  const headers = [
    {
      Header: "Simulasi",
      accessor: "Simulasi",
    },
    {
      Header: "Score",
      accessor: "Score",
    },
    {
      Header: "Dikerjakan pada",
      accessor: "Dikerjakan pada",
    },
  ];

  const formattedData = data?.data?.data.map((item) => ({
    ...item,
    attemptAt: convertDate(item.attemptAt),
  }));

  if (isLoadingError) {
    return <ErrorPage />;
  }

  return (
    <React.Fragment>
      <Breadcrumb pageName={"Student Histories"} />
      <div className="flex flex-col gap-10">
        <div className="rounded-sm border border-stroke bg-white px-5 pb-2.5 pt-6 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
          <Table
            headers={headers}
            data={formattedData}
            action={false}
            fields={fields}
            isLoading={isLoading}
            isRefetching={isRefetching}
          />
          {/* {JSON.stringify(data?.data?.data)} */}
        </div>
      </div>
    </React.Fragment>
  );
}
