"use client";
import Breadcrumb from "@/components/Breadcrumb";
import Button from "@/components/Button";
import InputGroup from "@/components/InputGroup";
import { useCreateChapter } from "@/hooks/useChapter";
import { useFormData } from "@/hooks/useFormData";
import { useGetToken } from "@/hooks/useToken";
import { useToast } from "@chakra-ui/react";
import { useFormik } from "formik";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";

export default function CreateChapter() {
  const { push } = useRouter();
  const toast = useToast();
  const token = useGetToken();

  const { mutate, isPending } = useCreateChapter({
    token,
    onSuccess: () => {
      toast({
        title: "Data berhasil dibuat!",
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
    },
    onSubmit: (values) => {
      const formData = useFormData(values);

      mutate({ body: formData });
    },
  });

  const handleChange = (e) => {
    formik.setFieldValue(e.target.name, e.target.value);
  };

  return (
    <React.Fragment>
      <Breadcrumb pageName={"Create Bab Baru"} />

      <div className="flex flex-col gap-9">
        <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
          <div className="border-b border-stroke px-6.5 py-4 dark:border-strokedark">
            <h3 className="font-medium text-black dark:text-white">
              Create Bab Baru
            </h3>
          </div>
          <form onSubmit={formik.handleSubmit}>
            <div className="p-6.5">
              <InputGroup
                label={"Nama"}
                type="text"
                name="name"
                onChange={handleChange}
                placeholder="Masukkan judul bab baru"
              />

              <div className="flex gap-4 justify-end">
                <Link href={"/chapters"}>
                  <Button
                    text={"Cancel"}
                    variant="outline"
                    disabled={isPending}
                  />
                </Link>
                <Button text={"Create"} type="submit" isLoading={isPending} />
              </div>
            </div>
          </form>
        </div>
      </div>
    </React.Fragment>
  );
}
