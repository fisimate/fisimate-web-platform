"use client";
import Breadcrumb from "@/components/Breadcrumb";
import ErrorPage from "@/components/ErrorPage";
import Table from "@/components/Table";
import { useGetQuizHistories } from "@/hooks/useQuiz";
import { useGetToken } from "@/hooks/useToken";
import convertDate from "@/utils/convertDate";
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
      accessor: "simulasi",
    },
    {
      Header: "Skor",
      accessor: "score",
    },
    {
      Header: "Dikerjakan pada",
      accessor: "dikerjakanPada",
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
      <Breadcrumb pageName={"Riwayat Kuis Siswa"} />
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
