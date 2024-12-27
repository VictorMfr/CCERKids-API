import { Router } from "express";
import IOperation, { TOperation } from "./Operation/IOperation";

export type TRouteOperations = {
    router: Router,
    operations: IOperation[]
}

interface IRoute {
    getRouter(): { router: Router, operations: TOperation[] }
}

export default IRoute;