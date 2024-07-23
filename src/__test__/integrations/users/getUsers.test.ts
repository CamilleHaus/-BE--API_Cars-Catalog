import { request } from "../../../utils/request";
import { loginMockUser } from "../../__mock__/userMocks";
import { prisma } from "../../../database/prisma";
import { UserFactory } from "../../factories/users.factory";
import bcrypt from "bcrypt";

describe("Integration test: Get All Users", () => {
  beforeEach(async () => {
    await prisma.$transaction([
      prisma.car.deleteMany(),
      prisma.user.deleteMany({}),
    ]);
  });

  test("Should be able to get all users successfully", async () => {
    const userData = Array.from({ length: 10 }, () => UserFactory.build());

    for (const user of userData) {
      user.password = await bcrypt.hash(user.password, 10);
    }

    await prisma.user.createMany({ data: userData });

    const { accessToken } = await loginMockUser();

    const data = await request
      .get("/users")
      .set("Authorization", `Bearer ${accessToken}`)
      .expect(200)
      .then((response) => response.body);

    expect(data).toHaveLength(11);

    // 11 por que na facotry criamos 10, e a funçao loginUserMock cria mais um usuário quando chamada
  });

  test("Should throw error when token is missing", async () => {
    const data = await request
      .get("/users")
      .expect(401)
      .then((response) => response.body);

    expect(data.message).toBe("Token is required");
  });
});
