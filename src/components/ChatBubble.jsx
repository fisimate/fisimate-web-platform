import React from "react";
import { FiCheck, FiEdit2, FiRepeat } from "react-icons/fi";

export default function ChatBubble({ type }) {
  return (
    <React.Fragment>
      {type == "reply" ? (
        <div className="bg-white p-6 rounded-bl-3xl rounded-e-3xl w-5/6">
          <p>
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Incidunt,
            nam ab laudantium hic temporibus, architecto similique eos
            distinctio, obcaecati optio quibusdam corporis sapiente iusto cum
            consequuntur debitis corrupti pariatur rerum. Alias, amet. Deserunt
            placeat corrupti vero impedit! Facilis porro sit laudantium
            molestias illum incidunt dolore voluptatibus? Incidunt commodi natus
            provident!
          </p>
          <div className="flex flex-row gap-3 mt-3">
            <button className="border-blue-500 border-2 p-1 px-2 rounded-md text-blue-500">
              <span className="flex flex-row items-center gap-2">
                <FiRepeat />
                <p>Regenerate</p>
              </span>
            </button>
            <button className="bg-blue-500 p-1 px-2 rounded-md text-white">
              <span className="flex flex-row items-center gap-2">
                <FiCheck />
                <p>Accept</p>
              </span>
            </button>
          </div>
        </div>
      ) : (
        <div className="w-5/6 flex justify-end items-start gap-4">
          <button className="bg-transparent border-2 border-blue-500 rounded-full p-2 text-blue-500 text-xl">
            <FiEdit2 />
          </button>
          <div className="bg-blue-500 p-6 rounded-s-3xl rounded-br-3xl w-2/3 text-white items-end justify-end">
            <p>
              Lorem, ipsum dolor sit amet consectetur adipisicing elit.
              Incidunt, nam ab laudantium hic temporibus, architecto similique
              eos distinctio, obcaecati optio quibusdam corporis sapiente iusto
              cum consequuntur debitis corrupti pariatur rerum. Alias, amet.
              Deserunt placeat corrupti vero impedit! Facilis porro sit
              laudantium molestias illum incidunt dolore voluptatibus? Incidunt
              commodi natus provident!
            </p>
          </div>
        </div>
      )}
    </React.Fragment>
  );
}
