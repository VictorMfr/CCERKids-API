import { Router, Request, Response } from "express";
import { Tmiddleware } from "../../../../../types/express";
import IEntity from "../../../../Entity/IEntity";
import IOperation, { TOperation } from "../IOperation";
import Operation from "../Operation";


class AddRolePermit extends Operation implements IOperation {

    constructor(
        name: string = "Agregar permiso al rol",
        description: string = "Agregar permiso a un rol",
    ) {
        super(name, description);
    }

    handleOperation(router: Router, entity: IEntity, middlewares: Tmiddleware[]): TOperation {

        const url = `/${entity.getName()}s/:id/assignPermits`;
        const method = "POST";
        const model = entity.getModel();

        router.post(url, middlewares, async (req: Request, res: Response) => {
            try {

                if (res.locals.checkRole) {
                    await this.checkRoleAuthentification(req, res, url, method, model);
                }

                const roleId = req.params.id;
                const role = await model.findById(roleId);
                const idPermit = req.body._id;

                role.permits = [...role.permits, idPermit];

                await role.save();

                res.send(role);
                
            } catch (error: unknown) {
                this.handleError(res, error);
            }
        });

        this.reportRouteCreation(url, method);
        return { url, method, name: this.name, description: this.description };
    }
}

const addRolePermit = new AddRolePermit();

export default addRolePermit;