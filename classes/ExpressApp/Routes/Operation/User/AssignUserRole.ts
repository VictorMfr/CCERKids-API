import { Router, Request, Response } from "express";
import { Tmiddleware } from "../../../../../types/express";
import IEntity from "../../../../Entity/IEntity";
import IOperation, { TOperation } from "../IOperation";
import Operation from "../Operation";
import mongoose, { ObjectId } from "mongoose";

class AssignUserRole extends Operation implements IOperation {

    constructor(
        name: string = "Asignar rol usuario",
        description: string = "Asigna un rol a un usuario",
    ) {
        super(name, description);
    }
    
    handleOperation(router: Router, entity: IEntity, middlewares: Tmiddleware[]): TOperation {

        const url = `/${entity.getName()}s/:id/assignRole`;
        const method = "POST";
        const model = entity.getModel();



        router.post(url, middlewares, async (req: Request, res: Response) => {
            try {

                if (res.locals.checkRole) {
                    await this.checkRoleAuthentification(req, res, url, method, model);
                }


                const userId = req.params.id;
                const role = new mongoose.Types.ObjectId(req.body._id);

                const user = await model.findById(userId);

                console.log(user);

                user.roles = [...user.roles, {
                    role: role,
                    assigned_at: new Date()
                }];

                const userRoles = await user.populate('roles.role');

                await user.save();

                res.status(201).send(userRoles);
            } catch (error: unknown) {
                this.handleError(res, error);
            }
        });

        this.reportRouteCreation(url, method);
        return { url, method, name: this.name, description: this.description };
    }
}

const assignUserRole = new AssignUserRole();

export default assignUserRole;