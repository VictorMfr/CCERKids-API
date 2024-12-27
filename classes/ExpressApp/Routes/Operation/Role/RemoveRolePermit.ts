import { Router, Request, Response } from "express";
import { Tmiddleware } from "../../../../../types/express";
import IEntity from "../../../../Entity/IEntity";
import IOperation, { TOperation } from "../IOperation";
import Operation from "../Operation";


class RemoveRolePermit extends Operation implements IOperation {

    constructor(
        name: string = "Quitar permiso de un rol",
        description: string = "Quita un permiso de un rol",
    ) {
        super(name, description);
    }

    handleOperation(router: Router, entity: IEntity, middlewares: Tmiddleware[]): TOperation {

        const url = `/${entity.getName()}s/:id/removePermit`;
        const method = "DELETE";
        const model = entity.getModel();

        router.delete(url, middlewares, async (req: Request, res: Response) => {
            try {

                if (res.locals.checkRole) {
                    await this.checkRoleAuthentification(req, res, url, method, model);
                }

                const roleId = req.params.id;
                const role = await model.findById(roleId).populate('permits');
                const permitId = req.body._id;

                role.permits = role.permits.filter((permit: any) => permit._id.toString() !== permitId );

                await role.save();

                res.send(role);
                
            } catch (error: unknown) {
                this.handleError(res, error);
            }
        });

        this.reportRouteCreation(url, method);
        return { url, method: method, name: this.name, description: this.description };
    }
}

const removeRolePermit = new RemoveRolePermit();

export default removeRolePermit;