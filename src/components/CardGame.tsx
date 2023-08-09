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
  isLoading: boolean;
}

const CardGame = ({
  id,
  name,
  metacritic,
  background_image,
  platforms,
  isLoading = true,
}: Props) => {
  return (
    <>
      {isLoading && (
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
      )}
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
              {platforms.map((item) => {
                if (item.platform.name === "PC") {
                  return (
                    <p key={item.platform.id}>
                      {item.platform.name === "PC" && <AiFillWindows />}
                    </p>
                  );
                }
              })}
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
