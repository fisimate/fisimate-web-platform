import ChatBubble from "@/components/ChatBubble";
import { Input } from "@chakra-ui/react";
import React from "react";
import { FiInfo, FiSend } from "react-icons/fi";

export default function Quiz() {
  return (
    <React.Fragment>
      <div className="flex w-full justify-center items-center flex-col-reverse gap-8">
        <div className="bg-white h-16 rounded-full w-5/6 flex items-center px-3 justify-between gap-3">
          <div className="flex flex-row items-center gap-3 w-full">
            <div className="text-3xl">
              <FiInfo />
            </div>
            <Input
              placeholder="Type here..."
              variant={"unstyled"}
              flexWrap={"wrap"}
              className="flex-grow"
              fontSize={18}
            />
          </div>
          <div className="bg-blue-600 rounded-full w-10 h-10 flex items-center justify-center">
            <div className="text-white text-2xl">
              <FiSend />
            </div>
          </div>
        </div>

        <ChatBubble type={'reply'} />
        <ChatBubble />
      </div>
    </React.Fragment>
  );
}
