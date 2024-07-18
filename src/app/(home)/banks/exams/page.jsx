"use client";
import Breadcrumb from "@/components/Breadcrumb";
import Button from "@/components/Button";
import Modal from "@/components/Modal";
import Table from "@/components/Table";
import TableAction from "@/components/Table/TableAction";
import { useDeleteBank, useGetBanks } from "@/hooks/useBank";
import { useGetToken } from "@/hooks/useToken";
import getLastPathUrl from "@/utils/getLastPathUrl";
import { useToast } from "@chakra-ui/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { FiEdit, FiTrash2 } from "react-icons/fi";

export default function ExamBank() {
  const [isModalOpen, setModalOpen] = useState(false);
  const [selectedData, setSelectedData] = useState(null);

  const { push } = useRouter();
  const toast = useToast();

  const openModal = (modalData) => {
    setSelectedData(modalData);
    setModalOpen(true);
  };

  const closeModal = () => setModalOpen(false);

  const token = useGetToken();

  const { data, isLoading, isRefetching, refetch } = useGetBanks({
    token,
    model: "exam",
  });

  const { mutate } = useDeleteBank({
    token,
    model: "exam",
    onError: (error) => {
      const result = error.response.data;

      toast({
        title: result.message,
        status: "error",
        isClosable: true,
        position: "top-right",
      });
    },
    onSuccess: () => {
      toast({
        title: "Berhasil hapus data!",
        status: "success",
        isClosable: true,
        position: "top-right",
      });

      refetch();
    },
  });

  const fields = ["icon", "title", "filePath", "chapter.name"];

  const headers = [
    {
      Header: "Icon",
      accessor: "icon",
    },
    {
      Header: "Title",
      accessor: "title",
    },
    {
      Header: "File Soal",
      accessor: "fileSoal",
    },
    {
      Header: "Bab",
      accessor: "bab",
    },
  ];

  const actions = (actionData) => (
    <>
      <TableAction
        icon={<FiEdit />}
        action={() => push(`/banks/exams/${actionData.id}`)}
      />
      <TableAction icon={<FiTrash2 />} action={() => openModal(actionData)} />
    </>
  );

  const modalActions = [
    {
      label: "Cancel",
      onClick: closeModal,
      primary: false,
    },
    {
      label: "Delete",
      onClick: () => {
        if (selectedData) {
          mutate({ token, dataId: selectedData.id });

          closeModal();
        }
      },
      primary: true,
    },
  ];

  const formattedData = data?.data?.data.map((item) => ({
    ...item,
    filePath: getLastPathUrl(item.filePath),
  }));

  return (
    <React.Fragment>
      <Breadcrumb pageName={"Bank Soal"} />
      <Modal
        isOpen={isModalOpen}
        onClose={closeModal}
        title={"Delete data"}
        content={"Are you sure want to delete this data?"}
        actions={modalActions}
      />
      <div className="flex flex-col gap-10">
        <div className="rounded-sm border border-stroke bg-white px-5 pb-2.5 pt-6 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
          <div className="flex justify-end mb-6">
            <Link href={"/banks/exams/create"}>
              <Button text={"Create Soal"} />
            </Link>
          </div>
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
