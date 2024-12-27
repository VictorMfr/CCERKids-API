import { Router, Request, Response } from "express";
import IOperation, { TOperation } from "../IOperation";
import Operation from "../Operation";
import IEntity from "../../../../Entity/IEntity";
import { Tmiddleware } from "../../../../../types/express";
import { Model } from "mongoose";
import Role from "../../../../../models/role";
import User from "../../../../../models/user";

export class GetKidChronogram extends Operation implements IOperation {

    private userModel: Model<any,any>

    constructor(
        userModel: Model<any,any>,
        name: string = "Ver cronograma de niños",
        description: string = "Ver cronograma de niños escuela dominical",
    ) {
        super(name, description);
        this.userModel = userModel;
    }

    handleOperation(router: Router, entity: IEntity, middlewares: Tmiddleware[] = []): TOperation {
        const url = `/${entity.getName()}/getChronogram`;
        const method = "GET";
        const model = entity.getModel();

        router.get(url, middlewares, async (req: Request, res: Response) => {
            try {
                if (res.locals.checkRole) {
                    await this.checkRoleAuthentification(req, res, url, method, model);
                }

                const chronogram = await model.find().populate('bigGroup.teacher').populate('bigGroup.helper').populate('smallGroup.teacher').populate('smallGroup.helper').exec();

                console.log(chronogram);

                res.status(200).send(chronogram);
            } catch (error: unknown) {
                this.handleError(res, error);
            }
        });

        this.reportRouteCreation(url, method);
        return { url, method, name: this.name, description: this.description };
    }
}

const getKidChronogram = new GetKidChronogram(User);

export default getKidChronogram;