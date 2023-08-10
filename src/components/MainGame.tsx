import { ChevronDownIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  Card,
  CardBody,
  Center,
  Grid,
  Heading,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Skeleton,
  SkeletonCircle,
  SkeletonText,
  Stack,
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
  genres: {
    id: number;
    name: string;
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
      .get("http://127.0.0.1:3000/")
      .then((res) => {
        console.log(res);
        setGames(res.data.results);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  const filterByGenreName = (data: Games[], genreName: string) => {
    return data.filter((game) => {
      return game.genres.some((genre) => genre.name === genreName);
    });
  };

  const visibleGames = selectedGenre
    ? filterByGenreName(games, selectedGenre)
    : games;

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
                <MenuItem key={platform.id}>{platform.name}</MenuItem>
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
      {isLoading && (
        <Grid templateColumns={"repeat(3, 1fr)"} gap={4}>
          <Card mt={4} height={300}>
            <CardBody p={0} borderRadius={5}>
              <Center padding={4}>
                <Box width={"100%"} textAlign={"center"}>
                  <SkeletonCircle size={"20"} />
                  <SkeletonText mt={6} noOfLines={1} skeletonHeight={6} />
                  <SkeletonText mt={6} noOfLines={1} skeletonHeight={6} />
                  <SkeletonText mt={6} noOfLines={1} skeletonHeight={6} />
                </Box>
              </Center>
            </CardBody>
          </Card>
          <Card mt={4}>
            <CardBody p={0} borderRadius={5}>
              <Center padding={4}>
                <Box width={"100%"} textAlign={"center"}>
                  <SkeletonCircle size={"20"} />
                  <SkeletonText mt={6} noOfLines={1} skeletonHeight={6} />
                  <SkeletonText mt={6} noOfLines={1} skeletonHeight={6} />
                  <SkeletonText mt={6} noOfLines={1} skeletonHeight={6} />
                </Box>
              </Center>
            </CardBody>
          </Card>
          <Card mt={4}>
            <CardBody p={0} borderRadius={5}>
              <Center padding={4}>
                <Box width={"100%"} textAlign={"center"}>
                  <SkeletonCircle size={"20"} />
                  <SkeletonText mt={6} noOfLines={1} skeletonHeight={6} />
                  <SkeletonText mt={6} noOfLines={1} skeletonHeight={6} />
                  <SkeletonText mt={6} noOfLines={1} skeletonHeight={6} />
                </Box>
              </Center>
            </CardBody>
          </Card>
        </Grid>
      )}
      <Grid templateColumns={"repeat(3, 1fr)"} paddingTop={4} gap={4}>
        {visibleGames.map((game) => (
          <CardGame
            key={game.id}
            id={game.id}
            name={game.name}
            background_image={game.background_image}
            metacritic={game.metacritic}
            platforms={game.platforms}
          />
        ))}
      </Grid>
    </>
  );
};

export default MainGame;
