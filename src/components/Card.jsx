import {
  Card,
  CardBody,
  HStack,
  IconButton,
  Stat,
  StatLabel,
  StatNumber,
} from "@chakra-ui/react";

export default function CustomCard({ label, value, icon }) {
  return (
    <Card
      overflow={"hidden"}
      variant={"unstyled"}
      rounded={"xl"}
      w={"lg"}
      px={6}
      py={4}
    >
      <CardBody>
        <HStack spacing={6}>
          <IconButton
            isRound={true}
            size={"lg"}
            colorScheme={"blue"}
            fontSize="24px"
            isActive={false}
            cursor={"default"}
            icon={icon}
          />
          <Stat>
            <StatLabel color={"grey"}>{label}</StatLabel>
            <StatNumber fontWeight={"bold"} mt={0}>
              {value}
            </StatNumber>
          </Stat>
        </HStack>
      </CardBody>
    </Card>
  );
}
