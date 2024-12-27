import { Router, Request, Response } from "express";
import IOperation, { TOperation } from "../IOperation";
import Operation from "../Operation";
import IEntity from "../../../../Entity/IEntity";
import { Tmiddleware } from "../../../../../types/express";

export class AddScheduleDescription extends Operation implements IOperation {
    constructor(
        name: string = "Añadir descripción de planificación de niños",
        description: string = "Añade una descripción de planificación de niños de la escuela dominical",
    ) {
        super(name, description);
    }

    handleOperation(router: Router, entity: IEntity, middlewares: Tmiddleware[] = []): TOperation {
        const url = `/${entity.getName()}s/:id/addScheduleDescription`;
        const method = "PATCH";
        const model = entity.getModel();

        router.patch(url, middlewares, async (req: Request, res: Response) => {
            try {
                if (res.locals.checkRole) {
                    await this.checkRoleAuthentification(req, res, url, method, model);
                }

                const data = req.body;
                const chronogramId = req.params.id;

                const document = await model.findById(chronogramId);

                if (!document) {
                    throw new Error('Cronograma no encontrado');
                }

                if (data.target == 'bigGroup') {
                    document.bigGroup.scheduleDescription = data.value;
                    await document.save();
                    return res.status(200).send();
                }

                if (data.target == 'smallGroup') {
                    document.smallGroup.scheduleDescription = data.value;
                    await document.save();
                    return res.status(200).send();
                }

                throw new Error('No se pudo determinar el si es del grupo mayor o menor');

            } catch (error: unknown) {
                this.handleError(res, error);
            }
        });

        this.reportRouteCreation(url, method);
        return { url, method, name: this.name, description: this.description };
    }
}

const addScheduleDescription = new AddScheduleDescription();

export default addScheduleDescription;