"use client";
import Alert from "@/components/Alert";
import Breadcrumb from "@/components/Breadcrumb";
import Button from "@/components/Button";
import Modal from "@/components/Modal";
import Table from "@/components/Table";
import TableAction from "@/components/Table/TableAction";
import { useDeleteChapter, useGetChapters } from "@/hooks/useChapter";
import { useGetToken } from "@/hooks/useToken";
import limitString from "@/utils/limitString";
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

  const { data, isLoading, isRefetching, refetch } = useGetChapters({ token });

  const fields = ["icon", "name", "shortDescription"];

  const headers = [
    {
      Header: "Icon",
      accessor: "icon",
    },
    {
      Header: "Judul Bab",
      accessor: "name",
    },
    {
      Header: "Deskripsi Singkat",
      accessor: "shortDescription",
    },
  ];

  const actions = (actionData) => (
    <>
      <TableAction
        icon={<FiEdit />}
        action={() => push(`/chapters/${actionData.id}`)}
      />
      <TableAction icon={<FiTrash2 />} action={() => openModal(actionData)} />
    </>
  );

  const { mutate } = useDeleteChapter({
    chapterId: selectedData?.id,
    token,
    onSuccess: () => {
      toast({
        isClosable: true,
        title: "Berhasil menghapus data",
        status: "success",
        position: "top-right",
      });

      refetch();
    },
    onError: (error) => {
      const result = error.response.data;

      toast({
        isClosable: true,
        title: result.message,
        status: "error",
        position: "top-right",
      });
    },
  });

  const modalActions = [
    {
      label: "Batal",
      onClick: closeModal,
      primary: false,
    },
    {
      label: "Hapus",
      onClick: () => {
        if (selectedData) {
          mutate();

          closeModal();
        }
      },
      primary: true,
    },
  ];

  const formattedData = data?.data?.data.map((item) => ({
    ...item,
    shortDescription: limitString(item.shortDescription),
  }));

  return (
    <React.Fragment>
      <Breadcrumb pageName={"Data Bab"} />
      <Modal
        isOpen={isModalOpen}
        onClose={closeModal}
        title={"Hapus data"}
        content={"Apakah kamu yakin ingin manghapus data?"}
        actions={modalActions}
      />
      <div className="flex flex-col gap-10">
        <div className="rounded-sm border border-stroke bg-white px-5 pb-2.5 pt-6 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
          <Table
            headers={headers}
            data={formattedData}
            action={actions}
            fields={fields}
            isLoading={isLoading}
            isRefetching={isRefetching}
            button={
              <div className="flex justify-end mb-6">
                <Link href={"/chapters/create"}>
                  <Button text={"Tambah Bab"} />
                </Link>
              </div>
            }
          />
        </div>
      </div>
    </React.Fragment>
  );
}
