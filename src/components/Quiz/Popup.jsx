import SelectGroup from "../SelectGroup";
import Spinner from "../Spinner";

export default function PopUp({
  popupOpen,
  setPopupOpen,
  formik,
  files,
  setFiles,
  isPending,
  optionsData,
  setDeleteImage,
  refetchGenerate,
  isRefetchingGenerate,
  isPendingGenerate,
}) {
  const handleGenerate = async () => {
    const quizData = await refetchGenerate();

    if (quizData?.data?.data?.data?.quizOptions) {
      const newOptions = quizData.data.data.data.quizOptions.map(
        (res, index) => {
          const existingOption = formik.values.options[index];
          return {
            id: existingOption?.id || null, // Keep the existing id or leave undefined if not present
            text: res.text,
            isCorrect: res.isCorrect,
          };
        }
      );

      formik.setValues((prevValues) => ({
        ...prevValues, // Keep all previous values
        text: quizData.data.data.data.text, // Update the text
        options: newOptions, // Update the options
      }));
    }
  };

  const clearForm = () => {
    formik.resetForm();
  };

  return (
    <div
      className={`fixed left-0 top-0 z-99999 flex h-screen w-full justify-center overflow-y-scroll bg-black/80 px-4 py-5 ${
        popupOpen === true ? "block" : "hidden"
      }`}
    >
      <div className="relative m-auto w-full max-w-180 rounded-sm border border-stroke bg-gray p-4 shadow-default dark:border-strokedark dark:bg-meta-4 sm:p-8 xl:p-10">
        <button
          onClick={() => setPopupOpen(false)}
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
        {isRefetchingGenerate || isPendingGenerate ? (
          <div className="w-full flex justify-center items-center">
            <Spinner />
          </div>
        ) : (
          <form onSubmit={formik.handleSubmit}>
            <div className="mb-5">
              <label
                htmlFor="text"
                className="mb-2.5 block font-medium text-black dark:text-white"
              >
                Pertanyaan
              </label>
              <textarea
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
                  Jawaban {index + 1}
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
                    value={formik.values.options[index].isCorrect} // Should be a boolean
                    onChange={(e) => {
                      formik.setFieldValue(
                        `options.${index}.isCorrect`,
                        e.target.value === "true"
                      );
                    }}
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
                {files != null ? (
                  <div className="mt-4.5 border border-stroke bg-white px-4 py-3 dark:border-strokedark dark:bg-boxdark">
                    <div className="flex items-center justify-between">
                      <span>{files.name}</span>

                      <button
                        onClick={() => {
                          setFiles(null);
                          setDeleteImage(true);
                        }}
                      >
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
                    className="relative block w-full appearance-none rounded-sm border border-dashed border-stroke bg-white px-4 py-4 dark:border-strokedark dark:bg-boxdark sm:py-8"
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
            <div className="flex flex-row gap-2">
              <button
                type="button"
                onClick={handleGenerate}
                disabled={isPending}
                className="flex w-full items-center border justify-center gap-2 rounded border-primary px-4.5 py-2.5 font-medium text-primary bg-transparent hover:bg-opacity-90"
              >
                {isPending ? (
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
                  "Generate"
                )}
              </button>
              <button
                type="button"
                onClick={clearForm}
                disabled={isPending}
                className="flex w-full items-center border justify-center gap-2 rounded border-primary px-4.5 py-2.5 font-medium text-primary bg-transparent hover:bg-opacity-90"
              >
                {isPending ? (
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
                  "Clear Form"
                )}
              </button>
            </div>
            <button
              type="submit"
              disabled={isPending}
              className="mt-4 flex w-full items-center justify-center gap-2 rounded bg-primary px-4.5 py-2.5 font-medium text-white hover:bg-opacity-90"
            >
              {isPending ? (
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
                "Save"
              )}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
