import { Router, Request, Response } from "express";
import IOperation, { TOperation } from "../IOperation";
import Operation from "../Operation";
import { Model } from "mongoose";
import Entity from "../../../../Entity/Entity";
import { Tmiddleware } from "../../../../../types/express";

class ReadOperation extends Operation implements IOperation {
    
    private DOCUMENT_NOT_FOUND: string = "Documento no encontrado";

    constructor(
        name: string = "Leer entidad", 
        description: string = "Lee una entidad"
    ) {
        super(name, description);
    }

    handleOperation(router: Router, entity: Entity, middlewares: Tmiddleware[] = []): TOperation {

        const url = `/${entity.getName()}s/:id`;
        const method = "GET"; 
        const model = entity.getModel();

        router.get(url, middlewares, async (req: Request, res: Response) => {
            try {

                if (res.locals.checkRole) {
                    await this.checkRoleAuthentification(req, res, url, method, model);
                }

                const document = await model.findById(req.params.id).exec();
                if (!document) {
                    res.status(404).send({ error: true, message: this.DOCUMENT_NOT_FOUND });
                } else {
                    res.send(document);
                }
            } catch (error: unknown) {
                this.handleError(res, error);
            }
        });

        this.reportRouteCreation(url, method);
        return { url, method, name: this.name, description: this.description };
    }
}

const readOperation = new ReadOperation();

export default readOperation;