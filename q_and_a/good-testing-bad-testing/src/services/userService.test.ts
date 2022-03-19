import { userService } from "./userService";

import { userCache } from "../cache/userCache";


jest.mock("../cache/userCache", () => {
    const actual = jest.requireActual("../cache/userCache");
    return {
        ...actual,
        userCache: {
            getOrRetrieveUsers: jest.fn()
        }
    }
});

const userCacheMock = {
    getOrRetrieveUsers: userCache.getOrRetrieveUsers as jest.MockedFunction<typeof userCache.getOrRetrieveUsers>
}

describe("userService tests", () => {
    beforeEach(() => {
        jest.clearAllMocks();
        userCacheMock.getOrRetrieveUsers.mockImplementation(() => Promise.resolve([]))
    })

    describe("getUserDtos tests", () => {
        it("Given no users existing, when getUserDtos is called, then it returns an empty array.", async () => {
            // arrange:
            const getUserDtos = userService.getUserDtos;

            // act
            const result = await getUserDtos();

            // assert
            expect(result).toEqual([]);
        });

        it("Given one user exists, when getUserDtos is called, then it returns the user in array.", async () => {
            // arrange:
            const userArray = [{ name: "TestUser" }];
            userCacheMock.getOrRetrieveUsers.mockImplementation(() => Promise.resolve(userArray))
            const getUserDtos = userService.getUserDtos;

            // act
            const result = await getUserDtos();

            // assert
            expect(userCacheMock.getOrRetrieveUsers).toBeCalled();
        });
        it("Given one user exists, when getUserDtos is called, then it returns the user in array.", async () => {
            // arrange:
            const userArray = [{ name: "TestUser" }];
            userCacheMock.getOrRetrieveUsers.mockImplementation(() => Promise.resolve(userArray))
            const getUserDtos = userService.getUserDtos;

            // act
            const result = await getUserDtos();

            // assert
            expect(userCacheMock.getOrRetrieveUsers).toBeCalledTimes(1);
        });

        it("Given one user exists, when getUserDtos is called, then it returns equal user in array.", async () => {
            // arrange:
            const userArray = [{ name: "TestUser" }];
            userCacheMock.getOrRetrieveUsers.mockImplementation(() => Promise.resolve(userArray))
            const getUserDtos = userService.getUserDtos;

            // act
            const result = await getUserDtos();

            // assert
            expect(result).toEqual(userArray);
        });
        it("Given one user exists, when getUserDtos is called, then it does not return the original array.", async () => {
            // arrange:
            const userArray = [{ name: "TestUser" }];
            userCacheMock.getOrRetrieveUsers.mockImplementation(() => Promise.resolve(userArray))
            const getUserDtos = userService.getUserDtos;

            // act
            const result = await getUserDtos();

            // assert
            expect(result).not.toBe(userArray);
        });
        it("Given one user exists, when getUserDtos is called, then it does not return the user in array.", async () => {
            // arrange:
            const userArray = [{ name: "TestUser" }];
            userCacheMock.getOrRetrieveUsers.mockImplementation(() => Promise.resolve(userArray))
            const getUserDtos = userService.getUserDtos;

            // act
            const result = await getUserDtos();

            // assert
            expect(result[0]).not.toBe(userArray[0]);
        });
    });



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
