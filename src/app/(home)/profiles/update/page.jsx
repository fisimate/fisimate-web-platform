"use client";
import { useProfileQuery, useUpdateProfile } from "@/hooks/useProfile";
import { Button, useToast } from "@chakra-ui/react";
import { useFormik } from "formik";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";

export default function UpdatePassword() {
  const tokenCookie = Cookies.get("token");
  const token = tokenCookie ? JSON.parse(tokenCookie)?.access_token : null;
  const { push } = useRouter();
  const toast = useToast();

  const { data } = useProfileQuery(token);
  const { mutate, isPending } = useUpdateProfile({
    onSuccess: () => {
      toast({
        title: "Berhasil update profile!",
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

  const formik = useFormik({
    initialValues: {
      fullname: data?.data?.data?.fullname || "",
      email: data?.data?.data?.email || "",
      nis: data?.data?.data?.nis || "",
    },
    onSubmit: (values) => {
      mutate(values);
    },
    enableReinitialize: true
  });

  const handleChange = (e) => {
    formik.setFieldValue(e.target.name, e.target.value);
  };

  if (!data) return <div>Loading...</div>;

  return (
    <div className="">
      <form onSubmit={formik.handleSubmit}>
        <p>{JSON.stringify(data?.data?.data)}</p>
        <input
          type="text"
          placeholder="Fullname"
          name="fullname"
          onChange={handleChange}
          value={formik.values.fullname}
        />
        <input
          type="email"
          placeholder="Your Email"
          name="email"
          onChange={handleChange}
          value={formik.values.email}
        />
        <input
          type="text"
          placeholder="Nomor Identitas"
          name="nis"
          onChange={handleChange}
          value={formik.values.nis}
        />
        <Button type="submit" isLoading={isPending} isDisabled={isPending}>
          Update
        </Button>
      </form>
    </div>
  );
}
