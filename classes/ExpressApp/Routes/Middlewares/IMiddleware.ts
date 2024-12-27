import { Tmiddleware } from "../../../../types/express";

interface IMiddleware {
    getMiddleware(): Tmiddleware;
}

export default IMiddleware;