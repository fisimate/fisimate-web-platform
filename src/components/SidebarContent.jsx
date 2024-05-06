import {
  Box,
  CloseButton,
  Flex,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import React from "react";
import NavItem from "./NavItem";
import {
  FiCompass,
  FiHome,
  FiSettings,
  FiStar,
  FiTrendingUp,
} from "react-icons/fi";

export default function SidebarContent({ onClose, ...rest }) {
  const linkItems = [
    { name: "Home", icon: FiHome },
    { name: "Trending", icon: FiTrendingUp },
    { name: "Explore", icon: FiCompass },
    { name: "Favourites", icon: FiStar },
    { name: "Settings", icon: FiSettings },
  ];

  return (
    <Box
      transition="3s ease"
      bg={useColorModeValue("white", "gray.900")}
      borderRight={"1px"}
      w={{ base: "full", md: 60 }}
      pos={"fixed"}
      h={"full"}
      {...rest}
    >
      <Flex
        h={"20"}
        alignItems={"center"}
        mx={"8"}
        justifyContent={"space-between"}
      >
        <Text fontSize={"2xl"} fontFamily={"monospace"} fontWeight={"bold"}>
          Logo
        </Text>
        <CloseButton display={{ base: "flex", md: "none" }} onClick={onClose} />
      </Flex>
      {linkItems.map((item) => (
        <NavItem key={item.name} icon={item.icon}>
          {item.name}
        </NavItem>
      ))}
    </Box>
  );
}
