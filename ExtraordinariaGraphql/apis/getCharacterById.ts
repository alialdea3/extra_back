import { Character } from "../types.ts";
import { getEpisodes } from "./getEpisodes.ts";

export const getCharactersById = async (id: string) => {
  const BASE_URL = "https://rickandmortyapi.com/api";
  const url = `${BASE_URL}/character/${id}`;
  const data = await fetch(url);

  if (data.status != 200) {
    throw new Error(
      "No se ha podido obtener informacion",
    );
  }
  const json = await data.json();
  const episodeId = json.episode.map((episode: string) => {
    const espisodeSplitted = episode.split("/");
    return espisodeSplitted[espisodeSplitted.length - 1];
  });

  const character: Character = {
    id: json.id,
    name: json.name,
    espisode: await getEpisodes(episodeId),
  };
  return character;
};
