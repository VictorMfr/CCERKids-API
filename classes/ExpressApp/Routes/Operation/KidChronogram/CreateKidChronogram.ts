import { Router, Request, Response } from "express";
import IOperation, { TOperation } from "../IOperation";
import Operation from "../Operation";
import IEntity from "../../../../Entity/IEntity";
import { Tmiddleware } from "../../../../../types/express";

export class CreateKidChronogram extends Operation implements IOperation {
    constructor(
        name: string = "Crear cronograma de niños",
        description: string = "Crea un cronograma de niños escuela dominical",
    ) {
        super(name, description);
    }

    handleOperation(router: Router, entity: IEntity, middlewares: Tmiddleware[] = []): TOperation {
        const url = `/${entity.getName()}/addChronogram`;
        const method = "POST";
        const model = entity.getModel();

        router.post(url, middlewares, async (req: Request, res: Response) => {
            try {
                if (res.locals.checkRole) {
                    await this.checkRoleAuthentification(req, res, url, method, model);
                }

                const data = req.body.data;

                const result = await model.insertMany(data);

                if (!result) {
                    throw new Error('Error insertando cronograma');
                }

                res.status(200).send();
            } catch (error: unknown) {
                this.handleError(res, error);
            }
        });

        this.reportRouteCreation(url, method);
        return { url, method, name: this.name, description: this.description };
    }
}

const createKidChronogram = new CreateKidChronogram();

export default createKidChronogram;