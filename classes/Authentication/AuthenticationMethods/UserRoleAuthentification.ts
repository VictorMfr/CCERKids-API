import { NextFunction, Request, Response } from "express";
import { Tmiddleware } from "../../../types/express";
import Authentication from "../Authentication";
import IAuthentication from "../IAuthentication";
import Entity from "../../Entity/Entity";

class UserRoleAuthentification extends Authentication implements IAuthentication {
    getAuthenticationMiddleware(entity: Entity): Tmiddleware {
        return async (req: Request, res: Response, next: NextFunction) => {

            // Find out who you are
            const token = this.getToken(req);
            const decoded = this.decodeToken(token);

            const document = await entity.getModel().findById(decoded._id).populate('roles.role');

            if (!document) {
                throw new Error('No autentificado');
            }

            return res.locals.user = document;
        }
    }
}

const userRoleAuthentification = new UserRoleAuthentification();

export default userRoleAuthentification;