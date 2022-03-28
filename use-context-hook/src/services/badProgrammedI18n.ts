import type { GetTranslatedMessage } from "../types/IntlService";

export const getIntlResolver = (): GetTranslatedMessage => {
    return (key: string) => {
        switch (key) {
            case "AppName":
                const env = process.env;
                return env.REACT_APP_APP_NAME ?? "DEMO";
            default:
                return key
        }
    }

};