import { ChevronDownIcon } from "@chakra-ui/icons";
import {
	Box,
	Button,
	Grid,
	Heading,
	Menu,
	MenuButton,
	MenuItem,
	MenuList,
	useColorMode,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import platformsData from "../data/platforms-data";
import CardGame from "./CardGame";
// import gamesData from "../data/games-data";
import axios from "axios";

interface Props {
	selectedGenre: string;
}

interface Games {
	id: number;
	name: string;
	background_image: string;
	metacritic: number;
	platforms: {
		platform: {
			id: number;
			name: string;
		};
	}[];
}

const MainGame = ({ selectedGenre }: Props) => {
	const { results: platforms } = platformsData;
	// const { results: games } = gamesData;
	const { colorMode, setColorMode } = useColorMode();
	const [games, setGames] = useState<Games[]>([]);
	const [error, setError] = useState("");
	const [isLoading, setLoading] = useState(false);

	useEffect(() => {
		setLoading(true);
		axios
			.get("http://127.0.0.1:8000/")
			.then((res) => {
				setGames(res.data.results);
				setLoading(false);
			})
			.catch((err) => {
				setError(err.message);
				setLoading(false);
			});
	}, []);

	return (
		<>
			<Heading color={colorMode === "dark" ? "white" : "black"}>
				{selectedGenre} Games
			</Heading>
			<Box display="flex" alignItems={"center"} paddingTop={8} gap={10}>
				<Box>
					<Menu>
						<MenuButton as={Button} rightIcon={<ChevronDownIcon />}>
							Platforms
						</MenuButton>
						<MenuList>
							{platforms.map((platform) => (
								<MenuItem>{platform.name}</MenuItem>
							))}
						</MenuList>
					</Menu>
				</Box>
				<Box>
					<Menu>
						<MenuButton as={Button} rightIcon={<ChevronDownIcon />}>
							Orderby: Relevance
						</MenuButton>
						<MenuList>
							<MenuItem>Download</MenuItem>
							<MenuItem>Create a Copy</MenuItem>
							<MenuItem>Mark as Draft</MenuItem>
							<MenuItem>Delete</MenuItem>
							<MenuItem>Attend a Workshop</MenuItem>
						</MenuList>
					</Menu>
				</Box>
			</Box>
			<Grid templateColumns={"repeat(3, 1fr)"} paddingTop={4} gap={4}>
				{games.map((game) => (
					<CardGame
						id={game.id}
						name={game.name}
						background_image={game.background_image}
						metacritic={game.metacritic}
						platforms={game.platforms}
						isLoading={isLoading}
					/>
				))}
			</Grid>
		</>
	);
};

export default MainGame;
