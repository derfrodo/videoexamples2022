import type { UserModel } from "../types/UserModel";
import { userCache } from "../cache/userCache";

export const userService = {
    /**
     * gets all users from API (might have been cached though) and adds hairiness of their respective feets ;)
     * @returns
     */
    async getUsers(): Promise<UserModel[]> {
        const users = await userCache.getOrRetrieveUsers();

        // add some (reasonable) business Logic
        const userModels: UserModel[] = users.map((u) =>
            u.name === "DerFrodo"
                ? { ...u, hasHairyFeet: true }
                : { ...u, hasHairyFeet: false }
        );

        // return mapped users
        return userModels;
    },
};
