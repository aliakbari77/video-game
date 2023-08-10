import {
  Stack,
  InputGroup,
  InputLeftElement,
  Input,
  InputRightElement,
  useColorMode,
} from "@chakra-ui/react";
import { BsSearch } from "react-icons/bs";

interface Props {
  onSearch: (searchValue: string) => void;
}

const InputWithIcon = ({ onSearch }: Props) => {
  const { colorMode, setColorMode } = useColorMode();

  return (
    <Stack spacing={4} w={"80%"}>
      <InputGroup>
        <InputLeftElement pointerEvents="none">
          <BsSearch color={colorMode === "dark" ? "white" : "black"} />
        </InputLeftElement>
        <Input
          type="tel"
          placeholder="Search..."
          borderRadius={50}
          size={"md"}
          onChange={(event) => onSearch(event.target.value)}
          color={colorMode === "dark" ? "white" : "black"}
        />
      </InputGroup>
    </Stack>
  );
};

export default InputWithIcon;
