import { createContext } from "react";
import type { LanguageState } from "./ToggleLanguage";
import type { PinkishState } from "./TogglePinkishness";


export type DemoContextType = PinkishState & LanguageState & {
  cows: CowCategory[]
  setCows: React.Dispatch<React.SetStateAction<CowCategory[]>>;
};

export const DemoContext = createContext<DemoContextType>({
  isPink: false,
  setIsPink: () => { },
  lang: "en",
  setLang: () => { },
  cows: [],
  setCows: () => { },
});

export type CowCategory = {
  name: string;
  items: CattleCounts[];
};

export type CattleCounts = {
  visited?: boolean,
  cattleTotal: number | null,
  countByTypes: {
    milkCows: number | null,
    otherCows: number | null,
  },
  countByGender: {
    male: number | null,
    female: number | null,
  },
  date: string | null,
  entryType: string,
  idNumber: string | null,
  locationName: string | null,
}