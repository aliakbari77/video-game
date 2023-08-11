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
import CustomMenu from "./CustomMenu";

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
  const { colorMode, setColorMode } = useColorMode();
  const [games, setGames] = useState<Games[]>([]);
  const [error, setError] = useState("");
  const [isLoading, setLoading] = useState(false);
  const [selectedPlatform, setPlatform] = useState("");
  const [orderBy, setOrderBy] = useState<keyof Games>("name");
  const [page, setPage] = useState(1);
  const platforms = [
    "PC",
    "PlayStation",
    "Xbox",
    "iOS",
    "Android",
    "Apple Macintosh",
    "Linux",
    "Nintendo",
  ];
  const orders = [
    "Name",
    "Date added",
    "Release date",
    "Popularity",
    "Average rating",
  ];

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

  const handleOrder = (order: string) => {
    if (order == "Date added") {
      setOrderBy("updated");
    } else if (order == "Name" || order == "") {
      setOrderBy("name");
    } else if (order == "Release date") {
      setOrderBy("released");
    } else if (order == "Popularity") {
      setOrderBy("added");
    } else if (order == "Average rating") {
      setOrderBy("rating");
    }
  };

  return (
    <>
      <Heading color={colorMode === "dark" ? "white" : "black"}>
        {selectedGenre} Games
      </Heading>
      <Box
        display="flex"
        alignItems={"center"}
        paddingTop={8}
        gap={10}
        paddingBottom={8}
      >
        <Box>
          <CustomMenu
            selectedItem={selectedPlatform}
            onChange={setPlatform}
            items={platforms}
          />
        </Box>
        <Box>
          <CustomMenu
            selectedItem={orderBy}
            onChange={handleOrder}
            items={orders}
          />
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
