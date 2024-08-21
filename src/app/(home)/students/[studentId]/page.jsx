"use client";
import Breadcrumb from "@/components/Breadcrumb";
import Button from "@/components/Button";
import ErrorPage from "@/components/ErrorPage";
import FileInput from "@/components/Input/FileInput";
import InputGroup from "@/components/InputGroup";
import Spinner from "@/components/Spinner";
import { useFormData } from "@/hooks/useFormData";
import { useGetOneStudent, useUpdateStudent } from "@/hooks/useStudent";
import { useGetToken } from "@/hooks/useToken";
import { useToast } from "@chakra-ui/react";
import { useFormik } from "formik";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

export default function EditStudent({ params }) {
  const { studentId } = params;
  const { push } = useRouter();

  const toast = useToast();
  const token = useGetToken();

  const { data, isLoading, isLoadingError } = useGetOneStudent({
    dataId: studentId,
    token,
  });

  const formik = useFormik({
    initialValues: {
      fullname: "",
      email: "",
      nis: "",
      profilePicture: null,
    },
    onSubmit: (values) => {
      const formData = useFormData(values);

      mutate({ body: formData, studentId });
    },
  });

  useEffect(() => {
    if (data) {
      formik.setValues({
        fullname: data?.data?.data?.fullname,
        email: data?.data?.data?.email,
        nis: data?.data?.data?.nis,
      });
    }
  }, [data]);

  const { mutate, isPending } = useUpdateStudent({
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
        title: "Data berhasil diperbarui!",
        status: "success",
        isClosable: true,
        position: "top-right",
      });

      push("/students");
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
      <Breadcrumb pageName={"Ubah Siswa"} />

      <div className="flex flex-col gap-9">
        <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
          <div className="border-b border-stroke px-6.5 py-4 dark:border-strokedark">
            <h3 className="font-medium text-black dark:text-white">
              Ubah Siswa
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
                  label={"Nama Lengkap"}
                  type="text"
                  name="fullname"
                  value={formik.values.fullname}
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
                  value={formik.values.email}
                  onChange={handleChange}
                  placeholder="Masukkan alamat email"
                />

                <InputGroup
                  label={"NIS"}
                  type="text"
                  name="nis"
                  value={formik.values.nis}
                  onChange={handleChange}
                  placeholder="Masukkan NIS"
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
          )}
        </div>
      </div>
    </React.Fragment>
  );
}
