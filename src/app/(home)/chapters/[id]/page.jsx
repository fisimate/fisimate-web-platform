"use client";
import Breadcrumb from "@/components/Breadcrumb";
import Button from "@/components/Button";
import ErrorPage from "@/components/ErrorPage";
import FileInput from "@/components/Input/FileInput";
import TextArea from "@/components/Input/TextArea";
import InputGroup from "@/components/InputGroup";
import Spinner from "@/components/Spinner";
import { useGetOneChapter, useUpdateChapter } from "@/hooks/useChapter";
import { useFormData } from "@/hooks/useFormData";
import { useGetToken } from "@/hooks/useToken";
import { useToast } from "@chakra-ui/react";
import { useFormik } from "formik";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

export default function UpdateChapter({ params }) {
  const { id } = params;
  const { push } = useRouter();
  const toast = useToast();
  const token = useGetToken();

  const { data, isLoading, isLoadingError } = useGetOneChapter({
    token,
    chapterId: id,
  });

  const { mutate, isPending } = useUpdateChapter({
    token,
    chapterId: id,
    onSuccess: () => {
      toast({
        title: "Data berhasil diperbarui!",
        status: "success",
        isClosable: true,
        position: "top-right",
      });

      push("/chapters");
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

  const formik = useFormik({
    initialValues: {
      name: "",
      icon: null,
      shortDescription: "",
    },
    onSubmit: (values) => {
      const formData = useFormData(values);

      mutate({ body: formData });
    },
  });

  useEffect(() => {
    if (data) {
      formik.setValues({
        name: data?.data?.data?.name,
        shortDescription: data?.data?.data?.shortDescription,
      });
    }
  }, [data]);

  if (isLoadingError) {
    // render notfound
    return <ErrorPage />;
  }

  const handleChange = (e) => {
    formik.setFieldValue(e.target.name, e.target.value);
  };

  return (
    <React.Fragment>
      <Breadcrumb pageName={"Update Bab"} />

      <div className="flex flex-col gap-9">
        <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
          <div className="border-b border-stroke px-6.5 py-4 dark:border-strokedark">
            <h3 className="font-medium text-black dark:text-white">
              Update Bab
            </h3>
          </div>
          {isLoading ? (
            <div className="flex justify-center items-center px-4 py-5">
              <Spinner />
            </div>
          ) : (
            <form onSubmit={formik.handleSubmit}>
              <div className="p-6.5">
                <InputGroup
                  label={"Nama"}
                  type="text"
                  name="name"
                  value={formik.values.name}
                  onChange={handleChange}
                  placeholder="Masukkan judul bab"
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

                <TextArea
                  label={"Deskripsi Singkat"}
                  type="text"
                  name="shortDescription"
                  value={formik.values.shortDescription}
                  onChange={handleChange}
                  placeholder="Masukkan deskripsi singkat"
                />

                <div className="flex gap-4 justify-end">
                  <Link href={"/chapters"}>
                    <Button
                      text={"Cancel"}
                      variant="outline"
                      disabled={isPending}
                    />
                  </Link>
                  <Button text={"Update"} type="submit" isLoading={isPending} />
                </div>
              </div>
            </form>
          )}
        </div>
      </div>
    </React.Fragment>
  );
}
