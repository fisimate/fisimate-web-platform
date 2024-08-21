"use client";
import Breadcrumb from "@/components/Breadcrumb";
import Button from "@/components/Button";
import FileInput from "@/components/Input/FileInput";
import InputGroup from "@/components/InputGroup";
import SelectGroup from "@/components/SelectGroup";
import Spinner from "@/components/Spinner";
import { useCreateBank } from "@/hooks/useBank";
import { useGetChapters } from "@/hooks/useChapter";
import { useFormData } from "@/hooks/useFormData";
import { useGetToken } from "@/hooks/useToken";
import { useToast } from "@chakra-ui/react";
import { useFormik } from "formik";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";

export default function CreateExamBank() {
  const { push } = useRouter();
  const toast = useToast();

  const token = useGetToken();

  const { mutate, isPending } = useCreateBank({
    token,
    model: "exam",
    onSuccess: () => {
      toast({
        title: "Data berhasil dibuat!",
        status: "success",
        isClosable: true,
        position: "top-right",
      });

      push("/banks/exams");
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

  const { data: dataChapters, isLoading } = useGetChapters({ token });

  const formik = useFormik({
    initialValues: {
      title: "",
      icon: null,
      filePath: null,
      chapterId: "",
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
      <Breadcrumb pageName={"Tambah Bank Soal"} />

      <div className="flex flex-col gap-9">
        <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
          <div className="border-b border-stroke px-6.5 py-4 dark:border-strokedark">
            <h3 className="font-medium text-black dark:text-white">
              Tambah Bank Soal
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
                  onChange={handleChange}
                  placeholder="Masukkan judul bank soal"
                  required
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
                  label={"File Bank Soal"}
                  type="file"
                  name="filePath"
                  onChange={(e) =>
                    formik.setFieldValue(e.target.name, e.target.files[0])
                  }
                  placeholder="Pilih file bank soal"
                />

                <SelectGroup
                  label={"Bab"}
                  name="chapterId"
                  onChange={handleChange}
                  options={dataChapters?.data?.data}
                  defaultOption="Pilih bab"
                />

                <div className="flex gap-4 justify-end">
                  <Link href={"/banks/exams"}>
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
          )}
        </div>
      </div>
    </React.Fragment>
  );
}
