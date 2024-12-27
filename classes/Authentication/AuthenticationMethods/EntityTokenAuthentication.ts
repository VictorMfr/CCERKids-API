import { Request, Response, NextFunction } from "express";
import { Tmiddleware } from "../../../types/express";
import IAuthentication from "../IAuthentication";
import Authentication from "../Authentication";
import Entity from "../../Entity/Entity";
import Superuser from "../../../models/superuser";

class EntityAuthentication extends Authentication implements IAuthentication {
    getAuthenticationMiddleware(entity: Entity): Tmiddleware {
        return async (req: Request, res: Response, next: NextFunction) => {
            try {
                if (res.locals.superuser) {
                    return next();
                }

                const token = this.getToken(req);
                const decoded = this.decodeToken(token);

                
                const fetchDoc = await entity.getModel().findById(decoded._id);
                
                let document = null;

                try {
                    document = await fetchDoc.populate('roles.role');
                } catch {
                    document = fetchDoc;
                }               


                if (!document) {
                    if (entity.getName() === 'superuser') {
                        return next();
                    } else {
                        throw new Error("No autentificado");
                    } 
                }

                if (entity.getName() === 'superuser') {
                    res.locals.superuser = true;
                    res.locals.user = document;
                    return next();
                } else {
                    
                    res.locals.checkRole = true;
                    res.locals.user = document;
                    return next();
                }

            } catch (error) {
                console.log(error)
                if (error instanceof Error) {
                    return res.status(500).send(error);
                }
            }
        }
    }
}

const entityTokenAuthentication = new EntityAuthentication();

export default entityTokenAuthentication;
