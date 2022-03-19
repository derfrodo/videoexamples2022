import type { UserDto } from "../types/UserDto";

export async function fakeApiCallForUsers(): Promise<UserDto[]> {
    return await new Promise<UserDto[]>((r) =>
        setTimeout(() => r([{ name: "DerFrodo" }, { name: "DerFuchs" }]), 2500)
    );
}
