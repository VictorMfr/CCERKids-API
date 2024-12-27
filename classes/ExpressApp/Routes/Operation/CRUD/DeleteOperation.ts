import { Router, Request, Response } from "express";
import IOperation, { TOperation } from "../IOperation";
import Operation from "../Operation";
import Entity from "../../../../Entity/Entity";
import { Tmiddleware } from "../../../../../types/express";

class DeleteOperation extends Operation implements IOperation {

    constructor(
        name: string = "Borrar Entidad", 
        description: string = "Borra una entidad"
    ) {
        super(name, description);
    }
    
    private DOCUMENT_NOT_FOUND: string = "Documento no encontrado";

    handleOperation(router: Router, entity: Entity, middlewares: Tmiddleware[] = []): TOperation {

        const url = `/${entity.getName()}s/:id`;
        const method = "DELETE";
        const model = entity.getModel();
        

        router.delete(url, middlewares, async (req: Request, res: Response) => {
            try {
                if (res.locals.checkRole) {
                    await this.checkRoleAuthentification(req, res, url, method, model);
                }

                const document = await model.findByIdAndDelete(req.params.id).exec();
                if (!document) {
                    res.status(404).send(this.DOCUMENT_NOT_FOUND);
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

const deleteOperation = new DeleteOperation();

export default deleteOperation;