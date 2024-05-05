"use client";
import { useLogin } from "@/hooks/useAuth";
import { useFormik } from "formik";
import { Button, useToast } from "@chakra-ui/react";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/stores/app-store";

export default function Login() {
  const { push } = useRouter();
  const toast = useToast();

  const { setUser, setIsLogin } = useAuthStore();

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    onSubmit: () => {
      mutate(formik.values);
    },
  });

  const handleChange = (e) => {
    formik.setFieldValue(e.target.name, e.target.value);
  };

  const { mutate, isPending } = useLogin({
    onSuccess: (response) => {
      const result = response?.data?.data;

      if (result.user.role.name === "user") {
        toast({
          title: "User tidak valid!",
          status: "error",
          isClosable: true,
          position: "top-right",
        });

        return;
      } else {
        Cookies.set("token", JSON.stringify(result));

        push("/dashboard");

        setUser(result);

        setIsLogin(true);
      }
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
    <div>
      <form onSubmit={formik.handleSubmit}>
        <p>{isPending}</p>
        <input
          type="email"
          name="email"
          onChange={handleChange}
          placeholder="Your Email"
        />
        <input
          type="password"
          name="password"
          onChange={handleChange}
          placeholder="Your Password"
        />

        <Button type="submit" isLoading={isPending} disabled={isPending}>
          Login
        </Button>
      </form>
    </div>
  );
}
