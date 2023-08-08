import {
	Stack,
	InputGroup,
	InputLeftElement,
	Input,
	InputRightElement,
	useColorMode,
} from "@chakra-ui/react";
import { BsSearch } from "react-icons/bs";

const InputWithIcon = () => {
	const {colorMode, setColorMode} = useColorMode()
	return (
		<Stack spacing={4} w={"100%"}>
			<InputGroup>
				<InputLeftElement pointerEvents="none">
					<BsSearch color={colorMode === "dark" ? "white" : "black"} />
				</InputLeftElement>
				<Input
					type="tel"
					placeholder="Search..."
					borderRadius={50}
					size={"md"}
				/>
			</InputGroup>
		</Stack>
	);
};

export default InputWithIcon;
