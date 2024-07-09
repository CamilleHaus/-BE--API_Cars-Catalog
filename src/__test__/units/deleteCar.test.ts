import { CarServices } from "../../services/cars.services"
import { carMock} from "../__mock__/carMocks";

describe("Unit test: Delete car", () => {
    
    test("Should be able to update a car successfully", async () => {
        const carServices = new CarServices();

        await carServices.deleteCars(carMock.id)

    })
});