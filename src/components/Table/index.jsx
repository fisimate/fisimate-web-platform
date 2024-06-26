import React from "react";
import Thead from "./Thead";
import TBody from "./TBody";
import Spinner from "../Spinner";

export default function Table({
  headers,
  data,
  action,
  fields,
  isLoading,
  isRefetching,
}) {
  return (
    <div className="max-w-full overflow-x-auto">
      <table className="w-full table-auto">
        <Thead data={headers} />
        {isLoading || isRefetching ? (
          <tbody>
            <tr>
              <td
                className="border-b border-[#eee] px-4 py-5"
                colSpan={headers.length + 1}
              >
                <div className="flex justify-center items-center">
                  <Spinner />
                </div>
              </td>
            </tr>
          </tbody>
        ) : (
          <TBody
            data={data}
            action={action}
            fields={fields}
            isLoading={isLoading}
          />
        )}
      </table>
    </div>
  );
}
