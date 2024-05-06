import {
  Box,
  Drawer,
  DrawerContent,
  useColorModeValue,
  useDisclosure,
} from "@chakra-ui/react";
import SidebarContent from "./SidebarContent";
import MobileNav from "./MobileNav";

export default function Sidebar({ children }) {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <div className="">
      <Box minH={"100vh"} bg={useColorModeValue("gray.100", "gray.900")}>
        <SidebarContent
          onClose={() => onClose}
          display={{ base: "none", md: "block" }}
        />
        <Drawer
          autoFocus={false}
          isOpen={isOpen}
          placement="left"
          onClose={onClose}
          returnFocusOnClose={false}
          onOverlayClick={onClose}
          size={"full"}
        >
          <DrawerContent>
            <SidebarContent onClose={onClose} />
          </DrawerContent>
        </Drawer>
        {/* Mobile Nav */}
        <MobileNav onOpen={onOpen} />

        <Box ml={{ base: 0, md: 60 }} p={"4"}>
          {children}
        </Box>
      </Box>
    </div>
  );
}
