import { Tmiddleware } from "../../types/express";
import Entity from "../Entity/Entity";

interface IAuthentication {
    getAuthenticationMiddleware(entity: Entity): Tmiddleware;
}

export default IAuthentication;