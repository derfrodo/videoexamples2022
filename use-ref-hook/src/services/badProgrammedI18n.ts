import type { GetTranslatedMessage } from "../types/IntlService";

export const getIntlResolver = (): GetTranslatedMessage => {
    return (key: string) => {
        switch (key) {
            case "AppName":
                return process.env.REACT_APP_APP_NAME ?? "DEMO";
            default:
                return key
        }
    }

};