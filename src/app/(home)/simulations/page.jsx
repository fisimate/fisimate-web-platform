"use client";
import Breadcrumb from "@/components/Breadcrumb";
import Table from "@/components/Table";
import TableAction from "@/components/Table/TableAction";
import { useGetSimulations } from "@/hooks/useSimulation";
import { useGetToken } from "@/hooks/useToken";
import { useRouter } from "next/navigation";
import React from "react";
import { FiEdit, FiEye } from "react-icons/fi";

export default function Simulation() {
  const { push } = useRouter();
  const token = useGetToken();

  const { data, isLoading, isRefetching } = useGetSimulations({ token });

  const fields = ["icon", "title", "chapter.name"];

  const headers = [
    {
      Header: "Icon",
      acccessor: "icon",
    },
    {
      Header: "Title",
      acccessor: "title",
    },

    {
      Header: "Bab",
      acccessor: "bab",
    },
  ];

  const actions = (actionData) => (
    <>
      <TableAction
        icon={<FiEye />}
        action={() => push(`/simulations/${actionData.id}`)}
      />
      <TableAction
        icon={<FiEdit />}
        action={() => push(`/simulations/${actionData.id}/edit`)}
      />
    </>
  );

  return (
    <React.Fragment>
      <Breadcrumb pageName={"Simulasi"} />
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
