import type { GetTranslatedMessage } from "../types/IntlService";


const messagesEn = {
    "lang": "English",
    "Rerender Now!": "Rerender Now!",
};

const messagesDe = {
    "lang": "Deutsch",
    "Rerender Now!": "Jetzt neu rendern",
    "Manually rerendered count: ": "So oft wurde gererendert:"
};


export type AppLanguages = "de" | "en";

export const getIntlResolver = (language?: AppLanguages): GetTranslatedMessage => {
    var messages: { [key in string]: string } = language === "de" ? messagesDe : messagesEn;

    return (key: string) => {
        switch (key) {
            case "AppName":
                const env = process.env;
                return env.REACT_APP_APP_NAME ?? "DEMO";
            default:
                return messages[key] ?? key
        }
    }

};