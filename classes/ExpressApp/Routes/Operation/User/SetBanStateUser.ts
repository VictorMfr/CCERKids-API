import IOperation from "../IOperation";
import Operation from "../Operation";
import { Router, Request, Response } from "express";
import IEntity from "../../../../Entity/IEntity";
import { Tmiddleware } from "../../../../../types/express";
import { TOperation } from "../IOperation";

class SetBanStateUser extends Operation implements IOperation {

    constructor(
        name: string = "Establecer estado de baneo",
        description: string = "Establece un estado de baneo a un usuario",
    ) {
        super(name, description);
    }

    handleOperation(router: Router, entity: IEntity, middlewares: Tmiddleware[] = []): TOperation {

        const url = `/${entity.getName()}s/:id/banState`;
        const method = "POST";
        const model = entity.getModel();

        router.post(url, middlewares, async (req: Request, res: Response) => {
            try {

                if (res.locals.checkRole) {
                    await this.checkRoleAuthentification(req, res, url, method, model);
                }

                const userId = req.params.id;
                const bannedState = req.query.state;
                const user = await model.findById(userId);
                
                user.banned = bannedState;
                
                await user.save();
                res.send(user);
            } catch (error: unknown) {
                if (error instanceof Error) {
                    console.log(error);
                } 
            }   
        });

        this.reportRouteCreation(url, method);
        return { url, method: method, name: this.name, description: this.description };
    }
}

const setBanStateUser = new SetBanStateUser();

export default setBanStateUser;