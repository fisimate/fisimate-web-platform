"use client";
import Breadcrumb from "@/components/Breadcrumb";
import ErrorPage from "@/components/ErrorPage";
import Modal from "@/components/Modal";
import PopUp from "@/components/Quiz/Popup";
import QuizCard from "@/components/Quiz/QuizCard";
import Spinner from "@/components/Spinner";
import Table from "@/components/Table";
import TableAction from "@/components/Table/TableAction";
import { useDeleteMaterial, useGetMaterials } from "@/hooks/useMaterial";
import {
  useCreateQuiz,
  useDeleteQuiz,
  useGenerateQuestion,
  useGetQuizzes,
  useUpdateQuiz,
} from "@/hooks/useQuiz";
import { useDeleteQuizReview, useGetQuizReview } from "@/hooks/useQuizReview";
import { useGetOneSimulation } from "@/hooks/useSimulation";
import { useGetToken } from "@/hooks/useToken";
import { useToast } from "@chakra-ui/react";
import { useFormik } from "formik";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useRef, useState } from "react";
import { FiEdit, FiTrash2 } from "react-icons/fi";

export default function SimulationDetail({ params }) {
  const [isPopupForUpdate, setIsPopupForUpdate] = useState(false);
  const [deleteImage, setDeleteImage] = useState(false);
  const { simulationId } = params;
  const token = useGetToken();
  const toast = useToast();
  const { push } = useRouter();

  const [isModalOpen, setModalOpen] = useState(false);
  const [selectedData, setSelectedData] = useState(null);

  const [isModalTwoOpen, setModalTwoOpen] = useState(false);
  const [selectedDataTwo, setSelectedDataTwo] = useState(null);

  const openModal = (modalData) => {
    setSelectedData(modalData);
    setModalOpen(true);
  };

  const openModalTwo = (modalData) => {
    setSelectedDataTwo(modalData);
    setModalTwoOpen(true);
  };

  const closeModal = () => setModalOpen(false);
  const closeModalTwo = () => setModalTwoOpen(false);

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
          mutateDeleteQuizReview();

          closeModal();
        }
      },
      primary: true,
    },
  ];

  const modalTwoActions = [
    {
      label: "Batal",
      onClick: closeModalTwo,
      primary: false,
    },
    {
      label: "Hapus",
      onClick: () => {
        if (selectedDataTwo) {
          mutateDeleteMaterial({ dataId: selectedDataTwo.id });

          closeModalTwo();
        }
      },
      primary: true,
    },
  ];

  const { isLoadingError } = useGetOneSimulation({
    token,
    simulationId,
  });

  const {
    data: dataMaterials,
    isLoading: isLoadingMaterials,
    refetch: refetchMaterials,
    isRefetching: isRefetchingMaterials,
  } = useGetMaterials({ simulationId, token });

  const {
    data: dataQuiz,
    isLoading: isLoadingQuiz,
    refetch: refetchQuiz,
    isRefetching: isRefetchingQuiz,
  } = useGetQuizzes({
    simulationId,
    token,
  });

  const [popupOpen, setPopupOpen] = useState(false);
  const trigger = useRef(null);
  const popup = useRef(null);

  useEffect(() => {
    const clickHandler = ({ target }) => {
      if (!popup.current) return;
      if (
        !popupOpen ||
        popup.current.contains(target) ||
        trigger.current.contains(target)
      )
        return;
      setPopupOpen(false);
    };

    document.addEventListener("click", clickHandler);
    return () => document.removeEventListener("click", clickHandler);
  }, [popupOpen]);

  useEffect(() => {
    const keyHandler = ({ keyCode }) => {
      if (!popupOpen || keyCode !== 27) return;
      setPopupOpen(false);
    };
    document.addEventListener("keydown", keyHandler);
    return () => document.removeEventListener("keydown", keyHandler);
  }, [popupOpen]);

  const { mutate, isPending } = useCreateQuiz({
    token,
    simulationId,
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
        title: "Berhasil membuat pertanyaan baru!",
        status: "success",
        isClosable: true,
        position: "top-right",
      });

      refetchQuiz();
    },
  });

  const { mutate: mutateDeleteQuiz } = useDeleteQuiz({
    token,
    simulationId,
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

      refetchQuiz();
    },
  });

  const { mutate: mutateDeleteMaterial } = useDeleteMaterial({
    token,
    simulationId,
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

      refetchMaterials();
    },
  });

  const { mutate: mutateUpdateQuiz, isPending: isPendingUpdateQuiz } =
    useUpdateQuiz({
      token,
      simulationId,
      onSuccess: () => {
        toast({
          title: "Berhasil ubah data!",
          status: "success",
          isClosable: true,
          position: "top-right",
        });

        refetchQuiz();
      },
      onError: (error) => {
        const result = error.response.data;

        toast({
          title: result.message,
          status: "error",
          isClosable: true,
          position: "top-right",
        });
      },
    });

  const {
    data: dataReviews,
    isLoading: isLoadingReview,
    isRefetching: isRefetchingReview,
    refetch: refetchQuizReview,
  } = useGetQuizReview({
    token,
    simulationId,
  });

  const {
    isRefetching: isRefetchingGenerate,
    refetch: refetchGenerate,
    isPending: isPendingGenerate,
    isFetching: isFetchingGenerate,
  } = useGenerateQuestion({
    token,
    simulationId,
  });

  const { mutate: mutateDeleteQuizReview } = useDeleteQuizReview({
    token,
    simulationId,
    onSuccess: () => {
      toast({
        title: "Berhasil ubah data!",
        status: "success",
        isClosable: true,
        position: "top-right",
      });

      refetchQuizReview();
    },
    onError: (error) => {
      const result = error.response.data;

      toast({
        title: result.message,
        status: "error",
        isClosable: true,
        position: "top-right",
      });
    },
  });

  const fields = ["filePath"];
  const headers = [{ Header: "File Materi", accessor: "fileMateri" }];

  const fieldReviews = ["filePath"];
  const headerReviews = [
    { Header: "File Pembahasan", accessor: "filePembahasan" },
  ];

  const materialTableActions = (actionData) => (
    <>
      <TableAction
        icon={<FiEdit />}
        action={() =>
          push(`/simulations/${simulationId}/materials/${actionData.id}`)
        }
      />
      <TableAction
        icon={<FiTrash2 />}
        action={() => openModalTwo(actionData)}
      />
    </>
  );

  const reviewTableActions = (actionData) => (
    <>
      <TableAction
        icon={<FiEdit />}
        action={() =>
          push(`/simulations/${simulationId}/reviews/${actionData.id}`)
        }
      />
      <TableAction icon={<FiTrash2 />} action={() => openModal(actionData)} />
    </>
  );

  const optionsData = [
    { value: true, name: "Benar" },
    { value: false, name: "Salah" },
  ];

  const [files, setFiles] = useState(null);

  const formik = useFormik({
    initialValues: {
      text: "",
      options: [
        { text: "", isCorrect: false },
        { text: "", isCorrect: false },
        { text: "", isCorrect: false },
        { text: "", isCorrect: false },
      ],
    },
    onSubmit: (values) => {
      const formData = new FormData();
      formData.append("text", values.text);

      values.options.forEach((option, index) => {
        formData.append(`options[${index}][id]`, option.id ?? "");
        formData.append(`options[${index}][text]`, option.text);
        formData.append(`options[${index}][isCorrect]`, option.isCorrect);
      });

      if (files != null) {
        if (!files.type) {
          formData.append("deleteImage", false);
        } else if (files.type.startsWith("image/")) {
          formData.append("image", files);
          formData.append("deleteImage", false);
        }
      } else if (deleteImage || files == null) {
        formData.append("deleteImage", true);
      } else {
        formData.append("deleteImage", false);
      }

      // condition for update data
      if (isPopupForUpdate) {
        // set form data with different request
        mutateUpdateQuiz({
          body: formData,
          dataId: values.id,
        });
      } else {
        // execute for create new question
        mutate({ body: formData });
      }
      if (!isPending) setPopupOpen(false);
      formik.resetForm();
    },
  });

  if (isLoadingError) {
    return <ErrorPage />;
  }

  return (
    <React.Fragment>
      <Modal
        isOpen={isModalOpen}
        onClose={closeModal}
        title={"Hapus data"}
        content={"Apakah kamu yakin ingin manghapus data?"}
        actions={modalActions}
      />
      <Modal
        isOpen={isModalTwoOpen}
        onClose={closeModalTwo}
        title={"Hapus data"}
        content={"Apakah kamu yakin ingin manghapus data?"}
        actions={modalTwoActions}
      />
      <Breadcrumb pageName={"Detail Simulasi"} />
      <div className="flex flex-col gap-y-4 rounded-sm border border-stroke bg-white p-3 shadow-default dark:border-strokedark dark:bg-boxdark sm:flex-row sm:items-center sm:justify-between">
        <h3 className="pl-2 text-lg font-semibold text-black dark:text-white">
          Materi
        </h3>
        {isLoadingMaterials || isRefetchingMaterials ? null : !dataMaterials
            ?.data?.data ? (
          <Link href={`/simulations/${simulationId}/materials/create`}>
            <button className="flex items-center gap-2 rounded-md bg-primary px-4.5 py-2 font-medium text-white hover:bg-opacity-80">
              Create
            </button>
          </Link>
        ) : null}
      </div>
      <div className="flex flex-col gap-y-4 rounded-sm border border-stroke bg-white p-3 shadow-default dark:border-strokedark dark:bg-boxdark">
        <Table
          headers={headers}
          data={dataMaterials?.data?.data ? [dataMaterials.data.data] : []}
          fields={fields}
          action={materialTableActions}
          isLoading={isLoadingMaterials}
          withSearch={false}
          withFooter={false}
          isRefetching={isRefetchingMaterials}
        />
      </div>
      <div className="mt-5 flex flex-col gap-y-4 rounded-sm border border-stroke bg-white p-3 shadow-default dark:border-strokedark dark:bg-boxdark sm:flex-row sm:items-center sm:justify-between">
        <h3 className="pl-2 text-lg font-semibold text-black dark:text-white">
          Pembahasan
        </h3>
        {isLoadingMaterials || isRefetchingMaterials ? null : !dataReviews?.data
            ?.data ? (
          <Link href={`/simulations/${simulationId}/reviews/create`}>
            <button className="flex items-center gap-2 rounded-md bg-primary px-4.5 py-2 font-medium text-white hover:bg-opacity-80">
              Tambah
            </button>
          </Link>
        ) : null}
      </div>
      <div className="flex flex-col gap-y-4 rounded-sm border border-stroke bg-white p-3 shadow-default dark:border-strokedark dark:bg-boxdark">
        <Table
          headers={headerReviews}
          data={dataReviews?.data?.data ? [dataReviews.data.data] : []}
          fields={fieldReviews}
          action={reviewTableActions}
          withSearch={false}
          withFooter={false}
          isLoading={isLoadingReview}
          isRefetching={isRefetchingReview}
        />
      </div>
      <div className="mt-5 flex flex-col gap-y-4 rounded-sm border border-stroke bg-white p-3 shadow-default dark:border-strokedark dark:bg-boxdark sm:flex-row sm:items-center sm:justify-between">
        <h3 className="pl-2 text-lg font-semibold text-black dark:text-white">
          List Pertanyaan
        </h3>
        <button
          // ref={trigger}
          onClick={() => {
            setPopupOpen(!popupOpen);
            setIsPopupForUpdate(false);
            setFiles(null);
            formik.resetForm();
            setDeleteImage(false);
          }}
          className="flex items-center gap-2 rounded-md bg-primary px-4.5 py-2 font-medium text-white hover:bg-opacity-80"
        >
          Tambah
        </button>
        <PopUp
          popupOpen={popupOpen}
          setPopupOpen={setPopupOpen}
          formik={formik}
          setFiles={setFiles}
          files={files}
          isPending={isPending}
          optionsData={optionsData}
          setDeleteImage={setDeleteImage}
          refetchGenerate={refetchGenerate}
          isRefetchingGenerate={isRefetchingGenerate}
          isFetchingGenerate={isFetchingGenerate}
        />
      </div>
      {isLoadingQuiz || isRefetchingQuiz ? (
        <div className="flex justify-center w-full py-5 bg-white border border-stroke dark:border-strokedark dark:bg-boxdark">
          <Spinner />
        </div>
      ) : (
        dataQuiz?.data?.data?.question.map((item) => (
          <QuizCard
            key={item.id}
            question={item}
            mutateDeleteQuiz={mutateDeleteQuiz}
            setPopupOpen={setPopupOpen}
            setIsPopupForUpdate={setIsPopupForUpdate}
            popupOpen={popupOpen}
            formik={formik}
            setFiles={setFiles}
          />
        ))
      )}
    </React.Fragment>
  );
}
