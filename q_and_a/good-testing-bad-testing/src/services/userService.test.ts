import { userService } from "./userService";

describe("userService tests", () => {
    describe("getUsers tests", () => {
        it("Given no users existing, when getUsers is called, then it returns an empty array.", async () => {
            // arrange:
            const getUsers = userService.getUsers;

            // act
            const result = await getUsers();

            // assert
            expect(result).toEqual([]);
        });
    });
});
