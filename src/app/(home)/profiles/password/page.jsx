"use client";
import Breadcrumb from "@/components/Breadcrumb";
import Button from "@/components/Button";
import InputGroup from "@/components/InputGroup";
import { useUpdatePassword } from "@/hooks/useProfile";
import { useGetToken } from "@/hooks/useToken";
import { useToast } from "@chakra-ui/react";
import { useFormik } from "formik";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";

export default function UpdatePassword() {
  const token = useGetToken();

  const { push } = useRouter();

  const toast = useToast();

  const formik = useFormik({
    initialValues: {
      oldPassword: "",
      newPassword: "",
      passwordConfirmation: "",
    },
    onSubmit: () => {
      mutate(formik.values);
    },
  });

  const handleChange = (e) => {
    formik.setFieldValue(e.target.name, e.target.value);
  };

  const { mutate, isPending } = useUpdatePassword({
    onSuccess: () => {
      toast({
        title: "Berhasil update password!",
        status: "success",
        isClosable: true,
        position: "top-right",
      });

      push("/profiles");
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
    token,
  });

  return (
    <React.Fragment>
      <Breadcrumb pageName={"Ubah Password"} />

      <div className="flex flex-col gap-9">
        <div className="rounded-lg border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
          <div className="border-b border-stroke px-6.5 py-4 dark:border-strokedark">
            <h3 className="font-medium text-black dark:text-white">
              Ubah Password
            </h3>
          </div>
          <form onSubmit={formik.handleSubmit}>
            <div className="p-6.5">
              <InputGroup
                label={"Password Lama"}
                type="password"
                name="oldPassword"
                onChange={handleChange}
                placeholder="Masukkan pasword lama"
              />

              <InputGroup
                label={"Password Baru"}
                type="password"
                name="newPassword"
                onChange={handleChange}
                placeholder="Masukkan password baru"
              />

              <InputGroup
                label={"Konfirmasi Password"}
                type="password"
                name="passwordConfirmation"
                onChange={handleChange}
                placeholder="Konfirmasi password baru"
              />

              <div className="flex gap-4 justify-end">
                <Link href={"/profiles"}>
                  <Button
                    text={"Batal"}
                    variant="outline"
                    disabled={isPending}
                  />
                </Link>
                <Button text={"Ubah"} type="submit" disabled={isPending} />
              </div>
            </div>
          </form>
        </div>
      </div>
    </React.Fragment>
  );
}
