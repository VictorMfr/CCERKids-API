import { NextFunction, Router, Request, Response } from "express";
import { Tmiddleware } from "../../../../../types/express";
import IEntity from "../../../../Entity/IEntity";
import IOperation, { TOperation } from "../IOperation";
import Operation from "../Operation";
import Authentication from "../../../../Authentication/Authentication";

class LogoutOperation extends Operation implements IOperation {

    private DOCUMENT_NOT_FOUND: string = "Documento no encontrado";

    constructor(name: string = "Cerrar sesion", description: string = "Cerrar sesion e base a esta entidad") {
        super(name, description);
    }

    handleOperation(router: Router, entity: IEntity, middlewares: Tmiddleware[] = []): TOperation {

        const authentication = new Authentication();
        const model = entity.getModel();
        const method = "POST";
        const url = `/${entity.getName()}s/logout`;

        router.post(url, middlewares, async (req: Request, res: Response, next: NextFunction) => {
            try {
                const token = authentication.getToken(req);
                const decoded = authentication.decodeToken(token);

                // find user by id
                const document = await model.findById(decoded._id);

                if (!document) {
                    res.status(401).json({ message: this.DOCUMENT_NOT_FOUND });
                    return;
                }

                document.tokens = document.tokens.filter((tkn: string) => tkn !== token);

                await document.save();

                res.status(200).send();
            } catch (error) {
                this.handleError(res, error);
            }
        });

        this.reportRouteCreation(url, method);
        return { url, method, name: this.name, description: this.description };
    }
}

const logoutOperation = new LogoutOperation();

export default logoutOperation;