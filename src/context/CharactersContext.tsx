import { createContext, useState, useEffect, ReactNode } from "react";
import axios from "axios";
import { Character } from "../types";

interface CharactersContextProps {
  characters: Character[];
  setCharacters: React.Dispatch<React.SetStateAction<Character[]>>;
}

const defaultValue: CharactersContextProps = {
  characters: [],
  setCharacters: () => {},
};

export const CharactersContext =
  createContext<CharactersContextProps>(defaultValue);

interface CharactersProviderProps {
  children: ReactNode;
}

export default function CharactersProvider({
  children,
}: CharactersProviderProps) {
  const [characters, setCharacters] = useState<Character[]>([]);

  useEffect(() => {
    const fetchCharacters = async () => {
      try {
        const response = await axios.get<Character[]>("/characters");
        setCharacters(response.data);
      } catch (error) {
        console.error("Error fetching characters:", error);
      }
    };

    fetchCharacters();
  }, []);

  return (
    <CharactersContext.Provider value={{ characters, setCharacters }}>
      {children}
    </CharactersContext.Provider>
  );
}
