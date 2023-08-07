import {
	Badge,
	Card,
	CardBody,
	CardFooter,
	Divider,
	Heading,
	Image,
	Stack,
	Text,
} from "@chakra-ui/react";
import gamesData from "../data/games-data";
import { AiFillWindows } from "react-icons/ai";

interface Props {
	id: number;
	name: string;
	metacritic: number;
	background_image: string;
	platforms: {
		platform: {
			id: number;
			name: string;
		};
	}[];
}

const CardGame = ({
	id,
	name,
	metacritic,
	background_image,
	platforms,
}: Props) => {
	// const { results: games } = gamesData;

	console.log(platforms);

	return (
		<>
			<Card maxW="sm">
				<CardBody p={0} pb={4} borderRadius={5}>
					<Image
						src={background_image}
						borderTopRadius={5}
						h={200}
						w={"100%"}
					/>
					<Stack mt="6" spacing="3">
						<Stack ml={2} direction={"row"}>
							{platforms.map((item) => (
								<p key={item.platform.id}>
									{item.platform.name === "PC" && (
										<AiFillWindows />
									)}
								</p>
							))}
							<Badge colorScheme="green">{metacritic}</Badge>
						</Stack>
						<Heading size="md" p={2}>
							{name}
						</Heading>
					</Stack>
				</CardBody>
			</Card>
		</>
	);
};

export default CardGame;
