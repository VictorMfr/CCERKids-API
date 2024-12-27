import { Tmiddleware } from "../../../../types/express";
import Entity from "../../../Entity/Entity";

class Middleware {
    private middleware: Entity | Tmiddleware;

    constructor(middleware: Entity | Tmiddleware) {
        this.middleware = middleware;
    }

    public getMiddleware() {
        return this.middleware;
    }
}

export default Middleware;