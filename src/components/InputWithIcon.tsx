import {
	Stack,
	InputGroup,
	InputLeftElement,
	Input,
	InputRightElement,
} from "@chakra-ui/react";
import { BsSearch } from "react-icons/bs";

const InputWithIcon = () => {
	return (
		<Stack spacing={4} w={"100%"}>
			<InputGroup>
				<InputLeftElement pointerEvents="none">
					<BsSearch color="gray.300" />
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
