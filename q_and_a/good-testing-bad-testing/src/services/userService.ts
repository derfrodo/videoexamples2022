import type { UserDto } from "../types/UserDto";
import type { UserModel } from "../types/UserModel";
import { userCache } from "../cache/userCache";

export const userService = {
    /**
     * gets all users from API (might have been cached though) 
     * adds hairiness of their respective feets in response ;)
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

    /**
     * gets all users from cache (might have been cached though)
     * @returns
     */
    async getUserDtos(): Promise<UserDto[]> {
        const users = await userCache.getOrRetrieveUsers();

        // we may have some business logic added - even if i do not have any good idea, what would be reasonable here ;)

        // "just return users"
        return users.map(u => ({ ...u }));
    },
};
