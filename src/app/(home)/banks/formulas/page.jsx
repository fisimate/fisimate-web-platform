"use client";
import Breadcrumb from "@/components/Breadcrumb";
import Button from "@/components/Button";
import Modal from "@/components/Modal";
import Table from "@/components/Table";
import TableAction from "@/components/Table/TableAction";
import { useDeleteBank, useGetBanks } from "@/hooks/useBank";
import { useGetToken } from "@/hooks/useToken";
import { useToast } from "@chakra-ui/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { FiEdit, FiTrash2 } from "react-icons/fi";

export default function FormulaBank() {
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
    model: "formula",
  });

  const { mutate } = useDeleteBank({
    token,
    model: "formula",
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
      Header: "Judul",
      accessor: "title",
    },
    {
      Header: "File Rumus",
      accessor: "fileRumus",
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
        action={() => push(`/banks/formulas/${actionData.id}`)}
      />
      <TableAction icon={<FiTrash2 />} action={() => openModal(actionData)} />
    </>
  );

  const modalActions = [
    {
      label: "Batal",
      onClick: closeModal,
      primary: false,
    },
    {
      label: "Hpus",
      onClick: () => {
        if (selectedData) {
          mutate({ token, dataId: selectedData.id });

          closeModal();
        }
      },
      primary: true,
    },
  ];

  return (
    <React.Fragment>
      <Breadcrumb pageName={"Bank Rumus"} />
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
            data={data?.data?.data}
            action={actions}
            fields={fields}
            isLoading={isLoading}
            isRefetching={isRefetching}
            button={
              <div className="flex justify-end mb-6">
                <Link href={"/banks/formulas/create"}>
                  <Button text={"Tambah Rumus"} />
                </Link>
              </div>
            }
          />
        </div>
      </div>
    </React.Fragment>
  );
}
