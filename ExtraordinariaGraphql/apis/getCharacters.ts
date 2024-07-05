import { Character } from "../types.ts";
import { getEpisodes } from "./getEpisodes.ts";

type ApiCharacter = {
  id: number;
  name: string;
  episode: string[];
};

export const getCharacters = async (
  ids: Array<string>,
): Promise<Character[]> => {
  const BASE_URL = "https://rickandmortyapi.com/api";
  const url = `${BASE_URL}/character`;
  const data = await fetch(url);

  if (data.status != 200) {
    throw new Error(
      "No se ha podido obtener informacion",
    );
  }
  const json = await data.json();

  const characters: Array<Character> = json.results.map(
    (character: ApiCharacter) => {
      if (ids.includes(character.id.toString())) {
        return {
          id: character.id,
          name: character.name,
          episode: getEpisodes(character.episode.map((episode: string) => {
            const episodeSplitted = episode.split("/");
            console.log(episodeSplitted);
            return episodeSplitted[episodeSplitted.length - 1];
          })),
        };
      }
    },
  );
  const characteresFiltrados = characters.filter((character: Character) => {
    return character !== undefined;
  });
  return characteresFiltrados;
};
