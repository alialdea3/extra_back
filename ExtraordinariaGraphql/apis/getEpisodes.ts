import { Episode } from "../types.ts";
import { getCharacters } from "./getCharacters.ts";

type APIEpisode = {
  id: string;
  name: string;
  characters: string[];
};

export const getEpisodes = async (ids: string[]): Promise<Episode[]> => {
  const BASE_URL = "https://rickandmortyapi.com/api";
  const url = `${BASE_URL}/episode/${ids}`;
  const data = await fetch(url);

  if (data.status != 200) {
    throw new Error(
      "No se ha podido obtener informacion sobre el episodio en la API",
    );
  }
  const json = await data.json();

  const charactersIds: Array<string> = json.map((episode: APIEpisode) => {
    return episode.characters.map((character: string) => {
      const characterSplitted = character.split("/");
      return characterSplitted[characterSplitted.length - 1];
    });
  });

  const episodes: Episode[] = json.map((episode: APIEpisode) => {
    return {
      id: episode.id,
      name: episode.name,
      characters: getCharacters(charactersIds),
    };
  });

  return episodes;
};
