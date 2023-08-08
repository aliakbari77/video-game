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
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import InputWithIcon from "./InputWithIcon";
import axios from "axios";

const TopBar = () => {
	const { colorMode, toggleColorMode } = useColorMode();
	return (
		<>
			<Box display={"flex"}>
				<InputWithIcon />
				
				<Button onClick={toggleColorMode}>
					Toggle {colorMode === "light" ? "Dark" : "Light"}
				</Button>
			</Box>
		</>
	);
};

export default TopBar;
