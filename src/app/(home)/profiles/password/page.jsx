"use client";
import { useUpdatePassword } from "@/hooks/useProfile";
import { Button, useToast } from "@chakra-ui/react";
import { useFormik } from "formik";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";

export default function UpdatePassword() {
  const token = JSON.parse(Cookies.get("token")).access_token;

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
    <div className="">
      <form onSubmit={formik.handleSubmit}>
        <p>{token}</p>
        <input
          type="password"
          placeholder="Old Password"
          name="oldPassword"
          onChange={handleChange}
        />
        <input
          type="password"
          placeholder="New Password"
          name="newPassword"
          onChange={handleChange}
        />
        <input
          type="password"
          placeholder="Password Confirmation"
          name="passwordConfirmation"
          onChange={handleChange}
        />

        <Button type="submit" isLoading={isPending} isDisabled={isPending}>
          Update
        </Button>
      </form>
    </div>
  );
}
