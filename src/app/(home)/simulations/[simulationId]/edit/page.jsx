"use client";
import Breadcrumb from "@/components/Breadcrumb";
import Button from "@/components/Button";
import ErrorPage from "@/components/ErrorPage";
import FileInput from "@/components/Input/FileInput";
import InputGroup from "@/components/InputGroup";
import SelectGroup from "@/components/SelectGroup";
import Spinner from "@/components/Spinner";
import { useGetChapters } from "@/hooks/useChapter";
import { useFormData } from "@/hooks/useFormData";
import {
  useGetOneSimulation,
  useUpdateSimulation,
} from "@/hooks/useSimulation";
import { useGetToken } from "@/hooks/useToken";
import { useToast } from "@chakra-ui/react";
import { useFormik } from "formik";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

export default function EditSimulation({ params }) {
  const { simulationId } = params;
  const { push } = useRouter();
  const toast = useToast();

  const token = useGetToken();

  const { data, isLoading, isLoadingError } = useGetOneSimulation({
    token,
    simulationId,
  });

  const { data: dataChapters } = useGetChapters({
    token,
  });

  const { mutate, isPending } = useUpdateSimulation({
    token,
    onSuccess: () => {
      toast({
        title: "Data berhasil diperbarui!",
        status: "success",
        position: "top-right",
        isClosable: true,
      });

      push("/simulations");
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

  useEffect(() => {
    if (data) {
      formik.setValues({
        title: data?.data?.data?.title,
        icon: null,
        chapterId: data?.data?.data?.chapterId,
      });
    }
  }, [data]);

  const formik = useFormik({
    initialValues: {
      title: "",
      icon: null,
      chapterId: "",
    },
    onSubmit: (values) => {
      const formdData = useFormData(values);

      mutate({ body: formdData, dataId: simulationId });
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
      <Breadcrumb pageName={"Ubah Simulasi"} />

      <div className="flex flex-col gap-9">
        <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
          <div className="border-b border-stroke px-6.5 py-4 dark:border-strokedark">
            <h3 className="font-medium text-black dark:text-white">
              Ubah Simulasi
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
                  label={"Judul"}
                  type="text"
                  name="title"
                  value={formik.values.title}
                  onChange={handleChange}
                  placeholder="Masukkan judul simulasi"
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

                <SelectGroup
                  label={"Bab"}
                  name="chapterId"
                  value={formik.values.chapterId}
                  onChange={handleChange}
                  options={dataChapters?.data?.data}
                  defaultOption="Pilih bab"
                />

                <div className="flex gap-4 justify-end">
                  <Link href={"/simulations"}>
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
