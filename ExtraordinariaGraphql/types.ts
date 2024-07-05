export type Character = {
  id: string;
  name: string;
  espisode: Episode[];
};

export type Episode = {
  id: string;
  name: string;
  characters: Character[];
};
