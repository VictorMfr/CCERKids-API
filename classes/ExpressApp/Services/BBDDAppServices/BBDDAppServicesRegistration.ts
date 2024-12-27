import { Model } from "mongoose";
import IRoute from "../../Routes/IRoute";
import IServices from "../IService";
import Service from "../Service";
import { TOperationService } from "./IBBDDAppServicesRegistration";
import { TOperation } from "../../Routes/Operation/IOperation";

class DBAppServicesRegistration extends Service implements IServices {

    constructor(servicesModel: Model<any, any>) {
        super(servicesModel);
    }

    private async addServicesToBBDD(router: IRoute) {
        try {
            const servicesRoutes = router.getRouter().operations;
            const BBDDRegisteredOperations: TOperationService[] = await this.getServicesModel().find();

            const newServices = servicesRoutes.filter(service => {
                const { url, method, name, description } = service;

                const isRegistered = BBDDRegisteredOperations.some((registeredOperation: TOperationService) => {
                    return (
                        registeredOperation.url === url &&
                        registeredOperation.method === method &&
                        registeredOperation.name === name &&
                        registeredOperation.description === description
                    );
                });

                return !isRegistered;
            });

    

            if (newServices.length > 0) {
                console.log("[Servidor]: Nuevos Servicios!")
                console.log(newServices);

                await this.getServicesModel().insertMany(servicesRoutes, { limit: 60000 });
                console.log('[Servidor]: Servicios/Rutas añadidas a la base de datos exitosamente!');
            }

        } catch (error: unknown) {
            if (error instanceof Error) {
                console.log(`[Servidor]: Error al añadir Servicios/Rutas a la base de datos: ` + error.message);
            }
        }
    }

    public executeService(router: IRoute): void {
        this.addServicesToBBDD(router);
    }
};

export default DBAppServicesRegistration;