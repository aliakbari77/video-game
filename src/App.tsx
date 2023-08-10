import React, { useState } from "react";
import { ChakraProvider, Button, Grid, GridItem } from "@chakra-ui/react";
import TopBar from "./components/TopBar";
import SideBar from "./components/SideBar";
import MainGame from "./components/MainGame";

const App = () => {
	const [selectedGenre, setGenre] = useState("Action");
	const [searchValue, setSearchValue] = useState("")

	const handleChangeGenre = (genre: string) => {
		setGenre(genre)
	}

	const handleSearch = (searchValue: string) => {
		console.log(searchValue)
		setSearchValue(searchValue)
	}

	return (
		<ChakraProvider>
			<Grid
				templateAreas={`"header header"
                  "nav main"
                  "nav main"`}
				gridTemplateRows={"50px 1fr 30px"}
				gridTemplateColumns={"200px 1fr"}
				h="100vh"
				gap="1"
				color="blackAlpha.700"
				fontWeight="bold"
				p={8}
			>
				<GridItem pl="2" area={"header"}>
					<TopBar onSearch={handleSearch} />
				</GridItem>
				<GridItem pl="2" area={"nav"} paddingTop={8}>
					<SideBar onChangeGenre={handleChangeGenre}/>
				</GridItem>
				<GridItem pl="2" area={"main"} paddingTop={8}>
					<MainGame selectedGenre={selectedGenre} searchValue={searchValue}/>
				</GridItem>
			</Grid>
		</ChakraProvider>
	);
};

export default App;
