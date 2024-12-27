import { Router, Request, Response } from "express";
import { Tmiddleware } from "../../../../../types/express";
import IEntity from "../../../../Entity/IEntity";
import IOperation, { TOperation } from "../IOperation";
import Operation from "../Operation";
import { INotification } from "../../../../../types/models/notification";
import { Model } from "mongoose";
import Role from "../../../../../models/role";
import User from "../../../../../models/user";

class SendNotificationsByRole extends Operation implements IOperation {

    private roleModel;
    private userModel;

    constructor(
        roleModel: Model<any, any>,
        userModel: Model<any, any>,
        name: string = "Enviar notificaciones por rol",
        description: string = "Enviar notificaciones por rol",
    ) {
        super(name, description);
        this.roleModel = roleModel;
        this.userModel = userModel;
    }

    handleOperation(router: Router, entity: IEntity, middlewares: Tmiddleware[]): TOperation {

        const url = `/${entity.getName()}/sendByRole`;
        const method = "POST";
        const model = entity.getModel();

        router.post(url, middlewares, async (req: Request, res: Response) => {
            try {

                if (res.locals.checkRole) {
                    await this.checkRoleAuthentification(req, res, url, method, model);
                }

                // Take data from request
                const message = req.body.message;
                const roleName = req.query.roleName;
                const sender = (req.query.isSystem) ? "Sistema" : `${res.locals.user.gender == 'male' ? 'Hno': 'Hna'}. ${res.locals.user.name} ${res.locals.user.lastName}`;

                const roleTarget = await this.roleModel.findOne({ name: roleName })

                if (!roleTarget) {
                    throw new Error('Role not found');
                }

                const users = await this.userModel.find({ 'roles.role': roleTarget });

                if (!users) {
                    throw new Error('No se han encontrado usuarios con este rol');
                }

                const targetIds = users.map((user: any) => user._id.toString());

                const notification = await new model<INotification>({
                    from: sender,
                    to: targetIds,
                    message
                });

                await notification.save();

                res.status(200).send();
            } catch (error: unknown) {
                this.handleError(res, error);
            }
        });


        this.reportRouteCreation(url, method);
        return { url, method, name: this.name, description: this.description };
    }
}

const sendNotificationByRole = new SendNotificationsByRole(Role, User);

export default sendNotificationByRole;