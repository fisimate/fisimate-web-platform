"use client";
import Breadcrumb from "@/components/Breadcrumb";
import Button from "@/components/Button";
import FileInput from "@/components/Input/FileInput";
import InputGroup from "@/components/InputGroup";
import { useFormData } from "@/hooks/useFormData";
import { useCreateStudent } from "@/hooks/useStudent";
import { useGetToken } from "@/hooks/useToken";
import { useToast } from "@chakra-ui/react";
import { useFormik } from "formik";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";

export default function CreateStudent() {
  const { push } = useRouter();
  const toast = useToast();

  const token = useGetToken();

  const { mutate, isPending } = useCreateStudent({
    token,
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
        title: "Data berhasil dibuat!",
        status: "success",
        isClosable: true,
        position: "top-right",
      });

      push("/students");
    },
  });

  const formik = useFormik({
    initialValues: {
      fullname: "",
      email: "",
      nis: "",
      password: "",
      profilePicture: null,
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
      <Breadcrumb pageName={"Tambah Siswa"} />

      <div className="flex flex-col gap-9">
        <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
          <div className="border-b border-stroke px-6.5 py-4 dark:border-strokedark">
            <h3 className="font-medium text-black dark:text-white">
              Tambah Siswa
            </h3>
          </div>
          <form onSubmit={formik.handleSubmit}>
            <div className="p-6.5">
              <InputGroup
                label={"Nama Lengkap"}
                type="text"
                name="fullname"
                onChange={handleChange}
                placeholder="Masukkan nama lengkap"
              />

              <FileInput
                label={"Foto Profil"}
                type="file"
                name="profilePicture"
                onChange={(e) =>
                  formik.setFieldValue(e.target.name, e.target.files[0])
                }
                placeholder="Pilih foto profil"
              />

              <InputGroup
                label={"Alamat Email"}
                type="email"
                name="email"
                onChange={handleChange}
                placeholder="Masukkan email"
              />

              <InputGroup
                label={"NIS"}
                type="text"
                name="nis"
                onChange={handleChange}
                placeholder="Masukkan NIS"
              />

              <InputGroup
                label={"Password"}
                type="password"
                name="password"
                onChange={handleChange}
                placeholder="Masukkan password"
              />

              <div className="flex gap-4 justify-end">
                <Link href={"/students"}>
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
        </div>
      </div>
    </React.Fragment>
  );
}
