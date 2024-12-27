import { Router, Request, Response } from "express";
import IOperation, { TOperation } from "../IOperation";
import Operation from "../Operation";
import Entity from "../../../../Entity/Entity";
import { Tmiddleware } from "../../../../../types/express";

class ReadAllOperation extends Operation implements IOperation {

    constructor(
        name: string = "Listar entidad", 
        description: string = "Lista basado en el tipo de entidad"
    ) {
        super(name, description);
    }

    handleOperation(router: Router, entity: Entity, middlewares: Tmiddleware[] = []): TOperation {

        const url = `/${entity.getName()}s`;
        const method = "GET";
        const model = entity.getModel();

        router.get(url, middlewares, async (req: Request, res: Response) => {
            try {

                if (res.locals.checkRole) {
                    await this.checkRoleAuthentification(req, res, url, method, model);
                }

                const documents = await model.find();

                res.send(documents);
            } catch (error: unknown) {
                this.handleError(res, error);
            }
        });

        this.reportRouteCreation(url, method);
        return { url, method: method, name: this.name, description: this.description };
    }
}

const readAllOperation = new ReadAllOperation();

export default readAllOperation;