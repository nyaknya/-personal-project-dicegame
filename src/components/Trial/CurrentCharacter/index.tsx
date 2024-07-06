import "./style.css";
import { useContext, useRef, useState, useEffect } from "react";
import { CharactersContext } from "../../../context/CharactersContext";
import useOutSideClick from "../../../hooks/useOutSideClick";
import { Character } from "../../../types";
import SelectBox from "./SelectBox";
import SelectStats from "./SelectStats";
import SelectCondition from "./SelectCondition";

interface Stats {
  aggressive: number;
  creativity: number;
  kindness: number;
}

export default function CurrentCharacter() {
  const { characters } = useContext(CharactersContext);
  const [selectedCharacter, setSelectedCharacter] = useState<Character | null>(
    null
  );
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isWeakness, setIsWeakness] = useState<boolean>(false);
  const [isInfection, setIsInfection] = useState<boolean>(false);
  const [stats, setStats] = useState<Stats>({
    aggressive: 0,
    creativity: 0,
    kindness: 0,
  });
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (selectedCharacter) {
      setIsWeakness(selectedCharacter.status === "weakness");
      setIsInfection(selectedCharacter.status === "infection");
      setStats({
        aggressive: selectedCharacter.aggressive,
        creativity: selectedCharacter.creativity,
        kindness: selectedCharacter.kindness,
      });
    }
  }, [selectedCharacter]);

  const handleCharacterClick = (character: Character) => {
    setSelectedCharacter(character);
    setIsOpen(false);
  };

  const toggleOpenClose = () => {
    setIsOpen(!isOpen);
  };

  useOutSideClick({
    ref,
    callback: () => setIsOpen(false),
  });

  const handleWeaknessChange = () => {
    if (!isWeakness) {
      setStats((prevStats) => ({
        aggressive: prevStats.aggressive > 1 ? prevStats.aggressive - 1 : 1,
        creativity: prevStats.creativity > 1 ? prevStats.creativity - 1 : 1,
        kindness: prevStats.kindness > 1 ? prevStats.kindness - 1 : 1,
      }));
    }
    setIsWeakness(true);
    setIsInfection(false);
  };

  const handleInfectionChange = () => {
    if (!isInfection) {
      setStats({
        aggressive: 1,
        creativity: 1,
        kindness: 0,
      });
    }
    setIsInfection(true);
    setIsWeakness(false);
  };

  const handleNormalChange = () => {
    if (isWeakness || isInfection) {
      setStats({
        aggressive: selectedCharacter?.aggressive || 0,
        creativity: selectedCharacter?.creativity || 0,
        kindness: selectedCharacter?.kindness || 0,
      });
    }
    setIsWeakness(false);
    setIsInfection(false);
  };

  return (
    <div className="selected-character">
      <SelectBox />
      <div className="select-list" ref={ref}>
        <div
          className={`now-selected ${selectedCharacter ? "" : "no-selection"}`}
          onClick={toggleOpenClose}
        >
          {selectedCharacter ? selectedCharacter.name : "캐릭터를 선택하세요."}
          {isOpen ? (
            <img src="/images/up.svg" alt="위 화살표" />
          ) : (
            <img src="/images/down.svg" alt="아래 화살표" />
          )}
        </div>
        {isOpen && (
          <ul className="character-select">
            {characters.map((character) => (
              <li
                key={character.name}
                className="character-option"
                onClick={() => handleCharacterClick(character)}
              >
                {character.name}
              </li>
            ))}
          </ul>
        )}
      </div>
      {selectedCharacter ? (
        <>
          <SelectStats character={selectedCharacter} stats={stats} />
          <SelectCondition
            isWeakness={isWeakness}
            isInfection={isInfection}
            onWeaknessChange={handleWeaknessChange}
            onInfectionChange={handleInfectionChange}
            onNormalChange={handleNormalChange}
          />
          <div className="select-equipment">{selectedCharacter.equipment}</div>
        </>
      ) : (
        <span className="no-selection">캐릭터를 선택해주세요.</span>
      )}
    </div>
  );
}
