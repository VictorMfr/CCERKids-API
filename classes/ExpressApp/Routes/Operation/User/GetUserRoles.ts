import { Router, Request, Response } from "express";
import { Tmiddleware } from "../../../../../types/express";
import IEntity from "../../../../Entity/IEntity";
import IOperation, { TOperation } from "../IOperation";
import Operation from "../Operation";

class GetUserRoles extends Operation implements IOperation {

    constructor(
        name: string = "Ver roles usuario",
        description: string = "Ver roles de un usuario",
    ) {
        super(name, description);
    }
    
    handleOperation(router: Router, entity: IEntity, middlewares: Tmiddleware[]): TOperation {

        const url = `/${entity.getName()}s/:id/getRoles`;
        const method = "GET";
        const model = entity.getModel();



        router.get(url, middlewares, async (req: Request, res: Response) => {
            try {

                if (res.locals.checkRole) {
                    await this.checkRoleAuthentification(req, res, url, method, model);
                }

                const userId = req.params.id;
                const user = await model.findById(userId).populate('roles.role');

                

                res.status(200).send({ ...user.toObject() });
            } catch (error: unknown) {
                this.handleError(res, error);
            }
        });

        this.reportRouteCreation(url, method);
        return { url, method, name: this.name, description: this.description };
    }
}

const getUserRoles = new GetUserRoles();

export default getUserRoles;