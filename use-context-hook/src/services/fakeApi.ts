import type { AppUser } from "../types/AppUser";
import { wait } from "./wait";


export const getUserFromApi = async (): Promise<AppUser[]> => {
    await wait(2000);

    return [
        { name: "DerFrodo", hasHairyFeet: true },
        { name: "DerFuchs", hasHairyFeet: false },
    ];
};