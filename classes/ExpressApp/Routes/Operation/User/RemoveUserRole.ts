import { Request, Response, Router } from "express";
import { Tmiddleware } from "../../../../../types/express";
import IEntity from "../../../../Entity/IEntity";
import IOperation, { TOperation } from "../IOperation";
import Operation from "../Operation";
import { IUser } from "../../../../../types/models";

class RemoveUserRole extends Operation implements IOperation {

    constructor(
        name: string = "Remover rol usuario",
        description: string = "Remueve un rol a un usuario",
    ) {
        super(name, description);
    }

    handleOperation(router: Router, entity: IEntity, middlewares: Tmiddleware[] = []): TOperation {

        const url = `/${entity.getName()}s/:id/removeRole`;
        const method = "DELETE";
        const model = entity.getModel();

        router.delete(url, middlewares, async (req: Request, res: Response) => {
            try {

                if (res.locals.checkRole) {
                    await this.checkRoleAuthentification(req, res, url, method, model);
                }

                const userId = req.params.id;
                const idRole = req.body._id;
                const user = await model.findById(userId).populate('roles.role');

                const roleIndex = user.roles.findIndex((role: any) => role.role._id.toString() == idRole);

                user.roles[roleIndex].removed_at = new Date();

                await user.save();
                res.send(user);
            } catch (error: unknown) {
                console.error('Error:', error);
                this.handleError(res, error);
            }   
        });

        this.reportRouteCreation(url, method);
        return { url, method, name: this.name, description: this.description };
    }
}

const removeUserRole = new RemoveUserRole();

export default removeUserRole;