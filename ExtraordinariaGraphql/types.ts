export type Character = {
  id: string;
  name: string;
  espisodde: Episode[];
};

export type Episode = {
  id: string;
  name: string;
  characters: Character[];
};
