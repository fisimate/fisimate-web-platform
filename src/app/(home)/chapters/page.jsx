"use client";
import Alert from "@/components/Alert";
import Breadcrumb from "@/components/Breadcrumb";
import Button from "@/components/Button";
import Modal from "@/components/Modal";
import Table from "@/components/Table";
import TableAction from "@/components/Table/TableAction";
import { useGetChapters } from "@/hooks/useChapter";
import { useGetToken } from "@/hooks/useToken";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { FiEdit, FiTrash2 } from "react-icons/fi";

export default function ExamBank() {
  const [isModalOpen, setModalOpen] = useState(false);
  const [selectedData, setSelectedData] = useState(null);
  const [showAlert, setShowAlert] = useState({
    isShow: false,
    title: "",
    message: "",
    type: "error",
  });

  const data = [
    {
      id: "62987cb2-3067-4598-98c4-f518d186beb0",
      name: "Keseimbangan Benda",
      slug: "keseimbangan-benda",
    },
    {
      id: "0ad20750-f303-46c1-93c2-f5264fb954e3",
      name: "Keseimbangan Benda",
      slug: "keseimbangan-benda",
    },
  ];

  const { push } = useRouter();

  const openModal = (modalData) => {
    setSelectedData(modalData);
    setModalOpen(true);
  };

  const closeModal = () => setModalOpen(false);

  // const token = useGetToken();

  // const { data, isLoading } = useGetChapters({ token });

  const fields = ["name", "slug"];

  const headers = [
    {
      title: "Name",
    },
    {
      title: "Slug",
    },
  ];

  const actions = (actionData) => (
    <>
      <TableAction icon={<FiEdit />} action={() => push("/")} />
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
          // mutate({ token, userId: selectedUser.id });

          closeModal();
        }
      },
      primary: true,
    },
  ];

  return (
    <React.Fragment>
      <Breadcrumb pageName={"Data Bab"} />
      <Modal
        isOpen={isModalOpen}
        onClose={closeModal}
        title={"Delete data"}
        content={"Are you sure want to delete this data?"}
        actions={modalActions}
      />
      <div className="flex flex-col gap-10">
        {showAlert.isShow && (
          <Alert
            type={"error"}
            message={showAlert.message}
            title={showAlert.title}
          />
        )}
        <div className="rounded-sm border border-stroke bg-white px-5 pb-2.5 pt-6 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
          <div className="flex justify-end mb-6">
            <Link href={"/chapters/create"}>
              <Button text={"Create Bab"} />
            </Link>
          </div>
          <Table
            headers={headers}
            // data={data?.data?.data}
            data={data}
            action={actions}
            fields={fields}
            // isLoading={isLoading}
            // isRefetching={isRefetching}
          />
        </div>
      </div>
    </React.Fragment>
  );
}
