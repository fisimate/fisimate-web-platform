"use client";
import Button from "@/components/Button";
import TextInput from "@/components/Form/TextInput";
import { useProfileQuery } from "@/hooks/useProfile";
import { Input, Spinner, useToast } from "@chakra-ui/react";
import Cookies from "js-cookie";

export default function Profile() {
  const token = JSON.parse(Cookies.get("token")).access_token;

  const toast = useToast();

  const { data, isError, isLoading } = useProfileQuery(token);

  if (isError) {
    toast({
      title: "Invalid user!",
      status: "error",
      isClosable: true,
      position: "top-right",
    });
  }

  return (
    <div className="">
      {JSON.stringify(data?.data?.data)}
      {isLoading && <Spinner />}
      <div className="flex flex-row gap-2 w-full">
        <div className="rounded-lg border-[1px] border-gray-200 bg-white">
          {/* Card Titile */}
          <div className="p-4">
            <p>Foto Profil</p>
          </div>
          <hr />
          {/* Card Body */}
          <div className="p-6">
            <div className="flex justify-center">
              <img
                src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"
                className="rounded-full w-20 h-20"
                alt="profile_picture"
              />
            </div>
            <div className="text-center bg-orange-100 rounded-lg flex flex-col justify-center items-center p-5 gap-3 mt-6">
              <div className="bg-white w-12 h-12 rounded-full border-orange-200 border-[1px]"></div>
              <p>
                Klik untuk upload atau seret gambar berformat SVG, PNG, atau JPG
                (Maksimal 800 x 800)
              </p>
            </div>
            <div className="flex flex-row justify-end gap-4 mt-4">
              <button className="text-white px-4 py-2 bg-red-500 rounded-lg">
                Delete
              </button>
              <button className="text-white px-4 py-2 bg-blue-500 rounded-lg">
                Simpan
              </button>
            </div>
          </div>
        </div>
        <div className="rounded-lg border-[1px] border-gray-200 bg-white">
          {/* Card Titile */}
          <div className="p-4">
            <p>Detail User</p>
          </div>
          <hr />
          {/* Card Body */}
          <div className="p-6">
            <div className="flex justify-center">
              <form
                className="flex flex-col gap-4"
                action={"/test"}
                method="POST"
              >
                <TextInput type="email" placeholder="Email" />
                <Input type="text" placeholder="Fullname" name="fullname" />
                <Input type="email" placeholder="Email" name="email" />
                <Input type="text" placeholder="Identity Number" name="nis" />
                <Button text={"Simpan"} type="submit" />
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
