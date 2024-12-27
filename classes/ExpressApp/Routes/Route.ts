import { Router } from "express";
import IEntity from "../../Entity/IEntity";
import { TOperation } from "./Operation/IOperation";
import IRoute from "./IRoute";

class Route implements IRoute {
    protected router: Router = Router();
    protected entity: IEntity;
    protected operations: TOperation[] = [];

    constructor(entity: IEntity) {
        this.entity = entity;
    }

    getRouter(): { router: Router, operations: TOperation[] } {
        return {
            router: this.router,
            operations: this.operations
        }
    }

    protected setOperation(operation: TOperation) {
        this.operations.push(operation);
    }
}

export default Route; 