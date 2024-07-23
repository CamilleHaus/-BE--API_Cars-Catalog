import { prisma } from "../../../database/prisma";
import { request } from "../../../utils/request";
import { createUserMock } from "../../__mock__/userMocks";

describe("Integration test: Register User", () => {
  beforeEach(async () => {
    await prisma.$transaction([
      prisma.car.deleteMany(),
      prisma.user.deleteMany(),
    ]);
  });

  test("Should be able to register a user successfully", async () => {
    const data = await request
      .post("/users")
      .send(createUserMock)
      .expect(201)
      .then((response) => response.body);

    expect(data.id).toBeDefined();
    expect(data.email).toBe(createUserMock.email);
    expect(data.name).toBe(createUserMock.name);
  });

  test("Should throw error when email is already registered", async () => {
    await prisma.user.create({ data: createUserMock });

    const data = await request
      .post("/users")
      .send(createUserMock)
      .expect(409)
      .then((response) => response.body);

    expect(data.message).toBe("E-mail already registered");
  });

  test("Should thrown an error when body parameter is missing", async () => {
    const data = await request
      .post("/users")
      .expect(400)
      .then((response) => response.body);

    expect(data.errors).toHaveLength(3);
    expect(data.errors[0].message).toBe("Required");
    expect(data.errors[1].message).toBe("Required");
    expect(data.errors[2].message).toBe("Required");
  });
});
