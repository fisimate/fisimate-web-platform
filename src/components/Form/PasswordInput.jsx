import {
  IconButton,
  InputGroup,
  InputRightElement,
  useDisclosure,
  useMergeRefs,
} from "@chakra-ui/react";
import React, { forwardRef, useRef } from "react";
import TextInput from "./TextInput";
import { HiEye, HiEyeOff } from "react-icons/hi";

const PasswordInput = forwardRef((props, ref) => {
  const { isOpen, onToggle } = useDisclosure();
  const inputRef = useRef(null);

  const mergeRef = useMergeRefs(inputRef, ref);
  const onClickReveal = () => {
    onToggle();
    if (inputRef.current) {
      inputRef.current.focus({ preventScroll: true });
    }
  };

  return (
    <React.Fragment>
      <InputGroup>
        <InputRightElement>
          <IconButton
            color={'GrayText'}
            variant={"text"}
            aria-label={isOpen ? "Mask password" : "Reveal password"}
            icon={isOpen ? <HiEyeOff /> : <HiEye />}
            onClick={onClickReveal}
          />
        </InputRightElement>
        <TextInput
          ref={mergeRef}
          type={isOpen ? "text" : "password"}
          autoComplete="current-password"
          required
          {...props}
        />
      </InputGroup>
    </React.Fragment>
  );
});

export default PasswordInput;
