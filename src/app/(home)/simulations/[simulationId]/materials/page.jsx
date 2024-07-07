"use client";
import ErrorPage from "@/components/ErrorPage";
import TableAction from "@/components/Table/TableAction";
import { useGetMaterials } from "@/hooks/useMaterial";
import { useGetToken } from "@/hooks/useToken";
import { Spinner, useToast } from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FiEdit, FiTrash2 } from "react-icons/fi";

export default function Material({ params }) {
  const { simulationId } = params;

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

  const { data, isLoading, isLoadingError } = useGetMaterials({
    simulationId,
    token,
  });

  if (isLoadingError) {
    return <ErrorPage />;
  }

  const fields = [];

  const headers = [{}];

  const actions = (actionData) => (
    <>
      <TableAction
        icon={<FiEdit />}
        action={() => push(`/banks/formulas/${actionData.id}`)}
      />
      <TableAction icon={<FiTrash2 />} action={() => openModal(actionData)} />
    </>
  );

  return (
    <div className="">
      {isLoading && <Spinner />}
      {JSON.stringify(data?.data)}
    </div>
  );
}
