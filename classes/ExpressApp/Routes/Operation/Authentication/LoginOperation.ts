import { NextFunction, Router, Request, Response } from "express";
import { Tmiddleware } from "../../../../../types/express";
import IEntity from "../../../../Entity/IEntity";
import IOperation, { TOperation } from "../IOperation";
import Operation from "../Operation";
import Authentication from "../../../../Authentication/Authentication";
import bcrypt from "bcrypt";

class LoginOperation extends Operation implements IOperation {

    constructor(name: string = "Iniciar sesion", description: string = "Iniciar sesion e base a esta entidad") {
        super(name, description);
    }

    handleOperation(router: Router, entity: IEntity, middlewares: Tmiddleware[] = []): TOperation {

        const authentication = new Authentication();
        const url = `/${entity.getName()}s/login`;
        const method = "POST";
        const model = entity.getModel();

        router.post(url, middlewares, async (req: Request, res: Response, next: NextFunction) => {
            try {
                const { email, password } = req.body;



                const document = await model.findOne({ email });

                if (!document) {
                    throw new Error('Usuario no encontrado');
                }
                
                const isPasswordMatch = await bcrypt.compare(password, document.password);

                if (!isPasswordMatch) {
                    throw new Error("No autentificado");
                }

                const token = authentication.createToken(document._id);
                document.tokens.push(token);
                await document.save();

                res.send({ document, token: token });
            } catch (error) {
                this.handleError(res, error);
            }
        });

        this.reportRouteCreation(url, method);
        return { url, method, name: this.name, description: this.description };
    }
}

const loginOperation = new LoginOperation();

export default loginOperation;