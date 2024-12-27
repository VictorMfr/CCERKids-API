import { Router } from "express";
import IEntity from "../../../../Entity/IEntity";
import { Tmiddleware } from "../../../../../types/express";
import Operation from "../Operation";

export type TOperation = {
    name: string,
    description: string,
    url: string,
    method: string
};

interface IOperation {
    name: string, 
    description: string,
    handleOperation(router: Router, entity: IEntity, middlewares: Tmiddleware[]): TOperation
}

export default IOperation;