import { Model } from "mongoose";
import { Tmiddleware } from "../../types/express";

interface IEntity {
    getName(): string;
    getModel(): Model<any,any>;
    getMiddleware(): Tmiddleware;
}

export default IEntity;