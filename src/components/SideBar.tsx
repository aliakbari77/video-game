import React, { useEffect, useState } from "react";
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
	Skeleton,
	SkeletonCircle,
	SkeletonText,
	Stack,
} from "@chakra-ui/react";
import axios from "axios";
// import genresData from "../data/genres-data";

interface Props {
	onChangeGenre: (genre: string) => void;
}

interface Genres {
	id: number;
	name: string;
	image_background: string;
}

const SideBar = ({ onChangeGenre }: Props) => {
	// const { results: genres } = genresData;
	const { colorMode, setColorMode } = useColorMode();
	const [genres, setGenres] = useState<Genres[]>([]);
	const [isLoading, setLoading] = useState(false);
	const [error, setError] = useState("");
	useEffect(() => {
		setLoading(true);
		axios
			.get("http://127.0.0.1:3000/genres")
			.then((res) => {
				setGenres(res.data.results);
				console.log(res.data.results);
				setLoading(false);
			})
			.catch((err) => {
				setError(err.message);
				setLoading(false);
			});
	}, []);

	console.log(genres);
	return (
		<>
			{isLoading ? (
				<Stack>
					<Box display="flex" alignItems={"center"}>
						<SkeletonCircle size="8" />
						<Skeleton height="8px" marginLeft={4}>
							<Box width={24} height={8} marginLeft={3} />
						</Skeleton>
					</Box>
					<Box display="flex" alignItems={"center"}>
						<SkeletonCircle size="8" />
						<Skeleton height="8px" marginLeft={4}>
							<Box width={24} height={8} marginLeft={3} />
						</Skeleton>
					</Box>
					<Box display="flex" alignItems={"center"}>
						<SkeletonCircle size="8" />
						<Skeleton height="8px" marginLeft={4}>
							<Box width={24} height={8} marginLeft={3} />
						</Skeleton>
					</Box>
					<Box display="flex" alignItems={"center"}>
						<SkeletonCircle size="8" />
						<Skeleton height="8px" marginLeft={4}>
							<Box width={24} height={8} marginLeft={3} />
						</Skeleton>
					</Box>
				</Stack>
			) : (
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
										color={
											colorMode === "dark"
												? "white"
												: "black"
										}
										onClick={() =>
											onChangeGenre(genre.name)
										}
									>
										{genre.name}
									</Link>
								</Box>
							</ListItem>
						))}
					</List>
				</>
			)}
		</>
	);
};

export default SideBar;
