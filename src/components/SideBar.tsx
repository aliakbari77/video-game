import React from "react";
import {
	Center,
	Link,
	List,
	ListIcon,
	ListItem,
	Wrap,
	WrapItem,
	Heading,
	Box,
	useColorMode,
} from "@chakra-ui/react";
import genresData from "../data/genres-data";

interface Props {
	onChangeGenre: (genre: string) => void;
}

const SideBar = ({ onChangeGenre }: Props) => {
	const { results: genres } = genresData;
	const { colorMode, setColorMode } = useColorMode();

	console.log(genres);
	return (
		<>
			<Heading color={colorMode === "dark" ? "white" : "black"}>
				Genres
			</Heading>
			<List spacing={3} pt={8}>
				{genres.map((genre) => (
					<ListItem key={genre.id}>
						<Box display="flex" alignItems="center" p={2}>
							<Box
								as="img"
								src={genre.image_background}
								w={8}
								h={8}
								mr={2}
								borderRadius={5}
							/>
							<Link
								color={colorMode === "dark" ? "white" : "black"}
								onClick={() => onChangeGenre(genre.name)}
							>
								{genre.name}
							</Link>
						</Box>
					</ListItem>
				))}
			</List>
		</>
	);
};

export default SideBar;
