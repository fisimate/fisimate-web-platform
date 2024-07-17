"use client";
import Breadcrumb from "@/components/Breadcrumb";
import DropdownDefault from "@/components/Dropdown/DropdownDefault";
import Modal from "@/components/Modal";
import SelectGroup from "@/components/SelectGroup";
import Spinner from "@/components/Spinner";
import Table from "@/components/Table";
import TableAction from "@/components/Table/TableAction";
import { useGetMaterials } from "@/hooks/useMaterial";
import { useCreateQuiz, useDeleteQuiz, useGetQuizzes } from "@/hooks/useQuiz";
import { useGetToken } from "@/hooks/useToken";
import getLastPathUrl from "@/utils/getLastPathUrl";
import { useToast } from "@chakra-ui/react";
import { useFormik } from "formik";
import { useRouter } from "next/navigation";
import React, { useEffect, useRef, useState } from "react";
import { FiEdit } from "react-icons/fi";

export default function SimulationDetail({ params }) {
  const [formattedData, setFormattedData] = useState([]);
  const { simulationId } = params;
  const token = useGetToken();
  const toast = useToast();
  const { push } = useRouter();

  const {
    data: dataMaterials,
    isLoading: isLoadingMaterials,
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
  });

  useEffect(() => {
    const keyHandler = ({ keyCode }) => {
      if (!popupOpen || keyCode !== 27) return;
      setPopupOpen(false);
    };
    document.addEventListener("keydown", keyHandler);
    return () => document.removeEventListener("keydown", keyHandler);
  });

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

  const fields = ["filePath"];
  const headers = [
    {
      title: "File Materi",
    },
  ];

  const tableActions = (actionData) => (
    <>
      <TableAction
        icon={<FiEdit />}
        action={() =>
          push(`/simulations/${simulationId}/materials/${actionData.id}`)
        }
      />
    </>
  );

  useEffect(() => {
    if (dataMaterials) {
      setFormattedData([
        {
          ...dataMaterials?.data?.data,
          filePath: getLastPathUrl(dataMaterials?.data?.data?.filePath),
        },
      ]);
    }
  }, [dataMaterials]);

  return (
    <React.Fragment>
      <Breadcrumb pageName={"Detail Simulasi"} />
      <div className="flex flex-col gap-y-4 rounded-sm border border-stroke bg-white p-3 shadow-default dark:border-strokedark dark:bg-boxdark sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h3 className="pl-2 text-title-lg font-semibold text-black dark:text-white">
            Materi
          </h3>
        </div>
      </div>
      <div className="flex flex-col gap-y-4 rounded-sm border border-stroke bg-white p-3 shadow-default dark:border-strokedark dark:bg-boxdark">
        <Table
          headers={headers}
          data={formattedData}
          fields={fields}
          action={tableActions}
          isLoading={isLoadingMaterials}
          isRefetching={isRefetchingMaterials}
        />
      </div>
      <div className="mt-5 flex flex-col gap-y-4 rounded-sm border border-stroke bg-white p-3 shadow-default dark:border-strokedark dark:bg-boxdark sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h3 className="pl-2 text-title-lg font-semibold text-black dark:text-white">
            List Pertanyaan
          </h3>
        </div>

        <button
          ref={trigger}
          onClick={() => setPopupOpen(!popupOpen)}
          className="flex items-center gap-2 rounded bg-primary px-4.5 py-2 font-medium text-white hover:bg-opacity-80"
        >
          <svg
            className="fill-current"
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M15 7H9V1C9 0.4 8.6 0 8 0C7.4 0 7 0.4 7 1V7H1C0.4 7 0 7.4 0 8C0 8.6 0.4 9 1 9H7V15C7 15.6 7.4 16 8 16C8.6 16 9 15.6 9 15V9H15C15.6 9 16 8.6 16 8C16 7.4 15.6 7 15 7Z"
              fill=""
            />
          </svg>
          Tambah
        </button>

        {/* <!-- ===== Popup Start ===== --> */}
        <PopUp
          popupOpen={popupOpen}
          setPopupOpen={setPopupOpen}
          mutate={mutate}
          isPending={isPending}
          refetch={refetchQuiz}
        />
        {/* <!-- ===== Popup End ===== --> */}
      </div>

      {isLoadingQuiz || isRefetchingQuiz ? (
        <div className="flex justify-center w-full py-5 bg-white border border-stroke dark:border-strokedark dark:bg-boxdark">
          <Spinner />
        </div>
      ) : (
        dataQuiz?.data?.data?.question.map((item) => (
          <React.Fragment>
            <QuizCard
              question={item}
              mutateDeleteQuiz={mutateDeleteQuiz}
              setPopupOpen={setPopupOpen}
              popupOpen={popupOpen}
            />
          </React.Fragment>
        ))
      )}
    </React.Fragment>
  );
}

export function PopUp(props) {
  const [files, setFiles] = useState(null);

  const optionsData = [
    {
      id: true,
      name: "Benar",
    },
    {
      id: false,
      name: "Salah",
    },
  ];

  const formik = useFormik({
    initialValues: {
      text: "",
      options: [
        {
          text: "",
          isCorrect: false,
        },
        {
          text: "",
          isCorrect: false,
        },
        {
          text: "",
          isCorrect: false,
        },
        {
          text: "",
          isCorrect: false,
        },
      ],
    },
    onSubmit: (values) => {
      const formData = new FormData();

      formData.append("text", values.text);
      formData.append(
        "options",
        JSON.stringify(
          values.options.map((option) => ({
            text: option.text,
            isCorrect: option.isCorrect === "true",
          }))
        )
      );
      if (files) {
        formData.append("image", files);
      }

      props.mutate({ body: formData });

      if (!props.isPending) {
        props.setPopupOpen(false);
      }

      formik.resetForm();
    },
  });

  return (
    <div
      className={`fixed left-0 top-0 z-99999 flex h-screen w-full justify-center overflow-y-scroll bg-black/80 px-4 py-5 ${
        props.popupOpen === true ? "block" : "hidden"
      }`}
    >
      <div className="relative m-auto w-full max-w-180 rounded-sm border border-stroke bg-gray p-4 shadow-default dark:border-strokedark dark:bg-meta-4 sm:p-8 xl:p-10">
        <button
          onClick={() => props.setPopupOpen(false)}
          className="absolute right-1 top-1 sm:right-5 sm:top-5"
        >
          <svg
            className="fill-current"
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M11.8913 9.99599L19.5043 2.38635C20.032 1.85888 20.032 1.02306 19.5043 0.495589C18.9768 -0.0317329 18.141 -0.0317329 17.6135 0.495589L10.0001 8.10559L2.38673 0.495589C1.85917 -0.0317329 1.02343 -0.0317329 0.495873 0.495589C-0.0318274 1.02306 -0.0318274 1.85888 0.495873 2.38635L8.10887 9.99599L0.495873 17.6056C-0.0318274 18.1331 -0.0318274 18.9689 0.495873 19.4964C0.717307 19.7177 1.05898 19.9001 1.4413 19.9001C1.75372 19.9001 2.13282 19.7971 2.40606 19.4771L10.0001 11.8864L17.6135 19.4964C17.8349 19.7177 18.1766 19.9001 18.5589 19.9001C18.8724 19.9001 19.2531 19.7964 19.5265 19.4737C20.0319 18.9452 20.0245 18.1256 19.5043 17.6056L11.8913 9.99599Z"
              fill=""
            />
          </svg>
        </button>

        <form onSubmit={formik.handleSubmit}>
          <div className="mb-5">
            <label
              htmlFor="text"
              className="mb-2.5 block font-medium text-black dark:text-white"
            >
              Pertanyaan
            </label>
            <input
              type="text"
              name="text"
              id="text"
              value={formik.values.text}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              placeholder="Masukkan pertanyaan"
              className="w-full rounded-sm border border-stroke bg-white px-4.5 py-3 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-boxdark dark:text-white dark:focus:border-primary"
            />
          </div>

          {formik.values.options.map((option, index) => (
            <div className="mb-5" key={index}>
              <label
                htmlFor={`options.${index}.text`}
                className="mb-2.5 block font-medium text-black dark:text-white"
              >
                Opsi Jawaban {index + 1}
              </label>
              <div className="flex items-center gap-2.5">
                <input
                  type="text"
                  name={`options.${index}.text`}
                  id={`options.${index}.text`}
                  placeholder={`Opsi Jawaban ${index + 1}`}
                  className="flex-1 rounded-sm border border-stroke bg-white px-4.5 py-3 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-boxdark dark:text-white dark:focus:border-primary"
                  value={option.text}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                <SelectGroup
                  withlabel={false}
                  name={`options.${index}.isCorrect`}
                  options={optionsData}
                  defaultOption={"Jawaban benar atau salah?"}
                  value={option.isCorrect}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
              </div>
            </div>
          ))}

          <div className="my-5">
            <label
              htmlFor="image"
              className="mb-2.5 block font-medium text-black dark:text-white"
            >
              Gambar Pertanyaan
            </label>
            <div>
              {files !== null ? (
                <div className="mt-4.5 border border-stroke bg-white px-4 py-3 dark:border-strokedark dark:bg-boxdark">
                  <div className="flex items-center justify-between">
                    <span>{files.name}</span>

                    <button onClick={() => setFiles(null)}>
                      <svg
                        className="fill-current"
                        width="10"
                        height="10"
                        viewBox="0 0 10 10"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M0.279337 0.279338C0.651787 -0.0931121 1.25565 -0.0931121 1.6281 0.279338L9.72066 8.3719C10.0931 8.74435 10.0931 9.34821 9.72066 9.72066C9.34821 10.0931 8.74435 10.0931 8.3719 9.72066L0.279337 1.6281C-0.0931125 1.25565 -0.0931125 0.651788 0.279337 0.279338Z"
                          fill=""
                        />
                        <path
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M0.279337 9.72066C-0.0931125 9.34821 -0.0931125 8.74435 0.279337 8.3719L8.3719 0.279338C8.74435 -0.0931127 9.34821 -0.0931123 9.72066 0.279338C10.0931 0.651787 10.0931 1.25565 9.72066 1.6281L1.6281 9.72066C1.25565 10.0931 0.651787 10.0931 0.279337 9.72066Z"
                          fill=""
                        />
                      </svg>
                    </button>
                  </div>
                </div>
              ) : (
                <div
                  id="FileUpload"
                  className="relative block w-full appearance-none rounded-sm border border-dashed border-stroke bg-white px-4 py-4 dark:border-strokedark dark:bg-boxdark sm:py-14"
                >
                  <input
                    type="file"
                    accept="image/*"
                    className="absolute inset-0 z-50 m-0 h-full w-full p-0 opacity-0 outline-none"
                    onChange={(event) => setFiles(event.target.files[0])}
                  />
                  <div className="flex flex-col items-center justify-center space-y-3">
                    <span className="flex h-11.5 w-11.5 items-center justify-center rounded-full border border-stroke bg-primary/5 dark:border-strokedark">
                      <svg
                        width="20"
                        height="20"
                        viewBox="0 0 20 20"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <g clipPath="url(#clip0_75_12841)">
                          <path
                            d="M2.5 15.8333H17.5V17.5H2.5V15.8333ZM10.8333 4.85663V14.1666H9.16667V4.85663L4.1075 9.91663L2.92917 8.73829L10 1.66663L17.0708 8.73746L15.8925 9.91579L10.8333 4.85829V4.85663Z"
                            fill="#3C50E0"
                          />
                        </g>
                        <defs>
                          <clipPath id="clip0_75_12841">
                            <rect width="20" height="20" fill="white" />
                          </clipPath>
                        </defs>
                      </svg>
                    </span>
                    <p className="text-xs">
                      <span className="text-primary">Click to upload</span> or
                      drag and drop
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
          <button
            type="submit"
            disabled={props.isPending}
            className="flex w-full items-center justify-center gap-2 rounded bg-primary px-4.5 py-2.5 font-medium text-white hover:bg-opacity-90"
          >
            {props.isPending ? (
              <>
                <span className="animate-spin">
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <mask id="path-1-inside-1_1881_16183" fill="white">
                      <path d="M15.328 23.5293C17.8047 22.8144 19.9853 21.321 21.547 19.2701C23.1087 17.2193 23.9686 14.72 23.9992 12.1424C24.0297 9.56481 23.2295 7.04587 21.7169 4.95853C20.2043 2.8712 18.0597 1.32643 15.6007 0.552947C13.1417 -0.220538 10.499 -0.181621 8.0638 0.663935C5.62864 1.50949 3.53049 3.11674 2.07999 5.24771C0.629495 7.37868 -0.096238 9.92009 0.0102418 12.4957C0.116722 15.0713 1.04975 17.5441 2.6712 19.5481L4.96712 17.6904C3.74474 16.1796 3.04133 14.3154 2.96106 12.3737C2.88079 10.432 3.42791 8.51604 4.52142 6.90953C5.61493 5.30301 7.19671 4.09133 9.03255 3.45387C10.8684 2.81642 12.8607 2.78708 14.7145 3.3702C16.5683 3.95332 18.1851 5.1179 19.3254 6.69152C20.4658 8.26514 21.0691 10.1641 21.046 12.1074C21.023 14.0506 20.3748 15.9347 19.1974 17.4809C18.02 19.027 16.3761 20.1528 14.5089 20.6918L15.328 23.5293Z" />
                    </mask>
                    <path
                      d="M15.328 23.5293C17.8047 22.8144 19.9853 21.321 21.547 19.2701C23.1087 17.2193 23.9686 14.72 23.9992 12.1424C24.0297 9.56481 23.2295 7.04587 21.7169 4.95853C20.2043 2.8712 18.0597 1.32643 15.6007 0.552947C13.1417 -0.220538 10.499 -0.181621 8.0638 0.663935C5.62864 1.50949 3.53049 3.11674 2.07999 5.24771C0.629495 7.37868 -0.096238 9.92009 0.0102418 12.4957C0.116722 15.0713 1.04975 17.5441 2.6712 19.5481L4.96712 17.6904C3.74474 16.1796 3.04133 14.3154 2.96106 12.3737C2.88079 10.432 3.42791 8.51604 4.52142 6.90953C5.61493 5.30301 7.19671 4.09133 9.03255 3.45387C10.8684 2.81642 12.8607 2.78708 14.7145 3.3702C16.5683 3.95332 18.1851 5.1179 19.3254 6.69152C20.4658 8.26514 21.0691 10.1641 21.046 12.1074C21.023 14.0506 20.3748 15.9347 19.1974 17.4809C18.02 19.027 16.3761 20.1528 14.5089 20.6918L15.328 23.5293Z"
                      stroke="white"
                      strokeWidth="14"
                      mask="url(#path-1-inside-1_1881_16183)"
                    />
                  </svg>
                </span>
                Loading...
              </>
            ) : (
              "Create"
            )}
          </button>
        </form>
      </div>
    </div>
  );
}

function QuizCard({ question, mutateDeleteQuiz, setPopupOpen, popupOpen }) {
  const [isModalOpen, setModalOpen] = useState(false);
  const [selectedData, setSelectedData] = useState(null);

  const openModal = (modalData) => {
    setSelectedData(modalData);
    setModalOpen(true);
  };

  const closeModal = () => setModalOpen(false);

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
          mutateDeleteQuiz({ dataId: selectedData.id });

          closeModal();
        }
      },
      primary: true,
    },
  ];

  return (
    <React.Fragment>
      <Modal
        isOpen={isModalOpen}
        onClose={closeModal}
        title={"Delete data"}
        content={"Are you sure want to delete this data?"}
        actions={modalActions}
      />
      <div className="flex flex-col gap-5.5">
        <div className="relative flex justify-between rounded-sm border border-stroke bg-white p-7 shadow-default dark:border-strokedark dark:bg-boxdark">
          <div>
            {question.imageUrl && (
              <img
                src={question.imageUrl}
                alt="img-kuis"
                className="h-40 my-5"
              />
            )}
            <h5 className="mb-4 text-lg font-medium text-black dark:text-white">
              {question.text}
            </h5>

            <div className="flex flex-col gap-2">
              <ul class="max-w-md space-y-1 text-gray-500 list-inside dark:text-gray-400">
                {question?.quizOptions.map((item, i) => (
                  <li
                    class="flex items-center text-black dark:text-white"
                    key={i}
                  >
                    {item.isCorrect ? (
                      <svg
                        class="w-3.5 h-3.5 me-2 text-green-500 dark:text-green-400 flex-shrink-0"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z" />
                      </svg>
                    ) : (
                      <svg
                        class="w-3.5 h-3.5 me-2 text-gray-500 dark:text-gray-400 flex-shrink-0"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z" />
                      </svg>
                    )}
                    {item.text}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="absolute right-4 top-4">
            <DropdownDefault
              actionDelete={() => openModal(question)}
              actionEdit={() => setPopupOpen(!popupOpen)}
            />
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}
