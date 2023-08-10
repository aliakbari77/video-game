import create from "./http-service";

export interface Games {
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

export default create("/games/")