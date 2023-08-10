import {
  Box,
  Button,
  Center,
  Flex,
  FormControl,
  FormLabel,
  Grid,
  GridItem,
  Input,
  Spacer,
  Switch,
  useColorMode,
  Text,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import InputWithIcon from "./InputWithIcon";
import axios from "axios";

interface Props {
  onSearch: (searchValue: string) => void;
}

const TopBar = ({ onSearch }: Props) => {
  const { colorMode, toggleColorMode } = useColorMode();
  return (
    <>
      <Box display={"flex"}>
        <InputWithIcon onSearch={onSearch} />
        <Center marginLeft={3}>
          <Switch onChange={toggleColorMode} marginRight={3} />
          <Text color={colorMode === "dark" ? "white" : "black"}>
            Toggle {colorMode === "light" ? "Dark" : "Light"}
          </Text>
        </Center>
      </Box>
    </>
  );
};

export default TopBar;
