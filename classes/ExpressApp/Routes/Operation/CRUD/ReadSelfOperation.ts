import { Router, Request, Response } from "express";
import IOperation, { TOperation } from "../IOperation";
import Operation from "../Operation";
import Entity from "../../../../Entity/Entity";
import { Tmiddleware } from "../../../../../types/express";

class ReadSelfOperation extends Operation implements IOperation {

    constructor(
        name: string = "Leer entidad misma", 
        description: string = "Lee su entidad"
    ) {
        super(name, description);
    }

    handleOperation(router: Router, entity: Entity, middlewares: Tmiddleware[] = []): TOperation {

        const url = `/${entity.getName()}/me`;
        const method = "GET";
        const model = entity.getModel();

        router.get(url, middlewares, async (req: Request, res: Response) => {
            try {
                if (res.locals.checkRole) {
                    await this.checkRoleAuthentification(req, res, url, method, model);
                }
                
                res.send(res.locals.user);
                

            } catch (error: unknown) {
                this.handleError(res, error);
            }
        });

        this.reportRouteCreation(url, method);
        return { url, method, name: this.name, description: this.description };
    }
}

const readSelfOperation = new ReadSelfOperation();

export default readSelfOperation;