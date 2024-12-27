import { Router, Request, Response } from "express";
import { Tmiddleware } from "../../../../../types/express";
import IEntity from "../../../../Entity/IEntity";
import IOperation, { TOperation } from "../IOperation";
import Operation from "../Operation";
import { ObjectId } from "mongodb";

function isObjectIdsArray (data: ObjectId[] | ObjectId): data is Array<ObjectId>  {
    return ((data as ObjectId[]).some !== undefined)? true: false;
} 

class GetNotificationsByUser extends Operation implements IOperation {

    constructor(
        name: string = "Ver notificaciones por usuario",
        description: string = "Ver notificaciones por usuario",
    ) {
        super(name, description);
    }

    handleOperation(router: Router, entity: IEntity, middlewares: Tmiddleware[]): TOperation {

        const url = `/${entity.getName()}sByUser`;
        const method = "GET";
        const model = entity.getModel();

        router.get(url, middlewares, async (req: Request, res: Response) => {
            try {

                if (res.locals.checkRole) {
                    await this.checkRoleAuthentification(req, res, url, method, model);
                }

                const search = req.query.userId;
        
                const notifications = await model.find({ to: search });

                const filteredNotifications = notifications.filter((notification: any) => {
                    if (isObjectIdsArray(notification.to)) {
                        return notification.to.find((receiver: ObjectId) => receiver.toString() == search);
                    }

                    return (notification.to as ObjectId).toString() == search;
                });

                const filteredNotificationsByUserSynthesis = filteredNotifications.map((notification: any) => {
                    return {
                        from: notification.from,
                        message: notification.message,
                        sent_at: notification.sent_at
                    }
                })
        
                res.status(200).send(filteredNotificationsByUserSynthesis);
            } catch (error: unknown) {
                console.error('Error:', error);
                this.handleError(res, error);
            }
        });


        this.reportRouteCreation(url, method);
        return { url, method, name: this.name, description: this.description };
    }
}

const getNotificationsByUser = new GetNotificationsByUser();

export default getNotificationsByUser;