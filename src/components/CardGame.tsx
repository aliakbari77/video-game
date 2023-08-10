import {
  Badge,
  Card,
  CardBody,
  CardFooter,
  Divider,
  Heading,
  Image,
  Skeleton,
  Stack,
  Text,
  Box,
  SkeletonCircle,
} from "@chakra-ui/react";
import gamesData from "../data/games-data";
import { BsWindows, BsApple } from "react-icons/bs";
import { FaXbox, FaPlaystation, FaLinux } from "react-icons/fa";
import { AiFillAndroid } from "react-icons/ai";
import { SiNintendo, SiApplearcade } from "react-icons/si";
import { FiTarget } from "react-icons/fi";
import { BiLike } from "react-icons/bi";

interface Props {
  id: number;
  name: string;
  metacritic: number;
  background_image: string;
  parent_platforms: {
    platform: {
      id: number;
      name: string;
    };
  }[];
  ratings: {
    id: number;
    title: string;
  };
}

const CardGame = ({
  id,
  name,
  metacritic,
  background_image,
  parent_platforms,
  ratings,
}: Props) => {
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
              {parent_platforms.map((item) => {
                if (item.platform.name === "PC") {
                  return (
                    <p key={item.platform.id}>
                      {item.platform.name === "PC" && <BsWindows />}
                    </p>
                  );
                } else if (item.platform.name === "Xbox") {
                  return (
                    <p key={item.platform.id}>
                      {item.platform.name === "Xbox" && <FaXbox />}
                    </p>
                  );
                } else if (item.platform.name === "PlayStation") {
                  return (
                    <p key={item.platform.id}>
                      {item.platform.name === "PlayStation" && (
                        <FaPlaystation />
                      )}
                    </p>
                  );
                } else if (item.platform.name === "iOS") {
                  return (
                    <p key={item.platform.id}>
                      {item.platform.name === "iOS" && <BsApple />}
                    </p>
                  );
                } else if (item.platform.name === "Android") {
                  return (
                    <p key={item.platform.id}>
                      {item.platform.name === "Android" && <AiFillAndroid />}
                    </p>
                  );
                } else if (item.platform.name === "Linux") {
                  return (
                    <p key={item.platform.id}>
                      {item.platform.name === "Linux" && <FaLinux />}
                    </p>
                  );
                } else if (item.platform.name === "Nintendo") {
                  return (
                    <p key={item.platform.id}>
                      {item.platform.name === "Nintendo" && <SiNintendo />}
                    </p>
                  );
                } else if (item.platform.name === "Apple Macintosh") {
                  return (
                    <p key={item.platform.id}>
                      {item.platform.name === "Apple Macintosh" && (
                        <SiApplearcade />
                      )}
                    </p>
                  );
                }
              })}
              <Badge colorScheme="green">{metacritic}</Badge>
            </Stack>
            <Heading size="md" p={2}>
              {name}
            </Heading>
            <Box marginLeft={2}>
              {ratings.title === "exceptional" ? <FiTarget /> : <BiLike />}
            </Box>
          </Stack>
        </CardBody>
      </Card>
    </>
  );
};

export default CardGame;
