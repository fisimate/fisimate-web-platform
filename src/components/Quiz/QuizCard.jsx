import React, { useState } from "react";
import Modal from "../Modal";
import DropdownDefault from "../Dropdown/DropdownDefault";

export default function QuizCard({
  question,
  mutateDeleteQuiz,
  setPopupOpen,
  formik,
  setIsPopupForUpdate,
  setFiles,
}) {
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
              <ul className="max-w-md space-y-1 text-gray-500 list-inside dark:text-gray-400">
                {question?.quizOptions.map((item, i) => (
                  <li
                    className="flex items-center text-black dark:text-white"
                    key={i}
                  >
                    {item.isCorrect ? (
                      <svg
                        className="w-3.5 h-3.5 me-2 text-green-500 dark:text-green-400 flex-shrink-0"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z" />
                      </svg>
                    ) : (
                      <svg
                        className="w-3.5 h-3.5 me-2 text-gray-500 dark:text-gray-400 flex-shrink-0"
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
              actionEdit={() => {
                setPopupOpen(true);
                // setDeleteImage(false);
                question.imageUrl
                  ? setFiles({
                      name: getLastPathUrl(question.imageUrl),
                    })
                  : setFiles(null);
                formik.setFieldValue("id", question.id);
                formik.setFieldValue("text", question.text);
                question?.quizOptions.forEach((option, index) => {
                  formik.setFieldValue(`options[${index}].id`, option.id);
                  formik.setFieldValue(`options[${index}].text`, option.text);
                  formik.setFieldValue(
                    `options[${index}].isCorrect`,
                    option.isCorrect
                  );
                });
                setIsPopupForUpdate(true);
              }}
            />
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}
