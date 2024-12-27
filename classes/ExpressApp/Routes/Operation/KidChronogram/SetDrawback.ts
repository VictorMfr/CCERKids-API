import { Router, Request, Response } from "express";
import IOperation, { TOperation } from "../IOperation";
import Operation from "../Operation";
import IEntity from "../../../../Entity/IEntity";
import { Tmiddleware } from "../../../../../types/express";

export class SetDrawback extends Operation implements IOperation {
    constructor(
        name: string = "Establece un estado de inconveniente",
        description: string = "Establece un estado de inconveniente en el cronograma dependiendo del rol y el grupo",
    ) {
        super(name, description);
    }

    handleOperation(router: Router, entity: IEntity, middlewares: Tmiddleware[] = []): TOperation {
        const url = `/${entity.getName()}s/:id/setDrawback`;
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

                if (data.role == 'teacher' && data.target == 'bigGroup') {
                    document.bigGroup.teacherDrawback = data.value;
                    await document.save();
                    return res.status(200).send();
                }

                if (data.role == 'teacher' && data.target == 'smallGroup') {
                    document.smallGroup.teacherDrawback = data.value;
                    await document.save();
                    return res.status(200).send();
                }

                if (data.role == 'helper' && data.target == 'bigGroup') {
                    document.bigGroup.helperDrawback = data.value;
                    await document.save();
                    return res.status(200).send();
                }

                if (data.role == 'helper' && data.target == 'smallGroup') {
                    document.smallGroup.helperDrawback = data.value;
                    await document.save();
                    return res.status(200).send();
                }

                throw new Error('Error al actualizar cronograma');
                
            } catch (error: unknown) {
                this.handleError(res, error);
            }
        });

        this.reportRouteCreation(url, method);
        return { url, method, name: this.name, description: this.description };
    }
}

const setDrawback = new SetDrawback();

export default setDrawback;