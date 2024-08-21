"use client";
import Breadcrumb from "@/components/Breadcrumb";
import Button from "@/components/Button";
import FileInput from "@/components/Input/FileInput";
import { useFormData } from "@/hooks/useFormData";
import { useCreateQuizReview } from "@/hooks/useQuizReview";
import { useGetToken } from "@/hooks/useToken";
import { useToast } from "@chakra-ui/react";
import { useFormik } from "formik";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";

export default function EditQuizReview({ params }) {
  const { simulationId, reviewId } = params;
  const { push } = useRouter();
  const toast = useToast();

  const token = useGetToken();

  const formik = useFormik({
    initialValues: {
      filePath: null,
    },
    onSubmit: (values) => {
      const formData = useFormData(values);

      mutate({ body: formData, dataId: reviewId });
    },
  });

  const { mutate, isPending } = useCreateQuizReview({
    simulationId,
    token,
    onSuccess: () => {
      toast({
        title: "Berhasil update data!",
        status: "success",
        isClosable: true,
        position: "top-right",
      });

      push(`/simulations/${simulationId}`);
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

  return (
    <React.Fragment>
      <Breadcrumb pageName={"Ubah Pembahasan Simulasi"} />
      <div className="flex flex-col gap-9">
        <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
          <div className="border-b border-stroke px-6.5 py-4 dark:border-strokedark">
            <h3 className="font-medium text-black dark:text-white">
              Ubah Pembahasan Simulasi
            </h3>
          </div>
          <form onSubmit={formik.handleSubmit}>
            <div className="p-6.5">
              <FileInput
                label={"File Pembahasan"}
                type="file"
                name="filePath"
                onChange={(e) =>
                  formik.setFieldValue(e.target.name, e.target.files[0])
                }
                placeholder="Pilih file pembahasan"
              />

              <div className="flex gap-4 justify-end">
                <Link href={`/simulations/${simulationId}`}>
                  <Button
                    text={"Batal"}
                    variant="outline"
                    disabled={isPending}
                  />
                </Link>
                <Button text={"Tambah"} type="submit" isLoading={isPending} />
              </div>
            </div>
          </form>
        </div>
      </div>
    </React.Fragment>
  );
}
