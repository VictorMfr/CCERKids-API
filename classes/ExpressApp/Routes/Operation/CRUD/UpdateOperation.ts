import { Router, Request, Response } from "express";
import IOperation, { TOperation } from "../IOperation";
import Operation from "../Operation";
import Entity from "../../../../Entity/Entity";
import { Tmiddleware } from "../../../../../types/express";

class UpdateOperation<T> extends Operation implements IOperation {

    private validKeys: (keyof T)[];

    constructor(validKeys: (keyof T)[], name: string = "Actualizar entidad", description: string = "Actualizar una entidad") {
        super(name, description);
        this.validKeys = validKeys;
    }

    private isValidKeys(data: { [index: string]: any }) {
        const keysToUpdate = Object.keys(data);
        const isValidUpdate = keysToUpdate.every((key) => this.validKeys.includes(key as keyof T));

        return isValidUpdate;
    }

    handleOperation(router: Router, entity: Entity, middlewares: Tmiddleware[]): TOperation {

        const url = `/${entity.getName()}s/:id`;
        const method = "PATCH";
        const model = entity.getModel();

        router.patch(url, middlewares, async (req: Request, res: Response) => {
            try {

                if (res.locals.checkRole) {
                    await this.checkRoleAuthentification(req, res, url, method, model);
                }

                const data = req.body;

                if (!this.isValidKeys(data)) {
                    throw new Error("Parámetros no válidos");
                }

                const document = await model.findById(req.params.id);
            

                if (!document) {
                    throw new Error("Documento no encontrado");
                }

                

                // Actualizar sólo las claves válidas
                Object.keys(data).forEach((key) => {
                    if (this.validKeys.includes(key as keyof T)) {
                        (document as any)[key] = data[key];
                    }
                });

                // Guardar los cambios
                const updatedDocument = await document.save();

                res.send(updatedDocument);

            } catch (error: unknown) {
                this.handleError(res, error);
            }
        });

        this.reportRouteCreation(url, method);
        return { url, method, name: this.name, description: this.description };
    }
}

export default UpdateOperation;
