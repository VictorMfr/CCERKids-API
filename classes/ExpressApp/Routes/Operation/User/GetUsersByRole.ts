import { Router, Request, Response } from "express";
import { Tmiddleware } from "../../../../../types/express";
import IEntity from "../../../../Entity/IEntity";
import IOperation, { TOperation } from "../IOperation";
import Operation from "../Operation";

class GetUsersByRole extends Operation implements IOperation {

    constructor(
        name: string = "Ver usuarios por rol",
        description: string = "Ver usuarios dado un rol",
    ) {
        super(name, description);
    }

    handleOperation(router: Router, entity: IEntity, middlewares: Tmiddleware[]): TOperation {

        const url = `/${entity.getName()}sByRole`;
        const method = "GET";
        const model = entity.getModel();

        router.get(url, middlewares, async (req: Request, res: Response) => {
            try {

                if (res.locals.checkRole) {
                    await this.checkRoleAuthentification(req, res, url, method, model);
                }

                const search = req.query.search;
        
                const users = await model.find().populate('roles.role');

                const filteredUsersByRole = users.filter((user: any) => {
                    return user.roles.find((role: any) => {
                        return role.role.name.includes(search);
                    })
                }).map((user: any) => {
                    return {
                        _id: user._id,
                        name: user.name,
                        lastName: user.lastName,
                        email: user.email,
                        gender: user.gender,
                        assigned_at: user.roles.find((role: any) => role.role.name.includes(search)).assigned_at,
                        removed_at: user.roles.find((role: any) => role.role.name.includes(search)).removed_at
                    }
                })
        
                res.status(200).send(filteredUsersByRole);
            } catch (error: unknown) {
                console.error('Error:', error);
                this.handleError(res, error);
            }
        });


        this.reportRouteCreation(url, method);
        return { url, method, name: this.name, description: this.description };
    }
}

const getUsersByRole = new GetUsersByRole();

export default getUsersByRole;