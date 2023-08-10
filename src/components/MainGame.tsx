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
  Select,
  Skeleton,
  SkeletonCircle,
  SkeletonText,
  Stack,
  Text,
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
  parent_platforms: {
    platform: {
      id: number;
      name: string;
    };
  }[];
  genres: {
    id: number;
    name: string;
  }[];
  updated: string;
  released: string;
  added: number;
  rating: number;
}

const MainGame = ({ selectedGenre }: Props) => {
  const { results: platforms } = platformsData;
  // const { results: games } = gamesData;
  const { colorMode, setColorMode } = useColorMode();
  const [games, setGames] = useState<Games[]>([]);
  const [error, setError] = useState("");
  const [isLoading, setLoading] = useState(false);
  const [selectedPlatform, setPlatform] = useState("");
  const [orderBy, setOrderBy] = useState<keyof Games>("name");

  useEffect(() => {
    setLoading(true);
    axios
      .get("http://127.0.0.1:3000/")
      .then((res) => {
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

  const filterByPlatformName = (data: Games[], platformName: string) => {
    return data.filter((game) => {
      return game.parent_platforms.some(
        (plt) => plt.platform.name === platformName
      );
    });
  };

  console.log(filterByPlatformName(games, selectedPlatform));

  const visibleGames = selectedGenre
    ? filterByGenreName(games, selectedGenre)
    : games;

    const visibleGames2 = selectedPlatform ? filterByPlatformName(visibleGames, selectedPlatform) : visibleGames

  const dynamicSort = (key: keyof Games) => (a: Games, b: Games) => {
    const aValue = a[key];
    const bValue = b[key];
    if (typeof aValue === "string" && typeof bValue === "string") {
      return aValue.localeCompare(bValue);
    } else if (typeof aValue === "number" && typeof bValue === "number") {
      return aValue - bValue;
    }
    return 0;
  };

  console.log("visible: ", visibleGames);

  const sortedGames = visibleGames2.sort(dynamicSort(orderBy));

  console.log("sorted: ", sortedGames);

  return (
    <>
      <Heading color={colorMode === "dark" ? "white" : "black"}>
        {selectedGenre} Games
      </Heading>
      <Box display="flex" alignItems={"center"} paddingTop={8} gap={10}>
        <Box>
          <Menu>
            <MenuButton as={Button} rightIcon={<ChevronDownIcon />}>
              {selectedPlatform ? selectedPlatform : "Platforms"}
            </MenuButton>
            <MenuList>
              {selectedPlatform && (
                <Text color={"tomato"} onClick={() => setPlatform("")}>
                  Clear
                </Text>
              )}
              <MenuItem
                color={colorMode == "dark" ? "white" : "black"}
                onClick={() => setPlatform("PC")}
              >
                PC
              </MenuItem>
              <MenuItem
                color={colorMode == "dark" ? "white" : "black"}
                onClick={() => setPlatform("PlayStation")}
              >
                PlayStation
              </MenuItem>
              <MenuItem
                color={colorMode == "dark" ? "white" : "black"}
                onClick={() => setPlatform("Xbox")}
              >
                Xbox
              </MenuItem>
              <MenuItem
                color={colorMode == "dark" ? "white" : "black"}
                onClick={() => setPlatform("iOS")}
              >
                iOS
              </MenuItem>
              <MenuItem
                color={colorMode == "dark" ? "white" : "black"}
                onClick={() => setPlatform("Android")}
              >
                Android
              </MenuItem>
              <MenuItem
                color={colorMode == "dark" ? "white" : "black"}
                onClick={() => setPlatform("Apple Macintosh")}
              >
                Apple Macintosh
              </MenuItem>
              <MenuItem
                color={colorMode == "dark" ? "white" : "black"}
                onClick={() => setPlatform("Linux")}
              >
                Linux
              </MenuItem>
              <MenuItem
                color={colorMode == "dark" ? "white" : "black"}
                onClick={() => setPlatform("Nintendo")}
              >
                Nintendo
              </MenuItem>
            </MenuList>
          </Menu>
        </Box>
        <Box>
          <Menu>
            <MenuButton as={Button} rightIcon={<ChevronDownIcon />}>
              Orderby: {orderBy}
            </MenuButton>
            <MenuList>
              <MenuItem onClick={() => setOrderBy("updated")}>
                Date added
              </MenuItem>
              <MenuItem onClick={() => setOrderBy("name")}>Name</MenuItem>
              <MenuItem onClick={() => setOrderBy("released")}>
                Release date
              </MenuItem>
              <MenuItem onClick={() => setOrderBy("added")}>
                Popularity
              </MenuItem>
              <MenuItem onClick={() => setOrderBy("rating")}>
                Average rating
              </MenuItem>
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
        {sortedGames.map((game) => (
          <CardGame
            key={game.id}
            id={game.id}
            name={game.name}
            background_image={game.background_image}
            metacritic={game.metacritic}
            parent_platforms={game.parent_platforms}
          />
        ))}
      </Grid>
    </>
  );
};

export default MainGame;
