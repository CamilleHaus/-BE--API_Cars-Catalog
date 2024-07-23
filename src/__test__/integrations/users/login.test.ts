import { prisma } from "../../../database/prisma";
import { request } from "../../../utils/request";
import {
    invalidLoginTypeMock,
    loginMockUser,
    loginUserMock, wrongPasswordMock
} from "../../__mock__/userMocks";

describe("Integration test: Login User", () => {
  beforeEach(async () => {
    await prisma.$transaction([
      prisma.car.deleteMany(),
      prisma.user.deleteMany(),
    ]);
  });

  test("Should be able to login successfully", async () => {
    const { user } = await loginMockUser();

    const data = await request
      .post("/users/login")
      .send(loginUserMock)
      .expect(200)
      .then((response) => response.body);

    const expectedUser = {
      id: user.id,
      name: user.name,
      email: user.email,
    };

    expect(data.accessToken).toBeDefined();
    expect(data.user).toStrictEqual(expectedUser);
  });

  test("Should throw error when user is not registered", async () => {
    const data = await request
      .post("/users/login")
      .send(loginUserMock)
      .expect(404)
      .then((response) => response.body);

    expect(data.message).toBe("User not registered");
  });

  test("Should thrown an error when credentials do not match", async () => {
    await loginMockUser();

    const data = await request
      .post("/users/login")
      .send(wrongPasswordMock)
      .expect(401)
      .then((response) => response.body);

    expect(data.message).toBe("E-mail and password doesn't match");
  });

  test("Should thrown an error when body parameter is missing", async () => {
    const data = await request
      .post("/users/login")
      .expect(400)
      .then((response) => response.body);

    expect(data.errors).toHaveLength(2);
    expect(data.errors[0].message).toBe("Required");
    expect(data.errors[1].message).toBe("Required");
  });

  test("Should throw error when body parameter receives wrong data type", async () => {
    const data = await request
      .post("/users/login")
      .send(invalidLoginTypeMock)
      .expect(400)
      .then((response) => response.body);

    expect(data.errors).toHaveLength(2);
    expect(data.errors[0].message).toBe("Expected string, received number");
    expect(data.errors[1].message).toBe("Expected string, received number");
  });
});
