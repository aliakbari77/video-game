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
  searchValue: string;
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
  ratings: {
    id: number;
    title: string;
  }[];
}

const MainGame = ({ selectedGenre, searchValue }: Props) => {
  const { results: platforms } = platformsData;
  // const { results: games } = gamesData;
  const { colorMode, setColorMode } = useColorMode();
  const [games, setGames] = useState<Games[]>([]);
  const [error, setError] = useState("");
  const [isLoading, setLoading] = useState(false);
  const [selectedPlatform, setPlatform] = useState("");
  const [orderBy, setOrderBy] = useState<keyof Games>("name");
  const [page, setPage] = useState(1);

  useEffect(() => {
    setLoading(true);
    axios
      .get(`http://127.0.0.1:3000/?page=${page}`)
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

  const visibleGames = selectedGenre
    ? filterByGenreName(games, selectedGenre)
    : games;

  const visibleGames2 = selectedPlatform
    ? filterByPlatformName(visibleGames, selectedPlatform)
    : visibleGames;

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

  const sortedGames = visibleGames2.sort(dynamicSort(orderBy));

  const filterByName = searchValue
    ? sortedGames.filter((item) => item.name.includes(searchValue))
    : sortedGames;

  return (
    <>
      <Heading color={colorMode === "dark" ? "white" : "black"}>
        {selectedGenre} Games
      </Heading>
      <Box display="flex" alignItems={"center"} paddingTop={8} gap={10}>
        <Box>
          <Menu>
            <MenuButton as={Button} rightIcon={<ChevronDownIcon />}>
              {selectedPlatform ? "Platform: " + selectedPlatform : "Platforms"}
            </MenuButton>
            <MenuList>
              {selectedPlatform && (
                <MenuItem color={"tomato"} onClick={() => setPlatform("")}>
                  Clear
                </MenuItem>
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
              <MenuItem
                onClick={() => setOrderBy("updated")}
                color={colorMode == "dark" ? "white" : "black"}
              >
                Date added
              </MenuItem>
              <MenuItem
                onClick={() => setOrderBy("name")}
                color={colorMode == "dark" ? "white" : "black"}
              >
                Name
              </MenuItem>
              <MenuItem
                onClick={() => setOrderBy("released")}
                color={colorMode == "dark" ? "white" : "black"}
              >
                Release date
              </MenuItem>
              <MenuItem
                onClick={() => setOrderBy("added")}
                color={colorMode == "dark" ? "white" : "black"}
              >
                Popularity
              </MenuItem>
              <MenuItem
                onClick={() => setOrderBy("rating")}
                color={colorMode == "dark" ? "white" : "black"}
              >
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
        {filterByName.map((game) => (
          <CardGame
            key={game.id}
            id={game.id}
            name={game.name}
            background_image={game.background_image}
            metacritic={game.metacritic}
            parent_platforms={game.parent_platforms}
            ratings={game.ratings[0]}
          />
        ))}
      </Grid>
    </>
  );
};

export default MainGame;
