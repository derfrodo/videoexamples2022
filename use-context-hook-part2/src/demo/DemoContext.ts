import { createContext } from "react";
import type { LanguageState } from "./ToggleLanguage";
import type { PinkishState } from "./TogglePinkishness";


export type DemoContextType = PinkishState & LanguageState & {
  todos: TodoCategory[]
  setTodos: React.Dispatch<React.SetStateAction<TodoCategory[]>>;
};

export const DemoContext = createContext<DemoContextType>({
  isPink: false,
  setIsPink: () => { },
  lang: "en",
  setLang: () => { },
  todos: [],
  setTodos: () => { },
});

export type TodoCategory = {
  name: string;
  items: Todo[];
};

export type Todo = {
  date: string,
  title: string,
  done: boolean,
}