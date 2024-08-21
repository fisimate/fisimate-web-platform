"use client";
import Breadcrumb from "@/components/Breadcrumb";
import Button from "@/components/Button";
import ErrorPage from "@/components/ErrorPage";
import FileInput from "@/components/Input/FileInput";
import InputGroup from "@/components/InputGroup";
import SelectGroup from "@/components/SelectGroup";
import Spinner from "@/components/Spinner";
import { useGetOneBank, useUpdateBank } from "@/hooks/useBank";
import { useGetChapters } from "@/hooks/useChapter";
import { useFormData } from "@/hooks/useFormData";
import { useGetToken } from "@/hooks/useToken";
import { useToast } from "@chakra-ui/react";
import { useFormik } from "formik";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

export default function EditMaterials({ params }) {
  const { id } = params;
  const { push } = useRouter();
  const toast = useToast();

  const token = useGetToken();

  const {
    data,
    isLoading: isLoadingData,
    isLoadingError,
  } = useGetOneBank({
    token,
    dataId: id,
    model: "material",
  });

  const { data: dataChapters } = useGetChapters({
    token,
  });

  const formik = useFormik({
    initialValues: {
      title: "",
      icon: null,
      filePath: null,
      chapterId: "",
    },
    onSubmit: (values) => {
      const formData = useFormData(values);

      mutate({ body: formData, dataId: id });
    },
  });

  useEffect(() => {
    if (data) {
      formik.setValues({
        title: data?.data?.data?.title,
        icon: null,
        filePath: null,
        chapterId: data?.data?.data?.chapterId,
      });
    }
  }, [data]);

  const { mutate, isPending } = useUpdateBank({
    token,
    model: "material",
    onSuccess: () => {
      toast({
        title: "Data berhasil diperbarui!",
        status: "success",
        isClosable: true,
        position: "top-right",
      });

      push("/banks/materials");
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

  const handleChange = (e) => {
    formik.setFieldValue(e.target.name, e.target.value);
  };

  if (isLoadingError) {
    return <ErrorPage />;
  }

  return (
    <React.Fragment>
      <Breadcrumb pageName={"Ubah Bank Materi"} />

      <div className="flex flex-col gap-9">
        <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
          <div className="border-b border-stroke px-6.5 py-4 dark:border-strokedark">
            <h3 className="font-medium text-black dark:text-white">
              Ubah Bank Materi
            </h3>
          </div>
          {isLoadingData ? (
            <div className="flex justify-center items-center px-4 py-5">
              <Spinner />
            </div>
          ) : (
            <form onSubmit={formik.handleSubmit}>
              <div className="p-6.5">
                <InputGroup
                  label={"Judul"}
                  type="text"
                  name="title"
                  value={formik.values.title}
                  onChange={handleChange}
                  placeholder="Masukkan judul bank materi"
                />

                <FileInput
                  label={"Icon"}
                  type="file"
                  name="icon"
                  onChange={(e) =>
                    formik.setFieldValue(e.target.name, e.target.files[0])
                  }
                  placeholder="Pilih icon"
                />

                <FileInput
                  label={"File Bank Materi"}
                  type="file"
                  name="filePath"
                  onChange={(e) =>
                    formik.setFieldValue(e.target.name, e.target.files[0])
                  }
                  placeholder="Pilih file bank materi"
                />

                <SelectGroup
                  label={"Bab"}
                  name="chapterId"
                  value={formik.values.chapterId}
                  onChange={handleChange}
                  options={dataChapters?.data?.data}
                  defaultOption="Pilih bab"
                />

                <div className="flex gap-4 justify-end">
                  <Link href={"/banks/materials"}>
                    <Button
                      text={"Batal"}
                      variant="outline"
                      disabled={isPending}
                    />
                  </Link>
                  <Button text={"Ubah"} type="submit" isLoading={isPending} />
                </div>
              </div>
            </form>
          )}
        </div>
      </div>
    </React.Fragment>
  );
}
