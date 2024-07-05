import { GraphQLError } from "graphql";
import { Character } from "../types.ts";
import { getCharacters } from "../apis/getCharacters.ts";
import { getCharactersById } from "../apis/getCharacterById.ts";

export const Query = {
  character: async (_: unknown, args: { id: string }): Promise<Character> => {
    try {
      return await getCharactersById(args.id);
    } catch (error) {
      throw new GraphQLError(error.message, {
        extensions: { code: "INTERNAL_SERVEEEEEEEEEEEEER_ERROR" },
      });
    }
  },
  charactersByIds: async (
    _: unknown,
    args: { ids: string[] },
  ): Promise<Character[]> => {
    try {
      return await getCharacters(args.ids);
    } catch (error) {
      throw new GraphQLError(error.message, {
        extensions: { code: "INTERNAL_SERVER_ERROR" },
      });
    }
  },
};
