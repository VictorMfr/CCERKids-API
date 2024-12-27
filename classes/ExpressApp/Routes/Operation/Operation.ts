import { Model } from "mongoose";
import OperationModel from "../../../../models/operation";
import { Response, Request } from "express";
import Authentication from "../../../Authentication/Authentication";

class Operation {

    public name: string;
    public description: string;
    public operationModel: Model<any, any> = OperationModel;

    constructor(name: string, description: string) {
        this.name = name;
        this.description = description;
    };

    public handleError(res: Response, error: unknown) {
        if (error instanceof Error) {
            res.status(500).send({ error: true, message: error.message });
            console.log(error.message);
        }
    }

    protected async checkRoleAuthentification(req: Request, res: Response, url: string, method: string, entityModel: Model<any, any>) {
        try {
            const operation = await this.operationModel.findOne({ url, method });
            const operationId = operation._id;

            const user = res.locals.user;
            const userRoles = user.roles;

            if (!userRoles.find((role: any) => {
                return role.role.permits.find((permit: any) => permit.toString() == operationId.toString())
            })) {
                throw new Error("No tiene los permisos necesarios");
            }
        } catch (error) {
            if (error instanceof Error) {
                throw new Error(error.message);
            }
        }
    }

    protected reportRouteCreation(method: string, url: string) {
        console.log(`[Servidor]: Ruta ${method} ${url} creada!`);
    }
}

export default Operation;