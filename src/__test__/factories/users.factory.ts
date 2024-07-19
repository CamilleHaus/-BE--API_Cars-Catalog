import { fakerPT_BR as faker } from "@faker-js/faker";
import { TCreateUser } from "../../schemas/user.schemas";

export class UserFactory {

    static build = (data: Partial<TCreateUser> = {}) => {
        return {
            id: faker.string.uuid(),
            name: faker.person.fullName(),
            email: faker.internet.email(),
            password: faker.internet.password(4)
        }

    }
}
