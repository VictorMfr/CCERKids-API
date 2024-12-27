import { Router, Request, Response } from "express";
import IOperation, { TOperation } from "../IOperation";
import Operation from "../Operation";
import IEntity from "../../../../Entity/IEntity";
import { Tmiddleware } from "../../../../../types/express";

export class CreateOperation extends Operation implements IOperation {
    constructor(
        name: string = "Crear entidad",
        description: string = "Crea una entidad",
    ) {
        super(name, description);
    }

    handleOperation(router: Router, entity: IEntity, middlewares: Tmiddleware[] = []): TOperation {
        const url = `/${entity.getName()}`;
        const method = "POST";
        const model = entity.getModel();

        router.post(url, middlewares, async (req: Request, res: Response) => {
            try {
                if (res.locals.checkRole) {
                    await this.checkRoleAuthentification(req, res, url, method, model);
                }

                const data = req.body;
                const document = new model(data);
                await document.save();
                res.status(200).send(document);
            } catch (error: unknown) {
                this.handleError(res, error);
            }
        });

        this.reportRouteCreation(url, method);
        return { url, method, name: this.name, description: this.description };
    }
}

const createOperation = new CreateOperation();

export default createOperation;