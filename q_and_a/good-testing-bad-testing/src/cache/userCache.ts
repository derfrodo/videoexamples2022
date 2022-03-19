import type { UserDto } from "../types/UserDto";
import { fakeApiCallForUsers } from "./fakeApi";

let cachedUsers: UserDto[] | null = null;

export const userCache = {
    async getOrRetrieveUsers(): Promise<UserDto[]> {
        if (cachedUsers === null) {
            const retrievedUsers = await fakeApiCallForUsers();
            cachedUsers = retrievedUsers;
            return retrievedUsers;
        }
        return cachedUsers;
    },
};
