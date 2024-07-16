"use client";
import Breadcrumb from "@/components/Breadcrumb";
import Button from "@/components/Button";
import InputGroup from "@/components/InputGroup";
import { useResetPassword } from "@/hooks/useStudent";
import { useGetToken } from "@/hooks/useToken";
import { useToast } from "@chakra-ui/react";
import { useFormik } from "formik";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";

export default function ResetPassword({ params }) {
  const { studentId } = params;
  const { push } = useRouter();
  const token = useGetToken();
  const toast = useToast();

  const formik = useFormik({
    initialValues: {
      newPassword: "",
    },
    onSubmit: (values) => {
      mutate({ body: values, studentId });
    },
  });

  const { mutate, isPending } = useResetPassword({
    token,
    onSuccess: () => {
      toast({
        title: "Berhasil reset password!",
        status: "success",
        isClosable: true,
        position: "top-right",
      });

      push("/students");
    },
    onError: (error) => {
      const result = error.response.data;

      toast({
        title: result.messsage,
        status: "error",
        isClosable: true,
        position: "top-right",
      });
    },
  });

  const handleChange = (e) => {
    formik.setFieldValue(e.target.name, e.target.value);
  };

  return (
    <React.Fragment>
      <Breadcrumb pageName={"Reset Password"} />

      <div className="flex flex-col gap-9">
        <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
          <div className="border-b border-stroke px-6.5 py-4 dark:border-strokedark">
            <h3 className="font-medium text-black dark:text-white">
              Reset Password
            </h3>
          </div>
          <form onSubmit={formik.handleSubmit}>
            <div className="p-6.5">
              <InputGroup
                label={"Password Baru"}
                type="password"
                name="newPassword"
                value={formik.values.newPassword}
                onChange={handleChange}
                placeholder="Masukkan password baru"
              />

              <div className="flex gap-4 justify-end">
                <Link href={"/students"}>
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
        </div>
      </div>
    </React.Fragment>
  );
}
