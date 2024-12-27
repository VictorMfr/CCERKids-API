import { Router, Request, Response } from "express";
import { Tmiddleware } from "../../../../../types/express";
import IEntity from "../../../../Entity/IEntity";
import IOperation, { TOperation } from "../IOperation";
import Operation from "../Operation";


class GetRolePermits extends Operation implements IOperation {

    constructor(
        name: string = "Obtener permisos de un rol",
        description: string = "Obtiene los permisos de un rol",
    ) {
        super(name, description);
    }

    handleOperation(router: Router, entity: IEntity, middlewares: Tmiddleware[]): TOperation {

        const url = `/${entity.getName()}s/:id/getPermits`;
        const method = "GET";
        const model = entity.getModel();

        router.get(url, middlewares, async (req: Request, res: Response) => {
            try {

                if (res.locals.checkRole) {
                    await this.checkRoleAuthentification(req, res, url, method, model);
                }

                const roleId = req.params.id;
                const role = await model.findById(roleId).populate('permits');

                console.log(role)

                res.send(role);
                
            } catch (error: unknown) {
                this.handleError(res, error);
            }
        });

        this.reportRouteCreation(url, method);
        return { url, method, name: this.name, description: this.description };
    }
}

const getRolePermits = new GetRolePermits();

export default getRolePermits;