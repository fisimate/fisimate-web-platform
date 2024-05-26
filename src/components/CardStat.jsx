import {
  Card,
  CardBody,
  HStack,
  IconButton,
  Stat,
  StatLabel,
  StatNumber,
} from "@chakra-ui/react";
import Icon from "./Icon";

export default function CardStat({ label, value, icon }) {
  return (
    <Card
      overflow={"hidden"}
      variant={"unstyled"}
      rounded={"2xl"}
      w={"lg"}
      px={8}
      py={10}
    >
      <CardBody>
        <HStack spacing={6}>
          <Stat>
            <StatNumber fontWeight={"bold"} mt={0} fontSize={"xxx-large"}>
              {value}
            </StatNumber>
            <StatLabel color={"grey"} fontSize={"large"}>{label}</StatLabel>
          </Stat>
          <Icon icon={icon} />
        </HStack>
      </CardBody>
    </Card>
  );
}
