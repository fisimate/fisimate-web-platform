import { Input } from "@chakra-ui/react";
import React from "react";

export default function TextInput({ ...rest }) {
  return (
    <React.Fragment>
      <Input
        _focus={{
          outline: "#072DF4",
        }}
        {...rest}
      />
    </React.Fragment>
  );
}
